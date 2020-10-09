define(['jquery', 'cookie'], function($, cookie) {

    return {
        init: function() {

            let shanp = cookie.get('shanp')
            let arr = null
            let idlist = null
            if (shanp) {
                shanp = JSON.parse(shanp)
                arr = shanp.map(function(elm) {
                    return elm.sid
                })
                idlist = arr.join(',')
            } else {
                alert('还没有添加商品到购物车')
            }
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/youle/projectname/php/cart.php",
                data: {
                    idlist: idlist
                },
                dataType: "json",
                success: function(res) {
                    let str = ''
                    let arr = ''
                    res.forEach(function(elm) {

                        arr = shanp.filter(function(a) {
                            return a.sid == elm.sid
                        })
                        console.log(arr)
                        str += `
                        <ul class="cart-nav" id="${elm.sid}">
                        <li class="item-check">
                            <input type="checkbox" name="" id="">
                        </li>
                        <img src="${elm.url}" alt="" class="item-img">
                        <li class="item-name">
                            ${elm.title}
                        </li>
                        <li class="item-price">
                            ¥<span>${elm.price}</span>
                        </li>
                        <li class="item-count">
                            <span class="sl-ys">
                                <span class="sl-jq">-</span>
                            <input type="text" class="sl" value="${arr[0].num}">
                            <span class="sl-jr">+</span>
                            </span>
                        </li>
                        <li class="item-total">
                            ¥<em>${elm.price*arr[0].num}</em>
                        </li>
                        <li class="item-action">
                            <span class="action-shou">收藏</span>
                            <span class="action-shan">删除</span>
                        </li>
                        </ul>
  
                        `
                    })

                    $('.cart-main').html(str)

                    js2()
                }
            });
            //减数量
            $('.cart-main').on('click', '.sl-jq', function() {
                console.log($(this).next().val())
                let a = $(this).next().val()
                let sid = $(this).parents('.cart-nav').attr('id')
                let dj = $(this).parent().parent().prev().find('span').text()
                if (a > 1) {
                    a--
                    $(this).next().val(a)
                    shanp.forEach(function(elm) {
                        elm.sid == sid ? elm.num = a : null;
                    })
                    cookie.set('shanp', JSON.stringify(shanp), 1);
                    $(this).parent().parent().next().find('em').text(a * dj)
                }

                console.log($(this).parent().parent().prev().find('span').text())
                js()
                js2()
            })



            //加数量
            $('.cart-main').on('click', '.sl-jr', function() {
                // console.log($(this).prev().val())
                let a = $(this).prev().val()
                let sid = $(this).parents('.cart-nav').attr('id')
                let dj = $(this).parent().parent().prev().find('span').text()
                a++
                $(this).prev().val(a)
                shanp.forEach(function(elm) {
                    elm.sid == sid ? elm.num = a : null;
                })
                cookie.set('shanp', JSON.stringify(shanp), 1);
                $(this).parent().parent().next().find('em').text(a * dj)
                js()
                js2()
            })

            $('.cart-main').on('click', '.action-shan', function() {
                let a = confirm('是否删除');
                let sid = $(this).parents('.cart-nav').attr('id')
                if (a) {
                    $(this).parents('.cart-nav').remove()
                    shanp = shanp.filter(function(elm) {
                        return elm.sid != sid
                    })
                    cookie.set('shanp', JSON.stringify(shanp), 1);
                }
                js()
                js2()
            })

            //全选
            $('.qx').on('click', function() {
                $('input:checkbox').not('.qx').prop('checked', $('.qx').prop('checked'))

                console.log($('.cart-main>input:checked'))
                js()
                    // $('.cart-head>.item-check>input').prop('checked', $('.qx').prop('checked'))
                pd()
            })


            //全选
            $('.cart-head>.item-check>input').on('click', function() {
                $('input:checkbox').not('.cart-head>.item-check>input').prop('checked', $('.cart-head>.item-check>input').prop('checked'))
                js()
                pd()
            })


            //删除选择
            $('.btn-delsel').on('click', function() {
                for (let value of $('.cart-main input:checked').parents('.cart-nav')) {
                    let sid = $(value).attr('id')
                    shanp = shanp.filter(function(elm) {
                        return elm.sid != sid
                    })
                }
                cookie.set('shanp', JSON.stringify(shanp), 1)
                $('.cart-main input:checked').parents('.cart-nav').remove()

            })


            //全选判断
            $('.cart-main').on('click', '.item-check input', function() {
                if ($('.cart-main input:checked').size() == shanp.length) {
                    $('.qx').prop('checked', true)
                    $('.cart-head>.item-check>input').prop('checked', true)
                } else {
                    $('.qx').prop('checked', false)
                    $('.cart-head>.item-check>input').prop('checked', false)
                }
                js()
                pd()
            })


            //总计
            function js() {
                let sl = null
                let zq = null
                for (let value of $('.cart-main input:checked')) {
                    zq += parseFloat($(value).parents('.cart-nav').find('.item-total').find('em').text())
                    sl += parseInt($(value).parents('.cart-nav').find('.sl').val())
                }
                console.log(sl, zq)
                $('.prod-count strong').text(sl)
                $('.prod-price strong').text(zq)
                $('.prod-q span').text(zq + '.00')
                if ($('.cart-main input:checked').size() == 0) {
                    $('.prod-count strong').text(0)
                    $('.prod-price strong').text(0)
                    $('.prod-q span').text(0.00)
                }
            }

            function js2() {
                let sl = null
                for (let value of $('.cart-main .item-check input')) {
                    sl += parseInt($(value).parents('.cart-nav').find('.sl').val())
                    console.log($(value).parents('.cart-nav').find('.sl').val())
                }
                $('.title-zb em').text(sl)
            }

            function pd() {
                if ($('.cart-main input:checked').size() > 0) {
                    $('.btn-ordernow').removeClass('js')
                } else {
                    $('.btn-ordernow').addClass('js')
                }
            }

            //清空购物车
            $('.btn-clear').on('click', function() {
                cookie.set('shanp', '[]', 1)
                $('.cart-nav').remove()
                js()
                js2()
            })


            //登录状态判断
            if (localStorage.getItem('user')) {
                let user = localStorage.getItem('user')
                user = JSON.parse(user)
                $('.user').text(user.username)
                $('.d').hide()
                $('.z').hide()
                $('.t').show()
            }
            //退出功能
            $('.t').on('click', function() {
                localStorage.removeItem('user')
            })







        }
    }

})