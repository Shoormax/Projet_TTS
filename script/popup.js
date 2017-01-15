$('#btnApropos').click(function () {
   $('#aPropos').toggle();
});

$('#btnConfig').click(function () {
    window.open("background.html");
})

$('#cbDesactiver').on('change', function(){
    sessionStorage.setItem("active", !this.checked);
    chromeSend();
});

function cocheCb() {
    $('#cbDesactiver').prop('checked', cocheCheckBox(sessionStorage.getItem("active")));
}


/**
 * Permet de désactiver l'extension depuis la popup
 */
function chromeSend() {
    var sendData = sessionStorage.getItem("active") == null || sessionStorage.getItem("active") == 'undefined' ? true : sessionStorage.getItem("active");

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: sendData});
    });
}

function cocheCheckBox(variable)
{
    return typeof variable != "undefined" || variable == 'true' || variable == true ? true : false;
}