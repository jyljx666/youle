define(['jquery', 'jm'], function() {
    return {
        init: function() {
            let yh = localStorage.getItem('user')
            $('.formSubmit').on('click', function() {
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1/youle/projectname/php/login.php",
                    data: {
                        username: $('#username').val(),
                        password: $.sha1($('#password').val())
                    },
                    dataType: "json",
                    success: function(res) {
                        if (res.pd) {
                            if ($('#jz').prop('checked')) {
                                let user = {
                                    username: $('#username').val(),
                                    password: $('#password').val()
                                }
                                localStorage.setItem('user', JSON.stringify(user))
                            } else {
                                localStorage.removeItem('user')
                            }
                            location.href = "http://127.0.0.1/youle/projectname/src/index.html"

                        } else {
                            alert('密码或账号错误')
                            history.go(0)
                        }
                    }
                });

            })

            if (yh) {
                yh = JSON.parse(yh)
                $('#username').val(yh.username)
                $('#password').val(yh.password)
                $('#jz').prop('checked', true)
            }
        }
    }
})