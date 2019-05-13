import React, { Component } from 'react';
import { 
    Image,
    TouchableWithoutFeedback,
    TextInput,
    Text, 
    ScrollView,
    Keyboard,
    View
} from 'react-native';
import Modal from 'react-native-modal'

import { addPromoters } from "../../../common/AppFetch";
import SelectArea from "../../../components/FilterItem/SelectArea";
import HeaderBar from "../../../components/HeaderBar";
import ViewUtils from "../../../components/ViewUtils";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"

let that = null
export default class AddPromoter extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (<HeaderBar
            title={"添加推广员"}
            leftButton={true}
            navigation={navigation}
            rightButton={ViewUtils.getTabBtn(
                '提交', () => that && that.onAddPromoter()
            )}
        />)
    })
    constructor(props) {
        super(props)
        that = this
        this.state = {
            isVisible: false,
            telephone: '', // T 18237137867
            cardId: '', // T 412724199504020311
            name: '', // T 刘猛
            sex: 1,
            age: '', // T 24
            province: '', // T 河南省
            city: '', // T 郑州市
            county: '', // T 高新区
            addrTxt: '' // T YX
        }
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        Keyboard.dismiss();
    }
    onAddPromoter = () => {
        const {telephone, cardId, name, sex, age, province, city, county, addrTxt} = this.state
        if (telephone === '') {
            GlobalToast.show('手机号不能为空')
        } else if (!ViewUtils.phoneisValid(telephone)) {
            GlobalToast.show("请输入有效手机号码")
        } else if(cardId === '') {
            GlobalToast.show('身份证号')
        } else if(!ViewUtils.IDCardisValid(cardId)) {
            GlobalToast.show("请输入有效身份证号码")
        } else if(name === '') {
            GlobalToast.show("姓名不能为空")
        } else if(age === '') {
            GlobalToast.show("年龄不能为空")
        } else if(province === '' || city === '' || county === '') {
            GlobalToast.show("所属区域不能为空")
        } else if(addrTxt === '') {
            GlobalToast.show("具体地址不能为空")
        } else {
            addPromoters({
                telephone, 
                cardId, 
                name, 
                sex,
                age, 
                province, 
                city, 
                county, 
                street: addrTxt,
                success: () => {
                    const params = this.props.navigation
                        && this.props.navigation.state
                        && this.props.navigation.state.params
                    GlobalToast.show('成功添加')
                    params.refresh && params.refresh()
                    this.timer = setTimeout(() => {
                        this.props.navigation.goBack(null)
                    }, 1000);
                }
            })
        }
    }
    onChecked = (sex) => {
        this.setState({sex})
    }
    // 传入bool控制弹窗显示（true）隐藏（false）
    toggle(flag) {this.setState({isVisible: flag})}
    render() {
        const {telephone, cardId, name, sex, age, province, city, county, addrTxt, isVisible} = this.state
        return <ScrollView style={styles.addPromoterWrap}>
            <View style={styles.inputWrap}>
                <Image source={Images.pho} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='请输入推广员手机号码'
                    placeholderTextColor='#999'
                    value={telephone}
                    onChangeText={telephone => this.setState({ telephone })}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.card} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='身份证号码'
                    placeholderTextColor='#999'
                    value={cardId}
                    onChangeText={cardId => this.setState({ cardId })}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.name} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='姓名'
                    placeholderTextColor='#999'
                    value={name}
                    onChangeText={name => this.setState({ name })}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.sex} />
                <View style={GlobalStyles.radioWrap}>
                    <TouchableWithoutFeedback onPress={() => this.onChecked(1)}>
                        <View style={GlobalStyles.radioContent}>
                            <Image source={sex === 1
                                ? Images.login.iconChked
                                : Images.login.iconChk
                            } style={GlobalStyles.radioImg} />
                            <Text style={GlobalStyles.radioTxt}>男</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.onChecked(2)}>
                        <View style={GlobalStyles.radioContent}>
                            <Image source={sex === 2
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
                    value={age}
                    onChangeText={age => this.setState({ age })}
                />
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.city} />
                <TouchableWithoutFeedback hitSlop={{top: 10, bottom: 10, left: 0, right: 0}} onPress={() => this.toggle(true)}>
                    {province
                        ? <Text style={styles.input}>{province+city+county}</Text>
                        : <Text style={[styles.input, {color: '#999'}]}>输入所属地市</Text>
                    }
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.inputWrap}>
                <Image source={Images.addr} />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder='具体区域'
                    placeholderTextColor='#999'
                    value={addrTxt}
                    onChangeText={addrTxt => this.setState({ addrTxt })}
                />
            </View>
            <Modal
                style={{margin: 0}}
                backdropColor={'transparent'}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                isVisible={isVisible}
                onBackdropPress={() => this.toggle(false)}
                onBackButtonPress={() => this.toggle(false)}
                avoidKeyboard
                propagateSwipe
            >
                <SelectArea
                    selectedProvince={province}
                    selectedCity={city}
                    selectedArea={county}
                    onClose={(_province = '', _city = '', _area = '') => {
                        this.setState({ 
                            province: _province, 
                            city: _city, 
                            county: _area
                        })
                        this.toggle(false)
                    }}
                />
            </Modal>
        </ScrollView>
    }
}