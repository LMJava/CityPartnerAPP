import React, { Component } from 'react';
import { 
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground,
    Keyboard,
    View
} from 'react-native';

import { connect, actions } from '../../store/combin';
import { login } from "../../common/AppFetch";
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
            phoneNum: '',
            passwordNum: '',
            passwordHidden: true
        }
    }
    componentWillUnmount() {
        Keyboard.dismiss();
    }
    onSubmit = () => {
        const {radioValue, phoneNum, passwordNum} = this.state
        if(!radioValue) {
            GlobalToast && GlobalToast.show("请选择角色")
            return false
        } else if(phoneNum === '') {
            GlobalToast && GlobalToast.show("请输入手机号")
            return false
        } else if(!ViewUtils.phoneisValid(phoneNum)) {
            GlobalToast && GlobalToast.show("请输入有效手机号码")
            return false
        } else if(passwordNum === '') {
            GlobalToast && GlobalToast.show("请输入密码")
            return false
        } else {
            login({ radioValue, phoneNum, passwordNum,
                success: data => {
                    GlobalToast && GlobalToast.show(JSON.stringify(data))
                    // this.props.addUser(data)
                    // this.props.navigation.navigate('TabNav')
                },
                error: err => {
                    GlobalToast && GlobalToast.show("err"+JSON.stringify(err))
                    // this.props.navigation.navigate('TabNav')
                }
            })
        }
    }



    onChecked = (radioValue) => this.setState({radioValue})
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
        </View>
    }
}
export default connect(
    () => ({}), {
        addUser: actions.User.addUser
    }
)(Login);