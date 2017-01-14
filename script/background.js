/**
 * Fichier d'options et de paramétrage
 */
$(function () {
    var profil = parseInt(sessionStorage.getItem('profil'));
    if(profil != null && profil != 'undefined' && !isNaN(profil)) {

        $('#cbNonVoyant').prop('checked', profil == 1);
        $('#cbMalVoyant').prop('checked', profil == 2);
        $('#cbPerso').prop('checked', profil == 3);

        var storage = getStorage();

        $('#lectureVocale').attr('checked', $.parseJSON(storage['lectureVocale']));
        $('#controleVocal').attr('checked', $.parseJSON(storage['controleVocal']));
        $('#affichageImages').attr('checked', $.parseJSON(storage['affichageImages']));
        changeCheckBox(profil != 3 ? true : false);
    }
});

$('#cbNonVoyant').click(function () {
    $('#lectureVocale').attr('checked', true);
    $('#controleVocal').attr('checked', true);
    $('#affichageImages').attr('checked', false);
    changeCheckBox(true);
});

$('#cbMalVoyant').click(function () {
    $('#lectureVocale').attr('checked', false);
    $('#controleVocal').attr('checked', false);
    $('#affichageImages').attr('checked', true);
    changeCheckBox(true);
});

$('#cbPerso').click(function () {
    changeCheckBox(false);
});

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
        sessionStorage.setItem("profil", profil);
    }
    else if(profil == 2) {
        sessionStorage.setItem("lectureVocale", false);
        sessionStorage.setItem("controleVocal", false);
        sessionStorage.setItem("affichageImages", true);
        sessionStorage.setItem("profil", profil);
    }
    else {
        sessionStorage.setItem("lectureVocale", $('#lectureVocale').is(':checked'));
        sessionStorage.setItem("controleVocal", $('#controleVocal').is(':checked'));
        sessionStorage.setItem("affichageImages", $('#affichageImages').is(':checked'));
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
        'affichageImages' : sessionStorage.getItem("affichageImages")
    };
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
