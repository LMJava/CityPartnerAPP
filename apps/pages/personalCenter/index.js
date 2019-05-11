import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ScrollView,
    View
} from 'react-native';

import { 
    getStatisticsBySession, 
    getStatisticsByChildPartner,
    getStatisticsByPromoters
} from "../../common/AppFetch";
import { connect, actions } from '../../store/combin';
import HomeList from "../../components/HomeList";
import Tool from "../../common/Tool";
import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

class PersonalCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [{
                name: "今日办理",
                number: "0"
            }, {
                name: "待审核",
                number: "0"
            }, {
                name: "待激活",
                number: "0"
            }],
            buttons: [{
                title: "推荐给他人",
                target: "Recommend",
                img: Images.share
            }, {
                title: "办理数量明细",
                target: "HandleList",
                img: Images.handle
            }, {
                title: "续费数量明细",
                target: "RenewList",
                img: Images.payDetail
            }]
        }
    }
    componentDidMount() {
        const { userType, userId } = this.props.User
        let getStatistics = '',
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
                buttons[0].number = result[0].todayHandledCount
                buttons[1].number = result[0].auditedCount
                buttons[2].number = result[0].activatedCount
                this.setState({buttons})
            }
        })
    }
    render() {
        const { messages, buttons } = this.state,
            {name, address} = this.props.User
        return <ScrollView style={GlobalStyles.root_container}>
            {Tool.statusBar()}
            <ImageBackground 
                resizeMode={'stretch'} 
                source={Images.userBg} 
                style={styles.headerBGImage}
            >
                <View style={styles.homeHeader}>
                    <Image source={Images.head} style={styles.homeHeaderImg} />
                    <View style={styles.homeHeaderOpt}>
                        <View style={styles.homeHeaderMsg}>
                            <Text style={styles.homeHeaderName}>{name}</Text>
                            <View style={styles.homeHeaderAdd}>
                                <Text style={styles.homeHeaderAddTxt}>{address}</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("EditPwd")}
                            style={styles.settingBtn}
                        >
                            <Image source={Images.setting} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.messagesWrap}>
                {messages.map(this.renderMessages)}
            </View>
            <HomeList buttons={buttons} navigation={this.props.navigation}/>
            <TouchableOpacity
                style={styles.logout}
                onPress={() =>
                    Alert.alert("提示", "确认退出当前用户？", [
                        { text: "取消" },
                        { text: "确认", onPress: this.props.delUser }
                    ], { cancelable: false }
                )}
            >
                <Text style={styles.logoutTxt}>退出</Text>
            </TouchableOpacity>
        </ScrollView>
    }

    renderMessages = (item, index) => {
        return <View key={index} style={styles.messagesItem}>
            <View style={styles.messagesContent}>
                <Text style={styles.messagesNumber}>{item.number}</Text>
                <Text style={styles.messagesStr}>人</Text>
            </View>
            <Text style={styles.messagesName}>{item.name}</Text>
        </View>
    }
}
export default connect(
    (state) => {
        return { User: state.User };
    },{
        delUser: actions.User.delUser
    }
)(PersonalCenter);