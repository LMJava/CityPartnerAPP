
import React, {Component} from 'react';
import {
    TouchableOpacity,
    ScrollView,
    Text,
    View
} from 'react-native'
import styles from "./AreaFilterStyles"

export default class FilterItem extends Component {
    static defaultProps = {
        selected: 'all',
    };
    constructor(props) {
        super(props);
        this.state={
            areaData: [
                {name: '三门峡', value: '三门峡'},
                {name: '商丘', value: '商丘'},
                {name: '洛阳', value: '洛阳'},
                {name: '信阳', value: '信阳'},
                {name: '鹤壁', value: '鹤壁'},
                {name: '开封', value: '开封'},
                {name: '平顶山', value: '平顶山'}
            ]
        }
    }
    render() {
        const {areaData} = this.state
        return <View style={styles.container}>
            <ScrollView>
                <Text style={styles.containerTitle}>区域选择：</Text>
                <View style={styles.filterWrap}>
                    {this.renderFilterItem({name: '全部', value: 'all'}, 'all')}
                    {areaData.map(this.renderFilterItem)}
                </View>
            </ScrollView>
        </View>
    }
    renderFilterItem = (item, index) => {
        const { name, value } = item,
            {selected, onSelect} = this.props,
            flag = value === selected 
        return <View key={index} style={styles.filterItemWrap}>
            <TouchableOpacity 
                style={[
                    styles.filterItem, flag
                        ? styles.filterItemA 
                        : {}
                ]}
                onPress={() => onSelect && onSelect(item)}
            >
                <Text
                    numberOfLines={2} 
                    style={[
                        styles.filterText, flag
                            ? styles.filterTextA 
                            : {}
                    ]}
                >{name}</Text>
            </TouchableOpacity>
        </View>
    }
}