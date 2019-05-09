import { StyleSheet } from "react-native"

import Tool from "../../../common/Tool";

export default StyleSheet.create({
    bgImageWrap: {
        justifyContent: 'center'
    },
    bgImage: {
        height: Tool.isIphoneX() ? 424 : 400,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: '#FFF'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTxt: {
        marginTop: 15,
        fontSize: 12,
        color: "#646464"
    }
})