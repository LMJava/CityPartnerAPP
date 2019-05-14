
import React, {Component} from 'react';
import {
    TouchableOpacity,
    ScrollView,
    Text,
    View
} from 'react-native'
import styles from "./AreaFilterStyles"

import {
    queryPartnerRegion,
    // queryPromotersRegion
} from '../../common/AppFetch'
export default class FilterItem extends Component {
    static defaultProps = {
        selected: '全部',
    };
    constructor(props) {
        super(props);
        this.state={
            areaData: []
        }
    }
    componentDidMount() {
        const {isPartner, onSelect} = this.props
        // let queryRegion = ''
        // if(isPartner) {
        //     queryRegion = queryPartnerRegion
        // } else {
        //     queryRegion = queryPromotersRegion
        // }
        queryPartnerRegion({
            success: ({result}) => {
                this.setState({areaData: result})
            },
            error: (a) => {
                GlobalToast.show('获取区域失败')
            }
        })
    }
    render() {
        const {areaData} = this.state
        return <View style={styles.container}>
            <ScrollView>
                <Text style={styles.containerTitle}>区域选择：</Text>
                <View style={styles.filterWrap}>
                    {this.renderFilterItem('全部')}
                    {areaData.map(this.renderFilterItem)}
                </View>
            </ScrollView>
        </View>
    }
    renderFilterItem = (item) => {
        const {selected, onSelect} = this.props,
            flag = item === selected 
        return <View key={item} style={styles.filterItemWrap}>
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
                >{item}</Text>
            </TouchableOpacity>
        </View>
    }
}