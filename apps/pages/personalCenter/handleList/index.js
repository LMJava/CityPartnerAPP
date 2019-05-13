import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    Text, 
    View
} from 'react-native';
import { UltimateListView } from "react-native-ultimate-listview";

import { getOrderListBySession } from "../../../common/AppFetch";
import DatePickerUtils from "../../../components/DatePickerUtils";
import ViewUtils from "../../../components/ViewUtils";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"


export default class HandleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countNum: '0',
            startTime: '', 
            endTime: ''
        }
    }
    componentWillUnmount() {
        DatePickerUtils.hide()
    }
    onFetch = async (page, startFetch, abortFetch) => {
        const {startTime, endTime} = this.state
        let params = {
            orderState: 5,
            pageNum: page
        }
        if(startTime !== '') {
            params.startTime = startTime
        }
        if(endTime !== '') {
            params.endTime = endTime
        }
        await getOrderListBySession({
            ...params,
            success: (data) => {
                startFetch(data.result, 10)
                this.setState({countNum: data.totalCount})
            },
            error: (data) => {
                abortFetch();
                this.listView.setState({
                    paginationStatus: 2
                })
            }
        })
    }

    _showDatePicker = (_flag) => {
        let {startTime, endTime} = this.state
        DatePickerUtils.show((date) => {
            if (_flag === 0) {
                if(endTime && ViewUtils.isOlderTime(endTime, date)){
                    startTime = endTime
                    endTime = date
                } else {
                    startTime = date;
                }
            } else if (_flag === 1) {
                if(startTime && ViewUtils.isOlderTime(date, startTime)){
                    endTime = startTime
                    startTime = date
                } else {
                    endTime = date;
                }
            }
            this.setState({startTime, endTime}, () => {
                this.listView.setState({
                    dataSource: [],
                    paginationStatus: 0
                }, this.listView.refresh)
            })
        });
    }
    render() {
        const {startTime, endTime, countNum} = this.state
        return <View style={GlobalStyles.root_container}>
            <View style={styles.searchWrap}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.pickerBtn}
                    onPress={() => this._showDatePicker(0)}
                >
                    <Text style={styles.pickerBtnTxt}>{startTime || "起始时间"}</Text>
                    <Image source={Images.datePicker} style={styles.pickerBtnImg}/>
                </TouchableOpacity>
                <Text style={styles.inputSeparator}>~</Text>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.pickerBtn}
                    onPress={() => this._showDatePicker(1)}
                >
                    <Text style={styles.pickerBtnTxt}>{endTime || "结束时间"}</Text>
                    <Image source={Images.datePicker} style={styles.pickerBtnImg}/>
                </TouchableOpacity>
            </View>
            <UltimateListView
                ref={ref => (this.listView = ref)}
                onFetch={this.onFetch}
                keyExtractor={(item, index) => `${index} - ${item}`}
                item={item => this.renderItem(item)}
                header={()=>(<Text style={[styles.countNum, styles.countNumTxt]}>
                    当前时间段内共办理
                    <Text style={styles.countNumTxt}>{countNum}</Text>
                    人
                </Text>)}
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
                <Text style={GlobalStyles.itemTxt_12_64}>{item.mobilePhone}</Text>
                <Text style={GlobalStyles.itemTxt_12_64}>{item.channelType}</Text>
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <Text style={GlobalStyles.itemTxt_12_64}>{item.orderId}</Text>
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <Text style={GlobalStyles.itemTxt_12_64}>
                    激活人：
                    <Text style={GlobalStyles.itemTxt_12_64}></Text>
                </Text>
                <Text style={GlobalStyles.itemTxt_12_96}>
                    办理时间：
                    <Text style={GlobalStyles.itemTxt_12_64}>{item.createTime}</Text>
                </Text>
            </View>
        </View>
    }
}