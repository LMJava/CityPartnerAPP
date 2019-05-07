import React, { Component } from 'react';
import { 
    Image,
    TouchableWithoutFeedback,
    TextInput,
    Text, 
    ScrollView,
    View
} from 'react-native';

import HeaderBar from "../../../components/HeaderBar";
import ViewUtils from "../../../components/ViewUtils";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class AddPartner extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (<HeaderBar
            title={"添加渠道"}
            leftButton={true}
            navigation={navigation}
            rightButton={ViewUtils.getTabBtn(
                '提交',
                () => {
                    GlobalToast.show('提交')
                }
            )}
        />)
    })
    constructor(props) {
        super(props)
        this.state = {
            phoneNum: '', 
            cardNum: '', 
            nameTxt: '', 
            sexVal: '1',
            ageNum: '', 
            cityTxt: '', 
            addrTxt: ''
        }
    }

    onChecked = (sexVal) => {
        this.setState({sexVal})
    }
    render() {
        let {phoneNum, cardNum, nameTxt, sexVal, ageNum, cityTxt, addrTxt} = this.state
        return <ScrollView style={styles.addPromoterWrap}>
            <View style={styles.inputWrap}>
                <Image source={Images.pho} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='请输入手机号码'
                    placeholderTextColor='#999'
                    value={phoneNum}
                    onChangeText={phoneNum => {
                        this.setState({ phoneNum })
                    }}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.card} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='身份证号码'
                    placeholderTextColor='#999'
                    value={cardNum}
                    onChangeText={cardNum => {
                        this.setState({ cardNum })
                    }}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.name} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='姓名'
                    placeholderTextColor='#999'
                    value={nameTxt}
                    onChangeText={nameTxt => {
                        this.setState({ nameTxt })
                    }}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.sex} />
                <View style={GlobalStyles.radioWrap}>
                    <TouchableWithoutFeedback onPress={() => this.onChecked('1')}>
                        <View style={GlobalStyles.radioContent}>
                            <Image source={sexVal === '1'
                                ? Images.login.iconChked
                                : Images.login.iconChk
                            } style={GlobalStyles.radioImg} />
                            <Text style={GlobalStyles.radioTxt}>男</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.onChecked('0')}>
                        <View style={GlobalStyles.radioContent}>
                            <Image source={sexVal === '0'
                                ? Images.login.iconChked
                                : Images.login.iconChk
                            } style={GlobalStyles.radioImg} />
                            <Text style={GlobalStyles.radioTxt}>女</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.age} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='年龄'
                    placeholderTextColor='#999'
                    value={ageNum}
                    onChangeText={ageNum => {
                        this.setState({ ageNum })
                    }}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.city} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='输入所属地市'
                    placeholderTextColor='#999'
                    value={cityTxt}
                    onChangeText={cityTxt => {
                        this.setState({ cityTxt })
                    }}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.addr} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='具体区域'
                    placeholderTextColor='#999'
                    value={addrTxt}
                    onChangeText={addrTxt => {
                        this.setState({ addrTxt })
                    }}
                />
            </View>
        </ScrollView>
    }
}