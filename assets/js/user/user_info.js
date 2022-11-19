$(function () {
    let form = layui.form
    let layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称必须在1 ~ 6位之间'
            }
        }
    })

    initUserinfo()

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserinfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                console.log(res)
                window.parent.getUserinfo()

            }
        })
    })
})

function initUserinfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (res) {
            if (res.status === 1) {
                return layer.msg('获取用户信息失败');
            }
            // console.log(res)
            // layui.form.val()快速为表单赋值，也能取值
            // 语法：form.val('filter', object);
            // 用于给指定表单集合的元素赋值和取值。如果 object 参数存在，则为赋值；如果 object 参数不存在，则为取值。
            layui.form.val('formUserInfo', res.data)
        }

    })
}
