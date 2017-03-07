define([ 'jquery' ], function($) {


    var Translate = function() {
        this.localizationPath = './localization/';
        this.fileExtention = '.xliff'
    }

    Translate.prototype.translationView = function(language, fileName) {
        var filePath = this.localizationPath + language + '/' + fileName
                + this.fileExtention + "?d=" + Date.now();
        $.get(filePath, function(data) {
            if (localStorage.getItem('localization_' + language) === null) {
                localStorage.setItem('localization_' + language, data);
            }
        });
    };

    Translate.prototype.translateSelector = function(language, selector) {
        var xml = $.parseXML(localStorage.getItem('localization_' + language));
        return $(xml).find(selector+ ' target').text();
    };

    return new Translate();

});