import CONFIG from "./config";
import Fetch from "./fetch/fetch";

const SUCCESSCODE = 0
const headersF = {
    'Content-Type': 'multipart/form-data'
}
const headersJ = {
    'Content-Type': 'application/json;charset=utf-8'
}

// 登录
export function login(opt) {
    const requestBody = {
        url: CONFIG.HOST + "partner/login",
        headers: headersJ,
        body: JSON.stringify({
            role: opt.radioValue, 
            telephone: opt.phoneNum, 
            password: opt.passwordNum
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        // response['headers']['map']['set-cookie']
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 获取验证码
export function sendvcode(opt) {
    const requestBody = {
        url: CONFIG.HOST + "common/sendvcode",
        headers: headersJ,
        body: JSON.stringify({
            busiType: 2, 
            phoneNum: opt.phoneNum
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 密码重置
export function resetPassword(opt) {
    const requestBody = {
        url: CONFIG.HOST + "partner/resetPassword",
        headers: headersJ,
        body: JSON.stringify({
            telephone: opt.telephone, 
            smsVCode: opt.smsVCode, 
            newPassword: opt.newPassword
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}



// 获取业务办理统计信息(当前用户)
// 用于APP首页(合伙人、推广员通用)
// auditedCount         待审核数
// activatedCount       待激活数
// completedCount       已完成数
// todayHandledCount    今日办理人数
export function getStatisticsBySession(opt) {
    Fetch.getJSON(CONFIG.HOST + "partner/getStatisticsBySession").then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 废弃，没地方调用
// 获取业务办理统计信息(下属渠道合伙人)
// 用于城市合伙人获取下属渠道合伙人信息
// auditedCount         待审核数
// activatedCount       待激活数
// completedCount       已完成数
// todayHandledCount    今日办理人数
// export function getStatisticsByChildPartner(opt) {
//     let url = `${CONFIG.HOST}partner/getStatisticsByChildPartner?childPartnerId=${opt.childPartnerId}`
//     Fetch.getJSON(url).then((data) => {
//         if (data.code === SUCCESSCODE) {
//             opt.success && opt.success(data);
//         } else { // 运行时异常、业务异常、系统内部异常
//             GlobalToast.show(data.message)
//             opt.error && opt.error(data)
//         }
//     }).catch((err) => {
//         opt.error && opt.error(err)
//     })
// }
// 废弃，没地方调用
// 获取业务办理统计信息(下属推广员)
// 用于合伙人获取下属推广员的业务推广信息
// auditedCount         待审核数
// activatedCount       待激活数
// completedCount       已完成数
// todayHandledCount    今日办理人数
// export function getStatisticsByPromoters(opt) {
//     let url = `${CONFIG.HOST}partner/getStatisticsByPromoters?promotersId=${opt.promotersId}`
//     Fetch.getJSON(url).then((data) => {
//         if (data.code === SUCCESSCODE) {
//             opt.success && opt.success(data);
//         } else { // 运行时异常、业务异常、系统内部异常
//             GlobalToast.show(data.message)
//             opt.error && opt.error(data)
//         }
//     }).catch((err) => {
//         opt.error && opt.error(err)
//     })
// }
// 获取业务办理记录(当前用户)
// 分页查询，合伙人、推广员通用
// memberId     会员ID
// name         会员姓名
// mobilePhone  手机号
// vehiclePlate 车牌号
// orderId      订单号
// channelType  引流渠道（1-城市合伙人，2-渠道合伙人，3-推广员）
// channelId    渠道ID (城市合伙人ID、渠道合伙人ID、推广员)
// createTime   办理时间
export function getOrderListBySession(opt) {
    const requestBody = {
        url: CONFIG.HOST + "partner/getOrderListBySession",
        headers: headersJ,
        body: JSON.stringify({
            orderState: opt.orderState, // 业务办理状态（3-待审核,4-待激活,5-已激活）
            name: opt.name || null, // 会员姓名 ?
            vehiclePlate: opt.vehiclePlate || null, // 车牌号 ?
            startTime: opt.startTime || null, // 起始时间 ?
            endTime: opt.endTime || null, // 结束时间 ?
            pageNum: opt.pageNum, // 页码
            pageSize: 10
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 业务办理工单审核
export function auditOrder(opt) {
    const requestBody = {
        url: CONFIG.HOST + "smallprogram/auditOrder",
        headers: headersJ,
        body: JSON.stringify({
            orderId: opt.orderId, // 订单号
            auditResult: opt.auditResult, // 审核结果(1-通过，2-不通过)
            noPassReasons: opt.auditResult === 2 
                ? opt.noPassReasons 
                : null // 不通过原因(不通过需填写)
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 废弃，没地方调用
// 获取业务办理记录(下属推广员)
// 分页查询，用于合伙人获取下属推广员的业务推广信息
// memberId     会员ID
// name         会员姓名
// mobilePhone  手机号
// vehiclePlate 车牌号
// orderId      订单号
// createTime   办理时间
// export function getOrderListByChildPartner(opt) {
//     const requestBody = {
//         url: CONFIG.HOST + "partner/getOrderListByChildPartner",
//         headers: headersJ,
//         body: JSON.stringify({
//             promotersId: opt.promotersId, // 下属推广员ID
//             orderState: opt.orderState, // 业务办理状态（3-待审核,4-待激活,5-已激活）
//             name: opt.name || null, // 会员姓名 ?
//             mobilePhone: opt.mobilePhone || null, // 手机号 ?
//             pageNum: opt.pageNum, // 页码
//             pageSize: 10
//         })
//     };
//     Fetch.postJSON(requestBody).then((data) => {
//         if (data.code === SUCCESSCODE) {
//             opt.success && opt.success(data);
//         } else { // 运行时异常、业务异常、系统内部异常
//             GlobalToast.show(data.message)
//             opt.error && opt.error(data)
//         }
//     }).catch((err) => {
//         opt.error && opt.error(err)
//     })
// }
// 业务办理详情查询
// orderId              订单号
// vehiclePlate         车牌号
// mobilePhone          收货手机号
// receiverName         收货人姓名
// province             省
// city                 市
// county               区县
// address              详细地址
// referidcardPostive   身份证正面图片地址
// referidcardNegative  身份证国微图片地址
// licenseMainPage      行驶证正页图片地址
// licenseVcePage       行驶证副页图片地址
export function getOrderDetailsByPartner(opt) {
    let url = `${CONFIG.HOST}smallprogram/getOrderDetailsByPartner?orderId=${opt.orderId}`
    Fetch.getJSON(url).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 获取下属渠道合伙人列表(城市合伙人)
// 分页查询，用于城市合伙人获取下属渠道合伙人信息
// memberId     合伙人ID
// name         合伙人姓名
// telephone    手机号
// province     归属省份
// city         归属城市
// createTime   加入时间
// count        办理数量
export function getChildPartnerList(opt) {
    const requestBody = {
        url: CONFIG.HOST + "partner/getChildPartnerList",
        headers: headersJ,
        body: JSON.stringify({
            name: opt.name || null, // 会员姓名 ?
            vehiclePlate: opt.vehiclePlate || null, // 车牌号 ?
            city: opt.city || null, // 车牌号 ?
            pageNum: opt.pageNum, // 页码
            pageSize: 10
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 添加渠道合伙人
// 仅城市合伙人可用
// partnerId    渠道合伙人ID
export function addPartner(opt) {
    const requestBody = {
        url: CONFIG.HOST + "partner/addPartner",
        headers: headersJ,
        body: JSON.stringify({
            name: opt.name, // 渠道合伙人名称
            cardId: opt.cardId, // 身份证号
            telephone: opt.telephone, // 手机号
            province: opt.province, // 省
            city: opt.city, // 市
            county: opt.county, // 区
            street: opt.street, // 县
            age: opt.age, // 年龄
            sex: opt.sex // 性别(1-男，2-女)
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 获取下属推广员列表
// 用于城市/渠道合伙人获取下属推广员信息，分页查询
// promotersId  推广员ID
// name         推广员姓名
// telephone    手机号
// province     归属省份
// city         归属城市
// createTime   加入时间
// count        办理数量
export function getPromotersList(opt) {
    let url = `${CONFIG.HOST}partner/getPromotersList?pageNum=${opt.pageNum}&pageSize=10`
    if (opt.name && "" !== opt.name) {
        url = url + "&name=" + opt.name;
    }
    if (opt.vehiclePlate && "" !== opt.vehiclePlate) {
        url = url + "&vehiclePlate=" + opt.vehiclePlate;
    }
    Fetch.getJSON(url).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 添加推广员
// promotersId    推广员ID
export function addPromoters(opt) {
    const requestBody = {
        url: CONFIG.HOST + "partner/addPromoters",
        headers: headersJ,
        body: JSON.stringify({
            name: opt.name, // 渠道合伙人名称
            cardId: opt.cardId, // 身份证号
            telephone: opt.telephone, // 手机号
            province: opt.province, // 省
            city: opt.city, // 市
            county: opt.county, // 区
            street: opt.street, // 县
            age: opt.age, // 年龄
            sex: opt.sex // 性别(1-男，2-女)
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}




// 获取面对面扫码办理小程序码
export function getQRcodeForF2F(opt) {
    let url = `${CONFIG.HOST}partner/getQRcodeForF2F`
    Fetch.getJSON(url).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            // GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 获取线上分享小程序码
export function getQRcodeForOnline(opt) {
    let url = `${CONFIG.HOST}partner/getQRcodeForOnline`
    Fetch.getJSON(url).then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}



// 查询省份信息
export function queryProvinces(opt) {
    Fetch.postJSON(CONFIG.HOST + "partner/queryProvinces").then((data) => {
        // if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        // } else { // 运行时异常、业务异常、系统内部异常
        //     GlobalToast.show(data.code)
        //     opt.error && opt.error(data)
        // }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 根据省份ID查询地市信息
export function queryCities(opt) {
    const requestBody = {
        url: CONFIG.HOST + "partner/queryCities",
        headers: headersJ,
        body: JSON.stringify({
            provinceid: opt.provinceid // 省份ID
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        // if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        // } else { // 运行时异常、业务异常、系统内部异常
        //     GlobalToast.show(data.message)
        //     opt.error && opt.error(data)
        // }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 根据地市ID查询区县信息
export function queryAreas(opt) {
    const requestBody = {
        url: CONFIG.HOST + "partner/queryAreas",
        headers: headersJ,
        body: JSON.stringify({
            cityid: opt.cityid // 地市ID
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        // if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        // } else { // 运行时异常、业务异常、系统内部异常
        //     GlobalToast.show(data.message)
        //     opt.error && opt.error(data)
        // }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 合伙人区域筛选
export function queryPartnerRegion(opt) {
    Fetch.postJSON(CONFIG.HOST + "partner/queryPartnerRegion").then((data) => {
        if (data.code === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast.show(data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 推广人的区域筛选
// export function queryPromotersRegion(opt) {
//     Fetch.postJSON(CONFIG.HOST + "partner/queryPromotersRegion").then((data) => {
//         if (data.code === SUCCESSCODE) {
//             opt.success && opt.success(data);
//         } else { // 运行时异常、业务异常、系统内部异常
//             GlobalToast.show(data.message)
//             opt.error && opt.error(data)
//         }
//     }).catch((err) => {
//         opt.error && opt.error(err)
//     })
// }