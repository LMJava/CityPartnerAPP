import React, { Component } from 'react';
import {
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    Text, 
    View
} from 'react-native';

import ViewUtils from "../../../components/ViewUtils";
import Images from "../../../assets/styles/Images"
import GlobalStyles from "../../../assets/styles/GlobalStyles"
import styles from "./styles"


export default class Unreviewed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTxt: ''
        }
    }

    render() {
        const {searchTxt} = this.state
        return <View style={GlobalStyles.root_container}>
            <View style={styles.searchWrap}>
                <View style={styles.searchCon}>
                    <Image source={Images.search} />
                    <TextInput
                        style={styles.searchInput}
                        underlineColorAndroid='transparent'
                        placeholder='姓名或手机号码检索'
                        placeholderTextColor='#999'
                        value={searchTxt}
                        onChangeText={searchTxt => {
                            this.setState({ searchTxt })
                        }}
                    />
                </View>
            </View>
            <FlatList
                data={[{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2},{name: 1}, {name: 2}]}
                keyExtractor={(item, index) => item.name +''+ index}
                renderItem={this.renderItem}
                ItemSeparatorComponent={ViewUtils.itemSeparatorComponent}
                style={{marginTop: 10}}
            />
        </View>
    }
    renderItem = ({item}) => {
        return <TouchableOpacity 
            style={styles.listItem}
            onPress={() => this.props.navigation.navigate('UnreviewedDetail')}
        >
            <View style={styles.itemAlignRow}>
                <View style={styles.itemRow}>
                    <Text style={GlobalStyles.itemTxt_15_32}>张无忌</Text>
                    <Text style={GlobalStyles.itemTxt_12_64}>推广员</Text>
                </View>
                <Image source={Images.right} style={{marginLeft: 15}} />
            </View>
            <View style={[styles.itemRow, {marginTop: 12}]}>
                <Text style={GlobalStyles.itemTxt_12_64}>1357924680</Text>
                <Text style={GlobalStyles.itemTxt_12_96}>2019/04/21</Text>
            </View>
        </TouchableOpacity>
    }
}