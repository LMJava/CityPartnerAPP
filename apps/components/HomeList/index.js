import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

import Images from "../../assets/styles/Images"
import styles from "./styles"

export default class HomeList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {buttons} = this.props
        return <View style={styles.homeButtonsWrap}>
            {buttons.map(this.renderButtons)}
        </View>
    }
    renderButtons = (item, index) => (
        <TouchableOpacity 
            key={index} 
            style={styles.homeButtons} 
            // onPress={(e) => item.onPress && item.onPress(e)}
            onPress={(e) => this.props.navigation.navigate(item.target)}
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
}