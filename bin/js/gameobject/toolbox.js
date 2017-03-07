define([],
        function() {
            function Toolbox() {
            }

            Toolbox.prototype.setPosition = function(x, y) {
                this.x = x;
                this.y = y;
            };

            Toolbox.prototype.addSaveAction = function(countAction) {
                this.saveAction.splice(countAction + 1, this.saveAction.length
                        - (countAction + 1));
                this.saveAction.push({
                    'x' : this.x,
                    'y' : this.y
                });
            };

            Toolbox.prototype.undoRedo = function(index) {
                var saveActionLength = this.saveAction.length;

                if (index >= 0 && index < saveActionLength) {
                    this.setPosition(this.saveAction[index]['x'],
                            this.saveAction[index]['y']);
                    console.log(this);
                    return true;
                }
                return false;
            };

            return new Toolbox();
        });