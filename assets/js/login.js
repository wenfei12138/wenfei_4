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
            /^[\S]{6,12}$/,
            '密码必须6到16位,且不能出现空格'
        ],


        rpwd: function name(value) {
            let p = $('#p').val()
            if (value !== p) {
                return '两次密码不一致'
            }
        }
    })

    // 注册
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#name').val(),
                password: $('#p').val()
            },
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message + '请登入')
                $('#login').click();
            }
        })
    })


    // 登入
    $('#form_login').on('submit', function(e) {
        // console.log($(this).serialize());
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('登入失败')
                }
                layer.msg('登入成功')
                console.log(res);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})