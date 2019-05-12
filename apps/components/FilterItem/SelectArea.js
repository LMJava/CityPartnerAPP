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

import {
    queryProvinces,
    queryCities,
    queryAreas
} from '../../common/AppFetch'

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
            if(province) {
                let provinceIndex = null
                provinceIndex = this.findIndex('province', provinceData, province)
                if(!provinceIndex || provinceIndex === -1){
                    return false;
                }
                this.setState({cityData: provinceData[provinceIndex].children}, () => {
                    let cityData = this.state.cityData,
                        city = this.props.selectedCity
                    // 判断有选择区县且不为默认时
                    if(city) {
                        let cityIndex = null
                        cityIndex = this.findIndex('city', cityData, city)
                        if(!cityIndex || cityIndex === -1){
                            return false;
                        }
                        this.setState({areaData: cityData[cityIndex].children})
                    }
                })
            }
        })
        : this.getData()
    }

    getData(_item = {}){
        if(_item.cityid) {
            let provinceIndex = -1, cityIndex = -1, areaData = null
            provinceIndex = this.findIndex('provinceid', global.mapList, _item.provinceid)
            if(provinceIndex === -1){
                return false;
            }
            cityIndex = this.findIndex('cityid', global.mapList[provinceIndex].children, _item.cityid)
            if(cityIndex === -1){
                return false;
            }
            areaData = global.mapList[provinceIndex].children[cityIndex].children
            areaData
                ? this.setState({areaData: areaData})
                : this.getRegnListFn(_item, provinceIndex, cityIndex)
                // 获取县
        }else if(_item.provinceid) {
            let provinceIndex = -1, cityData = null
            provinceIndex = this.findIndex('provinceid', global.mapList, _item.provinceid)
            if(provinceIndex === -1){
                return false;
            }
            cityData = global.mapList[provinceIndex].children
            cityData
                ? this.setState({cityData: cityData, areaData: null})
                : this.getRegnListFn(_item, provinceIndex)
                // 获取市
        } else {
            // 获取省
            this.getRegnListFn({})
        } 
    }

    getRegnListFn(item, provinceIndex, cityIndex){
        // 传出去 item.regnCode 获取对应下级的数据
        if(item.cityid) {
            queryAreas({
                cityid: item.cityid,
                success: (result) => {
                    this.setState({areaData: result})
                    global.mapList[provinceIndex].children[cityIndex].children = result
                },
                error: () => {
                    const {selectedProvince, selectedCity} = this.state
                    this.props.onClose
                        && this.props.onClose(selectedProvince, selectedCity)
                    GlobalToast.show('获取区县失败')
                }
            })
        } else if(item.provinceid) {
            queryCities({
                provinceid: item.provinceid,
                success: (result) => {
                    this.setState({cityData: result, areaData: null})
                    global.mapList[provinceIndex].children = result
                },
                error: () => {
                    const {selectedProvince} = this.state
                    this.props.onClose
                        && this.props.onClose(selectedProvince)
                    GlobalToast.show('获取地市失败')
                }
            })
        } else {
            queryProvinces({
                success: (result) => {
                    this.setState({provinceData: result})
                    global.mapList = result
                },
                error: () => {
                    this.props.onClose
                        && this.props.onClose()
                    GlobalToast.show('获取省份失败')
                }
            })
        }
    }

    findIndex(_key, _array, _code){
        return _array.length 
            ? _array.findIndex((i) => (i[_key] == _code))
            : -1
    }

    onClick(__item) {
        const {selectedProvince, selectedCity} = this.state
        if(__item.areaid) {
            this.props.onClose
                && this.props.onClose(selectedProvince, selectedCity, __item.area)
        } else if(__item.cityid) {
            this.setState({selectedCity: __item.city}, () => this.getData(__item))
        } else {
            this.setState({selectedProvince: __item.province}, ()=>this.getData(__item))
        }
    }

    _renderItem(_key, _item, _selected) {
        let isSelected = _selected 
            && _selected === _item[_key]
        return <TouchableOpacity style={styles.itemWarp} onPress={() => this.onClick(_item)}>
            <Text numberOfLines={1} style={[
                styles.title, 
                isSelected && {color: "#888"}
            ]}>{_item[_key]}</Text>
        </TouchableOpacity>
    }
    render() {
        return <View style={styles.container}>
            <View style={[{backgroundColor: '#FFF'}, 
                this.state.cityData ? styles.listWarpSelected : styles.listWarpNormal
            ]}>
                <FlatList
                    ItemSeparatorComponent={ViewUtils.itemAllSeparatorComponent}
                    renderItem={({item}) => this._renderItem('province', item, this.state.selectedProvince)}
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    data={this.state.provinceData}
                />
            </View>
            {this.state.cityData 
                ? <View style = {[{backgroundColor: '#FAFAFA'},
                    this.state.areaData ? styles.listWarpSelected : styles.listWarpNormal
                ]}>
                    <FlatList
                        ItemSeparatorComponent={ViewUtils.itemAllSeparatorComponent}
                        renderItem={({item}) => this._renderItem('city', item, this.state.selectedCity)}
                        keyExtractor={(item, index) => `${index} - ${item}`}
                        data={this.state.cityData}
                    />
                </View>
                : null
            }
            {this.state.areaData 
                ? <View style = {[{backgroundColor: '#F5F6F9'}, styles.listWarpNormal]}>
                    <FlatList
                        ItemSeparatorComponent={ViewUtils.itemAllSeparatorComponent}
                        renderItem={({item}) => this._renderItem('area', item, this.state.selectedArea)}
                        keyExtractor={(item, index) => `${index} - ${item}`}
                        data={this.state.areaData}
                    />
                </View>
                : null
            }
        </View>
    }
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', flex: 1},
    listWarpNormal: {flex: 1},
    listWarpSelected: {width: '30%',},
    itemWarp: {padding: 15, flexDirection: "row", alignItems: "center", justifyContent: 'space-between'},
    title: {flex: 1, color: "#333", fontSize: 15},
});