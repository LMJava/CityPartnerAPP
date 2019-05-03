import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Linking,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import moment from 'moment';
import GlobalStyles from "../assets/styles/GlobalStyles"
import Images from "../assets/styles/Images"

export default class ViewUtils {
    /**
     *
     *
     * @static
     * @param {any} image 引用图标
     * @param {any} callBack 点击方法
     * @returns 返回头部栏按钮
     * @memberof ViewUtils
     */
    static getTabBtn(content, callBack, _key) {
        return <TouchableOpacity
            key={_key ? _key : null}
            style={{ padding: 5 }}
            onPress={() => callBack && callBack()}
        >
            {typeof (content) == 'string'
                ? <Text numberOfLines={1}
                    style={{ fontSize: 14, color: '#333', backgroundColor: 'transparent' }}>{content}</Text>
                : <Image
                    style={GlobalStyles.icon_20_gray}
                    source={content}
                />
            }
        </TouchableOpacity>
    }

    /**
     *
     *
     * @static
     * @returns 返回列表项的底部分割线
     * @memberof ViewUtils
     */
    static itemSeparatorComponent() {
        return <View style={{ backgroundColor: "#fff", height: 1 }}>
            <View style={{ backgroundColor: "#EEE", height: 1, marginLeft: 15 }} />
        </View>
    }

    static itemAllSeparatorComponent() {
        return <View style={{ backgroundColor: "#EEE", height: 1 }} />
    }


    /**
     * 绘制列表底部内容
     * @author George King
     * @returns {XML}
     */
    static renderListFooter() {
        return (
            <Text style={styles.footer}>- 我是有底线的 -</Text>
        )
    }

    /**
     * 绘制列表顶部内容
     * @param num
     * @author George King
     * @returns {XML}
     */
    static renderListHeader(num, title) {
        return (
            <View style={styles.headerTitleWarp}>
                <Text style={styles.headerTitle}>{title} 共
                    <Text style={styles.headerTitleNum}> {num} </Text>
                    条数据
                </Text>
            </View>
        )
    }

    /**
     *
     *
     * @static 绘制默认图标
     * @param {any} text 显示文字
     * @param {any} size 默认 40
     * @param {any} color 默认 '#659FF4'
     * @returns
     * @memberof ViewUtils
     */
    static renderDefaultIcon(text, size, color) {
        let _size = size ? size : 40
        let _color = color ? color : '#659FF4'
        return <View style={[styles.defaultIcon, {
            width: _size, height: _size, borderRadius: _size / 2, backgroundColor: _color
        }]}>
            <Text numberOfLines={1} style={[styles.defaultIconText, {
                fontSize: _size / 2,
            }]}>{text}</Text>
        </View>
    }

    /**
     * 绘制筛选项对号
     */
    static renderCheckIcon() {
        return <Image
            style={GlobalStyles.icon_20_blue}
            source={Images.icon_gouxuan}
        />
    }

    /**
     * 绘制筛选项
     */
    static renderFilterItem(name, selected, callBack) {
        return <TouchableOpacity style={styles.listItem} onPress={() => callBack && callBack()}>
            <Text style={[styles.listItemText, selected && styles.listItemTextSelected]}>{name}</Text>
            {selected 
                ? ViewUtils.renderCheckIcon()
                : null
            }
        </TouchableOpacity>
    }

