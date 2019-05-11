import { StyleSheet } from "react-native"

import Tool from "../../common/Tool";

export default StyleSheet.create({
    headerBGImage: {
        height: Tool.isIphoneX() ? 260 : 236,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTit: {
        fontSize: 36,
        color: "#FFF",
        backgroundColor: 'transparent'
    },
    headerMsg: {
        marginTop: 10,
        marginBottom: 45,
        fontSize: 18,
        color: "#FFF",
        backgroundColor: 'transparent'
    },

    formWrap: {
        paddingHorizontal: 20
    },
    radioWrap: {
        marginTop: 38,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    radioContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    inputWrap: {
        height: 40,
        marginBottom: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    input: {
        flex: 1,
        padding: 0,
        paddingLeft: 13,
        fontSize: 15,
        color: "#323232"
    },

    submit: {
        height: 43,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#47C16F',
        borderRadius: 3
    },
    submitTxt: {
        fontSize: 18,
        color: "#FFF"
    },
    forgot: {
        margin: 20,
        padding: 6,
        alignItems: 'center',
    },
    forgotTxt: {
        fontSize: 14,
        color: "#47C16F"
    },
    

    vcode: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    vcodeBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 120,
        marginLeft: 6,
        borderWidth: 0.5, 
        borderRadius: 3,
    },
    vcodeBtnA: {
        borderColor: "#C8DEC6", 
        backgroundColor: '#F5FFF5'
    },
    vcodeBtnD: {
        borderColor: "#D3D3D3", 
        backgroundColor: '#EDEDED'
    },
    vcodeTxtA: {
        fontSize: 14,
        color: "#47C16F"
    },
    vcodeTxtD: {
        fontSize: 14,
        color: "#C6C6C6"
    }
})