requirejs.config({
    baseUrl : '',
    paths : {
        'jquery' : './libs/jquery/jquery-2.1.1.min',
        'howler' : './libs/howler/howler.min'
    },
    shim : {
        'jquery' : {
            exports : '$'
        },
        'howler' : {
            exports : 'Howl'
        }
    
    },
    urlArgs : "d=" + Date.now()
});

require(['jquery', 'js/loader' ], function($, Loader) {    
    $(function () {
        Loader.init();
    });
});
