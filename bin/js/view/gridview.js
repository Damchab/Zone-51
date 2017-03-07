define(
        [ 'jquery', 'js/view/wallview' ],
        function($, wallView) {

            var GridView = function(grid, heigth, width) {
                this.height = heigth;
                this.width = width;
                this.grid = grid;
                this.display();
            }

            GridView.prototype.isInside = function(x, y) {
                return !(x < 0 || x >= this.width || y < 0 || y >= this.height);
            };

            GridView.prototype.getCell = function(x, y) {
                var valueReturn = false;
                if (this.isInside(x, y)) {
                    valueReturn = this.grid[x][y];
                }
                return valueReturn;
            };

            GridView.prototype.neighboursWall = function(x, y) {
                var valueReturn = [];

                var testLeftRight = this.isWallBorder([ {
                    'x' : x - 1,
                    'y' : y
                }, {
                    'x' : x + 1,
                    'y' : y
                } ]);
                var testDownUp = this.isWallBorder([ {
                    'x' : x,
                    'y' : y - 1
                }, {
                    'x' : x,
                    'y' : y + 1
                } ]);
                var testCorners = this.isWallBorder([ {
                    'x' : x - 1,
                    'y' : y - 1
                }, {
                    'x' : x - 1,
                    'y' : y + 1
                }, {
                    'x' : x + 1,
                    'y' : y - 1
                }, {
                    'x' : x + 1,
                    'y' : y + 1
                } ]);

                if (testLeftRight && testDownUp) {
                    valueReturn.push('downupleftright');

                } else if (testLeftRight) {
                    valueReturn.push('leftright');
                } else if (testDownUp) {
                    valueReturn.push('downup');
                } else if (testCorners) {
                    valueReturn.push('downupleftright');
                }

                return valueReturn;
            };

            GridView.prototype.isWallBorder = function(directions) {
                var test = false;
                var directionsLength = directions.length;
                for (var i = 0; i < directionsLength; i++) {
                    test = (this.getCell(directions[i].x, directions[i].y) === 'ground')
                            || test;
                }

                return test;
            };

            GridView.prototype.constructSquares = function() {
                var squareDiv = '<div class="square"></div>';

                for (var y = 0; y < this.height; y++) {

                    for (var x = 0; x < this.width; x++) {
                        var files = this.filesPictures(x, y);
                        var cssSquare = this.constructCSSSquare(files, y);
                        $('#gamezonein').append(
                                $(squareDiv).addClass(files.type).attr(
                                        'data-x', x).attr('data-y', y).css(
                                        cssSquare));
                        if (files.type == 'wall') {
                            if (files.files[0] == 'downupleftright.png') {
                                wallView(x,y,x+'_'+y,'downupleftright2');
                            } else if (files.files[0] == 'downup.png') {
                                wallView(x,y,x+'_'+y,'downup2');
                            } else if (files.files[0] == 'leftright.png') {
                                wallView(x,y,x+'_'+y,'leftright2');
                            }
                        }
                        if (x == 0) {
                            $(".square[data-x='" + x + "']").css('clear',
                                    'left');
                        }
                    }
                }
            };

            GridView.prototype.constructCSSSquare = function(files, zIndex) {
                var valueReturn = {};
                var filesLength = files.files.length;
                var backgroundImage = '';
                var backgroundPosition = '';
                var backgroundRepeat = '';
                var backgroundSize = '';
                for (var i = 0; i < filesLength - 1; i++) {
                    backgroundImage += 'url("./pictures/' + files.type + '/'
                            + files.files[i] + '"),';
                    backgroundPosition += 'left top,';
                    backgroundRepeat += 'no-repeat,';
                    backgroundSize += 'contain,';
                }
                backgroundImage += 'url("./pictures/' + files.type + '/'
                        + files.files[i] + '")';
                backgroundPosition += 'left top';
                backgroundRepeat += 'no-repeat';
                backgroundSize += 'contain';

                valueReturn = {
                    backgroundImage : backgroundImage,
                    backgroundPosition : backgroundPosition,
                    backgroundRepeat : backgroundRepeat,
                    backgroundSize : backgroundSize,
                    zIndex : zIndex
                };

                return valueReturn;
            };

            GridView.prototype.filesPictures = function(x, y) {
                var valueReturn = {};
                var type = this.getCell(x, y);
                if (type === 'ground') {
                    valueReturn.type = 'ground';
                    valueReturn.files = this.groundFile();
                } else {
                    valueReturn.type = 'wall';
                    valueReturn.files = this.wallFile(x, y);
                }
                // console.log('la',valueReturn);
                return valueReturn;
            };

            GridView.prototype.groundFile = function() {
                var valueReturn = [];
                valueReturn.push('ground' + (Math.floor(Math.random() * 4) + 1)
                        + '.png');
                return valueReturn;
            };

            GridView.prototype.wallFile = function(x, y) {
                var valueReturn = [];

                var neighbours = this.neighboursWall(x, y);
                var neighboursLength = neighbours.length;

                for (var i = 0; i < neighboursLength; i++) {
                    valueReturn.push(neighbours[i] + '.png');
                }
                valueReturn.push('');
                return valueReturn;
            };

            GridView.prototype.display = function() {
                $('body').append('<br />');
                $('body').append(
                        '<div id="gamezone"><div id="gamezonein"></div></div>');
                this.constructSquares();

            };

            return GridView;

        });
