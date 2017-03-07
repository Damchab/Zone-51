define([], function() {

    /* les cases */

    var Square = function(type) {
        this.type = this.defineType(type);
    }
    
    Square.prototype.isImportant = function(){
       var typeImportant = false;
       if (this.type != 'ground' && this.type != 'wall'){
           typeImportant = this.type;
       }
       return typeImportant;
    };
        
    Square.prototype.defineType = function(typeBlock) {
        var typeSquare = '';

        switch (typeBlock) {
        case '#':
            typeSquare = 'wall';
            break;
        case '.':
            typeSquare = 'boxend';
            break;
        case '@':
            typeSquare = 'playerstart';
            break;
        case '$':
            typeSquare = 'boxstart';
            break;
        case '_':
            typeSquare = 'boxfeaturestart';
            break;
        default:
            typeSquare = 'ground';
            break;
        }
        return typeSquare;
    }
    
    

    return Square;
});

