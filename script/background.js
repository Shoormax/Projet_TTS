/**
 * Fichier d'options et de paramétrage
 */
$(function () {
    var profil = parseInt(sessionStorage.getItem('profil'));
    if(profil != null && profil != 'undefined' && !isNaN(profil)) {

        $('#cbNonVoyant').prop('checked', profil == 1);
        $('#cbMalVoyant').prop('checked', profil == 2);
        $('#cbPerso').prop('checked', profil == 3);

        $('#lectureVocale').prop('checked', cocheCheckBox(sessionStorage.getItem('lectureVocale')));
        $('#controleVocal').prop('checked', cocheCheckBox(sessionStorage.getItem('controleVocal')));
        $('#affichageImages').prop('checked', cocheCheckBox(sessionStorage.getItem('affichageImages')));
        $('#isDyslexic').prop('checked', cocheCheckBox(sessionStorage.getItem('isDyslexic')));
        changeCheckBox(profil != 3 ? true : false);
    }
});

$('#cbNonVoyant').click(function () {
    $('#lectureVocale').prop('checked', 'checked');
    $('#controleVocal').prop('checked', 'checked');
    $('#affichageImages').prop('checked', '');
    $('#isDyslexic').prop('checked', cocheCheckBox(sessionStorage.getItem('isDyslexic')));
    changeCheckBox(true);
});

$('#cbMalVoyant').click(function () {
    $('#lectureVocale').prop('checked', '');
    $('#controleVocal').prop('checked', '');
    $('#affichageImages').prop('checked', 'checked');
    $('#isDyslexic').prop('checked', cocheCheckBox(sessionStorage.getItem('isDyslexic')));
    changeCheckBox(true);
});

$('#cbPerso').click(function () {
    $('#lectureVocale').prop('checked', cocheCheckBox(sessionStorage.getItem('lectureVocale')));
    $('#controleVocal').prop('checked', cocheCheckBox(sessionStorage.getItem('controleVocal')));
    $('#affichageImages').prop('checked', cocheCheckBox(sessionStorage.getItem('affichageImages')));
    $('#isDyslexic').prop('checked', cocheCheckBox(sessionStorage.getItem('isDyslexic')));
    changeCheckBox(false);
});

/**
 * Permet de set l'état des checkboxs
 *
 * @param disabled
 */
function changeCheckBox(disabled) {
    $('#lectureVocale').attr('disabled', disabled);
    $('#controleVocal').attr('disabled', disabled);
    $('#affichageImages').attr('disabled', disabled);
}

/**
 * Permet d'enregistrer les propriétés choisies
 */
$('#btnSave').click(function () {
    var profil = 3;
    if($('#cbNonVoyant').is(':checked')) {
        profil = 1;
    }
    else if($('#cbMalVoyant').is(':checked')) {
        profil = 2;
    }

    setStorage(profil);
    portFromCS.postMessage({params: getStorage()});
    setTimeout(function () {
        location.reload();
    }, 100);
});

/**
 * Permet de set le localstorage en fonction du profil
 *
 * @param profil
 */
function setStorage(profil) {
    if(profil == 1) {
        sessionStorage.setItem("lectureVocale", true);
        sessionStorage.setItem("controleVocal", true);
        sessionStorage.setItem("affichageImages", false);
        sessionStorage.setItem("isDyslexic", $('#isDyslexic').is(':checked'));
        sessionStorage.setItem("profil", profil);
    }
    else if(profil == 2) {
        sessionStorage.setItem("lectureVocale", false);
        sessionStorage.setItem("controleVocal", false);
        sessionStorage.setItem("affichageImages", true);
        sessionStorage.setItem("isDyslexic", $('#isDyslexic').is(':checked'));
        sessionStorage.setItem("profil", profil);
    }
    else {
        sessionStorage.setItem("lectureVocale", $('#lectureVocale').is(':checked'));
        sessionStorage.setItem("controleVocal", $('#controleVocal').is(':checked'));
        sessionStorage.setItem("affichageImages", $('#affichageImages').is(':checked'));
        sessionStorage.setItem("isDyslexic", $('#isDyslexic').is(':checked'));
        sessionStorage.setItem("profil", profil);
    }
}

/**
 * Retourne un tableau contenant les variables enregistrées en local
 *
 * @returns {{lectureVocale, controleVocal, affichageImages}}
 */
function getStorage() {
    return {
        'lectureVocale' : sessionStorage.getItem("lectureVocale"),
        'controleVocal' : sessionStorage.getItem("controleVocal"),
        'affichageImages' : sessionStorage.getItem("affichageImages"),
        'isDyslexic' : sessionStorage.getItem("isDyslexic")
    };
}


/**
 * Verifie qu'une variable existe
 *
 * @param variable
 * @param defaultVal
 * @param isCheckBox
 * @returns {string|*}
 */
function verifExist(variable, defaultVal)
{
    defaultVal = typeof defaultVal == 'undefined' ? 'true' : defaultVal;

    return typeof variable == 'undefined' || variable == null || variable == '' ? defaultVal : variable;
}

function cocheCheckBox(variable)
{
    return variable == 'true' || variable == true ? true : false;
}

var portFromCS;

/**
 * Permet de se connecter pour envoyer des données
 * @param p
 */
function connected(p) {
    portFromCS = p;
}

chrome.runtime.onConnect.addListener(connected);
