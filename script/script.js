$(function () {

    // $('nav ul a').css({backgroundColor : 'red'});

    function searchMenu() {
        if($('nav ul a') != null){

            var menuElts = [];
            var menus = [];
            var nbMenu = 0;
            // menuElts.push([$('nav ul a')[0]];

            // Ajoute chaque élément pouvant être un menu, dans l'array menuElt
            $('nav:has(ul:has(a)), div:has(ul:has(a))').each(function(i){
                $this
                menus.push($(this));
                // if(i % 3 == 0)
                //     $(this).css({backgroundColor : 'red'});
                // else if(i % 3 == 1)
                //     $(this).css({backgroundColor : 'blue'});
                // else if(i % 3 == 2)
                //     $(this).css({backgroundColor : 'yellow'});
                $(this).addClass("menu-tts");
            })

            // menuElts.forEach(function (element, i) {
            //     // console.log(element + i);
            //     // console.log(menuElts[i+1] + i);
            //     if(i == 0 || i == menuElts.length) {
            //         menus[nbMenu].push(element);
            //         console.log("i = 0 ou dernier élément du tableau");
            //     }else if($.inArray(element.parent().siblings(), menuElts[i+1].parent())){
            //         console.log("oui"+element.parent() +"   "+ menuElts[i+1].parent());
            //         menus[nbMenu].push(element);
            //     }else{
            //         nbMenu ++;
            //         menus[nbMenu].push(element);
            //         console.log("non"+element.parent() +"   "+ menuElts[i+1].parent());
            //         console.log("Nouveau menu :)");
            //     }
            // })
            //
            // console.log(menus[0].join(", "));
            //
            // // menuElts.push(this));
            // // $(this).addClass("menu-tts");
            // //
            // for(var i = 0; i < menus[0].length; i++){
            //     console.log(menus[0].text);
            // }
            // // $('div ul li a, div ul a li').css({backgroundColor : 'blue'});
        }
    }
    searchMenu();
});

