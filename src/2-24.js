const imgArr = ['1.jpg', '2.jpg', '3.jpg']
let promiseArr = []

imgArr.forEach(item => {
    promiseArr.push(new Promise((resolve, reject) => {
        //图片上传操作
        resolve()
    }))
})

Promise.all(promiseArr).then(res => {
    //插入数据库的操作
    console.log('图片全部上传成功');
})

