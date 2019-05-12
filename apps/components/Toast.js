/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    ViewPropTypes as RNViewPropTypes,
    Image,
} from 'react-native'

const ViewPropTypes = RNViewPropTypes || View.propTypes;

export const DURATION = {
    LENGTH_LONG: 3000,
    LENGTH_SHORT: 1000,
    FOREVER: 0,
};

// let {height, width} = Dimensions.get('window');
// let btm = (height/2).toFixed(2)-0;

export default class Toast extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(this.props.opacity),
        }
    }

    show(text, duration, image) {
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
        this.image = image
            this.setState({
                isShow: true,
                text: text,

            });

        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
            }
        ).start(() => {
            this.isShow = true;
            if (duration !== DURATION.FOREVER) this.close();
        });
    }

    close(duration) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

        if (!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
        }, delay);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _showView() {
        const view = this.image ?
            <View
                style={[styles.container]}
                pointerEvents="none"
            >
                <Animated.View
                    style={[styles.icontent, {opacity: this.state.opacityValue}, this.props.style]}
                >
                    <Image source={this.image} style={{width: 40, height: 40}}/>
                    <Text style={[this.props.textStyle, {marginTop: 10}]}>{this.state.text}</Text>
                </Animated.View>
            </View> :
            <View
                style={[styles.container]}
                pointerEvents="none"
            >
                <Animated.View
                    style={[styles.content, {opacity: this.state.opacityValue}, this.props.style]}
                >
                    <Text style={this.props.textStyle}>{this.state.text}</Text>
                </Animated.View>
            </View>;
        return view;

    }

    render() {
        const view = this.state.isShow ? this._showView() : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        elevation: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#7A7A7A',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        color: '#FFF',
        fontSize: 12,
    },
    icontent: {
        backgroundColor: '#7A7A7A',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',

    }
});

Toast.propTypes = {
    style: ViewPropTypes.style
    // ,
    // position: PropTypes.oneOf([
    //     'top',
    //     'center',
    //     'bottom',
    // ]),
    // textStyle: Text.propTypes.style,
    // positionValue:PropTypes.number,
    // fadeInDuration:PropTypes.number,
    // fadeOutDuration:PropTypes.number,
    // opacity:PropTypes.number
}

Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 0.9
}