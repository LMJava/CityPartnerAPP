
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native'
import Modal from 'react-native-modal'

import Images from "../../assets/styles/Images"
import styles from "./styles"

const STATUSBAR = (Platform.OS === 'ios') ? 20 : -4
export default class FilterItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            labelName: props.labelName || '筛选',
            isVisible: false,
            locationTop: STATUSBAR
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.state.labelName != nextProps.labelName) {
            this.setState({labelName: nextProps.labelName})
        }
        if(this.state.disabled != nextProps.disabled) {
            this.setState({disabled: nextProps.disabled})
        }
    }
    componentWillUnmount() {
    }

    // 设置弹窗距离顶部的距离
    setLocationTop() {
        this.button.measure((ox, oy, width, height, px, py) => {
            let locationTop = height + py - 20 + STATUSBAR
            this.setState({locationTop},() => this.toggle(true))
        })
    }
    // 传入bool控制弹窗显示（true）隐藏（false）
    toggle(flag) {this.setState({isVisible: flag})}

    render() {
        const {disabled, onClose, children, wrapStyle} = this.props,
            {labelName, isVisible, locationTop} = this.state
        return <View style={wrapStyle || {}}>
            <TouchableOpacity 
                ref={button => this.button = button}
                disabled={disabled} 
                style={styles.filterItem} 
                onPress={() => this.setLocationTop()}
            >
                <Text 
                    numberOfLines={1} 
                    style={[styles.filterItemText, disabled && {color: '#BBB'}]}
                >
                    {labelName}
                </Text>
                <Image 
                    style={styles.filterItemIcon}
                    source={isVisible ? Images.arrowOpen : Images.arrow}
                />
            </TouchableOpacity>
            <Modal
                style={{margin: 0}}
                backdropColor={'transparent'}
                // hasBackdrop={false}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                isVisible={isVisible}
                onBackdropPress={() => this.toggle(false)}
                onBackButtonPress={() => this.toggle(false)}
                onModalHide={() => onClose && onClose()}
                avoidKeyboard
                propagateSwipe
            >
            <View style={[styles.modalWrap, {top: locationTop}]}>
                {children}
            </View>
            </Modal>
        </View>
    }
}