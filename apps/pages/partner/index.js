
import React, { Component } from 'react';
import { 
    Image,
    TouchableOpacity,
    TextInput,
    Text, 
    View
} from 'react-native';
import { UltimateListView } from "react-native-ultimate-listview";

import { getChildPartnerList } from "../../common/AppFetch";
import HeaderBar from "../../components/HeaderBar";
import ViewUtils from "../../components/ViewUtils";
import FilterItem from "../../components/FilterItem";
import AreaFilter from "../../components/FilterItem/AreaFilter";
import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class Partner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTxt: '',
            areaFilter: {name: '全部区域', value: 'all'}
        }
    }
    onFetch = async (page, startFetch, abortFetch) => {
        const {searchTxt} = this.state
        let params = {
            pageNum: page
        }
        if(searchTxt !== '') {
            params.vehiclePlate = searchTxt
        }
        await getChildPartnerList({
            ...params,
            success: (data) => {
                startFetch(data.result, 10)
            },
            error: (data) => {
                abortFetch();
                this.listView.setState({
                    paginationStatus: 2
                })
            }
        })
    }

    render() {
        const {searchTxt, areaFilter} = this.state
        return <View style={GlobalStyles.root_container}>
            <HeaderBar
                title={"渠道"}
                rightButton={<TouchableOpacity 
                    style={styles.rightButton} 
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={() => this.props.navigation.navigate('AddPartner')}
                >
                    <Image source={Images.add} />
                    <Text style={styles.rightButtonTxt}>添加</Text>
                </TouchableOpacity>}
            />
            <View style={GlobalStyles.root_container}>
                <View style={styles.searchWrap}>
                    <View style={styles.searchCon}>
                        <Image source={Images.search} />
                        <TextInput
                            style={styles.searchInput}
                            underlineColorAndroid='transparent'
                            placeholder='姓名或车牌号检索'
                            placeholderTextColor='#999'
                            value={searchTxt}
                            onChangeText={searchTxt => {
                                this.setState({ searchTxt })
                            }}
                            onEndEditing={() => {
                                this.listView.setState({
                                    dataSource: [],
                                    paginationStatus: 0
                                }, this.listView.refresh)
                            }}
                        />
                    </View>
                    <FilterItem 
                        labelName={areaFilter.name} 
                        wrapStyle={{marginLeft: 20}}
                        ref={ref => this.areaFilter = ref}
                    >
                        <AreaFilter 
                            selected={areaFilter.value}
                            onSelect={(item) => {
                                this.setState({areaFilter: item}, () => {
                                    this.areaFilter && this.areaFilter.toggle(false)
                                })
                            }}
                        />
                    </FilterItem>
                </View>
                <UltimateListView
                    ref={ref => (this.listView = ref)}
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={item => this.renderItem(item)}
                    waitingSpinnerText={"正在加载更多..."}
                    paginationAllLoadedView={() => ViewUtils.renderListFooter()}
                    separator={() => ViewUtils.itemSeparatorComponent()}
                    displayDate
                    arrowImageStyle={{ width: 20, height: 20, resizeMode: "contain" }}
                />
            </View>
        </View>
    }
    renderItem = (item) => {
        return <View style={styles.listItem}>
            <View style={styles.itemRow}>
                <Text style={GlobalStyles.itemTxt_15_32}>{item.name}</Text>
                <Text style={GlobalStyles.itemTxt_12_64}>{item.telephone}</Text>
                <Text style={GlobalStyles.itemTxt_12_64}>{item.count}</Text>
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <View style={styles.itemAlignRow}>
                    <Image source={Images.location} style={{marginRight: 5}} />
                    <Text style={GlobalStyles.itemTxt_12_64}>{item.province} {item.city}</Text>
                </View>
                {item.createTime?<Text style={GlobalStyles.itemTxt_12_96}>{item.createTime}加入</Text>:null}
            </View>
        </View>
    }
}