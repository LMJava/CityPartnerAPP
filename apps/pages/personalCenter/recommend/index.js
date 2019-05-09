import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    View
} from 'react-native';

import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return <View style={GlobalStyles.root_container}>
            <View style={[GlobalStyles.root_container, styles.bgImageWrap]}>
                <ImageBackground
                    resizeMode={'contain'} 
                    source={Images.sharePage.shareBg} 
                    style={styles.bgImage}
                >
                    <Image source={Images.sharePage.miniProgram} />
                </ImageBackground>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {}}
                >
                    <Image source={Images.sharePage.wechat} />
                    <Text style={styles.buttonTxt}>推荐给微信好友</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {}}
                >
                    <Image source={Images.sharePage.friends} />
                    <Text style={styles.buttonTxt}>分享到朋友圈</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}