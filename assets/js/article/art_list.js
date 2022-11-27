$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage;

    // 定义查询参数对象，在每次提交请求的时候
    // 需要将数据提交到服务器
    let q = {
        pagenum: '1',//页码值
        pagesize: '2',//每页显示多少条数据
        cate_id: '',//文章分类的 Id
        state: '',//文章的状态，可选值有：已发布、草稿
    }
    let test = {
        "status": 0,
        "message": "获取文章列表成功！",
        "data": [
            {
                "Id": 1,
                "title": "abab",
                "pub_date": "2020-01-03 12:19:57.690",
                "state": "已发布",
                "cate_name": "最新"
            },
            {
                "Id": 2,
                "title": "666",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "股市"
            }
        ],
        "total": 5
    }
    // 定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        let dt = new Date(date)

        let y = padZero(dt.getFullYear())
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss

    }

    initTable()
    initCate()


    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {

                    return layer.msg('获取文章列表失败')
                }
                // console.log(res)
                let strHtml = template('tpl-table', test)
                $('tbody').html(strHtml)
                renderPage(res.total)


            }
        })
    }
    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                let a = template('tpl-cata', res)
                $('[name=cate_id]').html(a)
                // layui中重新渲染表单的方法
                form.render()

            }
        })
    }
    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中的数据，并填充到q身上
        let cate_id = $('[name=cate_id]').val()
        // console.log(cate_id)
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    // 定义渲染文章分页的方法
    function renderPage(total) {
        // console.log(total)
        // laypage.render 即layui内置分页方法
        laypage.render({
            elem: 'pageBox',//用来指定那个容器
            count: total,//数据总共的条数
            limit: q.pagesize,//指定每页总有多少条
            curr: q.pagenum,//默认显示那一页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页切换时会触发jump函数
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                console.log(obj.curr)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 此处不能通过initTable()来重新渲染表格
                // 触发jump回调函数有两种方法
                // 1.点击分页
                // 2.调用laypage.render()方法
                // 所以会造成死循环
                // first（是否首次，一般用于初始加载的判断）
                if (!first) {
                    initTable()

                }
            }
        })

    }

    // 通过代理的形式为删除按钮绑定点击事件
    $('body').on('click', '.btn-del', function () {
        let len = $('.btn-del').length
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            let id = $(this).attr('data-Id')
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log(res)
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })

            layer.close(index);
        });
    })



})
