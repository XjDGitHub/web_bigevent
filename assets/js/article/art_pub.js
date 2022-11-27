$(function () {
    let layer = layui.layer
    let form = layui.form

    initCate()
    // 初始化富文本编辑器
    initEditor()
    // 初始化第二行下拉选择框
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败')
                }
                // console.log(res)
                let strHtml = template('tpl-cate', res)
                // console.log(strHtml)
                $('[name=cate_id]').html(strHtml)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 为选择封面按钮绑定点击事件
    $('#btnChooseImg').on('click', function () {
        $('#coverFile').click()
    })

    $('#coverFile').on('change', function (e) {
        let file = e.target.files[0]
        if (!file) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 设置文章的发布状态
    let art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })

    // 为表单绑定submit事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()

        let fd = new FormData($(this)[0])
        // 添加state
        fd.append('state', art_state)
        // 添加图片
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
        console.log(fd)
        fd.forEach(function (k, v) {
            console.log(v, k)
        })

    })
    function publishArticle(fd) {
        $.ajax({
            method: 'get',
            url: '/my/article/add',
            data: fd,
            // 为服务器传formdata数据时需要配置以下两个参数
            contentType: false,
            processData: false,

            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
                location.href = '/article/art_list.html'
            }
        })
    }



})