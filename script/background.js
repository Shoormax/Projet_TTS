/**
 * Fichier d'options et de paramétrage
 */
$(function () {
    var profil = parseInt(localStorage.getItem('profil'));
    if(profil != null && profil != 'undefined' && !isNaN(profil)) {

        $('#cbNonVoyant').prop('checked', profil == 1);
        $('#cbMalVoyant').prop('checked', profil == 2);
        $('#cbPerso').prop('checked', profil == 3);

        $('#lectureVocale').prop('checked', cocheCheckBox(localStorage.getItem('lectureVocale')));
        $('#controleVocal').prop('checked', cocheCheckBox(localStorage.getItem('controleVocal')));
        $('#affichageImages').prop('checked', cocheCheckBox(localStorage.getItem('affichageImages')));
        $('#isDyslexic').prop('checked', cocheCheckBox(localStorage.getItem('isDyslexic')));
        $('#selectFontFamily').val(verifExist(localStorage.getItem('fontFamily'), 'Arial'));
        $('#selectFontColor').val(verifExist(localStorage.getItem('fontColor'), "#000"));
        changeCheckBox(profil != 3);
    }
    else {
        $('#cbPerso').prop('checked', true);
    }

    $('#selectFontColor').find('option').each(function(){
        $(this).css('color', $(this).val());
    })
});

$('#cbNonVoyant').click(function () {
    $('#lectureVocale').prop('checked', 'checked');
    $('#controleVocal').prop('checked', 'checked');
    $('#affichageImages').prop('checked', '');
    $('#isDyslexic').prop('checked', cocheCheckBox(localStorage.getItem('isDyslexic')));
    changeCheckBox(true);
});

$('#cbMalVoyant').click(function () {
    $('#lectureVocale').prop('checked', '');
    $('#controleVocal').prop('checked', '');
    $('#affichageImages').prop('checked', 'checked');
    $('#isDyslexic').prop('checked', cocheCheckBox(localStorage.getItem('isDyslexic')));
    $('#selectFontFamily').val(verifExist(localStorage.getItem('fontFamily'), 'Arial'));
    changeCheckBox(true);
});

$('#cbPerso').click(function () {
    $('#lectureVocale').prop('checked', cocheCheckBox(localStorage.getItem('lectureVocale')));
    $('#controleVocal').prop('checked', cocheCheckBox(localStorage.getItem('controleVocal')));
    $('#affichageImages').prop('checked', cocheCheckBox(localStorage.getItem('affichageImages')));
    $('#isDyslexic').prop('checked', cocheCheckBox(localStorage.getItem('isDyslexic')));
    $('#selectFontFamily').val(verifExist(localStorage.getItem('fontFamily'), 'Arial'));
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

    $.ajax({
        type: "POST",
        url : "http://monquartierconfluence.labo-g4.fr/extensionG4.php",
        data: {page: 'background', params: getStorage()},
        crossDomain: true,
        dataType: "json",
        cache: false,
        asyn: false,
        success: function (data) {
            if(data.status != 1) {
                console.log(data.message);
            }
        },
        error: function (data) {
            console.log(data.message);
        }
    });
});

/**
 * Permet de set le localstorage en fonction du profil
 *
 * @param profil
 */
function setStorage(profil) {
    if(profil == 1) {
        localStorage.setItem("lectureVocale", true);
        localStorage.setItem("controleVocal", true);
        localStorage.setItem("affichageImages", false);
        localStorage.setItem("isDyslexic", $('#isDyslexic').is(':checked'));
        localStorage.setItem("profil", profil);
    }
    else if(profil == 2) {
        localStorage.setItem("lectureVocale", false);
        localStorage.setItem("controleVocal", false);
        localStorage.setItem("affichageImages", true);
        localStorage.setItem("isDyslexic", $('#isDyslexic').is(':checked'));
        localStorage.setItem("profil", profil);
        localStorage.setItem("fontFamily", $("#selectFontFamily").val());
        localStorage.setItem("fontColor", $("#selectFontColor").val());
    }
    else {
        localStorage.setItem("lectureVocale", $('#lectureVocale').is(':checked'));
        localStorage.setItem("controleVocal", $('#controleVocal').is(':checked'));
        localStorage.setItem("affichageImages", $('#affichageImages').is(':checked'));
        localStorage.setItem("isDyslexic", $('#isDyslexic').is(':checked'));
        localStorage.setItem("profil", profil);
        localStorage.setItem("fontFamily", $("#selectFontFamily").val());
        localStorage.setItem("fontColor", $("#selectFontColor").val());
    }
}

/**
 * Retourne un tableau contenant les variables enregistrées en local
 *
 * @returns {{lectureVocale, controleVocal, affichageImages}}
 */
function getStorage() {
    return {
        'lectureVocale' : localStorage.getItem("lectureVocale"),
        'controleVocal' : localStorage.getItem("controleVocal"),
        'affichageImages' : localStorage.getItem("affichageImages"),
        'isDyslexic' : localStorage.getItem("isDyslexic"),
        'fontFamily' : localStorage.getItem("fontFamily"),
        'fontColor' : localStorage.getItem("fontColor")
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
