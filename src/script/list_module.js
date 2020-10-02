define(['jquery', 'lazyload', 'pagination'], function() {
    return {
        init: function() {
            let array_default = []; //排序前的li数组，默认数组
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null; //后一个价格
            let page = null;

            //算页数

            $.ajax({
                type: "post",
                url: "http://127.0.0.1/youle/projectname/php/index.php",
                dataType: "json",
                success: function(res) {
                    page = Math.ceil(res.length / 10)
                    localStorage.setItem("page", page)
                }
            });

            page = localStorage.getItem("page")
            console.log(page)

            //渲染
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/youle/projectname/php/list.php",
                dataType: "json",
                success: function(res) {
                    let str = ''
                    for (let value of res) {
                        str += `
                        <a href="http://127.0.0.1/youle/projectname/src/detail.html?sid=${value.sid}">
                        <div class="noPre">
                            <img data-original="${value.url}" alt="" class="lazy">
                            <p>${value.title}</p>
                            <div class="price">
                                ￥<span>${value.price}</span>
                                <div>限</div>
                            </div>
                            <div class="shop_area">
                                <span>大良生鲜食品</span>
                                <span>广东</span>
                            </div>
                        </div>
                        <div class="dp-pf">
                            店铺评分：4.7
                        </div>
                        </a>
                        `
                    }
                    $('.list-main').html(str);
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });

                    array_default = []; //排序前的li数组，默认数组
                    array = []; //排序中的数组
                    prev = null; //前一个价格
                    next = null; //后一个价格
                    $('.list-main>a').each(function(i, elm) {
                        array_default[i] = $(elm)
                        array[i] = $(elm)
                    })


                }
            });


            //分页
            $('.page').pagination({
                pageCount: page, //总的页数 - 后端传入的。
                jump: false, //是否开启跳转到指定的页数，布尔值。
                coping: false, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                // homePage: '首页',
                // endPage: '尾页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取的页码给后端
                    $.ajax({
                        type: "post",
                        url: "http://127.0.0.1/youle/projectname/php/list.php",
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: "json",
                        success: function(res) {
                            let str = ''
                            for (let value of res) {
                                str += `
                                                        <a href="http://127.0.0.1/youle/projectname/src/detail.html?sid=${value.sid}">
                                                        <div class="noPre">
                                                            <img data-original="${value.url}" alt="" class="lazy">
                                                            <p>${value.title}</p>
                                                            <div class="price">
                                                                ￥<span>${value.price}</span>
                                                                <div>限</div>
                                                            </div>
                                                            <div class="shop_area">
                                                                <span>大良生鲜食品</span>
                                                                <span>广东</span>
                                                            </div>
                                                        </div>
                                                        <div class="dp-pf">
                                                            店铺评分：4.7
                                                        </div>
                                                        </a>
                                                        `
                            }
                            $('.list-main').html(str);
                            $("img.lazy").lazyload({
                                effect: "fadeIn" //图片显示方式
                            });

                            array_default = []; //排序前的li数组，默认数组
                            array = []; //排序中的数组
                            prev = null; //前一个价格
                            next = null; //后一个价格

                            $('.list-main>a').each(function(i, elm) {
                                array_default[i] = $(elm)
                                array[i] = $(elm)
                            })

                        }
                    });

                }
            })

            //排序
            $('.px-sx').on('click', function() {
                console.log(11111111111);
                $('.px-sx').addClass('d-bj').siblings().removeClass('d-bj')
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - 1 - i; j++) {
                        prev = parseFloat(array[j].find('.price').find('span').text())
                        next = parseFloat(array[j + 1].find('.price').find('span').text())
                        if (next > prev) {
                            let temp = array[j]
                            array[j] = array[j + 1]
                            array[j + 1] = temp
                        }
                    }
                }
                for (let value of array) {
                    $('.list-main').append(value[0])
                }
            })


            $('.px-mr').on('click', function() {
                $('.px-mr').addClass('d-bj').siblings().removeClass('d-bj')
                for (let value of array_default) {
                    $('.list-main').append(value[0])
                }
            })


            $('.shopcart-sum').on('click', function() {
                location.href = "http://127.0.0.1/youle/projectname/src/cart.html"
            })

        }
    }
})