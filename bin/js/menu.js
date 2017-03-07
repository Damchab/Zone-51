define(
        [ 'jquery', 'js/translate', 'js/chooselevel', 'js/sounds' ],
        function($, Translate, Chooselevel, Sounds) {

            var Menu = function() {
                this.language;
                this.div;
            }

            Menu.prototype.init = function(language) {
                var that = this;
                this.language = language;
                this.translate();

                $(window).resize(resizing);
                resizing();

                this.chooselevel();

                $('#help').on('click', function(event) {
                    event.preventDefault();

                    Sounds.play(Sounds.buttonsClick);
                });

                $('#hightscores').on('click', function(event) {
                    event.preventDefault();
                    Sounds.play(Sounds.buttonsClick);
                });

                this.hoverFocus('button');
                this.hoverFocus('img');

                $('#english').on('click', function(event) {
                    if (that.language != 'en') {
                        that.language = 'en';
                        that.translate();
                        that.init(that.language);
                    }
                });
                $('#french').on('click', function(event) {
                    if (that.language != 'fr') {
                        that.language = 'fr';
                        that.translate();
                        that.init(that.language);
                    }
                });
            };

            Menu.prototype.hoverFocus = function(selector) {
                $(selector).hover(function() {
                    Sounds.play(Sounds.buttonsHover);
                }, function() {
                }).focus(function() {
                    Sounds.play(Sounds.buttonsHover);
                }, function() {
                });
            };

            Menu.prototype.chooselevel = function() {
                var that = this;
                $('#level')
                        .on(
                                'mouseup',
                                function(event) {
                                    // event.preventDefault();

                                    Sounds.play(Sounds.buttonsClick);
                                    $
                                            .ajax({
                                                url : 'php/chooselevel.php?d='
                                                        + Date.now(),
                                                success : function(levels) {
                                                    var parsed = JSON
                                                            .parse(levels);
                                                    var levelsLength = parsed.length;
                                                    var levelsDesign = JSON
                                                            .parse(sessionStorage.levels);
                                                    for (var i = 0; i < levelsLength; i++) {
                                                        levelsDesign.levelDesign[i].id = parsed[i][0];
                                                        levelsDesign.levelDesign[i].name = parsed[i][1];
                                                        levelsDesign.levelDesign[i].hightscore = levelsDesign.levelDesign[i].hightscore || 0;
                                                    }
                                                    sessionStorage
                                                            .setItem(
                                                                    'levels',
                                                                    JSON
                                                                            .stringify(levelsDesign));
                                                    that
                                                            .chooselevelLocked(parsed);
                                                },
                                                fail : function() {
                                                    alert('error');
                                                }
                                            });
                                });
            };

            Menu.prototype.chooselevelLocked = function(levels) {
                var idUser = JSON.parse(sessionStorage.user).id;
                if (idUser !== -1) {
                    $
                            .ajax({
                                url : 'php/lockedlevel.php?d=' + Date.now(),
                                type : "POST",
                                data : {
                                    "idUser" : idUser
                                },
                                success : function(scores) {
                                    var parsed = JSON.parse(scores);

                                    var levelsDesign = JSON
                                            .parse(sessionStorage.levels);
                                    var levelsLength = levelsDesign.levelDesign.length;
                                    var scoresLength = parsed.length;
                                    for (var i = 0; i < levelsLength; i++) {
                                        for (var j = 0; j < scoresLength; j++) {
                                            var score = parseInt(parsed[j][1]);

                                            if (levelsDesign.levelDesign[i].id === parsed[j][0]) {
                                                if (levelsDesign.levelDesign[i].hightscore === 0) {
                                                    levelsDesign.levelDesign[i].hightscore = score;
                                                } else if (levelsDesign.levelDesign[i].hightscore > score) {
                                                    levelsDesign.levelDesign[i].hightscore = score;
                                                }
                                                if (levelsDesign.levelDesign[i].id > 0) {
                                                    levelsDesign.levelDesign[i].locked = false;
                                                    if (i + 1 < levelsLength) {
                                                        levelsDesign.levelDesign[i + 1].locked = false;
                                                    }
                                                }
                                            }
                                            // if
                                            // (levelsDesign.levelDesign[i].hightscore
                                            // > score
                                            // && score > 0) {
                                            // levelsDesign.levelDesign[i].hightscore
                                            // = score;
                                            // }
                                            // levelsDesign.levelDesign[i].locked
                                            // = false;
                                            // if (i + 1 < levelsLength) {
                                            // levelsDesign.levelDesign[i +
                                            // 1].locked = false;
                                            // }
                                            //
                                            // }
                                        }

                                    }
                                    sessionStorage.setItem('levels', JSON
                                            .stringify(levelsDesign));

                                    console.log(levelsDesign);
                                    console.log(parsed);

                                    Chooselevel.init(levels);

                                },
                                fail : function() {
                                    alert('error');
                                }
                            });
                } else {
                    Chooselevel.init(levels);
                }

            };

            Menu.prototype.translate = function() {
                var labelLevelChoise = Translate.translateSelector(
                        this.language, '#LABEL_LEVEL_CHOICE');
                var labelHightScores = Translate.translateSelector(
                        this.language, '#LABEL_HIGHSCORE');
                var labelHelp = Translate.translateSelector(this.language,
                        '#LABEL_HELP');
                var labelEnglish = Translate.translateSelector(this.language,
                        '#LABEL_LANGUAGE_ENGLISH');
                var labelFrench = Translate.translateSelector(this.language,
                        '#LABEL_LANGUAGE_FRENCH');

                $('body').empty();

                this.div = '<div id="menubg"><div id="menu"><button id="level">'
                        + labelLevelChoise
                        + '</button><br /><br /><br /><button id="help">'
                        + labelHelp
                        + '</button><br /><br /><br /><button id="hightscores">'
                        + labelHightScores
                        + '</button> <br /><br /><br /><img src="./pictures/french.jpg" alt="'
                        + labelFrench
                        + '" id="french"> <img src="./pictures/english.jpg" alt="'
                        + labelEnglish + '" id="english"></div></div>';
                $('body').append(this.div);

            };

            function resizing() {
                $("#menubg")
                        .css(
                                {
                                    background : 'transparent url("./pictures/bg_logo.png") no-repeat center top',
                                    backgroundSize : 'contain',
                                    left : ($(window).width() - $("#menubg")
                                            .outerWidth()) / 2,
                                    top : ($(window).height() - $("#menubg")
                                            .outerHeight()) / 2
                                });

                var menubgWidth = $("#menubg").width();
                var menubgHeight = $("#menubg").height();

                $("#menu").css({
                    left : (menubgWidth - $("#menu").innerWidth()) / 2,
                    top : (menubgHeight - $("#menu").innerHeight()) / 3.5
                });

                $("img").css({
                    width : (menubgWidth / 15),
                    height : 'auto'
                });

                $("button")
                        .css(
                                {
                                    fontSize : ((menubgWidth < menubgHeight ? menubgWidth
                                            : menubgHeight) / 500)
                                            * 2 + 'em'
                                });
            }

            return new Menu();
        });