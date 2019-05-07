import { StyleSheet } from "react-native"

export default StyleSheet.create({
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