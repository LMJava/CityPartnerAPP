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
        margin: 20
    },
    homeHeaderCon: {
        flex: 1,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
    homeHeaderNumWrap: {
        alignItems: 'flex-end'
    },
    homeHeaderNum: {
        fontSize: 18,
        color: "#FFF000"
    },
    homeHeaderMan: {
        fontSize: 12,
        color: "#FFF"
    },
    homeHeaderNumTxt: {
        marginTop: 10,
        fontSize: 12,
        color: "#FFF"
    },
    homeCode: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#FFF'
    },

    modalContent: {
        padding: 15,
        backgroundColor: '#FFF'
    }
})