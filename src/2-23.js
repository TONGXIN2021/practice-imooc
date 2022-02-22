function ajax(url, successCallback, failCallback) {
    let xmlhttp
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest()
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    // 发送请求
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
    // 服务端响应
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //    console.log(xmlhttp.responseText)
            let obj = JSON.parse(xmlhttp.responseText)
            successCallback && successCallback(obj) //先判断一下当前参数是否传递
        } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
            failCallback && failCallback(xmlhttp.statusText)
        }
    }
}
/* 
let p = new Promise((reslove, reject) => {
    ajax('static/a.json', res => {
        console.log(res);
        reslove()
    })
}).then(res => {
    console.log('a成功');
}) */

function getPromise(url) {
    return new Promise((resolve, reject) => {
        ajax(url, res => {
            resolve(res)
        }, err => {
            reject(err)
        })
    })
}

/* getPromise('static/a.json')
    .then(res => {
        console.log(res);
        return getPromise('static/b.json')
    })
    .then(res => {
        console.log(res);
        return getPromise('static/c.json')
    })
    .then(res => {
        console.log(res);
    })
 */

/* getPromise('static/aa.json')
    .then(res => {
        console.log(res);
        return getPromise('static/b.json')
    }, err => {
        console.log(err);
        return getPromise('static/b.json')
    })
    .then(res => {
        console.log(res);
        return getPromise('static/c.json')
    })
    .then(res => {
        console.log(res);
    }) */

getPromise('static/a.json')
    .then(res => {
        console.log(res);
        return getPromise('static/bb.json')
    })
    .then(res => {
        console.log(res);
        return getPromise('static/c.json')
    })
    .then(res => {
        console.log(res);
    }).catch(err => { //对前面的操作进行统一的管理
        console.log(err);
    })
