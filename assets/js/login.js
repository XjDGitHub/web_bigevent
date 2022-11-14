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
    // 提交post事件
    $('#reg_form').on('submit', function (e) {
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/reguser', { username: $("#reg_form [name=username]").val(), password: $("#reg_form [name=userpassword]").val() }, function (res) {
            if (res.ststus !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#reg_form a').click()
            $('#reg_form').reset()
        })
    })
})