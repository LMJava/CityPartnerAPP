import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    RefreshControl,
    DeviceEventEmitter,
    View
} from 'react-native';
import Modal from 'react-native-modal'

import { 
    getStatisticsBySession, 
    getQRcodeForF2F 
} from "../../common/AppFetch";
import { connect, actions } from '../../store/combin';
import HomeList from "../../components/HomeList";
import Tool from "../../common/Tool";
import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
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
        const Login = {...this.props.Login}
        this.countListener = DeviceEventEmitter.addListener('COUNT_STATE', this.getStatistics);
        this.getStatistics()
        if(Login.QRcodeForF2F) {
            this.setState({QRcodeForF2F: `data:image/png;base64,${Login.QRcodeForF2F}`})
        } else {
            getQRcodeForF2F({success: ({result}) => {
                Login.QRcodeForF2F = result[0].imgbase64
                this.props.addLogin(Login)
                this.setState({QRcodeForF2F: `data:image/png;base64,${result[0].imgbase64}`})
            }})
        }
    }
    componentWillUnmount() {
        this.countListener && this.countListener.remove();
    }
    getStatistics = () => {
        this.setState({refreshing: true})
        getStatisticsBySession({
            success: ({result}) => {
                let buttons = [...this.state.buttons]
                buttons[0].number = result[0].auditedCount || 0
                buttons[1].number = result[0].activatedCount || 0
                buttons[2].number = result[0].completedCount || 0
                this.setState({
                    buttons, 
                    todayHandledCount: result[0].todayHandledCount || 0,
                    refreshing: false
                })
            },
            error: () => {
                this.setState({
                    refreshing: false
                })
            }
        })
    }
    // 传入bool控制弹窗显示（true）隐藏（false）
    toggle(flag) {this.setState({isVisible: flag})}
    render() {
        const { refreshing, todayHandledCount, QRcodeForF2F, isVisible, buttons } = this.state,
            {name, address} = this.props.User
        return <ScrollView 
            style={GlobalStyles.root_container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.getStatistics}
                />
            }
        >
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
                    <Image 
                        source={QRcodeForF2F ? { uri: QRcodeForF2F } : null} 
                        style={{width: 300, height: 300}}
                    />
                </View>
            </Modal>
        </ScrollView>
    }
}
export default connect(
    (state) => {
        return { 
            Login: state.Login, 
            User: state.User 
        };
    },{
        addLogin: actions.Login.addLogin
    }
)(Home);