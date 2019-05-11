import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    View
} from 'react-native';
import Modal from 'react-native-modal'

import { 
    getStatisticsBySession, 
    getStatisticsByChildPartner,
    getStatisticsByPromoters,
    getQRcodeForF2F 
} from "../../common/AppFetch";
import { connect } from '../../store/combin';
import HomeList from "../../components/HomeList";
import Tool from "../../common/Tool";
import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todayHandledCount: 0,
            QRcodeForF2F: null,
            isVisible: false,
            buttons: [{
                title: "待审核",
                target: "Unreviewed",
                number: "0",
                img: Images.unreviewed
            }, {
                title: "待激活",
                target: "Inactivated",
                number: "0",
                img: Images.inactivated
            }, {
                title: "已完成",
                target: "Done",
                number: "0",
                img: Images.done
            }]
        }
    }
    componentDidMount() {
        const { userType, userId } = this.props.User
        let getStatistics,
            params = {}
        if(userType === '1') {
            getStatistics = getStatisticsBySession
        }else if(userType === '2') {
            getStatistics = getStatisticsByChildPartner
            params = {childPartnerId: userId}
        }else if(userType === '3') {
            getStatistics = getStatisticsByPromoters
            params = {promotersId: userId}
        }
        getStatistics && getStatistics({
            ...params,
            success: ({result}) => {
                const {buttons} = [...this.state.buttons]
                buttons[0].number = result[0].auditedCount
                buttons[1].number = result[0].activatedCount
                buttons[2].number = result[0].completedCount
                this.setState({
                    buttons, 
                    todayHandledCount: result.todayHandledCount
                })
            }
        })
        getQRcodeForF2F({success: data => {
            GlobalToast && GlobalToast.show(JSON.stringify(data))
            // this.setState({QRcodeForF2F: data.result})
        }})
    }
    // 传入bool控制弹窗显示（true）隐藏（false）
    toggle(flag) {this.setState({isVisible: flag})}
    render() {
        const { todayHandledCount, QRcodeForF2F, isVisible, buttons } = this.state,
            {name, address} = this.props.User
        return <View style={GlobalStyles.root_container}>
            {Tool.statusBar()}
            <ImageBackground 
                resizeMode={'stretch'} 
                source={Images.homeBg} 
                style={styles.headerBGImage}
            >
                <View style={styles.homeHeader}>
                    <Image source={Images.head} style={styles.homeHeaderImg} />
                    <View style={styles.homeHeaderCon}>
                        <View style={styles.homeHeaderMsg}>
                            <Text style={styles.homeHeaderName}>{name}</Text>
                            <View style={styles.homeHeaderAdd}>
                                <Text style={styles.homeHeaderAddTxt}>{address}</Text>
                            </View>
                        </View>
                        <Image source={Images.line} style={styles.homeHeaderImg} />
                        <View style={styles.homeHeaderNumWrap}>
                            <Text style={styles.homeHeaderNum}>
                                {todayHandledCount}
                                <Text style={styles.homeHeaderMan}>人</Text>
                            </Text>
                            <Text style={styles.homeHeaderNumTxt}>今日办理</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.homeCode}>
                <TouchableOpacity 
                    onPress={() => this.toggle(true)}
                >
                    <Image source={Images.F2F} />
                </TouchableOpacity>
            </View>
            <HomeList buttons={buttons} navigation={this.props.navigation}/>
            
            <Modal
                style={{margin: 0, alignItems: 'center'}}
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
                    <Image source={QRcodeForF2F || Images.sharePage.miniProgram} />
                    <Text style={styles.modalTxt}>使用微信扫描办理</Text>
                </View>
            </Modal>
        </View>
    }
}
export default connect(
    (state) => {
      return { User: state.User };
    }
)(Home);