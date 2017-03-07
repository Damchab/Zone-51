define([ 'js/gameplane/square' ], function(Square) {

    var Grid = function() {
        this.width = 0;
        this.height = 0;
        this.grid = [];
        this.objectsImportantStart = [];
    };

    /* PUBLIC */

    Grid.prototype.load = function(level) {
        var initGrid = translateLevel(level);
        
        this.grid = initGrid.map;
        this.height = initGrid.height;
        this.width = initGrid.width;

        var object;

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                object = new Square(this.grid[x][y]);
                var important = object.isImportant();
                if (important) {
                    this.objectsImportantStart.push({
                        'type' : important,
                        'x' : x,
                        'y' : y
                    });
                }
                this.grid[x][y] = object;
            }
        }
        this.modifyGrid();
    };

    Grid.prototype.gridToDisplay = function() {
        var diplayGrid = [ this.width ];
        for (var x = 0; x < this.width; x++) {
            diplayGrid[x] = [ this.height ];
        }

        for (var y = 0; y < this.height; y++) {
            for (x = 0; x < this.width; x++) {
                diplayGrid[x][y] = this.grid[x][y].type;
            }
        }

        return diplayGrid;
    };
    
    Grid.prototype.modifyGrid = function() {
        var objectsImportantStartLength = this.objectsImportantStart.length;
        var arrayGround = cloneWallGrid(this.width, this.height, this.grid);
        for (var i = 0; i < objectsImportantStartLength; i++) {
            setGround(this.objectsImportantStart[i].x,
                    this.objectsImportantStart[i].y, arrayGround, this.width,
                    this.height);
            
        }
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (arrayGround[x][y] === '' || arrayGround[x][y] === 'wall') {
                    this.grid[x][y].type = 'wall';
                } else {
                    this.grid[x][y].type = 'ground';
                }
            }
        }
    };

    Grid.prototype.getCellType = function(x,y) {
        if (outOfRange(x, y, this.width, this.height)) {
            return 'wall';
        }
        return this.grid[x][y].type;
    }
    /* PRIVATE */

    function outOfRange(x, y, width, height) {
        return x < 0 || x >= width || y < 0 || y >= height;
    }

    function setGround(x, y, grid, width, height) {
        if (outOfRange(x, y, width, height)) {
            return;
        }
        

        if (!(grid[x][y] == '') || (grid[x][y] == 'wall')) {
            return;
        }
        grid[x][y] = 'ground';

        setGround(x + 1, y, grid, width, height);
        setGround(x - 1, y, grid, width, height);
        setGround(x, y - 1, grid, width, height);
        setGround(x, y + 1, grid, width, height);
    }

    function cloneWallGrid(width, height, grid) {
        var wallGrid = [ width ];
        for (var x = 0; x < width; x++) {
            wallGrid[x] = [ height ];
        }

        for (var y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                if (grid[x][y].type === 'wall') {
                    wallGrid[x][y] = 'wall';
                } else {
                    wallGrid[x][y] = '';
                }
            }
        }
        return wallGrid;
    }

    function translateLevel(level) {
        var lvlArray = [];

        var nbLignes = level.length; // y
        var nbColonnes; // x

        for (var ligne = 0; ligne < nbLignes; ligne++) {
            
            var splitLigne = level[ligne].split('');
            nbColonnes = level[ligne].length;

            for (var colonne = 0; colonne < nbColonnes; colonne++) {
                if (typeof lvlArray[colonne] === "undefined") {
                    lvlArray[colonne] = [];
                }
                lvlArray[colonne][ligne] = splitLigne[colonne];
            }
        }           
        console.log(lvlArray, nbLignes, nbColonnes);
        return {
            'height' : nbLignes,
            'width' : nbColonnes,
            'map' : lvlArray
        };
    }

    return Grid;
});