let selections = { os: "mac", language: "javascript", ide: "vscode" };

window.onload = function () {
    let queryString = window.location.search;
    if (queryString) {
        let searchParam = new URLSearchParams(queryString);
        updateSelection(searchParam);
    }
    setSelections();
    document.querySelectorAll(".search").forEach(setOnclickEvent);
    if (window.location.search === '') {
        window.location.search = (new URLSearchParams(selections)).toString();
    }
    showContent();
}

function updateSelection(searchParam) {
    selections.os = searchParam.get('os');
    window.localStorage.setItem('os', selections.os)
    selections.language = searchParam.get('language');
    window.localStorage.setItem('language', selections.language)
    selections.ide = searchParam.get('ide');
    window.localStorage.setItem('ide', selections.ide)

}


function showContent() {
    Object.keys(selections).forEach(function (s) {
        document.querySelectorAll('.' + selections[s]).forEach(function (e) {
            e.classList.remove('hidden');
        })
    })
}

function setOnclickEvent(button) {
    if (selections[button.name] === button.value) button.checked = true;
    button.onclick = function () {
        window.localStorage.setItem(button.name, button.value);
        selections[button.name] = button.value;
        window.location.search = (new URLSearchParams(selections)).toString();
    };
};


function setSelections() {
    Object.keys(selections).forEach(function (k) {
        let entry = window.localStorage.getItem(k);
        if (entry)
            selections[k] = entry;
        else
            window.localStorage.setItem(k, selections[k]);
    });
}


