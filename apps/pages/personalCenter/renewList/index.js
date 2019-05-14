import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    FlatList,
    Text, 
    View
} from 'react-native';

import DatePickerUtils from "../../../components/DatePickerUtils";
import ViewUtils from "../../../components/ViewUtils";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"


export default class RenewList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countNum: '0',
            beginTime: '', 
            endTime: ''
        }
    }
    _showDatePicker = (_flag) => {
        let {beginTime, endTime} = this.state
        DatePickerUtils.show((date) => {
            if (_flag === 0) {
                if(endTime && ViewUtils.isOlderTime(endTime, date)){
                    beginTime = endTime
                    endTime = date
                } else {
                    beginTime = date;
                }
            } else if (_flag === 1) {
                if(beginTime && ViewUtils.isOlderTime(date, beginTime)){
                    endTime = beginTime
                    beginTime = date
                } else {
                    endTime = date;
                }
            }
            this.setState({beginTime, endTime}, () =>{
                // 发请求
            })
        });
    }
    render() {
        const {beginTime, endTime, countNum} = this.state
        return <View style={GlobalStyles.root_container}>
            <View style={styles.searchWrap}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.pickerBtn}
                    onPress={() => this._showDatePicker(0)}
                >
                    <Text style={styles.pickerBtnTxt}>{beginTime || "起始时间"}</Text>
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
            <Text style={[styles.countNum, styles.countNumTxt]}>
                当前时间段内共办理
                <Text style={styles.countNumTxt}>{countNum}</Text>
                人
            </Text>
            <FlatList
                data={[]}
                keyExtractor={(item, index) => item.name +''+ index}
                renderItem={this.renderItem}
                ItemSeparatorComponent={ViewUtils.itemSeparatorComponent}
            />
        </View>
    }
    renderItem = ({item}) => {
        return <View style={styles.listItem}>
            <View style={styles.itemRow}>
                <Text style={GlobalStyles.itemTxt_15_32}>张无忌</Text>
                <Text style={GlobalStyles.itemTxt_12_64}>0371 1003 2371 5653</Text>
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <Text style={GlobalStyles.itemTxt_12_64}>
                    用户编号：
                    <Text style={GlobalStyles.itemTxt_12_64}>4110384212345</Text>
                </Text>
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <Text style={GlobalStyles.itemTxt_12_64}>
                    开通时间：
                    <Text style={GlobalStyles.itemTxt_12_64}>2018/03/12</Text>
                </Text>
                <Text style={GlobalStyles.itemTxt_12_96}>
                    续费时间：
                    <Text style={GlobalStyles.itemTxt_12_64}>2019/04/21</Text>
                </Text>
            </View>
        </View>
    }
}