let currentLang = ""

if (localStorage.getItem("yt-widget") === null) {
    localStorage.setItem('yt-widget', JSON.stringify({
        "lang": "en",
        "active": true
    })
    )
}

currentLang = JSON.parse(localStorage.getItem("yt-widget")).lang

function LangTrans() {
    const [toggle, setToggle] = React.useState(false)
    const conterID = document.getElementById("counter")
    const yatranslate = {
        lang: 'en',
        langFirstVisit: "en"
    }

    const languages = [
        ["ru", "Русский"],
        ["en", "English"],
        ["es", "Español"],
        ["ko", "한국어"],
        ["ja", "日本語"],
        ["it", "Italiano"],
        ["de", "Deutsch"],
        ["fr", "Français"]
    ]

    function iconSwitcher(value) {
        switch (value) {
            case "de":
                return "./img/germany.png"
            case "ja":
                return "./img/japane.png"
            case "ko":
                return "./img/korea.png"
            case "it":
                return "./img/italian.png"
            case "fr":
                return "./img/french.png"
            case "es":
                return "./img/espaniol.png"
            case "en":
                return "./img/uk.png"
            case "ru":
                return "./img/russia.png"
            default:
                console.warn("No pictures found")
        }
    }

    function toggleLangList() {
        setToggle(!toggle)
    }
    React.useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            yaTranslateInit();
        })
        function yaTranslateInit() {

            if (yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
                yaTranslateSetLang(yatranslate.langFirstVisit);
            }

            let script = document.createElement('script');
            script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`;
            document.getElementsByTagName('head')[0].appendChild(script);


            let code = yaTranslateGetCode();

            yaTranslateHtmlHandler(code);

            yaTranslateEventHandler('click', '[data-ya-lang]', function (el) {
                yaTranslateSetLang(el.getAttribute('data-ya-lang'));
                window.location.reload();
            })
        }
        function yaTranslateSetLang(lang) {
            localStorage.setItem('yt-widget', JSON.stringify({
                "lang": lang,
                "active": true
            }));
        }
        function yaTranslateGetCode() {
            return (localStorage["yt-widget"] !== null && JSON.parse(localStorage["yt-widget"]).lang !== undefined) ? JSON.parse(localStorage["yt-widget"]).lang : yatranslate.lang;
        }

        function yaTranslateHtmlHandler(code) {
            document.querySelector(`[data-ya-lang=${code}]`)?.classList.add('language_list__active')

        }

        function yaTranslateEventHandler(event, selector, handler) {
            document.addEventListener(event, function (e) {
                let el = e.target.closest(selector);
                if (el) handler(el);
            });
        }
        yaTranslateInit()
    }, [])
    return (
        <div>
            <div id="ytWidget" style={{ display: "none" }}>

            </div>
            <div className="box-regular language-box"
                onClick={() => toggleLangList()}
            >
                <span><img src={iconSwitcher(currentLang)} alt="flag" /></span><span translate="no">{languages[languages.findIndex((element) => element[0] === currentLang)][1]}</span>
            </div>
            {toggle ?
                languages.map((element, index) => {
                    return (
                        <div className="box-regular language-box" key={index} data-ya-lang={element[0]}
                        >
                            <span><img src={iconSwitcher(element[0])} alt="flag" /></span><span translate="no">{element[1]}</span>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}

const domContainer = document.querySelector('#language-trans-v1');
const root = ReactDOM.createRoot(domContainer);
root.render(<LangTrans />);