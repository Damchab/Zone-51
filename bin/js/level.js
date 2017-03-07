define(
        [ 'jquery', 'js/view/levelview', 'js/gameplane/grid',
                'js/gameobject/box', 'js/gameobject/boxend',
                'js/gameobject/player', 'js/view/playerview',
                'js/view/boxview', 'js/view/boxendview',
                'js/controller/controller', 'js/view/resize','js/sounds', 'js/winscreen'],
        function($, LevelView, Grid, Box, Boxend, Player, playerView, boxView,
                boxEndView, Controller, resize, Sounds, Winscreen) {

            var Level = function(id) {
                this.id = id;
                console.log(this.id);
                this.grid = new Grid();
                this.player = new Player();
                this.boxes = [];
                this.boxesFeature = [];
                this.boxesEnd = [];
                this.par = -1;
                this.winScreen;
                
                $(window).resize(resize);
                
            };

            /* PUBLIC */

           

            Level.prototype.init = function(level) {
                
                Sounds.stop(Sounds.menu);
                Sounds.play(Sounds.game);
                this.grid.load(level.map);
                this.par = level.par;
                this.winScreen= new Winscreen(this.id,this.par);
                this.startObjectsPositions();
//                console.log(data);
            };

            Level.prototype.startObjectsPositions = function() {
                var objectsImportantStartLength = this.grid.objectsImportantStart.length;
                for (var i = 0; i < objectsImportantStartLength; i++) {
                    var item = this.grid.objectsImportantStart[i];
                    switch (item.type) {
                    case 'boxend':
                        this.boxesEnd.push(new Boxend(item.x, item.y, item.x
                                + '_' + item.y));
                        break;
                    case 'playerstart':
                        this.player.setPosition(item.x, item.y);
                        this.player.setDirection('down');
                        break;
                    case 'boxstart':
                        this.boxes.push(new Box(item.x, item.y, item.x + '_'
                                + item.y, ''));
                        break;
                    case 'boxfeaturestart':
                        this.boxesFeature.push(new Box(item.x, item.y, item.x
                                + '_' + item.y, 'feature'));
                        break;
                    default:
                        break;
                    }
                }

                this.display();

                Controller.init(this.grid, this.player, this.boxes, this.boxesEnd,
                        this.boxesFeature, this.winScreen);
                resize();

            };

            Level.prototype.display = function() {
                new LevelView(this.grid.gridToDisplay(), this.grid.height,
                        this.grid.width);

                playerView(this.player.x, this.player.y, this.player.direction);

                var boxesLength = this.boxes.length;
                var boxesFeatureLength = this.boxesFeature.length;
                var boxesEndLength = this.boxesEnd.length;

                for (var j = 0; j < boxesLength; j++) {
                    boxView(this.boxes[j].x, this.boxes[j].y, this.boxes[j].id,
                            this.boxes[j].type);
                }

                for (var j = 0; j < boxesFeatureLength; j++) {
                    boxView(this.boxesFeature[j].x, this.boxesFeature[j].y,
                            this.boxesFeature[j].id, this.boxesFeature[j].type);
                }

                for (var k = 0; k < boxesEndLength; k++) {
                    boxEndView(this.boxesEnd[k].x, this.boxesEnd[k].y,
                            this.boxesEnd[k].id);
                }
            };

            /* PRIVATE */

            return Level;
        });