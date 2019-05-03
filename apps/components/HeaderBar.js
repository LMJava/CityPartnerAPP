import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    StatusBar,
} from 'react-native'

import Tool from "../common/Tool";

export default class HeaderBar extends Component {
    static propTypes = {
        headerView: PropTypes.element,
        title: PropTypes.string,
        titleView: PropTypes.element,
        leftButton: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),
        rightButton: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ])
    }

    constructor(props) {
        super(props);
    }

    render() {
        let isIphoneX = Tool.isIphoneX();
        // headerBar的noshadow主要用在了登录页和协议页面
        const shadowStyle = this.props.noShadow ? {backgroundColor: '#fff'} : styles.container;
        return (
            <View
                style={[
                    shadowStyle, {height: isIphoneX ? 88 : 64,}
                ]}
            >
                {Tool.statusBar(1)}
                <View style={styles.content}>
                    {this.props.headerView
                        ? this.props.headerView
                        : <View style={styles.navBar}>
                            <View style={styles.leftButton}>
                                {this.props.leftButton}
                            </View>
                            <View style={styles.titleViewContainer}>
                                {this.props.titleView
                                    ? this.props.titleView
                                    : <Text numberOfLines={1} style={styles.title}>{this.props.title}</Text>
                                }
                            </View>
                            <View style={styles.rightButton}>
                                {this.props.rightButton}
                            </View>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowColor: '#B3B3B3',
        elevation: 5,
        backgroundColor: '#FFF'
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    navBar: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 70,
        right: 70,
        top: 0,
        bottom: 0,
    },
    title: {
        textAlign: 'center',
        fontSize: 17,
        color: '#333',
        backgroundColor: 'transparent'
    },
    leftButton: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    rightButton: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
    }
})