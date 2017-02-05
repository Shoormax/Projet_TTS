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

    if(isActive || sessionStorage.getItem("active") === null) {
        loadCss();      //load les éléments css grâce au JS afin de modifier dynamiquement les propriétés

        var lastDomElement = null;
        if(existe(sessionStorage.getItem("lectureVocale")))
        {
            function active(domElement) {
                domElement.addClass("active");

                if(lastDomElement != null) {
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

            $('p, li, ul, h1, h2, h3, h4').click(function () {
                active($(this));
            });

            $('html').mouseup(function() {
                var text = getSelectedText();
                if (text != ''){
                    readMessage(text);
                }
            });

            $('body a').click(function (event) {
                event.preventDefault(); // empêche la redirection du lien
                active($(this));
            });

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
            hide_Images();
        }
        else {
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
        }

        $('input').focus(function () {
            readMessage($(this).prop('placeholder'), true);
        });

        if(existe(sessionStorage.getItem("controleVocal"))) {
            $(window).on('beforeunload', annyangChargementPage());
            controleVocale();
        }

        function createZoomButton() {
            var div = document.createElement("div");
            div.id = 'containerZoomBtn';
            var zoomIn = document.createElement("button");
            zoomIn.id = "zoomInBrowser";
            zoomIn.className = "btnZoomBrowser";
            zoomIn.innerHTML = '+';

            div.appendChild(zoomIn);

            var spanZoom = document.createElement("span");
            spanZoom.id = 'spanZoomBrowser';
            spanZoom.innerHTML = '100%';
            div.appendChild(spanZoom);

            var zoomOut = document.createElement("button");
            zoomOut.id = "zoomOutBrowser";
            zoomOut.className = "btnZoomBrowser";
            zoomOut.innerHTML = '-';

            div.appendChild(zoomOut);

            add_element_to_body(div);
        }

        createZoomButton();

        var taille = 1;

        $('.btnZoomBrowser').click(function() {
            taille = $(this).html() == '+' ? taille + 0.01 : taille - 0.01;
            $('html').css('font-size', taille+'em');
            $('#spanZoomBrowser').html(parseInt(taille*100)+'%');
        });

        $('#spanZoomBrowser').click(function () {
            taille = 1;
            $('html').css('font-size', taille+'em');
            $('#spanZoomBrowser').html('100%');
        });
    }
});