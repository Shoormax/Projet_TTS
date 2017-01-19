function annyangChargementPage() {
    $(window).bind('beforeunload', function () {
        annyang.abort();
    });
    window.onload = function () {
        annyang.start();
    }
}

function controleVocale() {
    annyang.debug();
    if (annyang) {
        var command = {
            "recherche *key": function (key) {
                window.location.href = "https://www.google.fr/search?q=" + key;
                console.log(key);
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
            "fermer le navigateur": function () {
                // open(location, '_self').close();
            },
            "résultats *number": function (number) {

                number = parseInt(number);

                switch(number){
                    case 0:
                        window.location.href=document.getElementsByClassName('r')[0].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 2:
                        window.location.href=document.getElementsByClassName('r')[1].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 3:
                        window.location.href=document.getElementsByClassName('r')[2].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 4:window.location.href=document.getElementsByClassName('r')[3].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 5:
                        window.location.href=document.getElementsByClassName('r')[4].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 6:
                        window.location.href=document.getElementsByClassName('r')[5].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 7:
                        window.location.href=document.getElementsByClassName('r')[6].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 8:
                        window.location.href=document.getElementsByClassName('r')[7].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 9:
                        window.location.href=document.getElementsByClassName('r')[8].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 10:
                        window.location.href=document.getElementsByClassName('r')[9].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 11:
                        window.location.href=document.getElementsByClassName('r')[10].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                    case 12:
                        window.location.href=document.getElementsByClassName('r')[11].children[0].getAttribute('href');
                        annyangChargementPage();
                        onload.readMessage($(document).attr('title'));
                        break;
                }
            },
            "nombre de résultats" : function () {
                var nb_elt = document.getElementsByClassName('r').length
                readMessage("Il y a "+nb_elt.toString()+"résultat")
            },
            "image *token" : function (token) {
                window.location.href = "https://www.google.fr/search?q="+token+"&tbm=isch";
            }

        };
    }
    annyang.setLanguage("FR-fr");
    annyang.addCommands(command);
    annyang.start();
}