function loadCss()
{
    var fa = document.createElement('style');
    fa.type = 'text/css';

    fa.textContent =
        '@font-face { font-family: OpenDyslexic-Regular; src: url("' + chrome.extension.getURL('font/OpenDyslexic-Regular.otf') + '"); }' +
        '#infos_div { position: fixed; bottom: 0; right: 0; }'+
        '#infos_div { background-color: white; }'+
        '.btn { background-image: linear-gradient(to bottom, #3498db, #2980b9); color: #ffffff; font-size: 20px; padding: 10px 20px 10px 20px; text-decoration: none;}'+
        '.btn:hover { background-image: linear-gradient(to bottom, #3cb0fd, #3498db); text-decoration: none;}' +
        '* { font-family: "OpenDyslexic-Regular" !important; color : #3b5998 !important;}'+
        'a { font-weight: bold !important; color: #100998; text-decoration: underline !important;}'+
        '.alt { font-size: 18px;}';

    document.head.appendChild(fa);
}
