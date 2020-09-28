define(['jquery'], function() {
    return {
        init: function() {

            //渲染
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/youle/projectname/php/index.php",
                dataType: "json",
                success: function(res) {
                    console.log(res)
                    console.log($('.tejia-main-box>li').length)

                    function tj() {
                        str = ''
                        for (let i = 0; i < $('.tejia-main-box>li').length; i++) {
                            str += `
                            <li>
                            <img src="${res[i].url}" alt="">
                            <a href="">${res[i].title}</a>
                            <p>￥<span>${res[i].price}</span></p>
                            </li>
                            `
                        }
                        $('.tejia-main-box').html(str)
                    }
                    tj()

                    function gyg() {
                        str = ''
                        for (let obj of res) {
                            str += `
                            <li>
                            <img src="${obj.url}" alt="">
                            <a href="">${obj.title}</a>
                            <div class="prod-price">
                                <div class="prod-price-zb">
                                    ￥${obj.price}
                                </div>
                                <div class="prod-price-yb">
                                    <span></span> ¥${(obj.price*0.8).toFixed(2)}
                                </div>
                            </div>
                            <div class="sp-cd">
                                <span class="sp-cd-zb">萬家宴粮油旗舰店</span>
                                <span class="sp-cd-yb">上海</span>
                            </div>
                        </li>
                            
                            `
                        }
                        $('.gyg-sp').html(str)
                    }
                    gyg()
                }
            });


            //特价的小轮播图
            $('.tejia-nav>div').on('mousemove', function() {
                $(this).addClass('tj-av').siblings().removeClass('tj-av')
            })


            $('.nav-btn1').on('mousemove', function() {
                $('.nav-btn2>span').css({
                    'background-position': "-104px 0px"
                })
                $('.nav-btn1>span').css({
                    'background-position': "0px 0px"
                })

                $('.tejia-main-box').stop(true).animate({
                    top: '0px'
                }, 400)
            })
            $('.nav-btn2').on('mousemove', function() {
                $('.nav-btn2>span').css({
                    'background-position': "-131px 0px"
                })
                $('.nav-btn1>span').css({
                    'background-position': "-24px 0px"
                })
                $('.tejia-main-box').stop(true).animate({
                    top: '-275px'
                }, 400)
            })





            //楼梯特效    
            function pdwz() {
                $('.sejianbox').each(function(i, elm) {
                    if ($(elm).offset().top + 200 > $(window).scrollTop()) {
                        let ys = $('.sejianbox').eq(i).find('h3').css('color');
                        $('#floatTool>ul>li').eq(i).css('background-color', ys).siblings().css({
                            "background-color": ""
                        })
                        $('#floatTool>ul>li').eq(i).addClass('zt-ys').siblings().removeClass('zt-ys')
                        return false
                    }
                })
            }


            if ($(window).scrollTop() > $('.sejianbox').eq(0).offset().top) {
                $('#floatTool')[0].style.display = 'block'
                pdwz()
            } else {
                $('#floatTool')[0].style.display = 'none'
            }


            $(window).on('scroll', function() {
                if ($(window).scrollTop() > $('.sejianbox').eq(0).offset().top) {
                    $('#floatTool')[0].style.display = 'block'
                    pdwz()

                } else {
                    $('#floatTool')[0].style.display = 'none'
                }
            })



            $('#floatTool>ul>li').on('click', function() {
                let index = $(this).index();
                let ys = $('.sejianbox').eq(index).find('h3').css('color');

                $(this).css('background-color', ys).siblings().css({
                    "background-color": ""
                })
                $(this).addClass('zt-ys').siblings().removeClass('zt-ys')
                $('html').stop(true).animate({
                    scrollTop: ($('.sejianbox').eq(index).offset().top)
                })
            })

            //回到顶部
            $('#floatTool .fhdb').on('click', function() {
                $('html').stop(true).animate({
                    scrollTop: 0
                })
            })


            //二级菜单
            $('.fl-dh>li').hover(function() {
                let thisa = this;
                $('.ejbox').show()
                $(this).addClass('bj-ys').siblings().removeClass('bj-ys')
                $('.ejbox>div').eq($(this).index()).show().siblings().hide()

                $('.ejbox').hover(function() {
                    $('.ejbox').show()
                    $(thisa).addClass('bj-ys').siblings().removeClass('bj-ys')
                }, function() {
                    $('.ejbox').hide()
                    $('.fl-dh>li').removeClass('bj-ys')
                })

            }, function() {
                $('.fl-dh>li').removeClass('bj-ys')
                $('.ejbox').hide()
            })


            //轮播图
            function lb() {
                let index = 0;
                let timer = null;
                clearInterval(timer)
                jc()
                timer = setInterval(function() {
                    index++
                    if (index > $('.carousel>ul>li').length - 1) {
                        index = 0
                            // $('.carousel>ul>li').eq(index).animate({
                            //     opacity: 1
                            // }).siblings().animate({
                            //     opacity: 0
                            // })
                    }
                    $('.carousel>ul>li').eq(index).animate({
                        opacity: 1
                    }).siblings().animate({
                        opacity: 0
                    })
                    $('.lb-box>li').eq(index).addClass('lb-bj').siblings().removeClass('lb-bj')
                    console.log(index)
                    jc()
                }, 2000)


                $('.lb-box>li').on('mousemove', function() {
                    console.log(index)
                    $(this).addClass('lb-bj').siblings().removeClass('lb-bj')
                    index = $(this).index()
                    $('.carousel>ul>li').eq(index).css({
                        opacity: 1
                    }).siblings().css({
                        opacity: 0
                    })
                    jc()
                    clearInterval(timer)
                    timer = setInterval(function() {
                        index++
                        if (index > $('.carousel>ul>li').length - 1) {
                            index = 0
                        }
                        $('.carousel>ul>li').eq(index).animate({
                            opacity: 1
                        }).siblings().animate({
                            opacity: 0
                        })
                        $('.lb-box>li').eq(index).addClass('lb-bj').siblings().removeClass('lb-bj')
                        jc()
                    }, 2000)
                })

            }
            //改变背景颜色的检查
            function jc() {
                switch (index) {
                    case 0:
                        $('#mod-topslide').css({ backgroundColor: '#ee6900' })
                        break;
                    case 1:
                        $('#mod-topslide').css({ backgroundColor: '#eb8203' })
                        break;
                    case 2:
                        $('#mod-topslide').css({ backgroundColor: '#e75607' })
                        break;
                    case 3:
                        $('#mod-topslide').css({ backgroundColor: '#6b01c7' })
                        break;
                    case 4:
                        $('#mod-topslide').css({ backgroundColor: '#fea525' })
                        break;
                    case 5:
                        $('#mod-topslide').css({ backgroundColor: '#fcf197' })
                        break;
                    case 6:
                        $('#mod-topslide').css({ backgroundColor: '#ffa08c' })
                        break;
                    case 7:
                        $('#mod-topslide').css({ backgroundColor: '#8e3c26' })
                        break;
                    case 8:
                        $('#mod-topslide').css({ backgroundColor: '#0193e6' })
                        break;
                    case 9:
                        $('#mod-topslide').css({ backgroundColor: '#22449d' })
                        break;

                }
            }
            lb()
        }



    }
})