import React from "react";
import {createStackNavigator} from "react-navigation";
import HeaderBar from "../components/HeaderBar";

import TabNav from "./tabNav";

import Unreviewed from './home/unreviewed'; // 待审核
import UnreviewedDetail from './home/unreviewedDetail'; // 待审核详情

import AddPartner from './partner/addPartner'; // 添加渠道
import AddPromoter from './promoter/addPromoter'; // 添加推广员

import Login from './login'; // 登录页面
import Forgot from './login/forgot'; // 忘记密码页面

export default function StackNav(type, user) {
    return createStackNavigator(
        {
            TabNav: {
                screen: TabNav(user),
                navigationOptions: {
                    header: null
                }
            },

            Unreviewed: { 
                screen: Unreviewed,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"待审核"} leftButton={true} navigation={navigation} />
                }
            },
            UnreviewedDetail: { 
                screen: UnreviewedDetail,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"待审核详情"} leftButton={true} navigation={navigation} />
                }
            },

            AddPartner: { screen: AddPartner },
            AddPromoter: { screen: AddPromoter },

            Login: {
                screen: Login,
                navigationOptions: {
                    header: null
                }
            },
            Forgot: {
                screen: Forgot,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"忘记密码"} leftButton={true} navigation={navigation} backgroundG={true}/>
                }
            },
        }, {
            navigationOptions: {
                gesturesEnabled: true
            },
            headerMode: "screen",
            initialRouteName: type,
        }
    )
}