import { StyleSheet } from "react-native"

export default StyleSheet.create({
    filterItem: {flex: 1, width: 90, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#FFF'},
    filterItemText: {fontSize: 13, color: '#333'},
    filterItemIcon: {marginHorizontal: 4},
    modalWrap: {backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}
})