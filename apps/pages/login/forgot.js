
import React, { Component } from 'react';
import { 
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class Forgot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNum: '',
            validNum: '',
            passwordNum: '',
            passwordHidden: true,
            confirmNum: '',
            confirmHidden: true
        }
    }

    render() {
        const {phoneNum, validNum, passwordNum, passwordHidden, confirmNum, confirmHidden} = this.state
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
                        onChangeText={phoneNum => {
                            this.setState({ phoneNum })
                        }}
                    />
                </View>
                <View>
                    <View style={styles.inputWrap}>
                        <Image source={Images.login.chkcode} />
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            placeholder='请输入验证码'
                            placeholderTextColor='#B2B2B2'
                            keyboardType="numeric"
                            clearButtonMode={'while-editing'}
                            value={validNum}
                            onChangeText={validNum => {
                                this.setState({ validNum })
                            }}
                        />
                    </View>
                </View>
                <View style={styles.inputWrap}>
                    <Image source={Images.login.pwd} />
                    <TextInput
                        secureTextEntry={passwordHidden}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder='请输入新密码'
                        placeholderTextColor='#B2B2B2'
                        value={passwordNum}
                        onChangeText={passwordNum => {
                            this.setState({ passwordNum })
                        }}
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
                        onChangeText={confirmNum => {
                            this.setState({ confirmNum })
                        }}
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
                    onPress={() => {}}
                    style={styles.submit}
                >
                    <Text style={styles.submitTxt}>提交重置</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}
