define([ 'jquery' ], function($) {

    var div = '<div class="boxend"></div>';

    function boxView(x, y, id, type) {
        $('.box[id=' + id + ']').remove();
        $('.square[data-x="' + x + '"][data-y="' + y + '"]')
                .append(
                        $(div).attr('id', id).css({
                                                    background : 'transparent url("./pictures/boxend.png") no-repeat',
                                                    backgroundPosition : 'bottom',
                                                    backgroundSize : 'contain',
                                                    zIndex : y
                                                }));
        console.log('boxView')
    }
    return boxView;
});