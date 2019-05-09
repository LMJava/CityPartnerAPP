// import 'es5-sham-ie8';
// import 'es5-shim';
// var Promise = require('es6-promise').Promise;
// import 'fetch-polyfill';
// import 'fetch-detector';
// import 'fetch-ie8';
//postJSON
//getJSON
//postHTML
//getHTML
//getIMG
// 入参 传入object

//text  blob 回参方法

// timeout 测试

//增加异常处理  比如没有传入url参数
let typeObject = {
    "undefined": "undefined",
    "number": "number",
    "boolean": "boolean",
    "string": "string",
    "[object Function]": "function",
    "[object RegExp]": "regexp",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object Error]": "error",
    "[object Undefined]": "undefined",
    "[object Null]": "null"
};
let Type = {
    typeOf: function (e) {
        return typeObject[typeof e] || typeObject[Object.prototype.toString.call(e)] || (e ? "object" : "null")
    },
    isArray: function (e) {
        return this.typeOf(e) === "array"
    },
    isBoolean: function (e) {
        return typeof e === "boolean"
    },
    isFunction: function (e) {
        return this.typeOf(e) === "function"
    },
    isNumber: function (e) {
        return typeof e === "number"
    },
    //参数e 为是否是函数对象的开关
    isObject: function (f, e) {
        return (f && (typeof f === "object" || (!e && this.isFunction(f)))) || false
    },
    isString: function (e) {
        return typeof e === "string"
    }
};
let _fetch = {
    dataType: {
        TEXT(response) {
            //text/html
            //以string的形式生成请求text
            return response.text();
        },
        JSON(response) {
            //生成JSON.parse(responseText)的结果
            return response.json();
        },
        BLOB(response) {
            // 生成一个Blob
            return response.blob();
        },
        ARRYBUFF(response) {
            //生成一个ArrayBuffer
            return response.arrayBuffer();
        },
        FORMDATA(response) {
            //生成格式化的数据，可用于其他的请求
            return response.formData();
        }
    },
    method: {
        'get': 'GET',
        'post': 'POST',
        'put': 'PUT',
        'delete': 'DELETE'
    },
    TIME_OUT: 30000,
    postJSON(params) {
        // toGetURL(params);
        //传入参数post方式返回JSON
        return conversion(params, this.method.post, this.dataType.JSON);
    },
    getJSON(params) {
        //formData不能通过get方式传参 get方式不支持body
        toGetURL(params);
        return conversion(params, this.method.get, this.dataType.JSON);
    },
    postHTML(params) {
        //post请求返回text/html
        return conversion(params, this.method.post, this.dataType.TEXT);
    },
    getHTML(params) {
        //get请求返回text/html
        toGetURL(params);
        return conversion(params, this.method.get, this.dataType.TEXT);
    },
    getIMG(params) {
        //get请求返回text/html
        toGetURL(params);
        //传入图片路径将二进制形式返回
        return conversion(params, this.method.get, this.dataType.BLOB);
    },
    delete(params) {
        toGetURL(params);
        return conversion(params, this.method.delete, this.dataType.JSON);
    },
    put(params) {
        // toGetURL(params);
        return conversion(params, this.method.put, this.dataType.JSON);
    }
};
let abortPromise = (fetchPromiseFn) => {
    //模拟abort 方法 超时后调用reject
    let abortFn = null;
    let abortPro = new Promise(function (resolve, reject) {
        abortFn = () => reject('abort promise');
    });
    let abortRacePromise = Promise.race(
        [fetchPromiseFn, abortPro]
    )
    // setTimeout(() => abortFn,_fetch.TIME_OUT)
    console.log(_fetch.TIME_OUT);
    setTimeout(function () {
        // console.log(abortFn);
        abortFn();
    }, _fetch.TIME_OUT)
    abortRacePromise.abort = () => abortFn;
    return abortRacePromise;
}
let _fetchPromise = (url, fetchParams, method) => {
    let _method = method ? method : 'get';
    let fetParams = {
        method: _method,
        body: method === 'get' ? null : fetchParams.body,
        mode: 'cors',
        cache: 'reload',
        headers: headersDeal(fetchParams.headers || {})
    }
    var rq = new Request(url, fetParams);
    var req = new Request(rq, fetchParams);
    return abortPromise(fetch(req));
};
//headers处理 
let headersDeal = (header) => {
    if (!Type.isObject(header)) {
        header = {}
    }
    header = Object.assign({
        'Accept': 'application/json,text/plain,*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }, header);
    let headers = new Headers();
    for (let val in header) {
        headers.append(val, header[val]);
    }
    return headers
}

let parseParams = (params) => {
    if (typeof(params) === "string") {
        if (typeof(JSON.parse(params)) === "object") {
            let fmStr = '', _params = JSON.parse(params);
            for (let n in _params) {
                fmStr += (n.concat('=' + _params[n] + "&"))
            }
            fmStr = fmStr.substring(0, fmStr.length - 1);
            return fmStr;
        }
        return params;
    } else if (params && typeof(params) === "object" && !params.append && typeof(params.append) != "function") {
        // let fmData = new FormData();
        // for(let n in params){
        // 	fmData.append(n,params[n]);
        // }
        // return fmData;
        let fmStr = '';
        for (let n in params) {
            fmStr += (n.concat('=' + params[n] + "&"))
        }
        fmStr = fmStr.substring(0, fmStr.length - 1);
        return fmStr;
    }
    return params;
};
let conversion = (params, method, resType) => {
    let errMsg = '';
    if (Type.isObject(params)) {
        if (params && params.url) {
            let _url = params.url;
            delete params.url;
            return _fetchPromise(_url, params, method).then(resType);
        } else {
            errMsg = "url is required";
        }
    } else if (Type.isString(params)) {
        if (!params.length) {
            errMsg = "必须传入url参数!!";
        } else {
            return _fetchPromise(params, {}, method).then(resType);
        }
    } else {
        errMsg = 'url is undifine';
    }
    return new Promise(function (resolve, reject) {
        //异常处理
        reject(errMsg)
    });
};
let toGetURL = (params) => {
    //get方式传入参数时 request不支持 body属性
    let urlParams = '';
    //formData不能通过get方式传参 get方式不支持body
    if (Type.isObject(params) && params.body) {
        if (typeof params.body === "string") {
            urlParams = params.body;
            delete params.body;
            params.url = params.url + '?' + urlParams;
        } else if (typeof params.body === "object") {
            // let formdate = new FormData();	//formdate、searchParams为两种数据格式
            let searchParams = new URLSearchParams()
            for (let obj in params.body) {
                // formdate.append(obj,params.body[obj])
                searchParams.append(obj, params.body[obj])
            }
            params.body = searchParams;
        }

    }
}
const Fetch = _fetch;
export default Fetch;
