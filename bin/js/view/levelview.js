define(
        [ 'jquery', 'js/view/gridview' ],
        function($, GridView) {

            var LevelView = function(grid, height, width) {
                this.deleteview();
                this.gridview = new GridView(grid, height, width);
            }

            LevelView.prototype.deleteview = function() {
                $('body').empty();
                $('body').append('<img class="logo" src="./pictures/logo.png"></img>');
            };

            return LevelView;

        });