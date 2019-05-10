import { StyleSheet } from "react-native"

import Tool from "../../common/Tool";

export default StyleSheet.create({
    headerBGImage: {
        height: Tool.isIphoneX() ? 184 : 160,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    homeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    homeHeaderImg: {
        margin: 20,
        width: 60,
        height: 60
    },
    homeHeaderMsg: {
        flex: 1,
    },
    homeHeaderName: {
        fontSize: 18,
        color: "#FFF",
        backgroundColor: 'transparent'
    },
    homeHeaderAdd: {
        marginTop: 10,
        flexDirection: 'row'
    },
    homeHeaderAddTxt: {
        fontSize: 12,
        color: "#FFF",
        backgroundColor: 'transparent'
    },
    // homeHeaderNum: {
    //     alignItems: 'center',
    // },
    // homeHeaderCnt: {
    //     flexDirection: 'row',
    // },
    homeCode: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#FFF'
    },

    modalContent: {
        padding: 30,
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    modalTxt: {
        marginTop: 10,
        fontSize: 20,
        color: "#000",
    }
})