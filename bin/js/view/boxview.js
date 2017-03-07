define([ 'jquery' ], function($) {

    var div = '<div class="box"></div>';

    function boxView(x, y, id, type) {
        $('.box[id=' + id + ']').remove();
        if($('.square[data-x="' + x + '"][data-y="' + y + '"]').children().is('.boxend')){
            $('.square[data-x="' + x + '"][data-y="' + y + '"]').children().append(
                    $(div).attr('id', id).css({
                        background : 'transparent url("./pictures/box'+ type +'.png") no-repeat',
                        backgroundPosition : 'bottom',
                        backgroundSize : 'contain',
                        bottom : '10%',
                        zIndex : y
                    }));
        }else{
        $('.square[data-x="' + x + '"][data-y="' + y + '"]')
                .append(
                        $(div).attr('id', id).css({
                                                    background : 'transparent url("./pictures/box'+ type +'.png") no-repeat',
                                                    backgroundPosition : 'bottom',
                                                    backgroundSize : 'contain',
                                                    bottom : '30%',
                                                    zIndex : y
                                                }));
        }

    }
    return boxView;
});