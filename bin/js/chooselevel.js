define(
        [ 'jquery', 'js/level', 'js/sounds' ],
        function($, Level, Sounds) {

            var ChooseLevel = function() {
                this.chooseDiv = '<div id="chooselevel"><div id="chooselevelin"></div></div>';
                this.levels;
                this.levelCurrent;
            };

            ChooseLevel.prototype.init = function(levels) {
                this.levels = levels;

                console.log(levels);
                this.display();

                if (Sounds.menu.pos() == 0) {
                    Sounds.stop(Sounds.win)
                    Sounds.play(Sounds.menu);
                }

                $('.lvl').hover(function() {
                    Sounds.play(Sounds.buttonsHover);
                }, function() {
                });
            };

            ChooseLevel.prototype.display = function() {
                $('body').empty();
                $('body').append('<br />');
                $('body').append($(this.chooseDiv));
                var levelsLength = this.levels.length;
                var levels = JSON.parse(sessionStorage.levels);
                for (var i = 0; i < levelsLength; i++) {
                    if(i % 5 === 0){
                        $('#chooselevelin').append('<br />');
                    }
                    $('#chooselevelin').append(
                            '<div class="lvlcontain"><div class="lvl '
                                    + (levels.levelDesign[i].locked ? 'locked'
                                            : 'unlocked') + '" data-level="'
                                    + this.levels[i][0] + '"><br /><br /><br />'
                                    + this.levels[i][0] + '<br />'
                                    + this.levels[i][1] + '</div></div>');
                    this.level(this.levels[i][0]);

                }
                $('body').append('<br />');
                $('body').append('<br />');
            };

            ChooseLevel.prototype.level = function(idLevel) {
                var lvl = this.levelCurrent;
                $('.lvl.unlocked[data-level="' + idLevel + '"]')
                        .on(
                                'mouseup',
                                function(event) {
                                    event.preventDefault();
                                    lvl = new Level(idLevel);
                                    lvl
                                            .init(
                                                    JSON
                                                            .parse(sessionStorage.levels).levelDesign[idLevel - 1],
                                                    idLevel);
                                });
            }

            return new ChooseLevel();
        });