    /**
     * 绘制招标商机详情内容单元
     */
    static renderBidDetailItems(_title, _text, _callback) {
        return <View style={styles.bidDetailItemContent}>
            <Text 
                numberOfLines={1} 
                style={styles.bidDetailTitle}
            >{_title}</Text>
            <Text 
                numberOfLines={2} 
                style={styles.bidDetailText}
                onPress={() => _callback && _callback()}
            >{_text}</Text>
        </View>
    }
    // 时间格式化方法，大于7天显示具体时间，小于7天显示**分钟、小时、天前
    static getFormatTime(date) {
        let dateTimeStamp;
        if(!date) { return '' }
        if (typeof date === 'string') {
            dateTimeStamp = date.substr(date.length-1,1) == 'Z' 
            ? moment(date) - 8 * 60 * 60 * 1000//UTC时间格式要减去8个小时的毫秒数
            : moment(date);
        } else {
            dateTimeStamp = date;
        }
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        // const halfamonth = day * 15;
        // const month = day * 30;
        const now = new Date().getTime();
        const diffValue = now - dateTimeStamp;
        if (diffValue < 0) { return moment(dateTimeStamp).format('YYYY-MM-DD HH:mm') }
        // var monthC = diffValue / month;
        const weekC = diffValue / (7 * day);
        const dayC = diffValue / day;
        const hourC = diffValue / hour;
        const minC = diffValue / minute;
        let result;
        // if (monthC >= 1) {
        //     result = "" + parseInt(monthC) + "月前";
        // }
        if (weekC >= 1) {
            // 精确到分
            result = moment(dateTimeStamp).format('YYYY-MM-DD HH:mm');
        }
        else if (dayC >= 1) {
            result = "" + parseInt(dayC) + "天前";
        }
        else if (hourC >= 1) {
            result = "" + parseInt(hourC) + "小时前";
        }
        else if (minC >= 1) {
            result = "" + parseInt(minC) + "分钟前";
        } else {
            result = "刚刚";
        }
        return result;
    }

    /**
     * 比较两个时间的大小，前者小于等于后者时返回true
     */
    static isOlderTime(_old, _new) {
        return moment(_old) <= moment(_new)
    }

    static getDistance(lat1, lng1, lat2, lng2) {
        function getRad(d) {
            return d * Math.PI / 180.0;
        }
        if (lat1 && lng2 && lat2 && lng2) {
            const f = getRad((lat1 + lat2) / 2);
            const g = getRad((lat1 - lat2) / 2);
            const l = getRad((lng1 - lng2) / 2);

            let sg = Math.sin(g);
            let sl = Math.sin(l);
            let sf = Math.sin(f);

            let s, c, w, r, d, h1, h2;
            const a = 6378137.0;
            let fl = 1 / 298.257;

            sg = sg * sg;
            sl = sl * sl;
            sf = sf * sf;

            s = sg * (1 - sl) + (1 - sf) * sl;
            c = (1 - sg) * (1 - sl) + sf * sl;

            w = Math.atan(Math.sqrt(s / c));
            r = Math.sqrt(s * c) / w;
            d = 2 * w * a;
            h1 = (3 * r - 1) / 2 / c;
            h2 = (3 * r + 1) / 2 / s;
            const result = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
            return `${result.toFixed(0)}m`;
        } else {
            return '0m'
        }

    }
    static goToLink(_url) {
        let url = _url.replace(/ /g,'')
        url && Linking.openURL(url).catch(err => 
            GlobalToast.show('链接不合法')
        )
    }
    /**
     * 字符串截断 当字符串长度超过length，就显示length长度的字符串加省略号
     * @param {*} str 
     * @param {*} length 
     */
    static getLimitedString(str, length){
        if (str.length < length) {
            return str
        } else {
            return str.substr(0, length) + '...'
        }
    }
}

const styles = StyleSheet.create({
    headerTitleWarp: {
        height: 28,
        justifyContent: 'center',
        backgroundColor: '#F5F5F9',
    },
    headerTitle: {
        color: '#ADADAD',
        fontSize: 12,
        marginLeft: 15
    },
    headerTitleNum: {
        color: '#262626',
    },
    footer: {
        textAlign: 'center',
        color: '#bbbbbb',
        fontSize: 12,
        margin: 30
    },
    defaultIcon: { alignItems: 'center', justifyContent: 'center' },
    defaultIconText: { color: '#FFF', backgroundColor: 'transparent' },
    listItem: { padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    listItemText: { fontSize: 15, color: "#333" },
    listItemTextSelected: { color: "#168AFC" },
    bidDetailItemContent: { flex: 1, padding: 15 },
    bidDetailTitle: { marginBottom: 5, fontSize: 13, color: "#888" },
    bidDetailText: { fontSize: 15, color: "#333" },
});