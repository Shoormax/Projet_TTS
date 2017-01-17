var myPort = chrome.runtime.connect({name:"port-from-cs"});

myPort.onMessage.addListener(function(m) {
    setStorageParams(m);
});

$(function () {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            sessionStorage.setItem("active", request.data);
            location.reload();
        }
    );

    var isActive = existe(sessionStorage.getItem("active"));

    if(isActive) {
        loadCss();      //load les éléments css grâce au JS afin de modifier dynamiquement les propriétés

        var lastDomElement = null;
        if(existe(sessionStorage.getItem("lectureVocale")))
        {
            function active(domElement){
                domElement.addClass("active");
                if(lastDomElement != null){
                    lastDomElement.removeClass('active');
                    responsiveVoice.cancel();
                }
                lastDomElement = domElement;
                messageGenerator(domElement);
            }

            function messageGenerator(domElement) {
                var domTag = domElement[0].tagName;
                var message;
                switch (domTag) {
                    case "A":
                        message = "Lien pointant vers :" + domElement.text() + ". Appuyez sur entrée pour être redirigé.";
                        break;
                    case "UL":
                        message = "Ceci est une liste de " + domElement.children().length + " éléments, appuyez sur la flèche de droite pour accéder à chacun.";
                        break;
                    case "P":
                        message = "Paragraphe. " + domElement.text();
                        break;
                    case "LI":
                        message = "élément " + (domElement.index() + 1) + ". " + domElement.text();
                        break;
                    case "H1":
                        message = "Titre de niveau 1. " + domElement.text();
                        break;
                    case "H2":
                        message = "Titre de niveau 2. " + domElement.text();
                        break;
                    case "H3":
                        message = domElement.text();
                        break;
                    case "H4":
                        message = domElement.text();
                        break;
                    default:
                        return;
                }
                readMessage(message);
            }

            function readMessage(message){
                responsiveVoice.speak(message, 'French Female');
            }

            $('p, li, ul, h1, h2, h3, h4').click(function () {
                active($(this));
            });

            $('body a').click(function (event) {
                event.preventDefault(); // empêche la redirection du lien
                active($(this));
            });

            // $('html').mouseup(function() {
            //     var text = getSelectedText();
            //     if (text!=''){
            //         responsiveVoice.speak(text);
            //     }
            // });
            //
            // function getSelectedText() {
            //     if(window.getSelection()) {
            //         return window.getSelection().toString();
            //     }
            //     else if (document.selection) {
            //         return document.selection.createRange().text;
            //     }
            //     return '';
            // }

            $(document).keydown(function (e) {
                switch (e.which) {
                    case 13: // enter
                        // L'utilisateur confirme qu'il veut aller sur le lien
                        if (lastDomElement[0].tagName == "A") {
                            window.location = lastDomElement.attr("href"); // redirige vers la cible du lien
                        }
                        break;

                    case 27: // escape
                        responsiveVoice.cancel();
                        break;

                    case 37: // left
                        if (lastDomElement != null && lastDomElement.has().parent()) {
                            active(lastDomElement.parent());
                        }
                        break;

                    case 38: // up
                        if (lastDomElement != null && lastDomElement.has().prev()) {
                            active(lastDomElement.prev());
                        }
                        break;

                    case 39: // right
                        if (lastDomElement != null && lastDomElement.has().children()) {
                            active(lastDomElement.children().first());
                        }
                        break;

                    case 40: // down
                        if (lastDomElement != null && lastDomElement.has().next()) {
                            active(lastDomElement.next());
                        }
                        break;

                    default:
                        return;
                }
                e.preventDefault();
            });
        }

        if(existe(sessionStorage.getItem('affichageImages'), false)) {
            function hide_Images() {
                $("img").each(function () {
                    var temp = this;

                    if($(this).parent().children('.alt').length) {
                        $(this).parent().children('.alt').remove()
                    }
                    else {
                        $(this).parent().append('<p class="alt">'+ verifVal(temp.alt, 'Aucune description n\'a été trouvée pour cette image')+'</p>')
                    }

                    $(this).toggle();
                })

                $('#hideImage').html($('#hideImage').html() == 'Cacher les images' ? 'Afficher les images' : 'Cacher les images');
            };

            hide_Images();
        }

        //Lorsque l'on survole une image, elle disparait pour laisser apparaitre la balise alt
        //Si il n'y a pas de alt, on affiche "Aucune description trouvée pour cette image"
        var temp = '';
        $('img').hover(function () {
            if(typeof $(this).attr('alt') == 'undefined' || $(this).attr('alt') == '') {
                $(this).attr('alt', 'Aucune description trouvée pour cette image.');
            }
            temp = $(this).attr('src');
            $(this).attr('src', '');
            $(this).attr('srcset', '');
            $(this).addClass('noAlt');
        },function () {
            $(this).attr('src', temp);
            $(this).attr('srcset', temp);
        });

        // $("a").click(function(e) {
        //     var href = $(this).attr('href');
        //     e.preventDefault();
        //     var allow;
        //     if(existe(sessionStorage.getItem('lectureVocale'))) {
        //         readMessage('Vous venez de cliquer sur un lien, êtes vous sur de vouloir le suivre ?');
        //     }
        //
        //     setTimeout(function () {
        //         allow = confirm('Vous venez de cliquer sur un lien, êtes vous sur de vouloir le suivre ?');
        //         if (allow) {
        //             responsiveVoice.cancel();
        //             window.location.href = href;
        //         }
        //     });
        // });
    }
    $(window).on('beforeunload',annyangChargementPage());
    controleVocale();
});

/**
 * Permet de set le storage par rapport aux données reçues
 *
 * @param params
 */
function setStorageParams(params)
{
    Object.keys(params).map(function(key, index) {
        var val = params[key];
        for(var i in val) {
            sessionStorage.setItem(i, val[i]);
        }
    });
}

/**
 * Verifie la valeur d'une variable
 *
 * @param variable
 * @param defaultVal (optional) (default = true)
 * @returns {boolean|*}
 */
function verifVal(variable, defaultVal)
{
    defaultVal = typeof defaultVal == 'undefined' ? 'true' : defaultVal;
    return typeof variable == 'undefined' || variable == null || variable == '' ? defaultVal : variable;
}

/**
 * Verifie qu'une variable existe
 * 
 * @param variable
 * @param defaultVal
 * @returns {boolean}
 */
function existe(variable, defaultVal)
{
    if(variable == 'false' || variable == 'true') {
        variable = $.parseJSON(variable);
    }
    if(typeof defaultVal == 'undefined') {
        defaultVal =  true;
    }

    return variable == defaultVal;
}

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