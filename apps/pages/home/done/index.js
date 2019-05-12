import React, { Component } from 'react';
import {
    Image,
    TextInput,
    Text, 
    View
} from 'react-native';
import { UltimateListView } from "react-native-ultimate-listview";

import { getOrderListBySession } from "../../../common/AppFetch";
import ViewUtils from "../../../components/ViewUtils";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"


export default class Done extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTxt: ''
        }
    }
    onFetch = async (page, startFetch, abortFetch) => {
        const {searchTxt} = this.state
        let params = {
            orderState: 5,
            pageNum: page
        }
        if(searchTxt !== '') {
            params.vehiclePlate = searchTxt
        }
        await getOrderListBySession({
            ...params,
            success: (data) => {
                startFetch(data.result, 10);
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
        const {searchTxt} = this.state
        return <View style={GlobalStyles.root_container}>
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
    }
    renderItem = (item) => {
        return <View style={styles.listItem}>
            <View style={styles.itemRow}>
                <Text style={GlobalStyles.itemTxt_15_32}>{item.name}</Text>
                <Text style={GlobalStyles.itemTxt_12_64}>{item.orderId}</Text>
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <Text style={GlobalStyles.itemTxt_12_64}>
                    车牌号：
                    <Text style={GlobalStyles.itemTxt_12_64}>{item.vehiclePlate}</Text>
                </Text>
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <Text style={GlobalStyles.itemTxt_12_64}>
                    用户编号：
                    <Text style={GlobalStyles.itemTxt_12_64}>{item.memberId}</Text>
                </Text>
                <Text style={GlobalStyles.itemTxt_12_96}>
                    开通时间：
                    <Text style={GlobalStyles.itemTxt_12_64}>{item.createTime}</Text>
                </Text>
            </View>
        </View>
    }
}