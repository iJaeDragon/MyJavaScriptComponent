/* =============================== load Begin =============================== */
function loadScript(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status === 200) {
        eval(xhr.responseText);
    } else {
        console.error('Failed to load script:', url, xhr.status, xhr.statusText);
    }
}

loadScript('./lib/gridjs.umd.js');
loadScript('./lib/selection.umd.js');
/* =============================== load End =============================== */

/* =============================== Custom Method =============================== */

const test = function() {

}

/* =============================== Custom End =============================== */