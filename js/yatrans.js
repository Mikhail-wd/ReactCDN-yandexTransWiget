const yatranslate = {
    lang: 'en',
    // langFirstVisit: "en"
}
document.addEventListener('DOMContentLoaded', function () {
    // Start
    yaTranslateInit();
    console.log("Started")
})
function yaTranslateInit() {

    if (yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
        /* Если установлен язык перевода для первого посещения и в localStorage нет yt-widget */
        /* If the translation language is installed for the first visit and in localStorage no yt-widget */
        yaTranslateSetLang(yatranslate.langFirstVisit);
    }

    let script = document.createElement('script');
    script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`;
    document.getElementsByTagName('head')[0].appendChild(script);

    let code = yaTranslateGetCode();

    yaTranslateHtmlHandler(code);

    yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
        yaTranslateSetLang(el.getAttribute('data-ya-lang'));
        // Перезагружаем страницу
        // Reloading the page
        window.location.reload();
    })
}

function yaTranslateSetLang(lang) {
    // Записываем выбранный язык в localStorage объект yt-widget 
    // Writing the selected language to localStorage 
    localStorage.setItem('yt-widget', JSON.stringify({
        "lang": lang,
        "active": true
    }));
}

function yaTranslateGetCode() {
    // Возвращаем язык на который переводим
    // Returning the language to which we are translating
    return (localStorage["yt-widget"] !== null && JSON.parse(localStorage["yt-widget"]).lang !== undefined) ? JSON.parse(localStorage["yt-widget"]).lang : yatranslate.lang;
}

function yaTranslateHtmlHandler(code) {
    // Получаем язык на который переводим и производим необходимые манипуляции с DOM
    // We get the language to which we translate and produce the necessary manipulations with DOM 
    document.querySelector(`[data-ya-lang=${code}]`)?.classList.add('language_list__active')

}

function yaTranslateEventHandler(event, selector, handler) {
    document.addEventListener(event, function (e) {
        let el = e.target.closest(selector);
        if (el) handler(el);
    });
}
yaTranslateInit()