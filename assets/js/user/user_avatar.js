$(function () {
    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 用点击上传按钮去模拟点击file 类型的input输入框(隐藏)
    $('#chooseUserimage').on('click', function () {
        $('#file').click()
    })


    // 更换选择区域的头像
    // 为文件选择框绑定change事件 
    $('#file').on('change', function (e) {
        // console.log(e.target.files)
        // 1.先获取选择的文件列表
        let filelist = e.target.files
        // 2.判断用户是否上传了文件
        if (filelist.length === 0) {
            return layer.msg('请先上传文件')
        }

        // 更换选择的图片
        // 1.拿到用户选择的文件
        let file = filelist[0]
        // 2.将用户的文件生成url地址
        let newImgURL = URL.createObjectURL(file)
        // 3.先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 渲染用户新选择的头像
    $('#btnUpload').on('click', function () {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                console.log(res)
                if (res.status === 1) {
                    return layer.msg('头像上传失败')
                }
                layer.msg('头像上传成功')
                window.parent.getUserinfo()
            }
        })
    })



})