$(function() {
    $('.login_box a').on('click', function() {
        $('.reg_box').show()
        $('.login_box').hide()
    })

    $('.reg_box a').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        reg_paw: function(val) {
            if (val !== $('#password').val()) {
                return '密码输入不一致'
            }
        }
    })


    $('#reg_form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            type: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登入！！')
                $('#reg_form a').click();
            }
        })
    })



    $('#login_form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return console.log(res);
                }
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })

})