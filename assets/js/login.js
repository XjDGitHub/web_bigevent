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
    //自定义表单检验规则
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('#link_reg [name=password]').val()
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    }
    )
})