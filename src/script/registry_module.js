define([
    'jquery', 'jm'
], function() {
    return {
        init: function() {

            // function zc() {
            //     let c = $('[data-pd=true]').size()
            //     if (c == 4) {
            //         alert(1)
            //     }
            // }
            $('#username').on('input', function() {
                let str = $('#username').val()
                let reg = /^[A-z]\w{5,15}$/;
                let pd = reg.test(str)
                if (pd) {
                    $.ajax({
                        type: "post",
                        url: "http://127.0.0.1/youle/projectname/php/pd.php",
                        data: {
                            username: str
                        },
                        dataType: "json",
                        success: function(res) {
                            $('.username').text(res.msg)
                            if (res.pd) {
                                $('.username').css({
                                    color: "green"
                                })
                                $('#username').attr('data-pd', true)
                            } else {
                                $('.username').css({
                                    color: "red"
                                })
                                $('#username').attr('data-pd', false)
                            }

                        }
                    });

                } else {
                    $('.username').css({
                        color: "red"
                    })
                    $('.username').text('字母开头，长度6到15')
                    $('#username').attr('data-pd', false)
                }
                zc()
            })

            $('#email').on('change', function() {
                let str = $('#email').val()
                let reg = /^\w{6,16}@[A-z0-9_-]{2,}\.[A-z]{2,7}\.?[A-z]*$/
                pd = reg.test(str)
                if (pd) {
                    $('#email').attr('data-pd', true)
                    $('.email').text('邮箱可以使用')
                    $('.email').css({
                        color: "green"
                    })
                } else {
                    $('.email').text('请输入正确的邮箱格式')
                    $('.email').css({
                        color: "red"
                    })
                    $('#email').attr('data-pd', false)
                }
                zc()
            })

            $('#password').on('change', function() {
                let str = $('#password').val()
                let reg = /^.{6,16}$/
                let pd = reg.test(str)
                if (pd) {
                    $('#password').attr('data-pd', true)
                    $('.password').text('密码可以使用')
                    $('.password').css({
                        color: "green"
                    })
                } else {
                    $('#password').attr('data-pd', false)
                    $('.password').text('密码不足6位')
                    $('.password').css({
                        color: "red"
                    })
                }

                if ($('#password').val() === $('#pawchecked').val()) {
                    $('#pawchecked').attr('data-pd', true)
                    $('.pawchecked').text('密码一致')
                    $('.pawchecked').css({
                        color: "green"
                    })
                } else {
                    $('#pawchecked').attr('data-pd', false)
                    $('.pawchecked').text('密码不一致')
                    $('.pawchecked').css({
                        color: "red"
                    })
                }
                zc()
            })


            $('#pawchecked').on('change', function() {
                if ($('#password').val() === $('#pawchecked').val()) {
                    $('#pawchecked').attr('data-pd', true)
                    $('.pawchecked').text('密码一致')
                    $('.pawchecked').css({
                        color: "green"
                    })
                } else {
                    $('#pawchecked').attr('data-pd', false)
                    $('.pawchecked').text('密码不一致')
                    $('.pawchecked').css({
                        color: "red"
                    })
                }
                zc()
            })


            function zc() {
                let c = $('[data-pd=true]').size()
                if (c == 4) {
                    $('.reg-btn').css({
                        'background-position': " 0px -196px"
                    })
                }
            }

            $('.reg-btn').on('click', function() {
                let c = $('[data-pd=true]').size()
                if (c == 4) {
                    $.ajax({
                        type: "post",
                        url: "http://127.0.0.1/youle/projectname/php/registry.php",
                        data: {
                            username: $('#username').val(),
                            password: $.sha1($('#password').val()),
                            email: $('#email').val()
                        },
                        dataType: "json",
                        success: function(res) {
                            if (res.zt) {
                                alert('注册成功')
                                location.href = "http://127.0.0.1/youle/projectname/src/login.html"
                            }
                        }
                    });
                }
            })

        }
    }

});