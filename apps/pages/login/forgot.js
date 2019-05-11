
import React, { Component } from 'react';
import { 
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    View
} from 'react-native';

import { sendvcode, resetPassword } from "../../common/AppFetch";
import ViewUtils from "../../components/ViewUtils";
import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class Forgot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNum: '',
            smsVCode: '',
            validTxt: '获取验证码',
            waiting: false,
            newPassword: '',
            passwordHidden: true,
            confirmNum: '',
            confirmHidden: true
        }
    }
    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
        this.timer && clearTimeout()(this.timer);
        Keyboard.dismiss();
    }
    onResetPassword = () => {
        const {phoneNum, smsVCode, newPassword, confirmNum} = this.state
        if (phoneNum === '') {
            GlobalToast && GlobalToast.show('手机号为空')
        } else if (!ViewUtils.phoneisValid(phoneNum)) {
            GlobalToast && GlobalToast.show("请输入有效手机号码")
            return false
        } else if(newPassword === '' || confirmNum === '') {
            GlobalToast && GlobalToast.show("请输入密码")
            return false
        } else if(newPassword !== confirmNum) {
            GlobalToast && GlobalToast.show("两次输入密码不一致")
            return false
        } else {
            resetPassword({
                telephone: phoneNum,
                smsVCode,
                newPassword,
                success: data => {
                    GlobalToast && GlobalToast.show('您的密码已重置')
                    this.timer = setTimeout(() => {
                        this.props.navigation.goBack(null)
                    }, 1000);
                },
                error: err => {
                    GlobalToast && GlobalToast.show("err"+JSON.stringify(err))
                }
            })
        }
    }
    onSendvcode = () => {
        const {phoneNum} = this.state
        if (phoneNum === '') {
            GlobalToast && GlobalToast.show('手机号为空')
        } else if (ViewUtils.phoneisValid(phoneNum)) {
            sendvcode({
                phoneNum,
                success: data => {
                    GlobalToast && GlobalToast.show('验证码已发送')
                    this.timeNum = 60
                    this.setState({ waiting: true });
                    this.interval = setInterval(() => {
                        this.setState({
                            validText: `${this.timeNum}秒后重新获取`
                        })
                        this.timeNum--
                        if (this.timeNum <= 0) {
                            clearInterval(this.interval)
                            this.setState({
                                validText: '重新获取',
                                waiting: false,
                            })
                        }
                    }, 1000);
                },
                error: err => {
                    GlobalToast && GlobalToast.show("err"+JSON.stringify(err))
                }
            })
        } else {
            GlobalToast && GlobalToast.show('请输入有效手机号码')
        }
    }
    render() {
        const {phoneNum, smsVCode, validTxt, waiting, newPassword, passwordHidden, confirmNum, confirmHidden} = this.state
        return <View style={GlobalStyles.root_container}>
            <View style={[styles.formWrap, {marginTop: 42}]}>
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
                <View style={styles.vcode}>
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
                        onPress={this.onSendvcode}
                    >
                        <Text style={waiting ? styles.vcodeTxtD : styles.vcodeTxtA}>{validTxt}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWrap}>
                    <Image source={Images.login.pwd} />
                    <TextInput
                        secureTextEntry={passwordHidden}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='请输入新密码'
                        placeholderTextColor='#B2B2B2'
                        value={newPassword}
                        onChangeText={newPassword => this.setState({ newPassword })}
                    />
                    <TouchableWithoutFeedback onPress={() => this.setState({passwordHidden: !passwordHidden})}>
                        <View style={{padding: 13}}>
                            <Image source={passwordHidden 
                                ? Images.login.eye
                                : Images.login.eye1
                            } />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.inputWrap}>
                    <Image source={Images.login.pwd} />
                    <TextInput
                        secureTextEntry={confirmHidden}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='请再次输入新密码'
                        placeholderTextColor='#B2B2B2'
                        value={confirmNum}
                        onChangeText={confirmNum => this.setState({ confirmNum })}
                    />
                    <TouchableWithoutFeedback onPress={() => this.setState({confirmHidden: !confirmHidden})}>
                        <View style={{padding: 13}}>
                            <Image source={confirmHidden 
                                ? Images.login.eye
                                : Images.login.eye1
                            } />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity
                    onPress={this.onResetPassword}
                    style={styles.submit}
                >
                    <Text style={styles.submitTxt}>提交重置</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}
