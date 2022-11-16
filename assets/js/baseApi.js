// 由于每次发起请求的时候都需要手动拼接请求根路径
// 并且不利于维护
// 所以利用jquery中的一个方法
// 该方法会在每次发起请求的时候先调用
$.ajaxPrefilter(function (options) {
    // 拼接请求地址
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为有权限的请求添加headers
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete函数 
    options.complete = function (res) {
        // console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token（避免用户自己手写token）
            localStorage.removeItem('token')
            // 2.强制转回登录页
            location.href = './login.html'
        }
    }

})