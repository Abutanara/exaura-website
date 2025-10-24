# Content Update Guide - JSON-Based Translation System

## 🎯 **How to Update Content**

Now you can update content by editing the JSON files instead of HTML directly!

### **📁 File Structure:**
```
exaura-website/
├── en/
│   ├── index.html          # English page (uses data-translate attributes)
│   └── translations.json   # ← Edit English content here
├── de/
│   ├── index.html          # German page (uses data-translate attributes)
│   └── translations.json   # ← Edit German content here
└── script-translate.js     # Translation system
```

## ✏️ **How to Update Content:**

### **1. Edit English Content:**
Open `/en/translations.json` and update the values:

```json
{
  "hero": {
    "title": "Quit Smoking with",
    "titleHighlight": "Smart Support",
    "description": "Your new description here..."
  }
}
```

### **2. Edit German Content:**
Open `/de/translations.json` and update the values:

```json
{
  "hero": {
    "title": "Mit dem Rauchen aufhören mit",
    "titleHighlight": "Intelligenter Unterstützung", 
    "description": "Deine neue Beschreibung hier..."
  }
}
```

### **3. Save and Refresh:**
- Save the JSON file
- Refresh the website
- Content updates automatically!

## 🔑 **Translation Keys Reference:**

### **Navigation:**
- `nav.logo` → "🚭 Exaura"
- `nav.home` → "Home" / "Startseite"
- `nav.features` → "Features" / "Funktionen"
- `nav.about` → "About" / "Über uns"
- `nav.contact` → "Contact" / "Kontakt"
- `nav.getStarted` → "Get Started" / "Loslegen"

### **Hero Section:**
- `hero.badge` → "Your Journey to Freedom" / "Deine Reise zur Freiheit"
- `hero.title` → "Quit Smoking with" / "Mit dem Rauchen aufhören mit"
- `hero.titleHighlight` → "Smart Support" / "Intelligenter Unterstützung"
- `hero.description` → Main description text
- `hero.freeToDownload` → "Free to Download" / "Kostenlos herunterladen"
- `hero.iosAndroid` → "iOS & Android"
- `hero.languages` → "EN & DE Languages" / "DE & EN Sprachen"

### **Features:**
- `features.title` → "Your Quit Smoking Companion" / "Dein Begleiter beim Rauchstopp"
- `features.subtitle` → Features subtitle
- `features.adaptiveIntelligence.title` → "Adaptive Intelligence" / "Adaptive Intelligenz"
- `features.adaptiveIntelligence.description` → Description text
- `features.progressiveReduction.title` → "Progressive Reduction" / "Schrittweise Reduzierung"
- `features.gamification.title` → "Gamification"
- `features.cravingResistance.title` → "Craving Resistance" / "Craving-Widerstand"
- `features.triggerAnalysis.title` → "Trigger Analysis" / "Trigger-Analyse"
- `features.milestoneCelebrations.title` → "Milestone Celebrations" / "Meilenstein-Feiern"

### **About Section:**
- `about.title` → "About Exaura" / "Über Exaura"
- `about.description1` → First description paragraph
- `about.description2` → Second description paragraph
- `about.goalAchievement` → "Goal Achievement" / "Zielerreichung"
- `about.userEngagement` → "User Engagement" / "Nutzerengagement"
- `about.featureUsage` → "Feature Usage" / "Funktionsnutzung"

### **Contact Section:**
- `contact.title` → "Start Your Journey Today" / "Starte heute deine Reise"
- `contact.subtitle` → Contact subtitle
- `contact.supportEmail` → "info@stargate-innovationhub.com"
- `contact.yourName` → "Your Name" / "Dein Name"
- `contact.yourEmail` → "Your Email" / "Deine E-Mail"
- `contact.yourMessage` → "Tell us about your journey..." / "Erzähle uns von deiner Reise..."

### **Footer:**
- `footer.description` → Footer description
- `footer.privacyPolicy` → "Privacy Policy" / "Datenschutzrichtlinie"
- `footer.termsOfService` → "Terms of Service" / "Nutzungsbedingungen"

### **Cookie Banner:**
- `cookie.title` → "🍪 Cookie Notice" / "🍪 Cookie-Hinweis"
- `cookie.description` → Cookie description
- `cookie.allow` → "Allow" / "Erlauben"
- `cookie.reject` → "Reject" / "Ablehnen"

## 🚀 **Example Updates:**

### **Change Hero Title:**
**English** (`/en/translations.json`):
```json
"hero": {
  "title": "Stop Smoking with",
  "titleHighlight": "AI-Powered Support"
}
```

**German** (`/de/translations.json`):
```json
"hero": {
  "title": "Mit dem Rauchen aufhören mit",
  "titleHighlight": "KI-gestützter Unterstützung"
}
```

### **Add New Feature:**
1. Add to both JSON files:
```json
"features": {
  "newFeature": {
    "title": "New Feature",
    "description": "Description of new feature"
  }
}
```

2. Add to HTML:
```html
<h3 data-translate="features.newFeature.title">New Feature</h3>
<p data-translate="features.newFeature.description">Description...</p>
```

## ✅ **Benefits:**

- ✅ **Easy content updates** - Just edit JSON files
- ✅ **No HTML knowledge needed** - Simple key-value pairs
- ✅ **Version control friendly** - JSON files are easy to track changes
- ✅ **Translator friendly** - Clear structure for translators
- ✅ **No code deployment** - Just update JSON and refresh

## 🎯 **Quick Start:**

1. **Want to change the hero title?** → Edit `hero.title` in both JSON files
2. **Want to update a feature description?** → Edit the corresponding key in JSON
3. **Want to change contact info?** → Edit `contact.supportEmail` in JSON
4. **Want to update cookie text?** → Edit `cookie.*` keys in JSON

That's it! The website will automatically use the new content. 🚀
