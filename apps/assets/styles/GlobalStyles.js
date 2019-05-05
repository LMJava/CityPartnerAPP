/**
 * 全局样式
 */
module.exports = {
    root_container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    /* 公共Text样式 */
    itemTxt_15_32: { fontSize: 15, color: '#323232' },
    itemTxt_12_64: { fontSize: 12, color: '#646464' },
    itemTxt_12_96: { fontSize: 12, color: '#969696' },
    /* 公共icon样式 */
    icon_20_white: {width: 20, height: 20, tintColor: '#FFF'},
    icon_20_gray: {width: 20, height: 20, tintColor: '#777'},
    icon_20_blue: {width: 20, height: 20, tintColor: '#4A8EF2'},
    icon_14_gray: {width: 14, height: 14, tintColor: '#777'},
    /* 公共筛选样式 */
    headerInputWarp: {marginLeft: 10, marginRight: 10, flexDirection: "row", height: 30},
    headerButtonBox: {borderColor: "#C7C7CC", borderWidth: 1, borderRadius: 4, flex: 1, justifyContent: 'center', alignItems: 'center'},
    headerInputBox: {padding: 0, borderColor: "#C7C7CC", borderWidth: 1, borderRadius: 4, flex: 1, textAlign: "center", fontSize: 12, textAlignVertical: 'center'},
    headerButtonText: {fontSize: 12},
    headerInputSeparator: {textAlignVertical: "center", paddingHorizontal: 5, color: "#333"},

    /* 单选框样式 */
    radioWrap: {
        flex: 1,
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioImg: {
        width: 16,
        height: 16,
        marginRight: 7,
    },
    radioTxt: {
        fontSize: 15,
        color: "#646464"
    },
};