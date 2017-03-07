define([ 'jquery' ], function($) {

    var div = '<div class="wall2"></div>';

    function wallView(x, y, id, type) {
        $('.wall2[id=' + id + ']').remove();
        
        $('.square[data-x="' + x + '"][data-y="' + y + '"]')
                .append(
                        $(div).attr('id', id).css({
                                                    background : 'transparent url("./pictures/wall/'+ type +'.png") no-repeat',
                                                    backgroundPosition : 'bottom',
                                                    backgroundSize : 'contain',
                                                    bottom : '30%',
                                                    zIndex : y
                                                }));
        }

    
    return wallView;
});