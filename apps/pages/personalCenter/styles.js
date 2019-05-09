import { StyleSheet } from "react-native"

import Tool from "../../common/Tool";

export default StyleSheet.create({
    headerBGImage: {
        height: Tool.isIphoneX() ? 184 : 160,
        justifyContent: 'center',
        backgroundColor: '#FFF'
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

    homeHeaderOpt: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingBtn: {
        alignSelf: 'flex-start',
        paddingHorizontal: 20
    },

    messagesWrap: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#FFF'
    },
    messagesItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 90,
        borderColor: "#C2DCC0", 
        borderWidth: 0.5, 
        borderRadius: 5,
        backgroundColor: '#F5FFF5'
    },
    messagesContent: {
        flexDirection: 'row',
    },
    messagesNumber: {
        lineHeight: 28,
        fontSize: 28,
        color: "#48A14C"
    },
    messagesStr: {
        marginLeft: 4,
        lineHeight: 28,
        fontSize: 14,
        color: "#48A14C"
    },
    messagesName: {
        marginTop: 5,
        fontSize: 14,
        color: "#323232"
    },

})