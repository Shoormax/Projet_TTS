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
    else if(typeof variable == "undefined") {
        return true;
    }

    if(typeof defaultVal == 'undefined') {
        defaultVal =  true;
    }

    return variable == defaultVal;
}

/**
 * Permet de chacher les images et de les remplacer par leur attribut "alt"
 */
function hide_Images()
{
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
}

/**
 * Rertourne le texte sélectionne par l'utilisateur
 * @returns {*}
 */
function getSelectedText()
{
    if(window.getSelection()) {
        return window.getSelection().toString();
    }
    else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

/**
 * Permet de lire un message et d'effectuer les vérification necessaires
 * @param message
 * @param noalert
 */
function readMessage(message, noalert){
    noalert = typeof noalert == "undefined" ? true : noalert;
    if(typeof message != "undefined" && message != '') {
        if(existe(sessionStorage.getItem("lectureVocale"))) {
            responsiveVoice.speak(message, 'French Female');
        }
        else if(!noalert) {
            alert(message);
        }
    }
}