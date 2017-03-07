define(
        [ 'jquery', 'js/sounds', 'js/view/resize' ],
        function($, Sounds) {

            var Winscreen = function(idlevel, par, resize) {
                this.winDiv = '<div id="winscreen"><h1>Zone 51</h1><br/><div id="thelevel" ></div><br/><button id="level">Choix du Niveau</button><br/></div>';
                this.level = idlevel;
                this.par = par;
                this.score;
            }

            Winscreen.prototype.display = function(score) {
                this.score = score;
                Sounds.stop(Sounds.game);
                Sounds.play(Sounds.win);
                $('body').empty();
                $('body').append(this.winDiv);
                $('#thelevel').append(
                        'LEVEL ' + this.level + ' CLEAR<br /><br />SCORE : '
                                + score + ' / ' + this.par);

                $('button').hover(function() {
                    Sounds.play(Sounds.buttonsHover);
                }, function() {
                });
                 this.scoring();
                this.chooselevel();
            };

            Winscreen.prototype.scoring = function() {
                var levelsDesign = JSON.parse(sessionStorage.levels);

                var levelsLength = levelsDesign.levelDesign.length;

                var modifiedScore = false;

                for (var i = 0; i < levelsLength; i++) {
                    if (levelsDesign.levelDesign[i].id === this.level
                            && (levelsDesign.levelDesign[i].hightscore > this.score || levelsDesign.levelDesign[i].hightscore === 0)) {
                        levelsDesign.levelDesign[i].hightscore = this.score;
                        var modifiedScore = true;

                        if (i + 1 < levelsLength) {
                            levelsDesign.levelDesign[i + 1].locked = false;
                        }
                    }
                }
                sessionStorage.setItem('levels', JSON.stringify(levelsDesign));
                var login = JSON.parse(sessionStorage.user).login;
                if (modifiedScore && login !== 'invite') {
                    this.modifiedScore(login);
                }

            };

            Winscreen.prototype.modifiedScore = function(login) {
                var that = this;
                var login = JSON.parse(sessionStorage.user).login;
                $.ajax({
                    url : 'php/score.php?d=' + Date.now(),
                    type : "POST",
                    data : {
                        "login" : login,
                        "hightscore" : that.score,
                        "level" : that.level
                    },
                    success : function() {
                    },
                    fail : function() {
                        alert('error');
                    }
                });
            };

            Winscreen.prototype.chooselevel = function() {
                require([ 'js/menu' ], function(Menu) {
                    Menu.chooselevel();
                });
            };

            return Winscreen;
        });
