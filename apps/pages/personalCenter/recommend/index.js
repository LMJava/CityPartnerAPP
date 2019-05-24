import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    View
} from 'react-native';
import * as WeChat from 'react-native-wechat'

import { connect, actions } from '../../../store/combin';
import { getQRcodeForOnline } from "../../../common/AppFetch";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"

class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            QRcodeForOnline: null
        }
    }

    componentDidMount() {
        const Login = {...this.props.Login}
        WeChat.registerApp('wxb0e63aa3797f5982')
        if(Login.QRcodeForOnline) {
            this.setState({QRcodeForOnline: `data:image/png;base64,${Login.QRcodeForOnline}`})
        } else {
            getQRcodeForOnline({success: ({result}) => {
                Login.QRcodeForOnline = result[0].imgbase64
                this.props.addLogin(Login)
                this.setState({QRcodeForOnline: `data:image/png;base64,${result[0].imgbase64}`})
            }})
        }
    }

    shareToWX = (type) => {
        WeChat.isWXAppInstalled().then( isInstalled => {
            if ( isInstalled ) {
                const config = {
                    type: 'news', 
                    title: '车主云微ETC来了，限时办理送199红包！',
                    description: '极速办理微ETC，高速不排队还享9.5折，绑微信支付先通行后付费，免OBU设备费，限时开通赠送199红包，还可定期领取红包！',
                    webpageUrl: 'https://www.pgyer.com/IAEP',
                    mediaTagName: '车主云微ETC',
                    messageAction: undefined,
                    messageExt: undefined
                }
                // 
                if (type === 1) {
                    WeChat.shareToSession(config).then((requestJson)=>{
                        if (requestJson.errCode == "0"){
                            GlobalToast.show('分享给好友成功')
                        }
                    }).catch((err)=>{
                        GlobalToast.show('分享给好友失败')
                    })
                }else {
                    WeChat.shareToTimeline(config).then((requestJson)=>{
                        if (requestJson.errCode == "0"){
                            GlobalToast.show('分享朋友圈成功')
                        }
                    }).catch((err)=>{
                        GlobalToast.show('分享朋友圈失败')
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
export default connect(
    (state) => {
        return { 
            Login: state.Login
        };
    },{
        addLogin: actions.Login.addLogin
    }
)(Recommend);