import React, { Component } from 'react';
import { 
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground,
    View
} from 'react-native';

import Tool from "../../common/Tool";
import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            radioValue: 'partner',
            phoneNum: '',
            passwordNum: '',
            passwordHidden: true
        }
    }
    onChecked = (radioValue) => {
        this.setState({radioValue})
    }
    render() {
        const {radioValue, phoneNum, passwordNum, passwordHidden} = this.state
        return <View style={GlobalStyles.root_container}>
            {Tool.statusBar()}
            <ImageBackground 
                resizeMode={'stretch'} 
                source={Images.login.loginBg} 
                style={styles.headerBGImage}
            >
                <Text style={styles.headerTit}>微ETC</Text>
                <Text style={styles.headerMsg}>合伙人版</Text>
            </ImageBackground>
            
            <View style={styles.formWrap}>
                <View style={styles.radioWrap}>
                    <TouchableWithoutFeedback onPress={() => this.onChecked('partner')}>
                        <View style={styles.radioContent}>
                            <Image source={radioValue === 'partner'
                                ? Images.login.iconChked
                                : Images.login.iconChk
                            } style={GlobalStyles.radioImg} />
                            <Text style={GlobalStyles.radioTxt}>我是合伙人</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.onChecked('promoter')}>
                        <View style={styles.radioContent}>
                            <Image source={radioValue === 'promoter'
                                ? Images.login.iconChked
                                : Images.login.iconChk
                            } style={GlobalStyles.radioImg} />
                            <Text style={GlobalStyles.radioTxt}>我是推广员</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.inputWrap}>
                    <Image source={Images.login.tel} />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='请输入手机号'
                        placeholderTextColor='#B2B2B2'
                        keyboardType="numeric"
                        clearButtonMode={'while-editing'}
                        value={phoneNum}
                        onChangeText={phoneNum => {
                            this.setState({ phoneNum })
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Image source={Images.login.pwd} />
                    <TextInput
                        secureTextEntry={passwordHidden}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='请输入密码'
                        placeholderTextColor='#B2B2B2'
                        value={passwordNum}
                        onChangeText={passwordNum => {
                            this.setState({ passwordNum })
                        }}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({passwordHidden: !passwordHidden})}
                    >
                        <View style={{padding: 13}}>
                            <Image source={passwordHidden 
                                ? Images.login.eye
                                : Images.login.eye1
                            } />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                        
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('TabNav')}
                    style={styles.submit}
                >
                    <Text style={styles.submitTxt}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Forgot')}
                    style={styles.forgot}
                >
                    <Text style={styles.forgotTxt}>忘记密码？</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}