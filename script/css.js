/**
 * Méthode permet de créer le css en JS afin de le modifier en récupérant les valeur du localstorage
* @param isDyslexic
*/
function loadCss()
{
    var fa = document.createElement('style');
    var isDyslexic = sessionStorage.getItem('isDyslexic');
    isDyslexic = typeof isDyslexic == "undefined" || isDyslexic == null ? 'false' : isDyslexic;

    fa.type = 'text/css';

    fa.textContent =
        '@font-face { font-family: OpenDyslexic-Regular; src: url("' + chrome.extension.getURL('font/OpenDyslexic-Regular.otf') + '"); }' +
        '#infos_div { position: fixed; bottom: 0; right: 0; }'+
        '#infos_div { background-color: white; }'+
        '.btn { background-image: linear-gradient(to bottom, #3498db, #2980b9); color: #ffffff; font-size: 20px; padding: 10px 20px 10px 20px; text-decoration: none; }'+
        '.btn:hover { background-image: linear-gradient(to bottom, #3cb0fd, #3498db); text-decoration: none; }' +
        '* { color : #3b5998 !important;}'+ (isDyslexic == 'true' ? '* { font-family: "OpenDyslexic-Regular" !important; }' : '{ font-family: "Arial" !important; }') +
        'a { font-weight: bold !important; color: #100998; text-decoration: underline !important; }'+
        '.alt { font-size: 18px; }' +
        //Si une image n'a pas de "alt" on rajouter une phrase avec ce css
        '.noAlt{ color: #E80001 !important; }' +
        //Edit la sélection de texte de l'utilisateur
        '::selection {background: #ffb7b7; }';

    document.head.appendChild(fa);
}