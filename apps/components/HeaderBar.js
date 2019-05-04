import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native'

import Tool from "../common/Tool";
import Images from "../assets/styles/Images"

export default class HeaderBar extends Component {
    static propTypes = {
        headerView: PropTypes.element,
        title: PropTypes.string,
        titleView: PropTypes.element,
        leftButton: PropTypes.bool,
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
        const {headerView, leftButton, titleView, title, rightButton, backgroundG, navigation} = this.props
        return <ImageBackground 
            resizeMode={'stretch'} 
            source={Images.headerBg} 
            style={{
                height: isIphoneX ? 98 : 74, 
                backgroundColor: backgroundG ? '#F5F5F5': '#FFF'
            }}
        >
            {Tool.statusBar()}
            <View style={styles.content}>
                {headerView
                    ? headerView
                    : <View style={styles.navBar}>
                        {leftButton
                            ? <TouchableOpacity 
                                style={styles.leftButton} 
                                onPress={() => navigation 
                                    && navigation.goBack 
                                    && navigation.goBack(null)
                                }
                            >
                                <Image source={Images.left} />
                                <Text style={styles.leftButtonTxt}>返回</Text>
                            </TouchableOpacity>
                            : <View/>
                        }
                        <View style={styles.titleViewContainer}>
                            {titleView
                                ? titleView
                                : <Text numberOfLines={1} style={styles.title}>{title}</Text>
                            }
                        </View>
                        {rightButton
                            ? rightButton
                            : null
                        }
                    </View>
                }
            </View>
        </ImageBackground>
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    navBar: {
        paddingHorizontal: 15,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        fontSize: 16,
        color: '#FFF',
        backgroundColor: 'transparent'
    },
    leftButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftButtonTxt: { 
        marginLeft: 7,
        fontSize: 13, 
        color: '#FFF', 
        backgroundColor: 'transparent' 
    }
})