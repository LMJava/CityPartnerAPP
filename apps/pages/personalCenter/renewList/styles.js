import { StyleSheet } from "react-native"


export default StyleSheet.create({

    searchWrap: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    pickerBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 9,
        borderColor: "#C2DCC0", 
        borderWidth: 0.5, 
        borderRadius: 4,
        backgroundColor: '#F5FFF5'
    },
    pickerBtnTxt: {
        flex: 1,
        fontSize: 14,
        color: '#48A14C'
    },
    pickerBtnImg: {
        marginLeft: 9
    },
    inputSeparator: {
        textAlignVertical: "center", 
        marginHorizontal: 5, 
        fontSize: 24,
        color: "#48A14C"
    },

    countNum: {
        margin: 10,
        textAlign: 'center'
    },
    countNumTxt: {
        fontSize: 14,
        color: '#969696'
    },

    listItem: {
        paddingHorizontal: 19,
        paddingVertical: 15,
        backgroundColor: '#FFF'
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    itemAlignRow: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})