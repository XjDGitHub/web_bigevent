$(function () {
    // 点击切换登录注册表单
    $('#link_login a').on('click', function () {
        $('#link_login').hide()
        $('#link_reg').show()
    })
    $('#link_reg a').on('click', function () {
        $('#link_reg').hide()
        $('#link_login').show()
    })
    // 从layui获取对象
    let form = layui.form
    let layer = layui.layer
    //自定义表单检验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('#link_reg [name=userpassword]').val()
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    }
    )

    // 注册提交post事件
    $('#reg_form').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $("#reg_form [name=username]").val(), password: $("#reg_form [name=userpassword]").val() }, function (res) {
            if (res.ststus === 1) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#reg_form a').click()
            //jquery没有reset()方法，原生的才有
            $('#reg_form')[0].reset()
        })
    })

    // 登录提交post事件
    $('#login_form').submit(function (e) {
        e.preventDefault()
        // console.log($('#login_form').serialize())
        console.log($("#login_form [name=password]").val())
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // post事件需要获取表单数据,jquery中的serialize()方法
            // data: $('#login_form').serialize(),
            data: {
                username: $("#login_form [name=username]").val(),
                password: $("#login_form [name=password]").val()
            },
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                // console.log(res.token)
                // 将token值存到本地存储中qu
                localStorage.setItem('token', res.token)
                location.href = 'index.html'

            }
        })
    })


})