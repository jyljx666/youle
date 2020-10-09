require.config({
    paths: {
        "jquery": './lib/jquery',
        "index_module": './index_module',
        "lazyload": 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min',
        "pagination": './lib/pagination',
        "cookie": './lib/cookie',
        "cart_module": './cart_module',
        "jm": './lib/jm'
    },
    shim: {
        lazyload: "jquery",
        pagination: 'jquery',
        jm: 'jquery'
    }
})

require(['jquery', 'lazyload', 'cookie'], function($) {
    let mod = $('#md').attr('page')
    require([mod], function(mod) {
        mod.init()
    })
})