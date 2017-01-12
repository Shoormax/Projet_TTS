$(function () {
    loadCss();      //load les éléments css grâce au JS afin de modifier dynamiquement les propriétés
    show_infos();   //permet d'afficher le bouton pour afficher/cacher les images

    var lastDomElement = null;

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
});

function add_element_to_body(element)
{
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(element);
}

function show_infos()
{
    var div = document.createElement("div");
    div.id = "infos_div";

    var button = document.createElement("button");
    button.id = "hideImage";
    button.className = "btn";
    button.addEventListener("click", hideImages);

    var title = document.createTextNode('Cacher les images');
    button.appendChild(title);

    div.appendChild(button);
    add_element_to_body(div);
}

var hideImages = function hide_Images() {
    $("img").each(function () {
        var temp = this;

        if($(this).parent().children('.alt').length) {
            $(this).parent().children('.alt').remove()
        }
        else {
            $(this).parent().append('<p class="alt">'+temp.alt+'</p>')
        }

        $(this).toggle();
    })

    $('#hideImage').html($('#hideImage').html() == 'Cacher les images' ? 'Afficher les images' : 'Cacher les images');
};