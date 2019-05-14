import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    View
} from 'react-native';

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
        getQRcodeForOnline({success: ({result}) => {
            this.setState({QRcodeForOnline: `data:image/png;base64,${result[0].imgbase64}`})
        }})
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
                    onPress={() => GlobalToast.show('功能建设中...')}
                >
                    <Image source={Images.sharePage.wechat} />
                    <Text style={styles.buttonTxt}>推荐给微信好友</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => GlobalToast.show('功能建设中...')}
                >
                    <Image source={Images.sharePage.friends} />
                    <Text style={styles.buttonTxt}>分享到朋友圈</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}