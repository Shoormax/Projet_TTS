$(function () {
    loadCss();
    show_infos();
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