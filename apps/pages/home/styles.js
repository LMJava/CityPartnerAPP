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


    homeButtonsWrap: {
        marginTop: 10
    },
    homeButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    homeButtonsImg: {
        marginLeft: 22,
        marginRight: 12,
    },
    homeButtonsCon: {
        flex: 1,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
    },
    homeButtonsTxt: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    homeButtonsTit: {
        fontSize: 14,
        color: "#323232"
    },
    homeButtonsNum: {
        fontSize: 12,
        color: "#A7A7A7"
    },
    homeButtonsRight: {
        marginLeft: 15,
        marginRight: 25
    }
})