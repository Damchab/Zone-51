define([ 'js/gameobject/toolbox' ], function(Toolbox) {

    var Wall = function(x, y, id, type) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.type = type;
        this.saveAction = [];
    }

    Wall.prototype.getPosition = function() {
        return {
            'x' : this.x,
            'y' : this.y
        };
    };

    Wall.prototype.setPosition = Toolbox.setPosition;


    return Box;
});