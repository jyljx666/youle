define(['jquery'], function() {
    return {
        init: function() {
            let sid = location.search.split('=')[1]
                //渲染
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/youle/projectname/php/detail.php",
                data: {
                    sid: sid
                },
                dataType: "json",
                success: function(res) {
                    console.log(res)
                    let tps = res.piclisturl.split(',')
                    let str = ''
                    $('.xt').attr({ src: `${res.url}` })
                    $('.productInfo>h1').html(res.title)
                    $('.bh').html('105050' + res.sid)
                    $('.jq').html(parseInt(res.price).toFixed(2))
                    $('.yjg').html(parseInt(res.price * 0.9).toFixed(2))
                    for (let value of tps) {
                        str += `
                        <li><img src="${value}" alt="" class=""></li>
                       `
                    }
                    $('.sp-hf').html(str)

                    $('.dt').attr({
                        src: tps[0]
                    });
                }
            });

            //放大镜
            $('.sp-sp-box').hover(function() {
                $('.sp-fd').show()
                $('.sp-fx').show()
                $('.sp-fx').css({
                    width: parseFloat($('.sp-fd').width()) * parseFloat($('.xt').width()) / parseFloat($('.dt').width()),
                    height: parseFloat($('.sp-fd').height()) * parseFloat($('.xt').height()) / parseFloat($('.dt').height())
                })
                $('.sp-sp-box').on('mousemove', function(e) {
                    let y = e.pageY
                    let x = e.pageX
                    let bl = parseFloat($('.sp-fd').outerWidth()) / parseFloat($('.sp-fx').outerWidth())
                    let xx = x - $('.xt').offset().left - parseFloat($('.sp-fx').outerWidth()) / 2
                    let yy = y - $('.xt').offset().top - parseFloat($('.sp-fx').outerHeight()) / 2
                    console.log(y, x)

                    if (xx < 0) {
                        xx = 0
                    } else if (xx > parseFloat($('.xt').outerWidth()) - parseFloat($('.sp-fx').outerWidth())) {
                        xx = parseFloat($('.xt').outerWidth()) - parseFloat($('.sp-fx').outerWidth())
                    }
                    if (yy < 0) {
                        yy = 0
                    } else if (yy > parseFloat($('.xt').outerHeight()) - parseFloat($('.sp-fx').outerHeight())) {
                        yy = parseFloat($('.xt').outerHeight()) - parseFloat($('.sp-fx').outerHeight())
                    }

                    $('.sp-fx').css({
                        left: xx,
                        top: yy
                    })

                    $('.dt').css({
                        left: -xx * bl,
                        top: -yy * bl
                    })
                })

            }, function() {
                $('.sp-fd').hide()
                $('.sp-fx').hide()
            })

            $('.sp-hf').on('mouseover', 'li', function() {
                console.log($(this).find('img').attr('src'))
                let src = $(this).find('img').attr('src')
                console.log(src)

                $('.xt').attr({
                    src: src
                })

                $('.dt').attr({
                    src: $(this).find('img').attr('src')
                });
            })

            function yd() {
                let index = 0;
                let pd = null
                let liwidth = null
                console.log(index, pd)
                $('.sp-yb').on('click', function() {
                    pd = $('.sp-hf>li').length - 5
                    liwidth = parseFloat($('.sp-hf>li').eq(0).width())
                    console.log(index, pd)
                    if (index < pd) {
                        index++
                        console.log(index, pd)
                        $('.sp-hf').stop(true).animate({
                            left: -liwidth * index
                        })

                        $('')
                    }
                    if (index == 3) {
                        $('.sp-yb').css("background-position", "-32px 22px")
                    }
                    $('.sp-zb').css("background-position", "-22px 22px")

                })

                $('.sp-zb').on('click', function() {
                    pd = $('.sp-hf>li').length - 5
                    liwidth = parseFloat($('.sp-hf>li').eq(0).width())
                    if (index > 0) {
                        index--
                        $('.sp-hf').stop(true).animate({
                            left: -liwidth * index
                        })
                    }

                    if (index == 0) {
                        $('.sp-zb').css("background-position", "0px 22px")
                    }
                    $('.sp-yb').css("background-position", "-11px 22px")

                })
            }
            yd()






        }
    }
})