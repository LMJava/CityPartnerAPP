import CONFIG from "../config/config";
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
    Fetch.postJSON(CONFIG.HOST + "partner/login").then((data) => {
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
// 登录
export function loginget(opt) {
    let url = CONFIG.HOST + "partner/login"
    if (opt.busiOptnyId && "" !== opt.busiOptnyId) {
        url = url + "&busiOptnyId=" + opt.busiOptnyId;
    }
    if (opt.busiOptnyStsCd && "" !== opt.busiOptnyStsCd) {
        url = url + "&busiOptnyStsCd=" + opt.busiOptnyStsCd;
    }
    if (opt.dspsPrsnType && "" !== opt.dspsPrsnType) {
        url = url + "&dspsPrsnType=" + opt.dspsPrsnType;
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