/*
 * $("a").click(function(e) { e.preventDefault(); });
 * Empeche l'action d'un lien cliqué
 */
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

    var isActive = sessionStorage.getItem("active") == null || sessionStorage.getItem("active") == 'undefined' || sessionStorage.getItem("active") == '' ? true : sessionStorage.getItem("active");

    if(isActive == 'true') {
        loadCss();      //load les éléments css grâce au JS afin de modifier dynamiquement les propriétés

        var lastDomElement = null;
        if(typeof sessionStorage.getItem("lectureVocale") != "undefined" && sessionStorage.getItem("lectureVocale") == 'true')
        {
            function active(domElement){
                domElement.addClass("active");
                if(lastDomElement != null){
                    lastDomElement.removeClass('active');
                }
                lastDomElement = domElement;
                messageGenerator(domElement);
            }

            function messageGenerator(domElement){
                var domTag = domElement[0].tagName;
                var message;
                switch(domTag){
                    case "UL":
                        message = "Ceci est une liste, appuyez sur la flèche de droite pour accéder à chacun des points de la liste.";
                        break;
                    case "P":
                        message = "Paragraphe. " + domElement.text();
                        break;
                    case "LI":
                        message = "élément d'une liste. " + domElement.text();
                        break;
                    default: return;
                }
                readMessage(message);
            }

            function readMessage(message){
                responsiveVoice.speak(message, 'French Female');
            }

            $('p, li').click(function () {
                active($(this));
            });

            $('html').mouseup(function() {
                var text = getSelectedText();
                if (text!=''){
                    responsiveVoice.speak(text);
                }
            });

            function getSelectedText() {
                if(window.getSelection()) {
                    return window.getSelection().toString();
                }
                else if (document.selection) {
                    return document.selection.createRange().text;
                }
                return '';
            }

            $(document).keydown(function(e) {
                switch(e.which) {
                    case 37: // left
                        if(lastDomElement != null && lastDomElement.has().parent()){
                            active(lastDomElement.parent());
                        }
                        break;

                    case 38: // up
                        if(lastDomElement != null && lastDomElement.has().prev()){
                            active(lastDomElement.prev());
                        }
                        break;

                    case 39: // right
                        if(lastDomElement != null && lastDomElement.has().children()){
                            active(lastDomElement.children().first());
                        }
                        break;

                    case 40: // down
                        if(lastDomElement != null && lastDomElement.has().next()){
                            active(lastDomElement.next());
                        }
                        break;

                    default: return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            });
        }

        if(typeof sessionStorage.getItem('affichageImages') != "undefined" && sessionStorage.getItem('affichageImages') == 'false') {
            function hide_Images() {
                $("img").each(function () {
                    var temp = this;

                    if($(this).parent().children('.alt').length) {
                        $(this).parent().children('.alt').remove()
                    }
                    else {
                        $(this).parent().append('<p class="alt">'+ typeof temp.alt == 'undefined' ? 'Aucune description n\'a été trouvée pour cette image' : temp.alt+'</p>')
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

        $("a").click(function(e) {
            var href = $(this).attr('href');
            e.preventDefault();
            var allow;
            if(typeof sessionStorage.getItem('affichageImages') != "undefined" && sessionStorage.getItem('affichageImages') == 'false') {
                readMessage('Vous venez de cliquer sur un lien, êtes vous sur de vouloir le suivre ?');
            }

            setTimeout(function () {
                allow = confirm('Vous venez de cliquer sur un lien, êtes vous sur de vouloir le suivre ?');
                if (allow) {
                    responsiveVoice.cancel();
                    window.location.href = href;
                }
            });
        });
    }
});

function setStorageParams(params)
{
    Object.keys(params).map(function(key, index) {
        var val = params[key];
        for(var i in val) {
            sessionStorage.setItem(i, val[i]);
        }
    });
}