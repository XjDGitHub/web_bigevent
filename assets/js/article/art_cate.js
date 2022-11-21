$(function () {
    var layer = layui.layer
    let form = layui.form

    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                // let data = res.data
                // let htmlStr = ''
                // for (let i = 0; i < data.length; i++) {
                //     let Str = `
                //                         <tr>
                //             <td>${data[i].name}</td>
                //             <td>${data[i].alias}</td>
                //             <td>
                //             <button type="button" class="layui-btn layui-btn-xs btn-edit">编辑</button>
                //             <button type="button" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>
                //             </td>
                //         </tr>
                //     `
                //     htmlStr = htmlStr + Str

                // }
                // console.log(htmlStr)
                // console.log(HtmlStr)

                $('tbody').html(htmlStr)
            }
        })
    }

    // 为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 均是因为元素都是动态添加上去的
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })
    // 均是因为元素都是动态添加上去的
    // 通过代理的形式，为 编辑按钮绑定 click 事件
    let indexEdit = null
    $('body').on('click', '.btn-edit', function () {
        console.log('ok')
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })
        // 为渲染出来修改表单添加数据
        let id = $(this).attr('data-id')

        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }

        })

    })

    // 通过代理的形式，为 form-edit 表单（点击编辑按钮渲染出来的表单）绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })


    // 通过代理的形式，为 删除按钮绑定 click 事件
    $('body').on('click', '.btn-del', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res)
                    if (res.status === 1) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index)
                }

            })

                ;
        });
    })


})
