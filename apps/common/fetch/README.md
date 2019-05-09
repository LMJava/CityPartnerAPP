# Fetch API
* 描述

> Fetch API是基于fetch二次封装，
支持fetch对象的浏览器使用fetch请求，而不支持fetch对象的浏览器底层使用XHR实现并返回Promise

* 安装

```
  npm install react-cmos-fetch --save-dev
```
* 使用说明


>```
>* postJSON请求方法(post方式请求并返回JSON对象)

>```
>Fetch.postJSON(params)
>```
>* getJSON请求方法(get方式请求并返回JSON对象)

>```
>Fetch.getSON(params)
>```
>* postHTML请求方法(post方式请求并返回HTML/TEXT)

>```
>Fetch.postHTML(params)
>```
>* getHTML请求方法(get方式请求并返回HTML/TEXT)

>```
>Fetch.getHTML(params)
>```
>* getIMG请求方法(返回一个blob二进制流)

>```
>Fetch.getIMG(params)
>```
>*delete请求方法(返回一个json串)

>```
>Fetch.delete(params)
>```
>*put请求方法(返回一个json串)

>```
>Fetch.put(params)
>```
* Fetch(params)参数说明

> * params

> ```
> params可以是单独的一个URL字符串，也可以是一个{},Object类型的入参方式,可以在{}模式中传入headers参数改变headers；
> get请求只支持urlParams传参)
> ```

* 返回参数

> * Fetch()函数将返回一个promise对象

> ```
> Fetch(url,params).then(function(json){
> 		console.log(json)
> })
> 或者:
> var res = Fetch(url,params);
> res.then(function(json){
> 	 console.log(json)
> })
> ```

> * 用then()方法处理回调，catch（）处理接口异常操作;

* 示例1  (入参传入对象支持传入Headers,自定义头部)

```
	let headers = new Headers();
		headers.append('Accept', '*/*');
	Fetch.postJSON({url:'./test.json',body:'a=1&b=2',headers:headers}).then(function(res){
	    console.log(res);
	},function(err){
		alert(err)
	})
```
* 示例2  （入参传入url字符串）

```
	Fetch.postJSON('./test.json').then(function(res){
	    console.log(res);
	},function(err){
		alert(err)
	})
```
* 示例3  (使用catch 捕捉异常)

```
	Fetch.postJSON('./test.json').then(function(res){
	    console.log(res);
	}).catch(function(err){
		console.log(err)
	})
```
* 示例4  (请求一个图片路径)

```
	Fetch.postJSON('./phone.png').then(function(res){
	    console.log(res);
	    var imgSrc  = URL.createObjectURL(res);
	    console.log(imgSrc);
	}).catch(function(err){
		console.log(err)
	})
```





