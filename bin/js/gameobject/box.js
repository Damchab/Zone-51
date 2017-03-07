define([ 'js/gameobject/toolbox' ], function(Toolbox) {

    var Box = function(x, y, id, type) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.type = type;
        this.saveAction = [];
    }

    Box.prototype.getPosition = function() {
        return {
            'x' : this.x,
            'y' : this.y
        };
    };

    Box.prototype.setPosition = Toolbox.setPosition;

    Box.prototype.addSaveAction = Toolbox.addSaveAction;

    Box.prototype.undoRedo = Toolbox.undoRedo;

    return Box;
});