//
// var myPort = chrome.runtime.connect({name:"port-from-cs"});
//
// myPort.onMessage.addListener(function(m) {
//     setStorageParams(m);
// });
//
// $(function () {
//     chrome.runtime.onMessage.addListener(
//         function (request, sender, sendResponse) {
//             sessionStorage.setItem("active", request.data);
//             location.reload();
//         }
//     );
//
//     var isActive = existe(sessionStorage.getItem("active"));
//
//     // if(isActive) {
//     if(true) {
//         loadCss();      //load les éléments css grâce au JS afin de modifier dynamiquement les propriétés
//
//         var lastDomElement = null;
//         // if(existe(sessionStorage.getItem("lectureVocale")))
//         if(true)
//         {
//             function readMessage(message){
//                 responsiveVoice.speak(message, 'French Female');
//             }
//
//             // readMessage("Vous êtes arrivé sur la page " + $(document).attr('title'));
//
//             function active(domElement){
//                 domElement.addClass("active");
//                 if(lastDomElement != null){
//                     lastDomElement.removeClass('active');
//                     responsiveVoice.cancel();
//                 }
//                 lastDomElement = domElement;
//                 messageGenerator(domElement);
//             }
//
//             function messageGenerator(domElement) {
//                 var domTag = domElement[0].tagName;
//                 var message;
//                 switch (domTag) {
//                     case "A":
//                         message = "Lien pointant vers :" + domElement.text() + ". Appuyez sur entrée pour être redirigé.";
//                         break;
//                     case "UL":
//                         message = "Ceci est une liste de " + domElement.children().length + " éléments, appuyez sur la flèche de droite pour accéder à chacun.";
//                         break;
//                     case "P":
//                         message = "Paragraphe. " + domElement.text();
//                         break;
//                     case "LI":
//                         message = "élément " + (domElement.index() + 1) + ". " + domElement.text();
//                         break;
//                     case "H1":
//                         message = "Titre de niveau 1. " + domElement.text();
//                         break;
//                     case "H2":
//                         message = "Titre de niveau 2. " + domElement.text();
//                         break;
//                     case "H3":
//                         message = domElement.text();
//                         break;
//                     case "H4":
//                         message = domElement.text();
//                         break;
//                     default:
//                         return;
//                 }
//                 readMessage(message);
//             }
//
//
//             $('p, li, ul, h1, h2, h3, h4').click(function () {
//                 active($(this));
//             });
//
//             $('body a').click(function (event) {
//                 event.preventDefault(); // empêche la redirection du lien
//                 active($(this));
//             });
//
//             // $('html').mouseup(function() {
//             //     var text = getSelectedText();
//             //     if (text!=''){
//             //         responsiveVoice.speak(text);
//             //     }
//             // });
//             //
//             // function getSelectedText() {
//             //     if(window.getSelection()) {
//             //         return window.getSelection().toString();
//             //     }
//             //     else if (document.selection) {
//             //         return document.selection.createRange().text;
//             //     }
//             //     return '';
//             // }
//
//             $(document).keydown(function (e) {
//                 switch (e.which) {
//                     case 13: // enter
//                         // L'utilisateur confirme qu'il veut aller sur le lien
//                         if (lastDomElement[0].tagName == "A") {
//                             window.location = lastDomElement.attr("href"); // redirige vers la cible du lien
//                         }
//                         break;
//
//                     case 27: // escape
//                         responsiveVoice.cancel();
//                         break;
//
//                     case 37: // left
//                         if (lastDomElement != null && lastDomElement.has().parent()) {
//                             active(lastDomElement.parent());
//                         }
//                         break;
//
//                     case 38: // up
//                         if (lastDomElement != null && lastDomElement.has().prev()) {
//                             active(lastDomElement.prev());
//                         }
//                         break;
//
//                     case 39: // right
//                         if (lastDomElement != null && lastDomElement.has().children()) {
//                             active(lastDomElement.children().first());
//                         }
//                         break;
//
//                     case 40: // down
//                         if (lastDomElement != null && lastDomElement.has().next()) {
//                             active(lastDomElement.next());
//                         }
//                         break;
//
//                     default:
//                         return;
//                 }
//                 e.preventDefault();
//             });
//         }
//
//         // if(existe(sessionStorage.getItem('affichageImages'), false)) {
//         if(true) {
//             function hide_Images() {
//                 $("img").each(function () {
//                     var temp = this;
//
//                     if($(this).parent().children('.alt').length) {
//                         $(this).parent().children('.alt').remove()
//                     }
//                     else {
//                         $(this).parent().append('<p class="alt">'+ verifVal(temp.alt, 'Aucune description n\'a été trouvée pour cette image')+'</p>')
//                     }
//
//                     $(this).toggle();
//                 })
//
//                 $('#hideImage').html($('#hideImage').html() == 'Cacher les images' ? 'Afficher les images' : 'Cacher les images');
//             };
//
//             hide_Images();
//         }
//
//         //Lorsque l'on survole une image, elle disparait pour laisser apparaitre la balise alt
//         //Si il n'y a pas de alt, on affiche "Aucune description trouvée pour cette image"
//         var temp = '';
//         $('img').hover(function () {
//             if(typeof $(this).attr('alt') == 'undefined' || $(this).attr('alt') == '') {
//                 $(this).attr('alt', 'Aucune description trouvée pour cette image.');
//             }
//             temp = $(this).attr('src');
//             $(this).attr('src', '');
//             $(this).attr('srcset', '');
//             $(this).addClass('noAlt');
//         },function () {
//             $(this).attr('src', temp);
//             $(this).attr('srcset', temp);
//         });
//
//         // $("a").click(function(e) {
//         //     var href = $(this).attr('href');
//         //     e.preventDefault();
//         //     var allow;
//         //     if(existe(sessionStorage.getItem('lectureVocale'))) {
//         //         readMessage('Vous venez de cliquer sur un lien, êtes vous sur de vouloir le suivre ?');
//         //     }
//         //
//         //     setTimeout(function () {
//         //         allow = confirm('Vous venez de cliquer sur un lien, êtes vous sur de vouloir le suivre ?');
//         //         if (allow) {
//         //             responsiveVoice.cancel();
//         //             window.location.href = href;
//         //         }
//         //     });
//         // });
//     }
// });
//
// /**
//  * Permet de set le storage par rapport aux données reçues
//  *
//  * @param params
//  */
// function setStorageParams(params)
// {
//     Object.keys(params).map(function(key, index) {
//         var val = params[key];
//         for(var i in val) {
//             sessionStorage.setItem(i, val[i]);
//         }
//     });
// }
//
// /**
//  * Verifie la valeur d'une variable
//  *
//  * @param variable
//  * @param defaultVal (optional) (default = true)
//  * @returns {boolean|*}
//  */
// function verifVal(variable, defaultVal)
// {
//     defaultVal = typeof defaultVal == 'undefined' ? 'true' : defaultVal;
//     return typeof variable == 'undefined' || variable == null || variable == '' ? defaultVal : variable;
// }
//
// /**
//  * Verifie qu'une variable existe
//  *
//  * @param variable
//  * @param defaultVal
//  * @returns {boolean}
//  */
// function existe(variable, defaultVal)
// {
//     if(variable == 'false' || variable == 'true') {
//         variable = $.parseJSON(variable);
//     }
//     if(typeof defaultVal == 'undefined') {
//         defaultVal =  true;
//     }
//
//     return variable == defaultVal;
// }