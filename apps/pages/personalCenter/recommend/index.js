import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    View
} from 'react-native';
import * as WeChat from 'react-native-wechat'

import { getQRcodeForOnline } from "../../../common/AppFetch";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            QRcodeForOnline: null
        }
    }

    componentDidMount() {
        WeChat.registerApp('wxb0e63aa3797f5982')
        getQRcodeForOnline({success: ({result}) => {
            this.setState({QRcodeForOnline: `data:image/png;base64,${result[0].imgbase64}`})
        }})
    }

    shareToWX = (type) => {
        WeChat.isWXAppInstalled().then( isInstalled => {
            if ( isInstalled ) {
                if (type === 1) {
                    WeChat.shareToSession({
                        type: 'text', description: '测试微信好友分享的文本内容'
                    }).then((requestJson)=>{
                        if (requestJson.errCode == "0"){
                            GlobalToast.show('分享成功')
                        }
                        GlobalToast.show('分享失败')
                    }).catch((err)=>{
                        GlobalToast.show('分享失败')
                    })
                }else {
                    WeChat.shareToTimeline({
                        type: 'text', description: '测试微信朋友圈分享的文本内容'
                    }).then((requestJson)=>{
                        if (requestJson.errCode == "0"){
                            GlobalToast.show('分享成功')
                        }
                        GlobalToast.show('分享失败')
                    }).catch((err)=>{
                        GlobalToast.show('分享失败')
                    })
                }
            } else {
                GlobalToast.show('没有安装微信软件，请您安装微信之后再试')
            }
        });
    }
    render() {
        const {QRcodeForOnline} = this.state
        return <View style={GlobalStyles.root_container}>
            <View style={[GlobalStyles.root_container, styles.bgImageWrap]}>
                <ImageBackground
                    resizeMode={'contain'} 
                    source={Images.sharePage.shareBg} 
                    style={styles.bgImage}
                >
                    <View style={{padding: 10, backgroundColor: '#FFF'}}>
                        <Image 
                            source={QRcodeForOnline ? { uri: QRcodeForOnline } : null} 
                            style={{width: 140, height: 140}}
                        />
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.shareToWX(1)}
                >
                    <Image source={Images.sharePage.wechat} />
                    <Text style={styles.buttonTxt}>推荐给微信好友</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.shareToWX(2)}
                >
                    <Image source={Images.sharePage.friends} />
                    <Text style={styles.buttonTxt}>分享到朋友圈</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}