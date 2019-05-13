import React, { Component } from 'react';
import {
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Text, 
    View
} from 'react-native';
import Modal from 'react-native-modal'

import { 
    getOrderDetailsByPartner,
    auditOrder
} from "../../../common/AppFetch";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"


export default class UnreviewedDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderDetails: {},
            isVisible: false,
            noPassReasons: '',
            imageData: [{
                key: 'IdCard1',
                image: 'referidcardPostive',
                text: '身份证（人像面）',
                bg: Images.credentials.IdCard1
            }, {
                key: 'IdCard2',
                image: 'referidcardNegative',
                text: '身份证（国徽面）',
                bg: Images.credentials.IdCard2
            }, {
                key: 'DrivingPermit1',
                image: 'licenseMainPage',
                text: '行驶证（正页）',
                bg: Images.credentials.DrivingPermit1
            }, {
                key: 'DrivingPermit2',
                image: 'licenseVcePage',
                text: '行驶证（副页）',
                bg: Images.credentials.DrivingPermit2
            }],
            fastButtons: [
                {name: '证件不清楚', value: '证件不清楚'}, 
                {name: '拍照资料不完整', value: '拍照资料不完整'}, 
                {name: '姓名与证件信息不符', value: '姓名与证件信息不符'}, 
            ]
        }
    }
    componentDidMount() {
        const params = this.props.navigation
            && this.props.navigation.state
            && this.props.navigation.state.params
        getOrderDetailsByPartner({
            orderId: params.orderId,
            success: ({result}) => {
                this.setState({orderDetails: result[0]})
            }
        })
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    onAuditOrder = (auditResult) => {
        const {orderDetails, noPassReasons} = this.state
        let params = {
            orderId: orderDetails.orderId,
            auditResult
        }
        if(!orderDetails.orderId) {
            GlobalToast.show('无效数据')
            return false;
        }else if(auditResult === 2) {
            params.noPassReasons = noPassReasons
        }
        auditOrder({
            ...params,
            success: () => {
                GlobalToast.show('通过审核')
                this.props.refresh && this.props.refresh()
                this.timer = setTimeout(() => {
                    this.props.navigation.goBack(null)
                }, 1000);
            }
        })
    }
    onSubmit = () => {
        const {noPassReasons, } = this.state
        if(noPassReasons == '') {
            GlobalToast.show('请填写不通过原因')
            return false;
        }
        this.onAuditOrder(2)
        this.toggle(false)
    }
    // 传入bool控制弹窗显示（true）隐藏（false）
    toggle(flag) {this.setState({isVisible: flag})}
    render() {
        const {orderDetails, imageData, isVisible, noPassReasons, fastButtons} = this.state
        return <ScrollView style={GlobalStyles.root_container}>
            <View style={styles.detailMes}>
                <View style={styles.itemRow}>
                    <Text style={GlobalStyles.itemTxt_15_32}>{orderDetails.receiverName}</Text>
                    <Text style={GlobalStyles.itemTxt_12_64}>{orderDetails.channelType}</Text>
                </View>
                <View style={[styles.itemRow, {marginTop: 12}]}>
                    <Text style={GlobalStyles.itemTxt_12_64}>{orderDetails.mobilePhone}</Text>
                    <Text style={GlobalStyles.itemTxt_12_96}>{orderDetails.createTime}</Text>
                </View>
                <View style={[styles.itemRow, {marginTop: 15, justifyContent: 'flex-start'}]}>
                    <Image source={Images.location} style={{marginRight: 5}} />
                    <Text numberOfLines={2} style={GlobalStyles.itemTxt_12_64}>
                        {orderDetails.province}{orderDetails.city}{orderDetails.county}{orderDetails.address}
                    </Text>
                </View>
            </View>
            <View style={styles.detailForm}>
                <View style={styles.detailImg}>
                    {imageData.map(this.renderdetailImgItem)}
                </View>
                <View style={styles.detailBtns}>
                    <TouchableOpacity 
                        style={[styles.detailBtn, styles.detailSubmit]}
                        onPress={() => this.onAuditOrder(1)}
                    >
                        <Text style={styles.detailSubmitTxt}>审核通过</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.detailBtn, styles.detailCancel]}
                        onPress={() => this.toggle(true)}
                    >
                        <Text style={styles.detailCancelTxt}>审核不通过</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                style={{margin: 0}}
                backdropColor={'black'}
                backdropOpacity={0.5}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                isVisible={isVisible}
                onBackdropPress={() => this.toggle(false)}
                onBackButtonPress={() => this.toggle(false)}
                avoidKeyboard
                propagateSwipe
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleTxt}>审核不通过原因</Text>
                        <TouchableOpacity 
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            onPress={() => this.toggle(false)}
                        >
                            <Image source={Images.close}/>
                        </TouchableOpacity>
                    </View>
                    <TextInput 
                        style={styles.refuseText}
                        multiline={true}
                        numberOfLines={6}
                        textAlignVertical="top"
                        underlineColorAndroid="transparent"
                        value={noPassReasons}
                        onChangeText={(noPassReasons) => this.setState({noPassReasons})}
                    />
                    <View style={styles.modalFast}>
                        <Text style={styles.modalFastTitle}>快捷输入：</Text>
                        <View style={styles.modalFastContent}>
                            {fastButtons.map(this.renderFastItem)}
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.modalSubmit}
                        onPress={this.onSubmit}
                    >
                        <Text style={styles.modalSubmitTxt}>提交</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    }
    renderdetailImgItem = (item, index) => {
        const {orderDetails} = this.state
        return <View key={index} style={styles.detailImgItem}>
            <ImageBackground
                resizeMode={'stretch'} 
                source={item.bg} 
                style={styles.detailImgItemImg}
            >
                <Image source={item.image ? { uri: orderDetails[item.image] } : null} resizeMode={'contain'} style={styles.detailImgItemData} />
                <Text style={[GlobalStyles.itemTxt_12_ff, styles.detailImgItemTxt]}>{item.text}</Text>
            </ImageBackground>
        </View>
    }
    renderFastItem = (item, index)  => {
        return <TouchableOpacity 
            key={index}
            style={styles.modalFastItem}
            onPress={() => this.setState({ noPassReasons: item.value })}
        >
            <Text style={styles.modalFastTxt}>{item.name}</Text>
        </TouchableOpacity>
    }
}