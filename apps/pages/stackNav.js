import React from "react";
import {createStackNavigator} from "react-navigation";
import HeaderBar from "../components/HeaderBar";
import ViewUtils from "../components/ViewUtils";

import Images from "../assets/styles/Images"


import TabNav from "./tabNav";

import Login from './login'; // 登录页面

export default function StackNav(type, user) {
    return createStackNavigator(
        {
            TabNav: {
                screen: TabNav(user),
                navigationOptions: {
                    header: null
                }
            },
            Login: {
                screen: Login,
                navigationOptions: {
                    header: null
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