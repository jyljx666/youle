require.config({
    paths: {
        "jquery": 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery',
        "index_module": './index_module',
        "lazyload": 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min',
    },
    shim: {
        lazyload: "jquery",
    }
})

require(['jquery'], function($) {
    let mod = $('#md').attr('page')
    require([mod], function(mod) {
        mod.init()
    })
})