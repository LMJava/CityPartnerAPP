import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {backgroundColor: "#FFF"},
    containerTitle: {fontSize: 14, color: '#323232', marginLeft: 15},
    filterWrap: {margin: 15, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'},
    filterItemWrap: {width: '25%', paddingHorizontal: 4, paddingVertical: 5},
    filterItem: {padding: 10, alignItems: 'center', borderRadius: 8, backgroundColor: '#F6F6F6'},
    filterText: {fontSize: 14, color: '#323232'},
    filterItemA: {backgroundColor: '#FDF3EE'},
    filterTextA: {color: '#ED783E'}
})