import React, { Component } from 'react';
import { 
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground,
    Keyboard,
    ScrollView,
    View
} from 'react-native';

import { connect, actions } from '../../store/combin';
import { sendLoginSms, login } from "../../common/AppFetch";
import ViewUtils from "../../components/ViewUtils";
import Tool from "../../common/Tool";
import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            radioValue: 1,
            phoneNum: '', // T 18860383800
            smsVCode: '屏蔽',
            validTxt: '获取验证码',
            waiting: false,
            passwordNum: '', // T 000000
            passwordHidden: true
        }
    }
    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
        Keyboard.dismiss();
    }
    onSubmit = () => {
        const {radioValue, phoneNum, smsVCode, passwordNum} = this.state
        if(!radioValue) {
            GlobalToast.show("请选择角色")
        } else if(phoneNum === '') {
            GlobalToast.show("请输入手机号")
        } else if(!ViewUtils.phoneisValid(phoneNum)) {
            GlobalToast.show("请输入有效手机号码")
        } else if(smsVCode === '') {
            GlobalToast.show("请输入验证码")
        } else if(passwordNum === '') {
            GlobalToast.show("请输入密码")
        } else {
            login({ radioValue, phoneNum, smsVCode, passwordNum,
                success: ({result}) => {
                    this.props.addUser(result[0])
                }
            })
        }
    }

    onSendLoginSms = () => {
        const {phoneNum} = this.state
        if (phoneNum === '') {
            GlobalToast.show('手机号为空')
        } else if (ViewUtils.phoneisValid(phoneNum)) {
            sendLoginSms({
                phoneNum,
                success: () => {
                    GlobalToast.show('验证码已发送')
                    this.timeNum = 60
                    this.setState({ waiting: true });
                    this.interval = setInterval(() => {
                        this.setState({
                            validTxt: `${this.timeNum}秒后重新获取`
                        })
                        this.timeNum--
                        if (this.timeNum <= 0) {
                            clearInterval(this.interval)
                            this.setState({
                                validTxt: '重新获取',
                                waiting: false,
                            })
                        }
                    }, 1000);
                },
                error: err => {
                    GlobalToast.show("err"+JSON.stringify(err))
                }
            })
        } else {
            GlobalToast.show('请输入有效手机号码')
        }
    }


    onChecked = (radioValue) => this.setState({radioValue})
    render() {
        const {radioValue, phoneNum, smsVCode, validTxt, waiting, passwordNum, passwordHidden} = this.state
        return <ScrollView style={GlobalStyles.root_container}>
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
                    <TouchableWithoutFeedback onPress={() => this.onChecked(1)}>
                        <View style={styles.radioContent}>
                            <Image source={radioValue === 1
                                ? Images.login.iconChked
                                : Images.login.iconChk
                            } style={GlobalStyles.radioImg} />
                            <Text style={GlobalStyles.radioTxt}>我是合伙人</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.onChecked(2)}>
                        <View style={styles.radioContent}>
                            <Image source={radioValue === 2
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
                        onChangeText={phoneNum => this.setState({ phoneNum })}
                    />
                </View>
                {/*<View style={styles.vcode}>
                    <View style={[styles.inputWrap, {flex: 1}]}>
                        <Image source={Images.login.chkcode} />
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            placeholder='请输入验证码'
                            placeholderTextColor='#B2B2B2'
                            keyboardType="numeric"
                            clearButtonMode={'while-editing'}
                            value={smsVCode}
                            onChangeText={smsVCode => this.setState({ smsVCode })}
                        />
                    </View>
                    <TouchableOpacity 
                        style={[styles.vcodeBtn, waiting ? styles.vcodeBtnD : styles.vcodeBtnA]}
                        disabled={waiting}
                        onPress={this.onSendLoginSms}
                    >
                        <Text style={waiting ? styles.vcodeTxtD : styles.vcodeTxtA}>{validTxt}</Text>
                    </TouchableOpacity>
                </View>*/}
                <View style={styles.inputWrap}>
                    <Image source={Images.login.pwd} />
                    <TextInput
                        secureTextEntry={passwordHidden}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='请输入密码'
                        placeholderTextColor='#B2B2B2'
                        value={passwordNum}
                        onChangeText={passwordNum => this.setState({ passwordNum })}
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
                    onPress={this.onSubmit}
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
        </ScrollView>
    }
}
export default connect(
    () => ({}), {
        addUser: actions.User.addUser
    }
)(Login);