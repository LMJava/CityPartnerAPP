import React, { Component } from "react";
import { 
    // Platform, 
    DeviceEventEmitter, 
    View, 
} from 'react-native';
import Toast from "../components/Toast";
import {
    createAppContainer,
  } from 'react-navigation'
import { connect, actions } from '../store/combin';
import StackNav from "./stackNav";

import GlobalStyles from "../assets/styles/GlobalStyles"
// import DeviceInfo from 'react-native-device-info'

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {},
            ReturnDom: ""
        }
        // this._getDeviceInfo().then(value => { global.DeviceInfo = value })
    }
    
    componentDidMount() {
        this.props.getUser(
            // (User) => {
            //     if(JSON.stringify(User) === "{}") {
            //         this.setState({ReturnDom: "Login", User})
            //     } else {
            //         this.setState({ReturnDom: "TabNav", User})
            //     }
            // }
        )
        this.ToLoginListener = DeviceEventEmitter.addListener('toLogin', this.props.delUser); 
    }
    componentWillUnmount() {
        this.ToLoginListener && this.ToLoginListener.remove();
    }
    componentWillReceiveProps(nextProps) {
        const {User} = nextProps
        // , {User: preUser} = this.props
        // userId
        // if ( JSON.stringify(User) !== JSON.stringify(preUser) ) {
            if(JSON.stringify(User) === "{}") {
                this.setState({ReturnDom: "Login", User})
            } else {
                this.setState({ReturnDom: "TabNav", User})
            }
        // }
    }
    // async _getDeviceInfo() {
    //     // DeviceInfo
    //     var deviceInfos = {};
    //     deviceInfos.uniqueId = DeviceInfo.getUniqueID();
    //     deviceInfos.brand = DeviceInfo.getBrand();
    //     deviceInfos.version = DeviceInfo.getVersion();
    //     if (Platform.OS != "ios") {
    //         await DeviceInfo.getIPAddress().then((value) => {
    //             deviceInfos.ip = value
    //         }).catch((err) => {
    //             deviceInfos.ip = "";
    //         });
    //         await DeviceInfo.getMACAddress().then((value) => {
    //             deviceInfos.MACAddress = value
    //         }).catch((err) => {
    //             deviceInfos.MACAddress = ""
    //         });
    //     }

    //     deviceInfos.phoneNumber = DeviceInfo.getPhoneNumber();
    //     deviceInfos.readableVersion = DeviceInfo.getReadableVersion();
    //     deviceInfos.termModelName = DeviceInfo.getDeviceName();
    //     return deviceInfos;
    // }

    render() {
        const { User, ReturnDom } = this.state
        let ReturnDomContainer = View
        if(ReturnDom) {
            ReturnDomContainer = createAppContainer(StackNav(ReturnDom, User.userType))
        } else {
            ReturnDomContainer = View
        }
        return <View style={GlobalStyles.root_container}>
            {ReturnDom
                ? <ReturnDomContainer />
                : <View />

            }
            <Toast ref={toast => global.GlobalToast = toast} />
        </View>
    }
}
export default connect(
    (state) => {
      return { User: state.User };
    },{
        getUser: actions.User.getUser,
        delUser: actions.User.delUser
    }
)(Entry);