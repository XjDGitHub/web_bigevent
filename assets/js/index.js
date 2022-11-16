$(function () {
    getUserinfo()

    layer = layui.layer
    $('#btnLogout').on('click', function () {
        // console.log('ok')
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清楚本地存储token
            localStorage.removeItem('token')
            // 2.回到登录页面
            location.href = './login.html'

            layer.close(index);
        });
    })
})
function getUserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败")
            }
            else {
                randerAvatar(res.data)
            }

        },

        // // 写在这里比肩麻烦，每一次请求有权限的都需要重写一遍，所以写道baseApi里
        // // 不管成功或者失败，都会调用complete函数
        // // 禁止用户自己访问后台页面
        // complete: function (res) {
        //     console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token（避免用户自己手写token）
        //         localStorage.removeItem('token')
        //         // 2.强制转回登录页
        //         location.href = './login.html'
        //     }

        // }


    })
}

function randerAvatar(user) {
    // console.log(user)
    // 1.渲染用户名称
    let name = user.nickname || user.username
    // console.log(name)
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avanter').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avanter')
            .html(first)
            .show()
    }

}



