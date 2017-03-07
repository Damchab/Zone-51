define(['js/gameobject/toolbox'], function(Toolbox) {

    var Player = function() {
        this.direction;
        this.x;
        this.y;
        this.saveAction = [];
    };

    Player.prototype.getPosition = function() {
        return {
            'x' : this.x,
            'y' : this.y
        };
    };
    
    Player.prototype.setDirection = function(direction) {
        if(this.direction === direction) {
            return;
        }
        this.direction = direction;
        return this.direction;
    };
    
    Player.prototype.setPosition = Toolbox.setPosition;

    Player.prototype.addSaveAction = Toolbox.addSaveAction;
       
    Player.prototype.undoRedo = Toolbox.undoRedo;
    
    return Player;
});
