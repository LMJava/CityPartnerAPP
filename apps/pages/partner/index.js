
import React, { Component } from 'react';
import { 
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Text, 
    View
} from 'react-native';

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
                            placeholder='姓名或手机号码检索'
                            placeholderTextColor='#999'
                            value={searchTxt}
                            onChangeText={searchTxt => {
                                this.setState({ searchTxt })
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
                <FlatList
                    data={[{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2}]}
                    keyExtractor={(item, index) => item.name +''+ index}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={ViewUtils.itemSeparatorComponent}
                />
            </View>
        </View>
    }
    renderItem = ({item}) => {
        return <View style={styles.listItem}>
            <View style={styles.itemAlignRow}>
                <View style={styles.itemRow}>
                    <Text style={GlobalStyles.itemTxt_15_32}>张无忌</Text>
                    <Text style={GlobalStyles.itemTxt_12_64}>1357924680</Text>
                    <Text style={GlobalStyles.itemTxt_12_64}>116</Text>
                </View>
                {/* <Image source={Images.right} style={{marginLeft: 15}} /> */}
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <View style={styles.itemAlignRow}>
                    <Image source={Images.location} style={{marginRight: 5}} />
                    <Text style={GlobalStyles.itemTxt_12_64}>河南省三门峡市</Text>
                </View>
                <Text style={GlobalStyles.itemTxt_12_96}>2019/04/21加入</Text>
            </View>
        </View>
    }
}