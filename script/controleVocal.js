function annyangChargementPage() {
    $(window).bind('beforeunload', function () {
        annyang.abort();
    });
    window.onload = function () {
        annyang.start();

    }
}

function controleVocale() {
    console.log(annyang);
    console.log(!annyang);
    annyang.debug();
    if (annyang) {
        var command = {
            "recherche *key": function (key) {
                window.location.href = "https://www.google.fr/search?q=" + key;
                readMessage("recherche google " + key);
                annyangChargementPage();

            },
            "page": function () {
                readMessage($(document).attr('title'));
            },
            "précédent": function () {
                window.location.href = document.referrer;
                readMessage($(document).attr('title'));
            },
            "c'est pas faux": function () {
                readMessage("C'est quoi que ta pas compris");
            },
            "fermer l'onglet": function () {
                // window.top.close();
            },
            "résultats *number": function (number) {

                number = parseInt(number);

                window.location.href=document.getElementsByClassName('r')[number - 1].children[0].getAttribute('href');
                annyangChargementPage();
                onload.readMessage($(document).attr('title'));
            },
            "nombre de résultats" : function () {
                var nb_elt = document.getElementsByClassName('r').length
                readMessage("Il y a "+nb_elt.toString()+"résultat")
            },
            "image *token" : function (token) {
                window.location.href = "https://www.google.fr/search?q="+token+"&tbm=isch";
            },
            "relecture" : function () {
                var msg = $(':focus').val();
                if (typeof msg != 'undefined' && msg != '')
                    readMessage("Vous avez écrit : " + msg, false);
            }

        };
    }
    annyang.setLanguage("FR-fr");
    annyang.addCommands(command);
    annyang.start();
}