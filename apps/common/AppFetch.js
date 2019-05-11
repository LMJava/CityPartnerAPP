import CONFIG from "./config";
import Fetch from "./fetch/fetch";

const SUCCESSCODE = "0"
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
            radioValue: opt.radioValue, 
            phoneNum: opt.phoneNum, 
            passwordNum: opt.passwordNum
        })
    };
    Fetch.postJSON(requestBody).then((data) => {
        if (data.returnCode === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast && GlobalToast.show(data.code + ' ' + data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}
// 获取验证码
export function sendvcode(opt) {
    let url = CONFIG.HOST + "common/sendvcode?busiType=2"
    if (opt.phoneNum && "" !== opt.phoneNum) {
        url = url + "&phoneNum=" + opt.phoneNum;
    }
    Fetch.getJSON(url).then((data) => {
        if (data.returnCode === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast && GlobalToast.show(data.code + ' ' + data.message)
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
        if (data.returnCode === SUCCESSCODE) {
            opt.success && opt.success(data);
        } else { // 运行时异常、业务异常、系统内部异常
            GlobalToast && GlobalToast.show(data.code + ' ' + data.message)
            opt.error && opt.error(data)
        }
    }).catch((err) => {
        opt.error && opt.error(err)
    })
}