define([ 'jquery' ], function($) {

    function resize() {
        var newSquareHeightSize;
        var newSquareWidthSize;
        if ($(window).width() > $(window).height()) {
            newSquareWidthSize = $(window).height() * 0.09;
            newSquareHeightSize = newSquareWidthSize * 0.75;
        } else {
            newSquareWidthSize = $(window).width() * 0.09;
            newSquareHeightSize = newSquareWidthSize * 0.75;
        }

        $('.square').width(newSquareWidthSize).height(newSquareHeightSize);
        $('.box').width(newSquareWidthSize).height(newSquareWidthSize);

        $('.wall2').width(newSquareWidthSize).height(newSquareWidthSize);
        $('.boxend').width(newSquareWidthSize).height(newSquareWidthSize);
        $('#player').width(newSquareWidthSize).height(newSquareWidthSize);
        $('.logo').width(newSquareWidthSize*9).height('auto');
     };

    return resize;
});