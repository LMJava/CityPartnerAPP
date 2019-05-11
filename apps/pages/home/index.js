import React, { Component } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    View
} from 'react-native';
import Modal from 'react-native-modal'

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
            isVisible: false,
            buttons: [{
                title: "待审核",
                target: "Unreviewed",
                number: "12",
                img: Images.unreviewed
            }, {
                title: "待激活",
                target: "Inactivated",
                number: "110",
                img: Images.inactivated
            }, {
                title: "已完成",
                target: "Done",
                number: "1692",
                img: Images.done
            }]
        }
    }

    // 传入bool控制弹窗显示（true）隐藏（false）
    toggle(flag) {this.setState({isVisible: flag})}
    render() {
        const { isVisible, buttons } = this.state,
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
                    <View style={styles.homeHeaderMsg}>
                        <Text style={styles.homeHeaderName}>{name}</Text>
                        <View style={styles.homeHeaderAdd}>
                            <Text style={styles.homeHeaderAddTxt}>{address}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.homeCode}>
                <TouchableOpacity 
                    onPress={() => this.props.delUser()}
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
                    <Image source={Images.sharePage.miniProgram} />
                    <Text style={styles.modalTxt}>使用微信扫描办理</Text>
                </View>
            </Modal>
        </View>
    }
}
export default connect(
    (state) => {
      return { User: state.User };
    },{
        delUser: actions.User.delUser
    }
)(Home);