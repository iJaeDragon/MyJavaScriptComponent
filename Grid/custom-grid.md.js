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

function loadCSS(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
  
    document.head.appendChild(link);
}

loadScript('./lib/gridjs.umd.js');
loadScript('./lib/selection.umd.js');

loadCSS('./lib/mermaid.min.css');
/* =============================== load End =============================== */

/* =============================== Custom Method =============================== */

const customGridMethod = {
    headerReadOnly: function(gridElement) {
        setTimeout(function() {
            gridElement.querySelectorAll('th').forEach((th, index) => {
                th.querySelector('div').setAttribute('contentEditable', 'false');
            });
        }, 100);
    }
}

/* =============================== Custom End =============================== */