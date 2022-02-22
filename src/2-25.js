function ajax(url, callback) {
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
            callback(obj)
        }
    }
}

function request(url) {
    ajax(url, res => {
        getData.next(res)
    })
}

function* gen() {
    let res1 = yield request('static/a.json')
    console.log(res1);
    let res2 = yield request('static/b.json')
    console.log(res2);
    let res3 = yield request('static/c.json')
    console.log(res3);
}

let getData = gen()
getData.next()