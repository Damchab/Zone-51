define(
        [ 'jquery', 'js/user', 'js/sounds', 'js/menu', 'js/translate' ],
        function($, User, Sounds, Menu, Translate) {

            var Login = function() {
                this.language;
                this.div;
                this.user;
                this.menu;
            }

            Login.prototype.init = function(language) {
                this.language = language
                var that = this;
                
                this.translate();
                
                $('body').empty();
                $('body').append(this.div);
                $(window).resize(resizing);
                resizing();
                $('#logform').slideToggle("slow", function() {
                    resizing();
                    $('#loginform').fadeIn("slow");
                    $('img').fadeIn("slow");
                });

                this.logAction();
                this.inviteAtion();

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

                this.hoverFocus('button');
                this.hoverFocus('img');
                this.hoverFocus('#connexion');

            };

            Login.prototype.hoverFocus = function(selector) {
                $(selector).hover(function() {
                    Sounds.play(Sounds.buttonsHover);
                }, function() {
                }).focus(function() {
                    Sounds.play(Sounds.buttonsHover);
                }, function() {
                });
            };

            Login.prototype.inviteAtion = function() {

                var language = this.language;
                $('#invite').on(
                        'click',
                        function(event) {
                            event.preventDefault();
                            sessionStorage.setItem('user', JSON
                                    .stringify(new User(-1, 'invite')));

                            Sounds.play(Sounds.buttonsClick);

                            this.menu = Menu.init(language);

                        });
            };

            Login.prototype.logAction = function() {
                var that = this;

                $('#loginform')
                        .on(
                                'submit',
                                function(event) {
                                    Sounds.play(Sounds.buttonsClick);
                                    event.preventDefault();

                                    var $this = $(this);

                                    var login = $('#login').val();

                                    if (login === '' || login === 'invite') {
                                        alert('Veuillez remplir le champs');
                                    } else {

                                        $
                                                .ajax({
                                                    url : $this.attr('action'),
                                                    type : $this.attr('method'),
                                                    data : $this.serialize(),
                                                    success : function(logs) {
                                                        console.log(logs);
                                                        var parsed = JSON
                                                                .parse(logs);
                                                        
                                                        console.log(parsed);
                                                        
                                                        sessionStorage
                                                                .setItem(
                                                                        'user',
                                                                        JSON
                                                                                .stringify(new User(
                                                                                        parseInt(parsed.id),
                                                                                        parsed.login)));

                                                        $('#logform')
                                                                .fadeOut(
                                                                        'slow',
                                                                        function() {
                                                                            that.menu = Menu
                                                                                    .init(that.language);
                                                                        });
                                                    },
                                                    fail : function() {
                                                        alert('error');
                                                    }
                                                });
                                    }
                                });
            };

            Login.prototype.translate = function() {
                console.log(this.language);
                var labelLogin = Translate.translateSelector(this.language,
                        '#LABEL_LOGIN');

                var labelConnection = Translate.translateSelector(
                        this.language, '#LABEL_CONNECTION');
                var labelGuest = Translate.translateSelector(this.language,
                        '#LABEL_GUEST');
                var labelEnglish = Translate.translateSelector(this.language,
                        '#LABEL_LANGUAGE_ENGLISH');
                var labelFrench = Translate.translateSelector(this.language,
                        '#LABEL_LANGUAGE_FRENCH');
                // console.log(labelLogin,labelConnection,labelGuest,labelEnglish,labelFrench);

                this.div = '<div id="logform" style="display:none"><div id="log"><form id="loginform" style="display:none" method="post" action="php/login.php?d='
                        + Date.now()
                        + '"><label for="login" style="text-transform: uppercase;">'
                        + labelLogin
                        + '</label><br /><br /><input type="text" id="login" name="login" placeholder="'
                        + labelLogin
                        + '" /><br /><br /><input type="submit" id="connexion" value="'
                        + labelConnection
                        + '" /> <button id="invite" >'
                        + labelGuest
                        + '</button><br />God User : Damien</form><br /><img src="./pictures/french.jpg" style="display:none" alt="'
                        + labelFrench
                        + '" id="french" > <img src="./pictures/english.jpg" style="display:none" alt="'
                        + labelEnglish + '" id="english" ></div></div>';
                

            };

            function resizing() {

                $("#logform")
                        .css(
                                {
                                    background : 'transparent url("./pictures/bg_logo.png") no-repeat center top',
                                    backgroundSize : 'contain',
                                    left : ($(window).width() - $("#logform")
                                            .outerWidth()) / 2,
                                    top : ($(window).height() - $("#logform")
                                            .outerHeight()) / 2
                                });

                var logformWidth = $("#logform").width();
                var logformHeight = $("#logform").height();
                $("#log").css({
                    left : (logformWidth - $("#log").innerWidth()) / 2,
                    top : (logformHeight - $("#log").innerHeight()) / 5.5

                });
                $("img").css({
                    width : (logformWidth / 15),
                    height : 'auto'
                });
                $("label")
                        .css(
                                {
                                    fontSize : ((logformWidth < logformHeight ? logformWidth
                                            : logformHeight) / 500)
                                            * 2 + 'em'
                                });
                $("button")
                        .css(
                                {
                                    fontSize : ((logformWidth < logformHeight ? logformWidth
                                            : logformHeight) / 500)
                                            * 2 + 'em'
                                });
                $("input")
                        .css(
                                {
                                    fontSize : ((logformWidth < logformHeight ? logformWidth
                                            : logformHeight) / 500)
                                            * 2 + 'em'
                                });

            }

            return new Login();
        });