$(document).ready(function() {
    $.ajax({
        type: "POST",
        url : "https://monquartierconfluence.labo-g4.fr/extensionG4.php",
        data: {page: 'popupRecup'},
        crossDomain: true,
        dataType: "json",
        cache: false,
        asyn: false,
        success: function (data) {
            if(data.status != 1) {
                console.log(data.message);
            }
            else {
                $('#cbDesactiver').prop('checked', !$.parseJSON(data.data))
            }
        },
        error: function (data) {
            console.log(data.message);
        }
    });
});

$('#cbDesactiver').on('change', function(){
    $.ajax({
        type: "POST",
        url : "https://monquartierconfluence.labo-g4.fr/extensionG4.php",
        data: {page: 'popupConfig', active: !$('#cbDesactiver').prop('checked')},
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

$('#btnApropos').click(function () {
    $('#aPropos').toggle();
});

$('#btnConfig').click(function () {
    window.open("background.html");
});