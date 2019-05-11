import React, { Component } from "react";
import { 
    // Platform, 
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
            ReturnDom: ""
        }
        // this._getDeviceInfo().then(value => { global.DeviceInfo = value })
    }
    
    componentDidMount() {
        this.props.getUser((User) => {
            if(JSON.stringify(User) === "{}") {
                this.setState({ReturnDom: "Login"})
            } else {
                global.sessionId = User.sessionId
                this.setState({ReturnDom: "TabNav"})
            }
        })
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
        const { User } = this.props
        if (this.state.ReturnDom) {
            let ReturnDom = createAppContainer(StackNav(this.state.ReturnDom, User.role))
            return <View style={GlobalStyles.root_container}>
                    <ReturnDom />
                    <Toast ref={toast => global.GlobalToast = toast} />
            </View>
        } else {
            return null;
        }
    }
}
export default connect(
    (state) => {
      return { User: state.User };
    },{
        getUser: actions.User.getUser
    }
)(Entry);