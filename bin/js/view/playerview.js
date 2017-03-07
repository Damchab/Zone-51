define(
        [ 'jquery' ],
        function($) {

            var div = '<div id="player"></div>';

            

            function playerView(x, y, direction) {
               
                $('#player').remove();
                if ($('.square[data-x="' + x + '"][data-y="' + y + '"]')
                        .children().is('.boxend')) {
                    $('.square[data-x="' + x + '"][data-y="' + y + '"]')
                            .children()
                            .append(
                                    $(div)
                                            .css(
                                                    {
                                                        background : 'transparent url("./pictures/player/alien'
                                                                + direction
                                                                + '.png") no-repeat',
                                                        backgroundPosition : 'bottom',
                                                        backgroundSize : 'contain',
                                                        bottom : '20%',
                                                        zIndex : y
                                                    }));
                } else {
                    $('.square[data-x="' + x + '"][data-y="' + y + '"]')
                            .append(
                                    $(div)
                                            .css(
                                                    {
                                                        background : 'transparent url("./pictures/player/alien'
                                                                + direction
                                                                + '.png") no-repeat',
                                                        backgroundPosition : 'bottom',
                                                        backgroundSize : 'contain',
                                                        bottom : '40%',
                                                        zIndex : y
                                                    }));
                }
                
            }
            return playerView;
        });