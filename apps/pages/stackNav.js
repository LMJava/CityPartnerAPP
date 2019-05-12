import React from "react";
import {createStackNavigator} from "react-navigation";
import HeaderBar from "../components/HeaderBar";

import TabNav from "./tabNav";

import Unreviewed from './home/unreviewed'; // 待审核
import Inactivated from './home/inactivated'; // 待激活
import Done from './home/done'; // 已完成
import UnreviewedDetail from './home/unreviewedDetail'; // 待审核详情

import AddPartner from './partner/addPartner'; // 添加渠道
import AddPromoter from './promoter/addPromoter'; // 添加推广员

import EditPwd from './personalCenter/editPwd'; // 修改密码页面
import Recommend from './personalCenter/recommend'; // 推荐给他人
import HandleList from './personalCenter/handleList'; // 办理数量明细
import RenewList from './personalCenter/renewList'; // 续费数量明细


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
            Inactivated: { 
                screen: Inactivated,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"待激活"} leftButton={true} navigation={navigation} />
                }
            },
            Done: { 
                screen: Done,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"已完成"} leftButton={true} navigation={navigation} />
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


            EditPwd: {
                screen: EditPwd,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"修改密码"} leftButton={true} navigation={navigation} backgroundG={true}/>
                }
            },
            Recommend: {
                screen: Recommend,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"推荐给他人"} leftButton={true} navigation={navigation} backgroundG={true}/>
                }
            },
            HandleList: {
                screen: HandleList,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"办理数量明细"} leftButton={true} navigation={navigation}/>
                }
            },
            RenewList: {
                screen: RenewList,
                navigationOptions: {
                    header: ({navigation}) => <HeaderBar title={"续费数量明细"} leftButton={true} navigation={navigation}/>
                }
            },


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