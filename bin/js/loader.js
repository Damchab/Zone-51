define([ 'jquery', 'js/sounds' ,'js/login', 'js/translate' ], function($, Sounds, Login, Translate) {

    var Loader = function() {
    }
    
    Loader.prototype.init = function() {
        this.language = $('html').attr('lang');
        this.clearStorage();
        Sounds.play(Sounds.menu);
        this.loadLevels();
        
    }

    Loader.prototype.clearStorage = function() {
        sessionStorage.clear();
        localStorage.clear();
        Translate.translationView('en','main');
        Translate.translationView('fr','main');
    };
    

    Loader.prototype.loadLevels = function() {
        var that = this;
        $.getJSON("level/levels.json?d=" + Date.now(), function(data) {
            sessionStorage.setItem('levels', JSON.stringify(data));
            Login.init(that.language);
        });
    };
    
    return new Loader();
});
