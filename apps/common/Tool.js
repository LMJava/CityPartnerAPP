import React, { Component } from 'react'
import {
    Dimensions,
    Platform,
    StatusBar,
    DeviceEventEmitter,
    Alert,
    Linking
} from 'react-native';
// import DeviceInfo from 'react-native-device-info'
// import { getToken, getAllURL, checkOutVersion } from "./NetManager";

const Realm = require('realm');
const UserSchema = {
    name: 'APPData',
    primaryKey: 'key',
    properties: {
        key: 'string',
        value: 'string',
    }
};

export default class Tool {

    static statusBar(dark) {
        return <StatusBar
            backgroundColor={'transparent'}
            translucent={true}
            barStyle={dark ? "dark-content" : "light-content"}
            animated={true}
        />
    }

    static isIphoneX() {
        let dimen = Dimensions.get('window');
        if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
            (dimen.height === 812 || dimen.width === 812)) {
            return true;
        }
        return false;

    }

    static setItem(key, value, callBack) {
        Realm.open({
            schema: [UserSchema]
        }).then(realm => {
            realm.write(() => {
                realm.create("APPData", { key: key, value: value }, true)
                callBack && callBack()
            });
        });
    }

    static getItem(key, callBack) {
        Realm.open({
            schema: [UserSchema]
        }).then(realm => {
            // let filtered = " key ==  " + '"' + key + '"'
            let filtered = ' key ==  "' + key + '"'
            let item = realm.objects("APPData").filtered(filtered);
            if (item.length > 0) {
                callBack && callBack(item[0].value)
            } else {
                callBack && callBack()
            }

        });

    }
    static removeItem(key) {
        Realm.open({
            schema: [UserSchema]
        }).then(realm => {
            realm.write(() => {
                // let filtered = " key ==  " + '"' + key + '"'
                let filtered = ' key ==  "' + key + '"'
                let item = realm.objects("APPData").filtered(filtered);
                realm.delete(item);
            })

        });
    }
    //     static getRequestHeader(callBack) {
    //         var headerData = {};
    //         headerData["Content-Type"] = 'application/json;charset=utf-8'
    //         if (global.DeviceInfo) {
    //             global.DeviceInfo.GPS = global.region ? global.region : '';
    //             headerData['deviceInfos'] = encodeURI(JSON.stringify(global.DeviceInfo));
    //         }

    //         if (access_auth) {
    //             let access_token = access_auth.access_token;
    //             let expired_in = access_auth.expired_in;
    //             var startTime = new Date(expired_in.replace("//-/g", "//"));
    //             if (new Date() > startTime) {
    //                 //如果失效超时，调用接口获取
    //                 getToken({
    //                     success: data => {
    //                         headerData["authorization"] = data.access_token;
    //                         callBack && callBack(headerData)
    //                     },
    //                     error :error =>{
    //                         callBack && callBack(headerData)
    //                     }
    //                 })
    //             } else {
    //                 //如果失效没有超时，使用当前token
    //                 headerData["authorization"] = access_auth.access_token;
    //                 callBack && callBack(headerData)
    //             }

    //         } else {
    //             //如果没存储，调用接口获取
    //             getToken({
    //                 success: data => {
    //                     headerData["authorization"] = data.access_token;
    //                     callBack && callBack(headerData)
    //                 },
    //                 error: error => {
    //                     callBack && callBack(headerData)
    //                 }
    //             })
    //         }

    //     }
    //     //获取舆情详情页链接
    //     static getInformationDetailUrl(callBack) {
    //         if (urlData) {
    //             let array = urlData.filter((a, b) => { return a.dataId == 4 })//舆情详情
    //             if (array.length > 0) {
    //                 let item = array[0];
    //                 let url = item.dataName;
    //                 callBack && callBack(url)
    //             } else {
    //                 GlobalToast.show("获取连接失败")
    //             }
    //         } else {
    //             getAllURL({
    //                 success: data => {
    //                     let array = data.filter((a, b) => { return a.dataId == 4 })//舆情详情
    //                     if (array.length > 0) {
    //                         let item = array[0];
    //                         let url = item.dataName;
    //                         callBack && callBack(url)
    //                     } else {
    //                         GlobalToast.show("获取连接失败")
    //                     }
    //                 }
    //             })
    //         }
    //     }
    //     //获取订单页链接
    //     static getOrderDetailUrl(callBack) {
    //         if (urlData) {
    //             let array = urlData.filter((a, b) => { return a.dataId == 2 })//订单详情
    //             if (array.length > 0) {
    //                 let item = array[0];
    //                 let url = item.dataName;
    //                 callBack && callBack(url)
    //             } else {
    //                 GlobalToast.show("获取连接失败")
    //             }
    //         } else {
    //             getAllURL({
    //                 success: data => {
    //                     let array = data.filter((a, b) => { return a.dataId == 2 })//订单详情
    //                     if (array.length > 0) {
    //                         let item = array[0];
    //                         let url = item.dataName;
    //                         callBack && callBack(url)
    //                     } else {
    //                         GlobalToast.show("获取连接失败")
    //                     }
    //                 }
    //             })
    //         }
    //     }
    //     // 获取产品详情页链接

    //     static getRecommendProductUrl(callBack) {
    //         callBack && callBack();
    //         // if (urlData) {
    //         //     let array = urlData.filter((a, b) => { return a.dataId == 2 })//订单详情
    //         //     if (array.length > 0) {
    //         //         let item = array[0];
    //         //         let url = item.dataName;
    //         //         callBack && callBack(url)
    //         //     } else {
    //         //         GlobalToast.show("获取连接失败")
    //         //     }
    //         // } else {
    //         //     getAllURL({
    //         //         success: data => {
    //         //             let array = data.filter((a, b) => { return a.dataId == 2 })//订单详情
    //         //             if (array.length > 0) {
    //         //                 let item = array[0];
    //         //                 let url = item.dataName;
    //         //                 callBack && callBack(url)
    //         //             } else {
    //         //                 GlobalToast.show("获取连接失败")
    //         //             }
    //         //         }
    //         //     })
    //         // }
    //     }

    //     static setGlobalRegion(_regnNm, _regnCode, _suprRegnCode) {
    //         if (!_regnNm || !_regnCode || !_suprRegnCode) {
    //             GlobalToast.show('缺失定位信息，无法完成设置')
    //             return false
    //         } else {
    //             global.region = {
    //                 regnNm: _regnNm,
    //                 regnCode: _regnCode,
    //                 suprRegnCode: _suprRegnCode
    //             }
    //             // global.mapList = null
    //             DeviceEventEmitter.emit("LOCATION_STATE");
    //             return true
    //         }
    //     }
    //     /**
    //      * @static
    //      * @param {any} _mode 如果有此参数则为隐式调用，通过则不提示
    //      * @memberof checkUpdateFn
    //      */
    //     static UpdateVersion(_mode) {
    //         let appVersion = DeviceInfo.getVersion();
    //         checkOutVersion({
    //             success: (data) => {
    //                 // 全局变量 下载地址
    //                 global.downLoadLink = data.downloadLink;
    //                 switch (compareVersion(appVersion, data.version)) {
    //                     case 1:
    //                     case 2:
    //                         if(_mode) {
    //                             return null;
    //                         } else {
    //                             Alert.alert("提示", "已经是最新版本");
    //                         }
    //                         break;
    //                     case 3:
    //                         Alert.alert("提示", "您当前不是最新版本", [
    //                             { text: "暂不下载" },
    //                             {
    //                                 text: "下载最新版本",
    //                                 onPress: () => {
    //                                     Linking.openURL(data.downloadLink).catch(err => {
    //                                         Alert.alert("提示", "打开浏览器失败")
    //                                     })
    //                                 }
    //                             }
    //                         ], { cancelable: false });
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             },
    //             error: data => {
    //                 global.GlobalToast
    //                     && global.GlobalToast.show("获取版本信息失败")
    //             }
    //         })
    //     }
}

// // v1为当前app版本，v2为从服务器获取到的app版本
// const compareVersion = (v1, v2) => {
//     let _a = toNum(v1);
//     let _b = toNum(v2);
//     // alert(`${_a} + ${_b}`);
//     // 1 版本相同，2 第一个值为新版本， 3 第二个值是新版本
//     if (_a === _b) return 1;
//     if (_a > _b) return 2;
//     if (_a < _b) return 3;
// };
// /*
// 版本号转换成数字
// 假定字符串的每节数都在5位以下
// */
// const toNum = (a) => {
//     let _a = a.toString();
//     //也可以这样写 var c=a.split(/\./);
//     let c = _a.split('.');
//     let num_place = ["", "0", "00", "000", "0000"];
//     let r = num_place.reverse();
//     for (let i = 0; i < c.length; i++) {
//         let len = c[i].length;
//         c[i] = r[len] + c[i];
//     }
//     return c.join('');
// };
