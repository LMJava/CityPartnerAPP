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

import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"


export default class UnreviewedDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            refuseText: '',
            fastCheckedArr: [],
            imageData: [{
                key: 'IdCard1',
                image: Images.credentials.IdCard1,
                text: '身份证（人像面）',
                bg: Images.credentials.IdCard1
            }, {
                key: 'IdCard2',
                image: '',
                text: '身份证（国徽面）',
                bg: Images.credentials.IdCard2
            }, {
                key: 'DrivingPermit1',
                image: '',
                text: '行驶证（正页）',
                bg: Images.credentials.DrivingPermit1
            }, {
                key: 'DrivingPermit2',
                image: '',
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

    // 传入bool控制弹窗显示（true）隐藏（false）
    toggle(flag) {this.setState({isVisible: flag})}
    onFastCheck = (value) => {
        let fastCheckedArr = [...this.state.fastCheckedArr]
        if (fastCheckedArr.includes(value)) {
            fastCheckedArr = fastCheckedArr.filter((e) => { return e != value });
        } else {
            fastCheckedArr.push(value)
        }
        this.setState({ fastCheckedArr })
    }
    render() {
        const {imageData, isVisible, refuseText, fastButtons} = this.state
        return <ScrollView style={GlobalStyles.root_container}>
            <View style={styles.detailMes}>
                <View style={styles.itemRow}>
                    <Text style={GlobalStyles.itemTxt_15_32}>张无忌</Text>
                    <Text style={GlobalStyles.itemTxt_12_64}>推广员</Text>
                </View>
                <View style={[styles.itemRow, {marginTop: 12}]}>
                    <Text style={GlobalStyles.itemTxt_12_64}>1357924680</Text>
                    <Text style={GlobalStyles.itemTxt_12_96}>2019/04/21</Text>
                </View>
                <View style={[styles.itemRow, {marginTop: 15}]}>
                    <Image source={Images.location} style={{marginRight: 5}} />
                    <Text numberOfLines={2} style={GlobalStyles.itemTxt_12_64}>
                        河南省郑州市高新技术产业开发区长椿路88号院3单元6号楼119号区长椿路88号院3单元6号楼119号
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
                        onPress={()=>{}}
                    >
                        <Text style={styles.detailSubmitTxt}>审核通过</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.detailBtn, styles.detailCancel]}
                        onPress={()=>this.toggle(true)}
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
                        value={refuseText}
                        onChangeText={(refuseText) => this.setState({refuseText})}
                    />
                    <View style={styles.modalFast}>
                        <Text style={styles.modalFastTitle}>快捷输入：</Text>
                        <View style={styles.modalFastContent}>
                            {fastButtons.map(this.renderFastItem)}
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.modalSubmit}
                        onPress={() => this.toggle(false)}
                    >
                        <Text style={styles.modalSubmitTxt}>提交</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    }
    renderdetailImgItem = (item, index) => {
        return <View key={index} style={styles.detailImgItem}>
            <ImageBackground
                resizeMode={'stretch'} 
                source={item.bg} 
                style={styles.detailImgItemImg}
            >
                <Image source={item.image || null} resizeMode={'contain'} style={styles.detailImgItemData} />
                <Text style={[GlobalStyles.itemTxt_12_ff, styles.detailImgItemTxt]}>{item.text}</Text>
            </ImageBackground>
        </View>
    }
    renderFastItem = (item, index)  => {
        const {fastCheckedArr} = this.state,
            flag = fastCheckedArr.includes(item.value)
        return <TouchableOpacity 
            key={index}
            style={[styles.modalFastItem, flag ? {backgroundColor: '#0BF'} : {}]}
            onPress={() => this.onFastCheck(item.value)}
        >
            <Text style={styles.modalFastTxt}>{item.name}</Text>
        </TouchableOpacity>
    }
}