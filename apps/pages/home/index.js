import React, { Component } from 'react';
import { 
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';

import Images from "../../assets/styles/Images"
import GlobalStyles from "../../assets/styles/GlobalStyles"
import styles from "./styles"

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttons: [{
                title: "待审核",
                target: "unreviewed",
                number: "12"
            }, {
                title: "待激活",
                target: "inactivated",
                number: "110"
            }, {
                title: "已完成",
                target: "done",
                number: "1692"
            }]
        }
    }

    render() {
        const {buttons} = this.state
        return <View style={GlobalStyles.root_container}>
            <View style={styles.homeHeader}>
                <Image source={Images.tab.tab1} style={styles.homeHeaderImg}/>
                <View style={styles.homeHeaderMsg}>
                    <Text>张三丰</Text>
                    <View style={styles.homeHeaderAdd}>
                        <Text>河南</Text>
                        <Text>郑州</Text>
                        <Text>新乡</Text>
                        <Text>范县</Text>
                        <Text>三门峡</Text>
                    </View>
                </View>
                <View style={styles.homeHeaderNum}>
                    <View style={styles.homeHeaderCnt}>
                        <Text>12</Text>
                        <Text>人</Text>
                    </View>
                    <Text>今日办理</Text>
                </View>
            </View>
            <View style={styles.homeCode}>
                <Image source={Images.tab.tab1} style={styles.homeCodeImg}/>
                <Text style={styles.homeCodeText}>面对面扫码办理</Text>
            </View>
            <View>
                {buttons.map(this.renderButtons)}
            </View>
        </View>
    }
    renderButtons = (item, index ) => (
        <TouchableOpacity style={styles.homeButtons} key={index} onPress={() => {}}>
            <View style={styles.homeButtonsCon}>
                <Text>{item.title}</Text>
                <Text>{item.number}</Text>
            </View>
            <Image style={styles.homeButtonsImg} source={Images.tab.tab1} />
        </TouchableOpacity>
    );
}