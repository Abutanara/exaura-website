// Embedded translations for testing (bypasses CORS issues)
const embeddedTranslations = {
    en: {
        "nav": {
            "home": "Home",
            "features": "Features",
            "about": "About",
            "contact": "Contact",
            "getStarted": "Get Started"
        },
        "hero": {
            "badge": "Your Journey to Freedom",
            "title": "Quit Smoking with",
            "titleHighlight": "Smart Support",
            "description": "My Quitly is a quit smoking companion app that adapts to your pace. Track your progress, earn rewards, and work towards your goals with personalized support.",
            "downloadAppStore": "Download on the",
            "downloadGooglePlay": "GET IT ON",
            "appStore": "App Store",
            "googlePlay": "Google Play",
            "free": "Free",
            "toDownload": "To Download",
            "iosAndroid": "iOS &",
            "android": "Android",
            "languages": "EN & DE",
            "languagesDesc": "Languages"
        },
        "features": {
            "title": "Your Quit Smoking Companion",
            "subtitle": "Tools and features designed to support your journey towards your goals"
        },
        "language": {
            "current": "EN",
            "switchTo": "DE"
        }
    },
    de: {
        "nav": {
            "home": "Startseite",
            "features": "Funktionen",
            "about": "Über uns",
            "contact": "Kontakt",
            "getStarted": "Loslegen"
        },
        "hero": {
            "badge": "Deine Reise zur Freiheit",
            "title": "Mit dem Rauchen aufhören mit",
            "titleHighlight": "Intelligenter Unterstützung",
            "description": "My Quitly ist eine Begleit-App zum Rauchstopp, die sich an dein Tempo anpasst. Verfolge deinen Fortschritt, verdiene Belohnungen und arbeite mit personalisierter Unterstützung an deinen Zielen.",
            "downloadAppStore": "Im App Store laden",
            "downloadGooglePlay": "JETZT HERUNTERLADEN",
            "appStore": "App Store",
            "googlePlay": "Google Play",
            "free": "Kostenlos",
            "toDownload": "herunterladen",
            "iosAndroid": "iOS &",
            "android": "Android",
            "languages": "DE & EN",
            "languagesDesc": "Sprachen"
        },
        "features": {
            "title": "Dein Begleiter beim Rauchstopp",
            "subtitle": "Tools und Funktionen, die darauf ausgelegt sind, dich auf deinem Weg zu deinen Zielen zu unterstützen"
        },
        "language": {
            "current": "DE",
            "switchTo": "EN"
        }
    }
};

// Test function to load embedded translations
function loadEmbeddedTranslations(language) {
    console.log(`Loading embedded translations for: ${language}`);
    return Promise.resolve(embeddedTranslations[language] || embeddedTranslations.en);
}
