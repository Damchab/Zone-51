define([ 'howler' ], function(Howl) {
    var Sounds = function() {
        this.menu = new Howl.Howl({
            urls : [ './sounds/musics/menu.ogg' ],
            loop : true,
            volume : 0.2
        });
        this.game = new Howl.Howl({
            urls : [ './sounds/musics/game.ogg' ],
            loop : true,
            volume : 0.2
        });
        this.win = new Howl.Howl({
            urls : [ './sounds/musics/win.ogg' ],
            loop : true,
            volume : 0.2
        });
        this.buttonsHover = new Howl.Howl({
            urls : [ './sounds/sounds/buttonsHover.wav' ],
            loop : false,
            volume : 0.8
        });
        this.buttonsClick = new Howl.Howl({
            urls : [ './sounds/sounds/buttonsClick.wav' ],
            loop : false,
            volume : 0.8
        });
        
        this.player = new Howl.Howl({
            urls : [ './sounds/sounds/player.mp3' ],
            loop : false,
            volume : 0.8
        });
        
        this.box = new Howl.Howl({
            urls : [ './sounds/sounds/box.mp3' ],
            loop : false,
            volume : 0.8
        });
        
        this.feature = new Howl.Howl({
            urls : [ './sounds/sounds/feature.mp3' ],
            loop : false,
            volume : 0.0
        });
    };

    Sounds.prototype.play = function(sound) {
        sound.play();
    };
    Sounds.prototype.stop = function(sound) {
        sound.stop();
    };

    Sounds.prototype.playSounds = function() {
        buttonsHover.play();
        buttonsHover.play();
    };
    Sounds.prototype.stopSounds = function() {
        buttonsClick.stop();
        buttonsClick.stop();
    };

    return new Sounds();

});