import { StyleSheet } from "react-native"


export default StyleSheet.create({
    homeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25,
        backgroundColor: '#CCC',
    },
    homeHeaderImg: {
        width: 50,
        height: 50
    },
    homeHeaderMsg: {
        flex: 1,
        marginLeft: 15
    },
    homeHeaderAdd: {
        flexDirection: 'row',
    },
    homeHeaderNum: {
        alignItems: 'center',
    },
    homeHeaderCnt: {
        flexDirection: 'row',
    },

    homeCode: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        padding: 30,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 5,
        shadowOpacity: 0.2,
        shadowColor: '#B3B3B3',
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    homeCodeImg: {
        width: 22,
        height: 22
    },
    homeCodeText: {
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#000"
    },
    homeButtons: {
        flexDirection: 'row',
        paddingBottom: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#999'
    },
    homeButtonsCon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    homeButtonsImg: {
        width: 18,
        height: 18
    },

})