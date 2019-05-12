import { StyleSheet } from "react-native"

export default StyleSheet.create({
    rightButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightButtonTxt: { 
        marginLeft: 5,
        fontSize: 13, 
        color: '#FFF', 
        backgroundColor: 'transparent' 
    },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFF'
    },
    searchCon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 34,
        marginVertical: 10,
        paddingHorizontal: 17,
        borderRadius: 17,
        backgroundColor: '#F5F7F9'
    },
    searchInput: {
        flex: 1,
        padding: 0,
        paddingLeft: 7,
        fontSize: 14,
        color: '#323232'
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