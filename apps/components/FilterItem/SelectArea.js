/**
 * 区域筛选
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import ViewUtils from "../ViewUtils"
import Toast from "../Toast";

import {getRegnList} from '../../common/filterFetch'

export default class SelectArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceData: null,
            cityData: null,
            areaData: null,
            selectedProvince: props.selectedProvince, // 省
            selectedCity: props.selectedCity, // 市
            selectedArea: props.selectedArea, // 区
        }
    }

    componentDidMount(){
        global.mapList 
        ? this.setState({provinceData: global.mapList}, () => {
            let provinceData = this.state.provinceData,
                province = this.props.selectedProvince
            // 判断有选择省份且不为默认时
            if(province && province.regnCode != '-1') {
                let provinceIndex = null
                provinceIndex = this.findIndex(provinceData, province.regnCode)
                if(!provinceIndex || provinceIndex === -1){
                    return false;
                }
                this.setState({cityData: provinceData[provinceIndex].children}, () => {
                    let cityData = this.state.cityData,
                        city = this.props.selectedCity
                    // 判断有选择区县且不为默认时
                    if(city) {
                        let cityIndex = null
                        cityIndex = this.findIndex(cityData, city.regnCode)
                        if(!cityIndex || cityIndex === -1){
                            return false;
                        }
                        this.setState({areaData: cityData[cityIndex].children})
                    }
                })
            }
        })
        : this.getData({
            regnLvlCd: '-1',
            regnCode: '-1',
            regnNm: '全国'
        })
    }

    getData(_item){
        let item = JSON.parse(JSON.stringify(_item))
        item.isSelectable = true
        if(item.regnLvlCd == -1) {
            this.getRegnListFn(item)
        } else if(item.regnLvlCd == 1) {
            let provinceIndex = null, cityData = null
            item.regnNm = "全"+item.regnNm
            provinceIndex = this.findIndex(global.mapList, item.regnCode)
            if(!provinceIndex || provinceIndex === -1){
                return false;
            }
            cityData = global.mapList[provinceIndex].children
            cityData
                ? this.setState({cityData: cityData, areaData: null})
                : this.getRegnListFn(item, provinceIndex)
        } else if(item.regnLvlCd == 2) {
            item.regnNm = "全"+item.regnNm
            let provinceIndex = null, cityIndex = null, areaData = null
            provinceIndex = this.findIndex(global.mapList, item.suprRegnCode)
            if(!provinceIndex || provinceIndex === -1){
                return false;
            }
            cityIndex = this.findIndex(global.mapList[provinceIndex].children, item.regnCode)
            if(!cityIndex || cityIndex === -1){
                return false;
            }
            areaData = global.mapList[provinceIndex].children[cityIndex].children
            areaData
                ? this.setState({areaData: areaData})
                : this.getRegnListFn(item, provinceIndex, cityIndex)
        }
    }

    getRegnListFn(item, provinceIndex, cityIndex){
        // 传出去 item.regnCode 获取对应下级的数据
        getRegnList({
            suprRegnCode: item.regnCode,
            success: data => {
                data.unshift(item)
                if(item.regnLvlCd == -1) {
                    this.setState({provinceData: data})
                    global.mapList = data
                } else if(item.regnLvlCd == 1) {
                    this.setState({cityData: data, areaData: null})
                    global.mapList[provinceIndex].children = data
                } else if(item.regnLvlCd == 2) {
                    this.setState({areaData: data})
                    global.mapList[provinceIndex].children[cityIndex].children = data
                }
            },
            error: error => this.toast.show('获取区域失败')
        })
    }

    findIndex(_array, _code, _data){
        return _array && _array.findIndex((i) => (i.regnCode === _code))
    }

    onClick(__item) {
        if(__item.isSelectable || __item.regnLvlCd == 3) {
            let selectedProvince = this.state.selectedProvince,
                selectedCity = this.state.selectedCity
            if (__item.regnLvlCd == 3) {
                this.props.onClose
                    && this.props.onClose(__item, selectedProvince, selectedCity, __item)
            } else if(__item.regnLvlCd == 2) {
                this.props.onClose
                    && this.props.onClose(__item, selectedProvince, __item)
            } else {
                this.props.onClose
                    && this.props.onClose(__item, __item)
            }
        } else {
            if (__item.regnLvlCd == 2) {
                this.setState({selectedCity: __item}, ()=>this.getData(__item))
            } else {
                this.setState({selectedProvince: __item}, ()=>this.getData(__item))
            }
        }
    }

    _renderItem(_item, _selected) {
        let isAllSelect = _item.isSelectable
        let isSelected = _selected 
            && _selected.regnCode === _item.regnCode
        return <TouchableOpacity 
            onPress={() => this.onClick(_item)}
        >
            <View style={styles.itemWarp}>
                <Text numberOfLines={1} style={[
                    styles.title, 
                    isAllSelect && {color: "#888"},
                    isSelected && {color: "#4A8EF2"}
                ]}>{_item.regnNm}</Text>
            </View>
        </TouchableOpacity>
    }
    render() {
        return <View style={styles.container}>
            <View style={[{backgroundColor: '#FFF'}, 
                this.state.cityData ? styles.listWarpSelected : styles.listWarpNormal
            ]}>
                <FlatList
                    ItemSeparatorComponent={ViewUtils.itemAllSeparatorComponent}
                    renderItem={({item}) => this._renderItem(item, this.state.selectedProvince)}
                    keyExtractor={(item, index) => item + index}
                    data={this.state.provinceData}
                />
            </View>
            {this.state.cityData 
                ? <View style = {[{backgroundColor: '#FAFAFA'},
                    this.state.areaData ? styles.listWarpSelected : styles.listWarpNormal
                ]}>
                    <FlatList
                        ItemSeparatorComponent={ViewUtils.itemAllSeparatorComponent}
                        renderItem={({item}) => this._renderItem(item, this.state.selectedCity)}
                        keyExtractor={(item, index) => item + index}
                        data={this.state.cityData}
                    />
                </View>
                : null
            }
            {this.state.areaData 
                ? <View style = {[{backgroundColor: '#F5F6F9'}, styles.listWarpNormal]}>
                    <FlatList
                        ItemSeparatorComponent={ViewUtils.itemAllSeparatorComponent}
                        renderItem={({item}) => this._renderItem(item, this.state.selectedArea)}
                        keyExtractor={(item, index) => item + index}
                        data={this.state.areaData}
                    />
                </View>
                : null
            }
            <Toast ref={toast => this.toast = toast} />
        </View>
    }
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', flex: 1},
    listWarpNormal: {flex: 1},
    listWarpSelected: {width: '25%',},
    itemWarp: {padding: 15, flexDirection: "row", alignItems: "center", justifyContent: 'space-between'},
    title: {flex: 1, color: "#333", fontSize: 15},
});