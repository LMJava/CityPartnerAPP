import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    View
} from 'react-native';

import Tool from "../../common/Tool";
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
                number: "12",
                img: Images.unreviewed
            }, {
                title: "待激活",
                target: "inactivated",
                number: "110",
                img: Images.inactivated
            }, {
                title: "已完成",
                target: "done",
                number: "1692",
                img: Images.done
            }]
        }
    }

    render() {
        const { buttons } = this.state
        return <View style={GlobalStyles.root_container}>
            {Tool.statusBar()}
            <ImageBackground 
                resizeMode={'stretch'} 
                source={Images.homeBg} 
                style={styles.headerBGImage}
            >
                <View style={styles.homeHeader}>
                    <Image source={Images.head} style={styles.homeHeaderImg} />
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
                </View>
            </ImageBackground>
            <View style={styles.homeCode}>
                <TouchableOpacity 
                    onPress={this.goToList}
                >
                    <Image source={Images.F2F} />
                </TouchableOpacity>
            </View>
            <View style={styles.homeButtonsWrap}>
                {buttons.map(this.renderButtons)}
            </View>
        </View>
    }
    renderButtons = (item, index) => (
        <TouchableOpacity 
            key={index} 
            style={styles.homeButtons} 
            onPress={this.goToList}
        >
            <Image style={styles.homeButtonsImg} source={item.img} />
            <View style={styles.homeButtonsCon}>
                <View style={styles.homeButtonsTxt}>
                    <Text style={styles.homeButtonsTit}>{item.title}</Text>
                    <Text style={styles.homeButtonsNum}>{item.number}</Text>
                </View>
                <Image style={styles.homeButtonsRight} source={Images.right} />
            </View>
        </TouchableOpacity>
    );
    goToList = () => {
        // this.props.navigation.navigate('businessDetails');
    }
}