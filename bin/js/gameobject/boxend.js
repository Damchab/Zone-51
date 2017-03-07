define([], function() {

    var Boxend = function(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }
    
    Boxend.prototype.getPosition = function() {
        return {
            'x' : this.x,
            'y' : this.y
        };
    };
    
    return Boxend;
});
