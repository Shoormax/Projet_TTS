/**
 *
 */
function controleVocale() {
    annyang.debug();
    if(annyang) {
        var command = {
            "recherche *key" : function (key) {
                window.open("https://www.google.fr/search?q="+key);
                console.log(key);
                responsiveVoice.speak("vous êtes sur la page des résultats google "+key,"French Female");

            },
            "page" : function () {
                responsiveVoice.speak($(document).attr('title'),"French Female");
            }
        };
    }
    annyang.setLanguage("FR-fr");
    annyang.addCommands(command);
    annyang.start();
}

function annyangChargementPage() {
    $(window).bind('beforeunload', function () {
        annyang.abort();
    });
    window.onload = function () {
        annyang.start();
    }
}