import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    View
} from 'react-native';

import HomeList from "../../components/HomeList";
import Tool from "../../common/Tool";
import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class PersonalCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [{
                name: "今日办理",
                number: "9"
            }, {
                name: "已审核",
                number: "12"
            }, {
                name: "未激活",
                number: "3"
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

    render() {
        const { messages, buttons } = this.state
        return <View style={GlobalStyles.root_container}>
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
                            <Text style={styles.homeHeaderName}>张三丰</Text>
                            <View style={styles.homeHeaderAdd}>
                                <Text style={styles.homeHeaderAddTxt}>河南</Text>
                                <Text style={styles.homeHeaderAddTxt}>郑州</Text>
                                <Text style={styles.homeHeaderAddTxt}>新乡</Text>
                                <Text style={styles.homeHeaderAddTxt}>范县</Text>
                                <Text style={styles.homeHeaderAddTxt}>三门峡</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                            // onPress={this.goToList}
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
        </View>
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