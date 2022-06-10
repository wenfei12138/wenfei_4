$(function() {
    getHeader()

    function getHeader() {
        $.ajax({
            type: "GET",
            url: 'http://big-event-api-t.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || '',
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败!')
                }
                console.log(res);
                rederHeader(res.data);
            },
            complete: function(res) {
                console.log(res.responseJSON);
                if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
                    localStorage.removeItem('token')
                    location.href = '/login.html'
                }
            }
        })
    }

    function rederHeader(user) {
        let name = user.username || user.nickname
        console.log(name);
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text_avtar').hide()

        } else {
            $('.layui-nav-img').hide()

            let f = name[0].toUpperCase()
            $('.text_avtar').html(f).show()
        }
    }
    let layer = layui.layer
    $('#logout').on('click', function() {
        layer.confirm('此操作将退出登录, 是否继续?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        });
    })
})