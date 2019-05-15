import React from "react"
import {StyleSheet, Image} from "react-native"
import { createBottomTabNavigator } from "react-navigation"

import Images from "../assets/styles/Images"

import Home from "./home" // 首页
import Partner from "./partner" // 合伙人
import Promoter from "./promoter" // 推广人
import PersonalCenter from "./personalCenter" // 个人中心



export default function TabNav(userType) {
    // let RouteData = [{
    //     name: "Home", 
    //     label: "首页",
    //     Img: Images.tab.tab1, 
    //     Img_un: Images.tab.tab1_un,
    //     screen: Home
    // }, {
    //     name: "Partner", 
    //     label: "合伙人",
    //     Img: Images.tab.tab2, 
    //     Img_un: Images.tab.tab2_un,
    //     screen: Partner
    // }, {
    //     name: "Promoter", 
    //     label: "推广人",
    //     Img: Images.tab.tab3, 
    //     Img_un: Images.tab.tab3_un,
    //     screen: Promoter
    // }, {
    //     name: "PersonalCenter", 
    //     label: "个人中心",
    //     Img: Images.tab.tab4, 
    //     Img_un: Images.tab.tab4_un,
    //     screen: PersonalCenter
    // }]
    // let RouteConfigs = RouteData.map(() => {
        
    // })
    let RouteConfigs = {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: "首页",
                tabBarIcon: ({ focused }) => (<Image
                    style={styles.img}
                    source={focused
                        ? Images.tab.tab1
                        : Images.tab.tab1_un
                    }
                />)
            }
        },
        Partner: {
            screen: Partner,
            navigationOptions: {
                tabBarLabel: "渠道",
                tabBarIcon: ({ focused }) => (<Image
                    style={styles.img}
                    source={focused
                        ? Images.tab.tab2
                        : Images.tab.tab2_un
                    }
                />)
            }
        },
        Promoter: {
            screen: Promoter,
            navigationOptions: {
                tabBarLabel: "推广员",
                tabBarIcon: ({ focused }) => (<Image
                    style={styles.img}
                    source={focused
                        ? Images.tab.tab3
                        : Images.tab.tab3_un
                    }
                />)
            }
        },
        PersonalCenter: {
            screen: PersonalCenter,
            navigationOptions: {
                tabBarLabel: "个人中心",
                tabBarIcon: ({ focused }) => (<Image
                    style={styles.img}
                    source={focused
                        ? Images.tab.tab4
                        : Images.tab.tab4_un
                    }
                />)
            }
        }
    }
    if(userType === '2') {
        delete RouteConfigs.Partner
    }else if(userType === '3') {
        delete RouteConfigs.Partner
        delete RouteConfigs.Promoter
    }
    return createBottomTabNavigator(RouteConfigs, {
        // initialRouteName: 'PersonalCenter',
        lazy: true, // 是否懒加载
        animationEnabled: true, // 切换页面时是否有动画效果
        tabBarPosition: "bottom", // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 是否可以左右滑动切换tab
        backBehavior: "none", // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarOptions: {
            activeTintColor: "#47C16F", // 文字和图片选中颜色
            inactiveTintColor: "#8D8D8D", // 文字和图片未选中颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {
                height: 0 // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            },
            style: {
                paddingBottom: 0,
                backgroundColor: "#FFF"
            },
            allowFontScaling: false,
            labelStyle: {
                margin: 0,
                fontSize: 10
            }
        }
    })
}

const styles = StyleSheet.create({
    img: {
        width: 22,
        height: 22
    }
})