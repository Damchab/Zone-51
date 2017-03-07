define(
        [ 'jquery', 'js/gameplane/grid', 'js/gameobject/box',
                'js/gameobject/boxend', 'js/view/boxview',
                'js/gameobject/player', 'js/view/playerview', 'js/view/resize',
                'js/sounds' ],
        function($, Grid, Box, Boxend, boxView, Player, playerView, resize,
                Sounds) {

            var Controller = function() {
                this.grid;
                this.player;
                this.playerView;
                this.boxes;
                this.boxesFeature;
                this.boxesEnd;
                this.countAction;
                this.win;
                this.winScreen
            };

            Controller.prototype.init = function(grid, player, boxes, boxesEnd,
                    boxesFeature, winScreen) {
                this.grid = grid;
                this.player = player;
                this.boxes = boxes;
                this.boxesEnd = boxesEnd;
                this.boxesFeature = boxesFeature;
                this.countAction = -1;
                this.winScreen = winScreen;
                this.addKeyListeners();
                this.addSaveAction();
                $(window).resize(resize);
            };

            Controller.prototype.addKeyListeners = function() {
                var that = this;

                $('body').keydown(

                function(event) {

                    if (event.keyCode === 37) {
                        // left
                        that.moveObjects(-1, 0, 'left');
                    } else if (event.keyCode === 39) {
                        that.moveObjects(1, 0, 'right');

                        // right
                    } else if (event.keyCode === 40) {
                        event.preventDefault(); // to avoid page
                        // scrolling
                        that.moveObjects(0, 1, 'down');
                        // down
                    } else if (event.keyCode === 38) {
                        event.preventDefault(); // to avoid page
                        // scrolling
                        that.moveObjects(0, -1, 'up');
                        // up
                    }
                });
                $('body').keyup(function(event) {
                    if (event.keyCode === 65) {
                        event.preventDefault(); // to avoid page scrolling
                        // undo
                        that.undoRedo(-1);
                    } else if (event.keyCode === 90) {
                        event.preventDefault(); // to avoid page scrolling
                        // redo
                        that.undoRedo(1);
                    }
                });

            };

            Controller.prototype.removeKeyListeners = function() {
                $('body').off();
            };

            Controller.prototype.moveObjects = function(offsetX, offsetY,
                    direction) {

                var newPlayerPostion = {
                    'x' : this.player.x + offsetX,
                    'y' : this.player.y + offsetY
                };
                this.player.setDirection(direction);
                playerView(this.player.x, this.player.y, this.player.direction);
                resize();
                if (this.grid.getCellType(newPlayerPostion.x,
                        newPlayerPostion.y) === 'wall') {
                    return;
                }

                var objectsMove = {
                    'player' : true,
                    'boxes' : [],
                    'boxesFeature' : []
                };

                var boxesLength = this.boxes.length;
                var boxesFeatureLength = this.boxesFeature.length;

                for (var i = 0; i < boxesLength; i++) {
                    if (this.boxes[i].x === newPlayerPostion.x
                            && this.boxes[i].y === newPlayerPostion.y) {
                        objectsMove.boxes.push(this.boxes[i]);
                        break;
                    }
                }

                var array = [];

                for (var j = 0; j < boxesFeatureLength; j++) {
                    array = [];
                    this.arrayFeatureMove(this.boxesFeature[j], offsetX,
                            offsetY, array);
                    var arrayLength = array.length;
                    if (arrayLength >= 0) {
                        for (var k = 0; k < arrayLength; k++) {
                            if (objectsMove.boxesFeature.indexOf(array[k], 0) === -1) {
                                objectsMove.boxesFeature.push(array[k]);
                            }
                        }
                    }
                }

                array.splice(0, array.length);
                if (objectsMove.boxes.length > 0) {
                    this.arrayFeatureMove(objectsMove.boxes[0], offsetX,
                            offsetY, array);
                    if (array.length <= 0) {
                        objectsMove.boxes.splice(0, objectsMove.boxes.length);
                        objectsMove.player = false;
                        return;
                    }
                }
                array.splice(0, array.length);
                this.arrayFeatureMove(this.player, offsetX, offsetY, array);
                if (array.length <= 0) {
                    objectsMove.player = false;
                    return;
                }

                this.displayObjectToMove(objectsMove, offsetX, offsetY);
                this.addSaveAction();
                this.winLevel();
            };

            Controller.prototype.displayObjectToMove = function(objestsToMove,
                    offsetX, offsetY) {
                this.player.setPosition(this.player.x + offsetX, this.player.y
                        + offsetY);
                playerView(this.player.x, this.player.y, this.player.direction);
                Sounds.stop(Sounds.feature);
                Sounds.stop(Sounds.box);
                Sounds.stop(Sounds.player);
                Sounds.play(Sounds.player);

                var objectsMoveBoxesLength = objestsToMove.boxes.length;
                var objectsMoveBoxesFeatureLength = objestsToMove.boxesFeature.length;

                if (objectsMoveBoxesLength > 0) {
                    Sounds.play(Sounds.box);
                }
                if (objectsMoveBoxesFeatureLength) {
                    Sounds.play(Sounds.feature);
                }

                for (var l = 0; l < objectsMoveBoxesLength; l++) {
                    objestsToMove.boxes[l].setPosition(objestsToMove.boxes[l].x
                            + offsetX, objestsToMove.boxes[l].y + offsetY);
                    boxView(objestsToMove.boxes[l].x, objestsToMove.boxes[l].y,
                            objestsToMove.boxes[l].id,
                            objestsToMove.boxes[l].type);
                }

                for (var m = 0; m < objectsMoveBoxesFeatureLength; m++) {
                    objestsToMove.boxesFeature[m].setPosition(

                    objestsToMove.boxesFeature[m].x + offsetX,
                            objestsToMove.boxesFeature[m].y + offsetY);
                    boxView(objestsToMove.boxesFeature[m].x,
                            objestsToMove.boxesFeature[m].y,
                            objestsToMove.boxesFeature[m].id,
                            objestsToMove.boxesFeature[m].type);
                }
                resize();
            }

            Controller.prototype.displayAllObjects = function() {
                playerView(this.player.x, this.player.y, this.player.direction);

                var boxesLength = this.boxes.length;
                var boxesFeatureLength = this.boxesFeature.length;

                for (var l = 0; l < boxesLength; l++) {
                    boxView(this.boxes[l].x, this.boxes[l].y, this.boxes[l].id,
                            this.boxes[l].type);
                }

                for (var m = 0; m < boxesFeatureLength; m++) {
                    boxView(this.boxesFeature[m].x, this.boxesFeature[m].y,
                            this.boxesFeature[m].id, this.boxesFeature[m].type);
                }
                resize();
            }

            Controller.prototype.arrayFeatureMove = function(object, offsetX,
                    offsetY, array) {

                var isBox = this.isBoxOrFeatureOrFalse(object.x + offsetX,
                        object.y + offsetY);
                if (object === this.player && isBox !== false) {
                    this.arrayFeatureMove(isBox, offsetX, offsetY, array);
                } else {

                    if (isBox !== false) {
                        // quand isBox est un box normal je marrete
                        if (isBox.type == '') {
                            array.splice(0, array.length);
                            return;
                        } else {// sinon teste la boite d'apres
                            array.push(object);
                            this.arrayFeatureMove(isBox, offsetX, offsetY,
                                    array);
                        }

                    } else if (this.grid.getCellType(object.x + offsetX,
                            object.y + offsetY) != 'wall') {
                        array.push(object);
                        return;
                    } else if (this.grid.getCellType(object.x + offsetX,
                            object.y + offsetY) == 'wall') {
                        array.splice(0, array.length);
                        return;
                    }
                }
            };

            Controller.prototype.isBoxOrFeatureOrFalse = function(x, y) {
                var boxesLength = this.boxes.length;
                var boxesFeatureLength = this.boxesFeature.length;

                for (var i = 0; i < boxesLength; i++) {
                    if (this.boxes[i].x === x && this.boxes[i].y === y) {
                        return this.boxes[i];
                    }
                }

                for (var j = 0; j < boxesFeatureLength; j++) {
                    if (this.boxesFeature[j].x === x
                            && this.boxesFeature[j].y === y) {
                        return this.boxesFeature[j];
                    }
                }
                return false;
            };

            Controller.prototype.addSaveAction = function() {
                this.player.addSaveAction(this.countAction);

                var boxesLength = this.boxes.length;

                for (var i = 0; i < boxesLength; i++) {
                    this.boxes[i].addSaveAction(this.countAction);
                }

                var boxesFeatureLength = this.boxesFeature.length;

                for (var j = 0; j < boxesFeatureLength; j++) {
                    this.boxesFeature[j].addSaveAction(this.countAction);
                }

                this.countAction++;
            };

            Controller.prototype.undoRedo = function(incDec) {

                var indexActionToDo = this.countAction + incDec;
                var boolPlayerUndoRedo = this.player.undoRedo(indexActionToDo);
                var boxesLength = this.boxes.length;

                for (var i = 0; i < boxesLength; i++) {
                    this.boxes[i].undoRedo(indexActionToDo);
                }

                var boxesFeatureLength = this.boxesFeature.length;

                for (var j = 0; j < boxesFeatureLength; j++) {
                    this.boxesFeature[j].undoRedo(indexActionToDo);
                }

                if (boolPlayerUndoRedo) {
                    this.countAction = indexActionToDo;
                }
                this.displayAllObjects();
            };

            Controller.prototype.winLevel = function() {
                var win = true;
                var boxesEndLength = this.boxesEnd.length;
                var boxesLength = this.boxes.length;
                var boxesFeaturesLength = this.boxesFeature.length;
                var boxes;
                if (boxesLength <= 0) {
                    boxes = this.boxesFeature.concat(this.boxes);
                } else {
                    boxes = this.boxes.concat(this.boxesFeature);
                }
                var allBoxesLength = boxes.length;
                for (var i = 0; i < boxesEndLength; i++) {
                    var boxendOK = false;
                    for (var j = 0; j < allBoxesLength; j++) {
                        if (this.boxesEnd[i].x === boxes[j].x
                                && this.boxesEnd[i].y === boxes[j].y) {
                            boxendOK = true;
                        }
                    }
                    if (!boxendOK) {
                        return;
                    }
                }

                this.win = false;
                this.removeKeyListeners();
                this.winScreen.display(this.countAction);

            };

            return new Controller();
        });