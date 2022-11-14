// 由于每次发起请求的时候都需要手动拼接请求根路径
// 并且不利于维护
// 所以利用jquery中的一个方法
// 该方法会在每次发起请求的时候先调用
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})