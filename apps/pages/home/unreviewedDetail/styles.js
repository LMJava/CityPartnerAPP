import { StyleSheet } from "react-native"


export default StyleSheet.create({
    detailMes: {
        padding: 20,
        backgroundColor: '#FFF'
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    detailForm: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 20,
        backgroundColor: '#FFF'
    },

    detailImg: {
        paddingVertical: 15,
        paddingHorizontal: 11,
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
    },
    detailImgItem: {
        width: '50%', 
        paddingHorizontal: 4, 
        paddingVertical: 5
    },
    detailImgItemImg: {
        height: 150,
        padding: 4,
        alignItems: 'center',
        borderRadius: 5
    },
    detailImgItemData: {
        flex: 1,
        width: '100%', 
        height: '100%',
        margin: 10
    },
    detailImgItemTxt: {
        paddingVertical: 7,
        backgroundColor: 'transparent'
    },

    detailBtns: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 11
    },
    detailBtn: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 4,
        borderWidth: 0.5, 
        borderRadius: 3
    },
    detailSubmit: {
        borderColor: "#47C16F", 
        backgroundColor: '#47C16F'
    },
    detailSubmitTxt: {
        fontSize: 18,
        color: "#FFF"
    },
    detailCancel: {
        borderColor: "#D6D6D6", 
        backgroundColor: '#EDEDED'
    },
    detailCancelTxt: {
        fontSize: 18,
        color: "#000"
    },

    modalContent: {
        paddingVertical: 20, 
        paddingHorizontal: 15, 
        marginHorizontal: 15, 
        borderRadius: 8,
        backgroundColor: '#FFF'
    },
    modalTitle: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 20
    },
    modalTitleTxt: {
        flex: 1,
        fontSize: 18,
        color: "#323232",
    },
    refuseText: { 
        marginBottom: 20,
        borderRadius: 3,
        borderWidth: 0.5, 
        borderColor: "#C6C6C6"
    },
    
    modalFast: {
        marginBottom: 20
    },
    modalFastTitle: {
        fontSize: 15,
        color: "#969696"
    },
    modalFastContent: {
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingVertical: 10, 
    },
    modalFastItem: {
        alignItems: 'center',
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 3,
        backgroundColor: '#F6F6F6'
    },
    modalFastTxt: {
        fontSize: 15,
        color: "#333"
    },

    modalSubmit: {
        alignItems: 'center',
        padding: 12,
        borderRadius: 3,
        borderWidth: 0.5, 
        borderColor: "#47C16F", 
        backgroundColor: '#47C16F'
    },
    modalSubmitTxt: {
        fontSize: 18,
        color: "#FFF"
    },
})