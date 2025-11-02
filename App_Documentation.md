# MyQuitly - Vollständige App-Dokumentation für Figma Make

**Erstellt:** 2025  
**Version:** 1.0  
**Zweck:** Detaillierte Dokumentation für 1:1 Visualisierung in Figma Make (Android & iOS)

---

# 📱 1. APP-ÜBERSICHT & SINN

## 1.1 App-Zweck
**MyQuitly** ist eine mobile App zur schrittweisen Raucher-Reduktion mit dem Ziel der vollständigen Rauchentwöhnung. Die App begleitet Nutzer durch einen personalisierten Reduktionsplan bis zum selbstgewählten Aufhörtag.

### Kernphilosophie
- **Schrittweise Reduktion** statt sofortiger Kaltentzug
- **Gamification** zur Motivation (XP, Levels, Badges, Streaks)
- **Adaptive Intelligenz** passt den Plan basierend auf dem Fortschritt an
- **Tägliche Motivation** und Check-ins
- **Craving-Management** mit SOS-Funktion

### Zielgruppe
- Raucher, die schrittweise reduzieren möchten
- Menschen mit festgelegtem Aufhörtag (4-8 Wochen in der Zukunft)
- Nutzer, die Tracking und Fortschrittsvisualisierung benötigen

---

# 🏗️ 2. APP-STRUKTUR & NAVIGATION

## 2.1 Navigation-Architektur

```
Root Layout (_layout.tsx)
├── (auth)/              # Authentifizierungs-Flow
│   ├── index.tsx        # Landing/Welcome Screen
│   ├── login.tsx        # Login Screen
│   ├── signup.tsx       # Registrierung Screen
│   ├── verify-email.tsx # E-Mail-Verifizierung
│   └── reset-password.tsx # Passwort zurücksetzen
├── onboarding.tsx       # Onboarding-Wizard (einmalig)
└── (tabs)/              # Haupt-App (nach Login)
    ├── index.tsx        # Home Tab
    ├── log.tsx          # Log Tab
    ├── stats.tsx         # Stats Tab
    └── profile.tsx      # Profile Tab
```

## 2.2 Navigations-Flow

### Erstnutzer-Flow
```
Splash Screen → Landing Page → Signup → Email Verify → Onboarding → Home Tab
```

### Wiederkehrender Nutzer-Flow
```
Splash Screen → Login → Home Tab (wenn bereits Onboarding abgeschlossen)
                ↓
         Tab Navigation (Home/Log/Stats/Profile)
```

### Authentifizierungs-Guards
- Nicht authentifiziert → Redirect zu `/(auth)`
- Authentifiziert aber in `/(auth)` → Redirect zu `/(tabs)`
- Authentifiziert aber kein Onboarding → Redirect zu `/onboarding`

---

# 🎨 3. DESIGN SYSTEM

## 3.1 Design-Philosophie

### Dark Mode First
- **Primäres Theme:** Dark Mode (Standard für alle Screens)
- **Hintergrund:** #0F0F0F (tiefes Schwarz, nicht #000000)
- **Strategie:** Gradient-First (Teal → Cyan ist primäre Marke)
- **App Icon Match:** Alle Gradienten passen zu App-Icon-Farben

## 3.2 Farbsystem

### Hintergrundfarben (Dark Mode)
```
Primary Background:     #0F0F0F    (Haupt-App-Hintergrund)
Secondary Background:   #1A1A1A    (Sekundäre Flächen, Tab Bar)
Card Background:        #242424    (Karten-Hintergründe, erhöhte Flächen)
Modal Background:       #2D2D2D    (Modal/Dialog-Hintergründe)
Input Background:       #2A2A2A    (Eingabefelder, Textbereiche)
Tab Bar:                #1A1A1A    (Bottom-Navigation-Bar)
```

### Textfarben (Dark Mode)
```
Primary Text:           #FFFFFF    (Weiß - Haupttext, Überschriften)
Secondary Text:         #A0A0A0    (Hellgrau - Sekundärtext, Beschreibungen)
Tertiary Text:          #6B6B6B    (Mittelgrau - deaktiviert, inaktiver Text)
Placeholder Text:       #6B6B6B    (Eingabe-Platzhalter)
```

### Markenfarben (Gradient-First-Strategie)
```
PRIMÄRER BRAND: GRADIENT
────────────────────────
Gradient (135deg):      #20C997 → #06B6D4
  - Start Farbe (Teal): #20C997
  - End Farbe (Cyan):   #06B6D4
  - Winkel:             135deg (diagonal)

SOLIDE FARBEN (Sekundäre Verwendung)
─────────────────────────────────────
Teal Solid:             #20C997    (Ränder, Icons, Fokus-Zustände)
Cyan Solid:             #06B6D4    (Sekundäre Buttons, Info-Badges)

HOVER-ZUSTÄNDE
──────────────
Teal Hover:             #2DD4A6    (Helleres Teal)
Teal Active:            #1BB887    (Dunkleres Teal)
Cyan Hover:             #22D3EE    (Helleres Cyan)
Cyan Active:            #0891B2    (Dunkleres Cyan)
```

**Gradient-Verwendungsregel:**
- ✅ Primäre Buttons, Hero-Elemente, Fortschrittsbalken → **Gradient verwenden**
- ✅ Ränder, kleine Icons, Fokus-Zustände → **Teal Solid verwenden**
- ✅ Sekundäre Aktionen, Info-Badges → **Cyan Solid verwenden**

### Semantische Farben
```
Success:                #10B981    (Grün - positive Rückmeldung)
Success Light:          #34D399    (Helleres Grün für Betonung)

Warning:                #FBBF24    (Orange - Warnungen, Gnadenfristen)
Warning Light:          #FCD34D    (Helleres Orange)

Error:                  #EF4444    (Rot - Fehler, zerstörerische Aktionen)
Error Light:            #F87171    (Helleres Rot)

Info:                   #60A5FA    (Blau - informativ)

Streak Orange:          #FF6B35    (Spezial: Streak-Feuer, Feiern)
```

### Interaktive Elemente
```
Border Default:         #3A3A3A    (Subtile Ränder auf Karten, Eingaben)
Border Focus:           #20C997    (Teal-Rand wenn Eingabe fokussiert)
Divider:                #2A2A2A    (Subtile Trennlinien zwischen Bereichen)
Overlay:                rgba(0,0,0,0.7)    (Modal-Hintergrund-Overlay)
```

### Opacity-Varianten
```
Gradient Background (8%):   rgba(32,201,151,0.08) → rgba(6,182,212,0.08)
                            Verwendung: Hero-Karten, wichtige Bereiche

Teal Background (20%):      rgba(32,201,151,0.2)
                            Verwendung: Teal-Badges, aktive Zustände

Cyan Background (20%):     rgba(6,182,212,0.2)
                            Verwendung: Info-Badges, Cyan-Elemente

Orange Background (20%):   rgba(255,107,53,0.2)
                            Verwendung: Streak-Karten, Feuer-Elemente
```

## 3.3 Typografie-System

### Schriftarten
```
iOS:        SF Pro Display, SF Pro Text
Android:    Roboto
Web:        -apple-system, BlinkMacSystemFont, 'SF Pro Display', 
            'Segoe UI', 'Roboto', sans-serif
```

### Schriftgrößen
```
DISPLAY-GRÖßEN (Hero-Zahlen, große Countdowns)
──────────────────────────────────────────────
Display Large:      72px    Zeilenhöhe: 72px (1.0)    Gewicht: 700    Zeichenabstand: -1px
Display:            48px    Zeilenhöhe: 53px (1.1)    Gewicht: 700    Zeichenabstand: -0.5px

ÜBERSCHRIFTEN
─────────────
Heading 1:          32px    Zeilenhöhe: 40px          Gewicht: 700    Zeichenabstand: 0
Heading 2:          24px    Zeilenhöhe: 32px          Gewicht: 700    Zeichenabstand: 0
Heading 3:          20px    Zeilenhöhe: 28px          Gewicht: 600    Zeichenabstand: 0

FLIESSTEXT
──────────
Body Large:         18px    Zeilenhöhe: 26px          Gewicht: 400    Zeichenabstand: 0
Body:               16px    Zeilenhöhe: 24px          Gewicht: 400    Zeichenabstand: 0
Body Small:         14px    Zeilenhöhe: 20px          Gewicht: 400    Zeichenabstand: 0

KLEINER TEXT
────────────
Caption:            12px    Zeilenhöhe: 16px          Gewicht: 400    Zeichenabstand: 0
Tiny:               10px    Zeilenhöhe: 14px          Gewicht: 400    Zeichenabstand: 0
```

### Schriftgewichte
```
Regular:            400     (Fließtext, Standard)
Medium:             500     (Button-Text, Labels)
Semi-bold:          600     (Unterüberschriften, wichtiger Text)
Bold:               700     (Überschriften, Betonung)
```

## 3.4 Abstände-System (4px Basis-Einheit)

### Abstands-Skala
```
XS:     4px         Enger Abstand (Icon-Lücken)
SM:     8px         Kleiner Abstand (Badge-Padding)
MD:     12px        Mittlerer Abstand (zwischen Elementen)
LG:     16px        Großer Abstand (Bereichs-Abstände)
XL:     20px        Extra groß (Bildschirm-Padding horizontal)
2XL:    24px        Karten-Padding
3XL:    32px        Bereichs-Abstand
4XL:    40px        Großer Bereichs-Abstand
5XL:    48px        Extra großer Abstand
```

### Layout-Konstanten
```
Bildschirm-Padding (horizontal):    20px
Karten-Padding:                     24px
Button-Padding (vertikal):          16px
Button-Padding (horizontal):        24px
Eingabe-Padding:                    16px
Minimale Touch-Zielgröße:           44px
Bottom Tab Bar Höhe:                60px
Header Höhe:                        56px
```

### Komponenten-Abstände
```
Abstand zwischen Karten:           16px
Abstand in 2-Spalten-Grid:          12px
Abstand zwischen Buttons:            12px
Abstand in Button-Gruppen:          8px
Abstand zwischen Bereichen:          24px - 32px
Margin unten (Bereiche):            24px
Bottom Padding (für Tab Bar):       96px (60px Tab + 36px Freiraum)
```

## 3.5 Border Radius

```
None:       0px         Keine Rundung
Small:      8px         Kleine Elemente, Mini-Badges
Medium:     12px        Eingaben, Buttons, kleine Karten
Large:      16px        Standard-Karten
XLarge:     20px        Hero-Karten, große Karten
2XLarge:    24px        Modals (nur obere Ecken)
Full:       999px       Pills, Badges, Avatare (kreisförmig)
```

### Komponenten-Verwendung
```
Buttons:                12px
Eingabefelder:           12px
Standard-Karten:         16px
Hero-Karten:             20px
Modals:                  24px (obere Ecken)
Badges:                  999px (Pill-Form)
Avatar:                  999px (Kreis)
Fortschrittsbalken Track: 4px - 8px
Fortschrittsbalken Fill:  4px - 8px
```

## 3.6 Schatten & Glows (Dark Mode)

### Standard-Schatten
```
Small:      0 2px 4px rgba(0,0,0,0.3)
Medium:     0 4px 8px rgba(0,0,0,0.4)
Large:      0 8px 16px rgba(0,0,0,0.5)
```

### Marken-Glows
```
Teal Glow:          0 0 20px rgba(32,201,151,0.3)
                    0 4px 20px rgba(32,201,151,0.2)

Cyan Glow:          0 0 20px rgba(6,182,212,0.3)
                    0 4px 20px rgba(6,182,212,0.2)

Orange Glow:        0 0 16px rgba(255,107,53,0.2)
                    0 4px 20px rgba(255,107,53,0.2)

Gradient Glow:     0 4px 20px rgba(32,201,151,0.15)
```

## 3.7 Button-Spezifikationen

### Primär-Button (Gradient)
```
Hintergrund:        linear-gradient(135deg, #20C997 0%, #06B6D4 100%)
Textfarbe:          #FFFFFF
Padding:            16px (vertikal) × 24px (horizontal)
Border Radius:      12px
Schriftgröße:       16px
Schriftgewicht:    600
Zeilenhöhe:         24px
Min Höhe:           48px
Rand:               none
Schatten:           0 4px 20px rgba(32,201,151,0.2)

Hover-Zustand:
  Schatten:         0 6px 24px rgba(32,201,151,0.3)
  Transform:        translateY(-2px)

Aktiv/Gedrückt:
  Transform:        scale(0.98)
  Schatten:         0 2px 12px rgba(32,201,151,0.2)

Deaktiviert:
  Opacity:          0.5
  Cursor:           not-allowed
```

### Sekundär-Button (Cyan Outline)
```
Hintergrund:        transparent
Rand:               2px solid #06B6D4
Textfarbe:          #06B6D4
Padding:             16px × 24px
Border Radius:      12px
Schriftgröße:       16px
Schriftgewicht:     600
Min Höhe:           48px

Hover-Zustand:
  Hintergrund:      rgba(6,182,212,0.1)
  Rand-Farbe:       #22D3EE (helleres Cyan)
  Textfarbe:        #22D3EE
```

### Tertiär-Button (Teal Outline)
```
Hintergrund:        transparent
Rand:               2px solid #20C997
Textfarbe:          #20C997
(Gleiche Padding/Größe wie Sekundär)
```

### Ghost-Button (Transparent)
```
Hintergrund:        transparent
Rand:               none
Textfarbe:          #FFFFFF
Padding:            12px × 20px
Schriftgröße:       16px
Min Höhe:           44px

Hover-Zustand:
  Hintergrund:      rgba(255,255,255,0.05)
```

### Destruktiv-Button (Rot)
```
Hintergrund:        #EF4444
Textfarbe:          #FFFFFF
(Gleiche Padding/Größe wie Primär)
```

### Button-Größen
```
Small:
  Min Höhe:         40px
  Padding:          12px × 20px
  Schriftgröße:     14px

Medium:
  Min Höhe:         44px
  Padding:          14px × 22px
  Schriftgröße:     15px

Large:
  Min Höhe:         48px
  Padding:          16px × 24px
  Schriftgröße:     16px
```

## 3.8 Karten-Spezifikationen

### Standard-Karte
```
Hintergrund:        #242424
Border Radius:      16px
Padding:            24px
Rand:               none
Schatten:           0 2px 8px rgba(0,0,0,0.3)
```

### Hero-Karte (Gradient-Hintergrund)
```
Hintergrund:        linear-gradient(135deg, 
                      rgba(32,201,151,0.08) 0%, 
                      rgba(6,182,212,0.08) 100%)
Rand:               1px solid rgba(32,201,151,0.2)
Border Radius:      20px
Padding:            24px
Schatten:           0 4px 20px rgba(32,201,151,0.15)
```

### Erhöhte Karte (Teal Glow)
```
Hintergrund:        #242424
Rand:               1px solid rgba(32,201,151,0.2)
Border Radius:      20px
Padding:            24px
Schatten:           0 4px 20px rgba(32,201,151,0.15)
Glow:               0 0 20px rgba(32,201,151,0.3)
```

### Streak-Karte (Orange Glow)
```
Hintergrund:        #242424
Rand:               1px solid rgba(255,107,53,0.2)
Border Radius:      20px
Padding:            24px
Schatten:           0 4px 20px rgba(255,107,53,0.2)
Glow:               0 0 16px rgba(255,107,53,0.2)
```

### Stat-Karte (Klein, im Grid)
```
Hintergrund:        #242424
Border Radius:      12px
Padding:            16px
Rand:               none
Schatten:           0 2px 4px rgba(0,0,0,0.2)
Textausrichtung:    center
```

## 3.9 Eingabefeld-Spezifikationen

### Text-Eingabe
```
Hintergrund:        #2A2A2A
Rand:               2px solid #3A3A3A
Border Radius:      12px
Padding:            16px
Textfarbe:          #FFFFFF
Schriftgröße:       16px
Zeilenhöhe:         24px
Min Höhe:           56px

Platzhalter:
  Farbe:            #6B6B6B

Fokus-Zustand:
  Rand-Farbe:       #20C997 (Teal)
  Outline:          none

Fehler-Zustand:
  Rand-Farbe:       #EF4444 (Rot)

Deaktiviert-Zustand:
  Hintergrund:      #1A1A1A
  Opacity:          0.5
  Cursor:           not-allowed
```

### Label (Über Eingabe)
```
Schriftgröße:       14px
Zeilenhöhe:         20px
Schriftgewicht:     500
Farbe:              #A0A0A0
Margin unten:       8px
```

### Fehlermeldung (Unter Eingabe)
```
Schriftgröße:       12px
Zeilenhöhe:         16px
Farbe:              #EF4444
Margin oben:        4px
```

---

# 📱 4. SCREENS & KOMPONENTEN

## 4.1 Splash Screen

### Beschreibung
Der erste Screen beim App-Start. Zeigt das App-Logo mit Gradient-Hintergrund.

### Visuelle Spezifikationen
```
Hintergrund:        #0F0F0F (mit Gradient-Overlay optional)
Logo:               App-Icon (1024x1024)
Logo-Größe:         120px × 120px
Logo Position:      Center (vertikal & horizontal)
Anzeigedauer:       Minimum 3 Sekunden
```

### Elemente
- **App Logo**: Zentriert, mit Gradient-Border (optional)
- **Loading Indicator**: Optional (für Android/iOS native Spinner)

### Verhalten
- Automatischer Übergang nach 3 Sekunden
- Wartet auf Authentifizierungs-Check
- Zeigt dann entsprechende Navigation

---

## 4.2 Authentifizierungs-Screens

### 4.2.1 Landing/Welcome Screen (`(auth)/index.tsx`)

#### Beschreibung
Einstiegsscreen für neue Nutzer. Zeigt App-Vorteile und Call-to-Action.

#### Layout-Struktur
```
┌─────────────────────────────────┐
│                                 │
│     [App Logo]                  │
│                                 │
│  "Willkommen zu deiner Reise!" │
│                                 │
│  "Ein guter Ansatz, um in      │
│   deinem eigenen Tempo mit      │
│   dem Rauchen aufzuhören"       │
│                                 │
│  [Account erstellen Button]     │
│  [Einloggen Button]             │
│                                 │
│  [Mit Google]                   │
│  [Mit Apple]                    │
│                                 │
└─────────────────────────────────┘
```

#### Elemente
- **Logo**: App-Icon, zentriert, 80px × 80px
- **Überschrift**: "Willkommen zu deiner Reise!" (Heading 1, #FFFFFF)
- **Beschreibung**: 2-3 Zeilen Text (Body Large, #A0A0A0)
- **Primär-Button**: "Account erstellen" (Gradient-Button, vollbreit)
- **Sekundär-Button**: "Einloggen" (Ghost-Button)
- **Social Buttons**: Google & Apple (Outline-Buttons)

#### Farben & Styles
- Hintergrund: #0F0F0F
- Buttons: Gradient (Primary), Outline (Secondary)

---

### 4.2.2 Login Screen (`(auth)/login.tsx`)

#### Beschreibung
Login-Formular mit E-Mail/Passwort und Social-Login-Optionen.

#### Layout-Struktur
```
┌─────────────────────────────────┐
│  ← Zurück          [Logo]       │
├─────────────────────────────────┤
│                                 │
│  "Willkommen zurück"            │
│  "Melde dich an, um fortzufahren"│
│                                 │
│  E-Mail:                        │
│  [___________________________]   │
│                                 │
│  Passwort:                      │
│  [___________________________]  👁│
│                                 │
│  ☐ 48 Stunden angemeldet bleiben│
│                                 │
│  [Passwort vergessen?]          │
│                                 │
│  [Anmelden Button]              │
│                                 │
│  ──── oder ────                 │
│                                 │
│  [Mit Google anmelden]          │
│  [Mit Apple anmelden]           │
│                                 │
│  Hast du noch kein Konto?       │
│  [Registrieren]                 │
│                                 │
└─────────────────────────────────┘
```

#### Elemente
- **Header**: Zurück-Button links, Logo rechts
- **Überschrift**: "Willkommen zurück" (Heading 1)
- **E-Mail-Eingabe**: Textfeld mit Platzhalter "deine@email.com"
- **Passwort-Eingabe**: Textfeld mit Sichtbarkeits-Toggle (👁 Icon)
- **Checkbox**: "48 Stunden angemeldet bleiben"
- **Link**: "Passwort vergessen?" (Cyan-Farbe)
- **Primär-Button**: "Anmelden" (Gradient)
- **Divider**: "─── oder ────" (mit Text)
- **Social Buttons**: Google & Apple (Outline-Style)
- **Footer-Link**: "Hast du noch kein Konto? Registrieren"

#### Interaktionen
- Passwort-Toggle: Ein-/Ausblenden des Passworts
- Validierung: E-Mail-Format, Passwort-Länge
- Fehlermeldungen: Rot unter Eingabefeldern

---

### 4.2.3 Signup Screen (`(auth)/signup.tsx`)

#### Beschreibung
Registrierungsformular mit E-Mail, Passwort und Bestätigung.

#### Layout-Struktur
```
┌─────────────────────────────────┐
│  ← Zurück          [Logo]       │
├─────────────────────────────────┤
│                                 │
│  "Starte deine Reise zu einem   │
│   gesünderen Leben"             │
│                                 │
│  E-Mail:                        │
│  [___________________________]   │
│                                 │
│  Passwort:                      │
│  [___________________________]  👁│
│                                 │
│  Passwort-Anforderungen:        │
│  ✓ Mindestens 9 Zeichen         │
│  ✓ Ein Großbuchstabe            │
│  ✓ Eine Zahl                    │
│  ✓ Ein Sonderzeichen            │
│                                 │
│  Passwort bestätigen:           │
│  [___________________________]  👁│
│                                 │
│  [Konto erstellen Button]        │
│                                 │
│  ──── oder ────                 │
│                                 │
│  [Mit Google registrieren]      │
│  [Mit Apple registrieren]       │
│                                 │
│  Hast du bereits ein Konto?     │
│  [Einloggen]                    │
│                                 │
└─────────────────────────────────┘
```

#### Elemente
- **E-Mail-Eingabe**: Mit Validierung
- **Passwort-Eingabe**: Mit Live-Validierung und Anzeige der Anforderungen
- **Passwort-Bestätigung**: Mit Match-Indikator
- **Passwort-Anforderungen**: Checkliste (✓ oder ✗)
- **Primär-Button**: "Konto erstellen" (aktiv nur wenn alle Felder gültig)
- **Social-Optionen**: Google & Apple

---

### 4.2.4 Verify Email Screen (`(auth)/verify-email.tsx`)

#### Beschreibung
6-stelliger Code-Eingabe für E-Mail-Verifizierung.

#### Layout-Struktur
```
┌─────────────────────────────────┐
│  ← Zurück                       │
├─────────────────────────────────┤
│                                 │
│  "E-Mail bestätigen"            │
│                                 │
│  "Wir haben einen 6-stelligen   │
│   Code an gesendet"             │
│                                 │
│  [ ][ ][ ][ ][ ][ ]            │
│     Code-Eingabefelder           │
│                                 │
│  Code nicht erhalten?           │
│  [Code erneut senden]           │
│                                 │
│  [E-Mail-Adresse ändern]        │
│                                 │
│  [Bestätigen Button]            │
│                                 │
└─────────────────────────────────┘
```

#### Elemente
- **6-stellige Code-Eingabe**: Separate Felder für jede Ziffer
- **Auto-Focus**: Nächstes Feld wird automatisch fokussiert
- **Timer**: Zeigt Ablaufzeit des Codes
- **Resend-Button**: Nur aktiv nach Ablauf
- **E-Mail-Änderungs-Link**: Falls falsche E-Mail

---

### 4.2.5 Reset Password Screen (`(auth)/reset-password.tsx`)

#### Beschreibung
Passwort-Zurücksetzen mit neuem Passwort und Bestätigung.

#### Layout-Struktur
```
┌─────────────────────────────────┐
│  ← Zurück                       │
├─────────────────────────────────┤
│                                 │
│  "Neues Passwort setzen"        │
│  "Gib dein neues Passwort ein" │
│                                 │
│  Neues Passwort:                │
│  [___________________________]  👁│
│                                 │
│  Passwort bestätigen:           │
│  [___________________________]  👁│
│                                 │
│  [Passwort zurücksetzen Button] │
│                                 │
└─────────────────────────────────┘
```

---

## 4.3 Onboarding Screen (`onboarding.tsx`)

### Beschreibung
Mehrstufiger Wizard zur App-Einrichtung. **Wichtig:** Wird nur einmal nach Registrierung angezeigt.

### Schritte im Detail

#### Schritt 1: Name & Motivation
```
┌─────────────────────────────────┐
│  [Progress: Tag 1 von 5]        │
├─────────────────────────────────┤
│                                 │
│  "Wie heißt du?"               │
│  "Wir verwenden das, um deine   │
│   Erfahrung zu personalisieren" │
│                                 │
│  Name:                          │
│  [___________________________]   │
│                                 │
│  "Warum möchtest du aufhören?" │
│                                 │
│  [ ] Gesundheit                │
│  [ ] Familie                   │
│  [ ] Geld                      │
│  [ ] Freiheit                  │
│  [ ] Aussehen                  │
│  [ ] Leistung                  │
│                                 │
│  "Beschreibe dein Warum"        │
│  [___________________________]   │
│  [___________________________]   │
│  [___________________________]   │
│                                 │
│  [← Zurück]  [Weiter →]        │
│                                 │
└─────────────────────────────────┘
```

**Elemente:**
- Progress-Indikator oben (Tag X von 5)
- Name-Eingabefeld
- 6 Motivations-Kategorien (Radio-Buttons oder Cards)
- Textbereich für persönliche Beschreibung
- Navigation: Zurück & Weiter

#### Schritt 2: Rauchverhalten
```
┌─────────────────────────────────┐
│  [Progress: Tag 2 von 5]        │
├─────────────────────────────────┤
│                                 │
│  "Dein aktuelles Rauchverhalten"│
│                                 │
│  Normale tägliche Menge:       │
│  [__________________] Zigaretten │
│                                 │
│  Aktuelle tägliche Menge:      │
│  [__________________] Zigaretten│
│                                 │
│  "Großartiger Fortschritt!      │
│   Du hast bereits um X          │
│   Zigaretten/Tag reduziert!"    │
│                                 │
│  Packungspreis (€):             │
│  [__________________]           │
│                                 │
│  Zigaretten pro Packung:        │
│  [  20  ] (meistens 20)         │
│                                 │
│  [← Zurück]  [Weiter →]        │
│                                 │
└─────────────────────────────────┘
```

**Elemente:**
- Numerische Eingaben für Mengen
- Automatische Berechnung der Reduktion
- Kosten-Eingaben
- Formatierung für Euro

#### Schritt 3: Aufhörtag
```
┌─────────────────────────────────┐
│  [Progress: Tag 3 von 5]        │
├─────────────────────────────────┤
│                                 │
│  "Dein Aufhörtag"               │
│                                 │
│  "Wähle, wann du rauchfrei sein │
│   möchtest. Empfehlungen:       │
│   4-8 Wochen ab heute."         │
│                                 │
│  Datum:                         │
│  [📅 Datum auswählen]           │
│                                 │
│  Mindestens 2 Wochen ab heute,  │
│  lieber jedoch 4-8 Wochen.       │
│  Warum?                         │
│                                 │
│  • Zeit, neue Gewohnheiten zu   │
│    entwickeln                   │
│  • Schrittweise, nachhaltige   │
│    Reduktion                    │
│  • Bewältigungsstrategien üben  │
│  • Umgebung vorbereiten         │
│                                 │
│  [← Zurück]  [Weiter →]        │
│                                 │
└─────────────────────────────────┘
```

**Elemente:**
- Datumspicker (Native iOS/Android)
- Validierung: Mindestens 2 Wochen, max. 1 Jahr
- Informations-Karte mit Begründungen

#### Schritt 4: Tagesroutine
```
┌─────────────────────────────────┐
│  [Progress: Tag 4 von 5]        │
├─────────────────────────────────┤
│                                 │
│  "Tägliche Routine"             │
│                                 │
│  "Hilf uns zu verstehen, wann   │
│   dein Tag beginnt und endet"   │
│                                 │
│  Aufwachzeit:                   │
│  [🕐 07:00]                     │
│                                 │
│  Schlafenszeit:                 │
│  [🕐 23:00]                     │
│                                 │
│  "Dein Tag beginnt nicht um     │
│   Mitternacht, sondern wenn du  │
│   aufwachst. Logs zwischen      │
│   02:00-07:00 zählen zum        │
│   Vortag."                      │
│                                 │
│  [← Zurück]  [Weiter →]        │
│                                 │
└─────────────────────────────────┘
```

**Elemente:**
- Zeitpicker für Aufwach- und Schlafenszeit
- Informations-Text über Tagesgrenzen

#### Schritt 5: Zusammenfassung & Start
```
┌─────────────────────────────────┐
│  [Progress: Tag 5 von 5]        │
├─────────────────────────────────┤
│                                 │
│  "Alles bereit!"                │
│                                 │
│  Hier ist dein Plan:            │
│                                 │
│  Name: Max                      │
│  Motivation: Gesundheit         │
│  Normale Menge: 20/Tag          │
│  Aktuelle Menge: 8/Tag          │
│  Aufhörtag: 15.12.2025          │
│                                 │
│  [Reise starten Button]        │
│                                 │
└─────────────────────────────────┘
```

**Elemente:**
- Zusammenfassung aller Eingaben
- Primär-Button: "Reise starten" (führt zu Home Tab)

---

## 4.4 Haupt-App Screens (Tabs)

### Tab-Navigation-Struktur

```
Bottom Tab Bar (Höhe: 60px, Hintergrund: #1A1A1A)
┌────────────────────────────────────────────┐
│  🏠 Home    ➕ Track    📊 Stats    (👤)   │
│  (aktiv: Teal, inaktiv: Grau)             │
└────────────────────────────────────────────┘

Header (Höhe: 56px, Hintergrund: #242424)
┌────────────────────────────────────────────┐
│  [Logo]  My Quitly              [👤 Profil]│
└────────────────────────────────────────────┘
```

**Tab-Bar-Icons:**
- Home: 🏠
- Track/Log: ➕
- Stats: 📊
- Profile: 👤 (nicht in Tab Bar, nur Header-Button)

---

### 4.4.1 Home Tab (`(tabs)/index.tsx`)

#### Beschreibung
Dashboard mit Reise-Übersicht, Fortschritt, Motivation und täglichen Erfolgen.

#### Layout-Struktur
```
┌─────────────────────────────────┐
│  [Logo] My Quitly      [👤]     │
├─────────────────────────────────┤
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  REISE-ÜBERSICHT          ║ │
│  ║                           ║ │
│  ║  "15 Tage bis zum         ║ │
│  ║   Aufhörtag"              ║ │
│  ║                           ║ │
│  ║  Phase: "Reduktion"       ║ │
│  ║  ━━━━━━━━━━━━━━━━━ 45%   ║ │
│  ║                           ║ │
│  ║  Ziel heute: 12            ║ │
│  ║  Reduktion: -40%          ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  HEUTIGE ERFOLGE          ║ │
│  ║                           ║ │
│  ║  💰 Geld gespart: €5,20   ║ │
│  ║  💪 Verlangen widerstanden: 3 ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  WÖCHENTLICHER FORTSCHRITT║ │
│  ║                           ║ │
│  ║  [Grafik: Wochen-Diagramm] ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  MEINE MOTIVATION         ║ │
│  ║                           ║ │
│  ║  "Ich möchte gesund für   ║ │
│  ║   meine Familie sein..."  ║ │
│  ║                           ║ │
│  ║  [Bearbeiten]             ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  NÄCHSTE ERRUNGENSCHAFT   ║ │
│  ║                           ║ │
│  ║  🔥 "Eine Woche Krieger"   ║ │
│  ║  Noch 2 Tage              ║ │
│  ╚═══════════════════════════╝ │
│                                 │
└─────────────────────────────────┘
```

#### Karten im Detail

##### 1. Reise-Übersicht-Karte (Hero-Karte)
```
Hintergrund: Gradient (Teal → Cyan, 8% Opacity)
Border: 1px solid rgba(32,201,151,0.2)
Padding: 24px
Border Radius: 20px

Elemente:
- Große Zahl: "15" (Display, 48px) - Tage bis Aufhörtag
- Text: "Tage bis zum Aufhörtag"
- Badge: "Reduktion" (Phase-Badge)
- Fortschrittsbalken: 45% (Gradient-Fill)
- Ziel heute: "12 Zigaretten"
- Reduktion: "-40%" (grün wenn positiv)
```

##### 2. Heutige Erfolge-Karte
```
Hintergrund: #242424
Padding: 24px
Border Radius: 16px

Elemente:
- 💰 "Geld gespart heute: €5,20" (Grün)
- 💪 "Verlangen widerstanden: 3" (Orange)
```

##### 3. Wöchentlicher Fortschritt-Karte
```
Elemente:
- Titel: "Wöchentlicher Fortschritt"
- Diagramm: Balkendiagramm oder Linie (7 Tage)
- Farben: Gradient für Fortschritt
```

##### 4. Motivation-Karte (CompactMotivationCard)
```
Elemente:
- Titel: "Meine Motivation"
- Kategorie-Badge: "Gesundheit" (Teal)
- Persönliche Nachricht (Text)
- Bearbeiten-Button (Ghost)
```

##### 5. Nächste Errungenschaft-Karte
```
Elemente:
- 🔥 Icon (Orange Glow)
- Name der Errungenschaft
- Fortschritt: "Noch X Tage"
- Fortschrittsbalken (optional)
```

#### Interaktionen
- **Pull-to-Refresh**: Lädt Daten neu
- **Tap auf Motivation**: Öffnet Bearbeitungs-Modal
- **Tap auf Errungenschaft**: Zeigt Details

---

### 4.4.2 Log Tab (`(tabs)/log.tsx`)

#### Beschreibung
Hauptscreen zum Eintragen von Zigaretten und Verwalten von Verlangen (Cravings).

#### Layout-Struktur
```
┌─────────────────────────────────┐
│  [Logo] My Quitly      [👤]     │
├─────────────────────────────────┤
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  HEUTE                    ║ │
│  ║                           ║ │
│  ║  Zigaretten: 8 / 12       ║ │
│  ║  ━━━━━━━━━━━━ 67%         ║ │
│  ║                           ║ │
│  ║  Seit letzter: 2h 15min    ║ │
│  ║  Nächste um: 14:30        ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  [➕ Zigarette eintragen]       │
│                                 │
│  [🌊 Ich hab Bock (SOS)]       │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  HEUTIGE EINTRÄGE         ║ │
│  ║                           ║ │
│  ║  📅 14:30                 ║ │
│  ║  Stress | Gestresst       ║ │
│  ║  Zuhause                  ║ │
│  ║  [✏️] [🗑️]                ║ │
│  ║  ───────────────────────  ║ │
│  ║  📅 12:15                 ║ │
│  ║  Gewohnheit | Ruhig       ║ │
│  ║  Arbeit                    ║ │
│  ║  [✏️] [🗑️]                ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  [📅 Anderen Tag wählen]        │
│                                 │
└─────────────────────────────────┘
```

#### Haupt-Elemente

##### 1. Heute-Status-Karte
```
Hintergrund: #242424
Padding: 24px

Elemente:
- "Heute" (Überschrift)
- Aktuell / Ziel: "8 / 12" (groß, Display)
- Fortschrittsbalken (Gradient)
- "Seit letzter Zigarette: X min/h"
- "Nächste verfügbar um: HH:MM" (basierend auf Wartezeit)
- Status-Badge: "Perfekt" / "Auf Kurs" / "Über Ziel" (Farben)
```

##### 2. Primär-Button: "Zigarette eintragen"
```
Gradient-Button (Groß, vollbreit)
Öffnet Modal zum Eintragen
```

##### 3. SOS-Button: "Ich hab Bock"
```
Orange-Button (Outlined oder Filled)
Öffnet Craving-Hilfe-Modal
```

##### 4. Einträge-Liste
```
Karte mit Padding: 24px

Jeder Eintrag:
- Zeit: "HH:MM" (Bold)
- Trigger: "Stress" (Badge)
- Emotion: "Gestresst" (Badge)
- Ort: "Zuhause" (Badge oder Text)
- Aktionen: Bearbeiten-Button (✏️), Löschen-Button (🗑️)
- Trennlinie (Divider)
```

##### 5. Datumswähler
```
Ghost-Button am Ende
Öffnet Datumspicker
```

#### Modals im Log Tab

##### Modal: Zigarette eintragen
```
┌─────────────────────────────────┐
│  ╔═══════════════════════════╗ │
│  ║  Zigarette eintragen      ║ │
│  ║  [X]                      ║ │
│  ╠═══════════════════════════╣ │
│  ║                           ║ │
│  ║  Datum & Uhrzeit:         ║ │
│  ║  [📅 Heute, 14:30]        ║ │
│  ║                           ║ │
│  ║  Warum hast du geraucht?  ║ │
│  ║  [ ] Stress              ║ │
│  ║  [ ] Gewohnheit          ║ │
│  ║  [ ] Sozial             ║ │
│  ║  [ ] Verlangen           ║ │
│  ║  [ ] Langeweile          ║ │
│  ║  [ ] Andere              ║ │
│  ║                           ║ │
│  ║  Wie hast du dich gefühlt?║ │
│  ║  [ ] Gestresst           ║ │
│  ║  [ ] Ängstlich           ║ │
│  ║  [ ] Ruhig               ║ │
│  ║  [ ] Glücklich           ║ │
│  ║  [ ] Traurig             ║ │
│  ║  [ ] Wütend              ║ │
│  ║  [ ] Gelangweilt         ║ │
│  ║                           ║ │
│  ║  Wo warst du? (optional)  ║ │
│  ║  [ ] Zuhause             ║ │
│  ║  [ ] Arbeit              ║ │
│  ║  [ ] Sozial              ║ │
│  ║  [ ] Pendeln             ║ │
│  ║  [ ] Draußen             ║ │
│  ║  [ ] Andere              ║ │
│  ║                           ║ │
│  ║  Notizen (optional):      ║ │
│  ║  [_____________________]  ║ │
│  ║                           ║ │
│  ║  [Speichern Button]        ║ │
│  ╚═══════════════════════════╝ │
└─────────────────────────────────┘
```

**Elemente:**
- Datum/Zeit-Picker (Native)
- Trigger-Auswahl (Radio/Chips)
- Emotion-Auswahl (Radio/Chips)
- Ort-Auswahl (Radio/Chips, optional)
- Notizen-Eingabefeld (optional)
- Speichern-Button (Gradient)

##### Modal: Craving-Hilfe (SOS)
```
┌─────────────────────────────────┐
│  ╔═══════════════════════════╗ │
│  ║  🌊 Die Welle reiten     ║ │
│  ║  [X]                      ║ │
│  ╠═══════════════════════════╣ │
│  ║                           ║ │
│  ║  "Verlangen erreichen in  ║ │
│  ║   3-5 Minuten ihren       ║ │
│  ║   Höhepunkt und vergehen. ║ │
│  ║   Du bist stärker als     ║ │
│  ║   dieser Moment."         ║ │
│  ║                           ║ │
│  ║  Verstrichene Zeit:       ║ │
│  ║  [00:05:23] (Timer)       ║ │
│  ║                           ║ │
│  ║  Intensität des Verlangens:║ │
│  ║  ●●●○○ (5 Stufen)         ║ │
│  ║                           ║ │
│  ║  Probiere diese Strategien:║ │
│  ║                           ║ │
│  ║  💨 4-7-8 Atmung           ║ │
│  ║  "4 Sekunden einatmen,    ║ │
│  ║   7 Sekunden halten,      ║ │
│  ║   8 Sekunden ausatmen"    ║ │
│  ║                           ║ │
│  ║  💧 Wasser trinken        ║ │
│  ║  💨 Spazieren gehen       ║ │
│  ║  📞 Jemanden anrufen      ║ │
│  ║                           ║ │
│  ║  [💪 Ich habe widerstanden!]║ │
│  ╚═══════════════════════════╝ │
└─────────────────────────────────┘
```

**Elemente:**
- Motivations-Text
- Live-Timer (verstrichene Zeit)
- Intensitäts-Slider (1-5)
- Strategie-Karten (tappable)
- "Ich habe widerstanden!"-Button (grün, groß)

---

### 4.4.3 Stats Tab (`(tabs)/stats.tsx`)

#### Beschreibung
Detaillierte Statistiken, Trends, Meilensteine und Errungenschaften.

#### Layout-Struktur
```
┌─────────────────────────────────┐
│  [Logo] My Quitly      [👤]     │
├─────────────────────────────────┤
│                                 │
│  [Heute] [7 Tage] [30 Tage]    │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  ÜBERSICHT                ║ │
│  ║                           ║ │
│  ║  Insgesamt geraucht:      ║ │
│  ║  [    42     ]            ║ │
│  ║                           ║ │
│  ║  Gesamtkosten:            ║ │
│  ║  [   €14,70  ]            ║ │
│  ║                           ║ │
│  ║  Durchschnitt/Tag:         ║ │
│  ║  [    12     ]            ║ │
│  ║                           ║ │
│  ║  Reduktion:               ║ │
│  ║  [   -40%    ]            ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  TRIGGER-MUSTER            ║ │
│  ║  "Kenne deine Trigger,    ║ │
│  ║   besiege deine Verlangen"║ │
│  ║                           ║ │
│  ║  [Donut-Diagramm]          ║ │
│  ║  Stress: 45%              ║ │
│  ║  Gewohnheit: 30%          ║ │
│  ║  Sozial: 15%              ║ │
│  ║  ...                      ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  HAUPTZEITEN              ║ │
│  ║  "Wann du am meisten      ║ │
│  ║   rauchst"                ║ │
│  ║                           ║ │
│  ║  [Balkendiagramm]         ║ │
│  ║  Morgens: ████░░░░ 40%   ║ │
│  ║  Vormittags: ██░░░░░░ 20% ║ │
│  ║  Nachmittags: ███████░ 70%║ │
│  ║  Abends: ████████ 80%     ║ │
│  ║  Nachts: ██░░░░░░ 20%     ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  REISEFORTSCHRITT         ║ │
│  ║                           ║ │
│  ║  Tage abgeschlossen: 15   ║ │
│  ║  Aktueller Durchschnitt:   ║ │
│  ║  12 Zig./Tag              ║ │
│  ║  Gesamtreduktion: -40%    ║ │
│  ║  Erfolgsrate: 73%         ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  MEILENSTEINE & ERRUNGEN  ║ │
│  ║                           ║ │
│  ║  [🏆 Badge 1] [🏆 Badge 2]║ │
│  ║  [🔒 Locked] [🔒 Locked] ║ │
│  ╚═══════════════════════════╝ │
│                                 │
└─────────────────────────────────┘
```

#### Haupt-Elemente

##### 1. Zeitbereich-Tabs
```
Chips oben: "Heute" | "7 Tage" | "30 Tage"
Aktiver Tab: Gradient-Hintergrund
Inaktive Tabs: Transparent mit Border
```

##### 2. Übersicht-Karten (Grid)
```
2-Spalten-Grid:
┌──────────────┬──────────────┐
│ Gesamt: 42   │ Kosten: €14,70│
├──────────────┼──────────────┤
│ Ø/Tag: 12    │ Reduktion:-40%│
└──────────────┴──────────────┘

Jede Karte:
- Hintergrund: #242424
- Padding: 16px
- Zentrierte Zahlen (Display 24px)
- Beschriftung darunter (Caption)
```

##### 3. Trigger-Muster-Karte
```
Donut- oder Balken-Diagramm
Farben: Teal, Cyan, Orange, etc.
Legende darunter
```

##### 4. Hauptzeiten-Karte
```
Balkendiagramm (horizontal)
5 Zeiten (Morgens, Vormittags, etc.)
Prozentanzeige
```

##### 5. Reisefortschritt-Karte
```
Statistiken in Liste:
- Tage abgeschlossen (große Zahl)
- Aktueller Durchschnitt
- Gesamtreduktion (mit Pfeil/Icon)
- Erfolgsrate (mit Badge)
```

##### 6. Meilensteine & Errungenschaften-Karte
```
Grid von Badges:
- Freigeschaltete: Farbig mit Icon
- Gesperrte: Grau mit 🔒
- Badge-Namen darunter
```

#### Leere Zustände
```
Wenn keine Daten:
- Icon (groß, grau)
- "Noch keine Daten"
- "Beginne mit dem Eintragen, um hier
  deine Statistiken zu sehen"
```

---

### 4.4.4 Profile Tab (`(tabs)/profile.tsx`)

#### Beschreibung
Einstellungen, Kontoverwaltung, Motivation bearbeiten, Reduktionsplan anzeigen.

#### Layout-Struktur
```
┌─────────────────────────────────┐
│  [Logo] My Quitly      [👤]     │
├─────────────────────────────────┤
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  KONTO                     ║ │
│  ║                           ║ │
│  ║  Anzeigename: Max         ║ │
│  ║  [✏️ Bearbeiten]          ║ │
│  ║                           ║ │
│  ║  E-Mail: max@email.com    ║ │
│  ║  [E-Mail ändern]          ║ │
│  ║                           ║ │
│  ║  [Passwort ändern]        ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  TRACKING                  ║ │
│  ║                           ║ │
│  ║  Tagesziel:               ║ │
│  ║  [  12  ] Zigaretten      ║ │
│  ║                           ║ │
│  ║  Normale Menge:           ║ │
│  ║  [  20  ] Zigaretten      ║ │
│  ║                           ║ │
│  ║  Packungspreis:           ║ │
│  ║  [ 7,50 ] €               ║ │
│  ║                           ║ │
│  ║  Zigaretten pro Packung:  ║ │
│  ║  [  20  ]                 ║ │
│  ║                           ║ │
│  ║  Wartezeit:               ║ │
│  ║  [  45  ] Minuten         ║ │
│  ║                           ║ │
│  ║  [Einstellungen speichern] ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  BENACHRICHTIGUNGEN        ║ │
│  ║                           ║ │
│  ║  Benachrichtigungen:      ║ │
│  ║  [Toggle: Ein/Aus]        ║ │
│  ║                           ║ │
│  ║  Morgendlicher Check-in:  ║ │
│  ║  [🕐 08:00]               ║ │
│  ║                           ║ │
│  ║  Abendlicher Check-in:    ║ │
│  ║  [🕐 20:00]               ║ │
│  ║                           ║ │
│  ║  Zigaretten-Erinnerung:   ║ │
│  ║  [🕐 19:00]               ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  🎯 AUFHÖRREISE            ║ │
│  ║                           ║ │
│  ║  Reisebeginn:             ║ │
│  ║  01.11.2025               ║ │
│  ║                           ║ │
│  ║  Zielaufhörtag:           ║ │
│  ║  [📅 15.12.2025 ✏️]       ║ │
│  ║                           ║ │
│  ║  Aktuelle Phase:          ║ │
│  ║  [Reduktion Badge]        ║ │
│  ║                           ║ │
│  ║  Reisefortschritt:        ║ │
│  ║  ━━━━━━━━━━━━ 45%         ║ │
│  ║                           ║ │
│  ║  [Reduktionsplan anzeigen]║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  💭 MEINE MOTIVATION       ║ │
│  ║                           ║ │
│  ║  Kategorie: Gesundheit    ║ │
│  ║                           ║ │
│  ║  "Ich möchte gesund für   ║ │
│  ║   meine Familie sein..."  ║ │
│  ║                           ║ │
│  ║  [Bearbeiten]             ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  SPRACHE & AUSSEHEN       ║ │
│  ║                           ║ │
│  ║  Sprache:                 ║ │
│  ║  [Deutsch ▼]              ║ │
│  ║                           ║ │
│  ║  Theme:                   ║ │
│  ║  [System ▼]               ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  [Abmelden Button] (Rot)        │
│                                 │
│  "My Quitly v1.0" (Footer)      │
│                                 │
└─────────────────────────────────┘
```

#### Haupt-Bereiche

##### 1. Konto-Bereich
```
- Anzeigename (editable)
- E-Mail (mit Änderungs-Flow)
- Passwort-Änderung (Modal)
```

##### 2. Tracking-Einstellungen
```
Alle Eingaben mit Validierung:
- Tagesziel (Zahl)
- Normale Menge (Zahl)
- Packungspreis (Dezimal)
- Zigaretten pro Packung (Zahl)
- Wartezeit (Zahl, automatisch berechnet)
- Speichern-Button (Gradient)
```

##### 3. Benachrichtigungen
```
- Toggle: Ein/Aus (groß)
- 3 Zeitpicker für Check-ins & Erinnerungen
```

##### 4. Aufhörreise
```
- Reisebeginn (Read-only)
- Zielaufhörtag (editable mit Validierung)
- Phase-Badge (Read-only)
- Fortschrittsbalken
- Button: "Reduktionsplan anzeigen" (öffnet Modal)
```

##### 5. Motivation
```
- Kategorie-Badge
- Persönliche Nachricht
- Bearbeiten-Button (öffnet Modal)
```

##### 6. Sprache & Aussehen
```
- Dropdown: Sprache (DE/EN)
- Dropdown: Theme (Hell/Dunkel/System)
```

##### 7. Abmelden
```
Rot-Button am Ende
Bestätigung-Modal vor Abmeldung
```

#### Modals im Profile Tab

##### Modal: Reduktionsplan anzeigen
```
Öffnet ReductionPlanView-Komponente
Siehe Abschnitt "Komponenten" unten
```

##### Modal: Motivation bearbeiten
```
┌─────────────────────────────────┐
│  ╔═══════════════════════════╗ │
│  ║  Motivation bearbeiten    ║ │
│  ║  [X]                      ║ │
│  ╠═══════════════════════════╣ │
│  ║                           ║ │
│  ║  Kategorie:               ║ │
│  ║  [ ] Gesundheit           ║ │
│  ║  [ ] Familie              ║ │
│  ║  [ ] Geld                 ║ │
│  ║  ...                      ║ │
│  ║                           ║ │
│  ║  Deine Motivation:        ║ │
│  ║  [_____________________]  ║ │
│  ║  [_____________________]  ║ │
│  ║                           ║ │
│  ║  [Speichern]              ║ │
│  ╚═══════════════════════════╝ │
└─────────────────────────────────┘
```

---

# 🧩 5. KOMPONENTEN-DETAILS

## 5.1 UI-Komponenten

### PrimaryButton
```
Typ: Primär-Button (Gradient)
Verwendung: Hauptaktionen
Styles: Siehe Design System 3.7
Props:
  - title: string
  - onPress: function
  - disabled?: boolean
  - variant?: 'primary' | 'secondary' | 'destructive'
```

### ProgressBar
```
Typ: Fortschrittsbalken
Verwendung: Fortschritt visualisieren
Styles:
  - Track: #3A3A3A, Border Radius 4-8px
  - Fill: Gradient (Teal → Cyan)
  - Höhe: 8-12px
Props:
  - progress: number (0-100)
  - height?: number
  - showPercentage?: boolean
```

### CheckinModal
```
Typ: Modal
Verwendung: Tägliche Check-ins (morgens & abends)
Layout:
  - Titel: "Guten Morgen!" / "Abend-Check-in"
  - Frage: "Wie fühlst du dich?" / "Wie stark waren Verlangen?"
  - Skala: 1-5 (Buttons oder Slider)
  - Submit-Button
Props:
  - type: 'morning' | 'evening'
  - onClose: function
  - onSubmit: function
```

### DailyCheckinCard
```
Typ: Karte
Verwendung: Zeigt Check-in-Status auf Home Tab
Elemente:
  - Icon (🌅/🌙)
  - Status: "Abgeschlossen" / "Ausstehend"
  - Zeit: "08:00" / "20:00"
  - Button: "Jetzt check-in"
```

### DailyMotivationModal
```
Typ: Modal
Verwendung: Tägliche Motivationsnachricht
Layout:
  - Titel
  - Nachricht (Text)
  - Close-Button
```

### MyWhyDisplay
```
Typ: Komponente
Verwendung: Zeigt Motivation an
Layout:
  - Kategorie-Badge
  - Persönliche Nachricht
  - Bearbeiten-Button (optional)
```

### CompactMotivationCard
```
Typ: Karte
Verwendung: Kompakte Motivationsanzeige
Elemente:
  - Titel
  - Kategorie
  - Text (gekürzt)
  - "Mehr anzeigen" Link
```

### ReductionPlanView
```
Typ: Vollständige Komponente
Verwendung: Zeigt Reduktionsplan
Layout-Struktur:
┌─────────────────────────────────┐
│  "Dein Reduktionsplan"           │
│  "Woche 3 von 8 • 37% geschafft"│
├─────────────────────────────────┤
│                                 │
│  [Wochen-Timeline]              │
│                                 │
│  ──●──●──●──●──●──●──●──●      │
│  1  2  3  4  5  6  7  8         │
│     (aktuell markiert)          │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  WOCHE 3                   ║ │
│  ║  Ziel: 12 Zigaretten/Tag   ║ │
│  ║  Status: ✅ Geschafft      ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  ╔═══════════════════════════╗ │
│  ║  WOCHE 4                   ║ │
│  ║  Ziel: 10 Zigaretten/Tag   ║ │
│  ║  Status: 🎯 Aktuell        ║ │
│  ╚═══════════════════════════╝ │
│                                 │
│  [Mehr anzeigen / Weniger]      │
│                                 │
└─────────────────────────────────┘
```

### StreaksCalendar
```
Typ: Kalender-Komponente
Verwendung: Zeigt Streak-Tage im Kalender
Layout:
  - Monatsansicht
  - ✅ = Ziel erreicht (grün)
  - ❌ = Ziel verfehlt (rot)
  - ○ = keine Daten (grau)
  - Navigation: Vorheriger/Nächster Monat
```

### StreaksHeatmap
```
Typ: Heatmap
Verwendung: GitHub-Stil Heatmap für Streaks
Farben:
  - Kein Tag: #1A1A1A
  - 1 Tag: rgba(32,201,151,0.3)
  - Mehr Tage: Helleres Teal
```

### MilestoneCelebration
```
Typ: Modal (Fullscreen oder großes Modal)
Verwendung: Feiert Meilensteine
Layout:
┌─────────────────────────────────┐
│                                 │
│      🎉 HERZLICHEN GLÜCKWUNSCH!│
│                                 │
│      [Badge-Icon groß]          │
│                                 │
│      "1 Tag stark"              │
│                                 │
│      "Du hast deinen ersten    │
│       Tag der Reduzierung       │
│       geschafft!"               │
│                                 │
│      [Reise fortsetzen Button]  │
│                                 │
└─────────────────────────────────┘
```

### StreakCelebration
```
Typ: Modal
Verwendung: Feiert Streak-Meilensteine
Ähnlich wie MilestoneCelebration
```

### QuitPreparationChecklist
```
Typ: Checkliste-Komponente
Verwendung: Vorbereitungsaufgaben vor Aufhörtag
Layout:
┌─────────────────────────────────┐
│  "Aufhörtag-Vorbereitung"       │
│  "15 Tage übrig"                │
│  "3 von 10 erledigt"            │
├─────────────────────────────────┤
│                                 │
│  [✓] Alle Zigaretten entfernen  │
│  [✓] Aschenbecher entsorgen     │
│  [✓] Raucherfreunde informieren │
│  [ ] Ersatz-Rituale planen      │
│  [ ] Unterstützung organisieren │
│  ...                            │
│                                 │
└─────────────────────────────────┘
```

### ConfirmationModal
```
Typ: Modal
Verwendung: Bestätigungs-Dialoge
Layout:
  - Titel
  - Nachricht
  - Abbrechen-Button (Ghost)
  - Bestätigen-Button (Destruktiv oder Primary)
```

### WelcomePopup
```
Typ: Modal
Verwendung: Willkommens-Nachricht nach Onboarding
Einmalig nach erster Anmeldung
```

### CustomDatePicker
```
Typ: Eingabekomponente
Verwendung: Datum auswählen
Native iOS/Android Picker
```

### CustomTimePicker
```
Typ: Eingabekomponente
Verwendung: Zeit auswählen
Native iOS/Android Picker
```

### LanguageSwitcher
```
Typ: Dropdown/Selector
Verwendung: Sprache wechseln
Optionen: Deutsch, English
```

---

# 📐 6. PLATFORM-SPEZIFISCHE ANFORDERUNGEN

## 6.1 iOS-Spezifika

### Design-Guidelines
- **SF Pro** als Standard-Schrift
- **Native Navigation**: iOS-Stil Header (große Titel möglich)
- **Tab Bar**: Unten, native iOS-Stil (60px Höhe)
- **Modal-Präsentation**: Sheet von unten
- **Haptik**: Native Haptic Feedback
- **Status Bar**: Hell (bei Dark Mode)

### Interaktionen
- **Pull-to-Refresh**: Native iOS-Stil (Spinner oben)
- **Swipe-Gesten**: Links zum Zurücknavigieren
- **Long-Press**: Context-Menüs (optional)

### Native Komponenten
- DatePicker: iOS Wheel-Picker
- TimePicker: iOS Wheel-Picker
- Alerts: Native iOS-Alerts

---

## 6.2 Android-Spezifika

### Design-Guidelines
- **Material Design 3** Prinzipien
- **Roboto** als Standard-Schrift
- **Navigation**: Material Design Navigation
- **Tab Bar**: Bottom Navigation (Material Design)
- **Floating Action Button**: Optional für primäre Aktion
- **Status Bar**: Transparent, Farbe anpassbar

### Interaktionen
- **Back-Button**: Hardware/Software Back-Button
- **Swipe-Gesten**: Optional für Navigation
- **Long-Press**: Context-Menüs

### Native Komponenten
- DatePicker: Material DatePicker
- TimePicker: Material TimePicker
- Snackbars: Für Feedback (statt Alerts)

---

## 6.3 Responsive Design

### Bildschirmgrößen
```
Small:        < 375px (iPhone SE, kleine Android)
Medium:       375px - 428px (Standard iPhones)
Large:         > 428px (iPhone Pro Max, große Android)
Tablet:        > 768px (iPad, Android Tablets)
```

### Anpassungen
- **Padding**: Proportional zur Bildschirmgröße
- **Schriftgrößen**: Leicht skalierbar
- **Grid-Layouts**: 2-Spalten auf Tablet, 1-Spalte auf Phone
- **Modals**: Vollbild auf Phone, zentriert auf Tablet

---

# 🎯 7. INTERAKTIONS-FLOWS

## 7.1 Onboarding-Flow
```
1. Name eingeben
2. Motivation wählen & beschreiben
3. Rauchverhalten eingeben
4. Aufhörtag wählen
5. Tagesroutine festlegen
6. Zusammenfassung & Start
```

## 7.2 Zigarette eintragen-Flow
```
1. Tap auf "Zigarette eintragen"
2. Modal öffnet sich
3. Datum/Zeit wählen (Standard: jetzt)
4. Trigger auswählen
5. Emotion auswählen
6. Ort auswählen (optional)
7. Notizen eingeben (optional)
8. Speichern
9. Modal schließt, Eintrag erscheint in Liste
```

## 7.3 Craving-Hilfe-Flow
```
1. Tap auf "Ich hab Bock"
2. SOS-Modal öffnet sich
3. Timer startet automatisch
4. Intensität einstellen
5. Strategien durchlesen/ausführen
6. Tap auf "Ich habe widerstanden!"
7. Bestätigung: "Sieg! Du hast dem Verlangen widerstanden!"
8. Modal schließt
```

## 7.4 Check-in-Flow
```
Morgens:
1. Benachrichtigung: "Guten Morgen! Check-in"
2. Modal öffnet sich (oder via Tab)
3. Stimmung wählen (1-5)
4. Absenden
5. Bestätigung

Abends:
1. Benachrichtigung: "Abend-Check-in"
2. Modal öffnet sich
3. Verlangen-Stärke wählen (1-5)
4. Absenden
5. Bestätigung
```

## 7.5 Einstellungen-Flow
```
1. Profile Tab öffnen
2. Bereich wählen (z.B. Tracking)
3. Werte bearbeiten
4. "Speichern" tappen
5. Bestätigung: "Einstellungen aktualisiert"
6. Änderungen werden sofort wirksam
```

---

# 🔔 8. BENACHRICHTIGUNGEN

## 8.1 Benachrichtigungs-Typen

### Täglicher Morgendlicher Check-in
```
Titel: "Guten Morgen! 🌅"
Text: "Wie fühlst du dich heute? Mach einen schnellen Check-in."
Zeit: Nutzer-definiert (Standard: 08:00)
Aktion: Öffnet CheckinModal (type: 'morning')
```

### Täglicher Abendlicher Check-in
```
Titel: "Abend-Check-in 🌙"
Text: "Wie stark waren deine Verlangen heute?"
Zeit: Nutzer-definiert (Standard: 20:00)
Aktion: Öffnet CheckinModal (type: 'evening')
```

### Zigaretten-Erinnerung
```
Titel: "Nicht vergessen! 📝"
Text: "Vergiss nicht, deine Zigaretten für heute einzutragen."
Zeit: Nutzer-definiert (Standard: 19:00)
Aktion: Navigiert zu Log Tab
```

## 8.2 Benachrichtigungs-Stil

### iOS
- Native iOS-Notifications
- Rich Notifications mit Buttons (optional)
- Badge Count auf App-Icon

### Android
- Material Design Notifications
- Actions als Buttons
- Kanäle für verschiedene Typen

---

# 📊 9. DATENMODELL & LOGIK

## 9.1 Kern-Datenstrukturen

### User Profile
```
- id: UUID
- email: string
- display_name: string
- language: 'de' | 'en'
- timezone: string
- created_at: timestamp
```

### User Settings
```
- user_id: UUID
- daily_goal: number
- normal_amount: number
- pack_cost: number
- cigarettes_per_pack: number
- wait_time_minutes: number
```

### Smoking Logs
```
- id: UUID
- user_id: UUID
- logged_at: timestamp
- trigger: 'stress' | 'habit' | 'social' | 'craving' | 'boredom' | 'other'
- emotion: 'stressed' | 'anxious' | 'calm' | 'happy' | 'sad' | 'angry' | 'bored'
- location: 'home' | 'work' | 'social' | 'commute' | 'outside' | 'other'
- notes: string (optional)
```

### User Stats
```
- user_id: UUID
- total_xp: number
- current_level: number
- current_streak: number
- longest_streak: number
- total_resisted_cravings: number
```

### Quit Journey
```
- user_id: UUID
- journey_start_date: date
- target_quit_date: date
- current_phase: 'building_habits' | 'reducing' | 'final_push' | 'final_week' | 'quit_day'
```

## 9.2 Berechnungs-Logik

### Reduktionsplan-Berechnung
```
Basierend auf:
- Normaler täglicher Menge
- Aktueller täglicher Menge
- Aufhörtag (Wochen bis dahin)

Formel:
- Wöchentliche Reduktion = (normale - aktuelle) / Wochen
- Tagesziel pro Woche wird schrittweise reduziert
```

### Wartezeit-Berechnung
```
Automatisch basierend auf Tagesziel:
- Formel: (16 Stunden × 60 Minuten) / Tagesziel
- Beispiel: 12 Zigaretten/Tag = 80 Minuten Wartezeit
```

### Streak-Berechnung
```
- Erhöht sich um 1, wenn an einem Tag mindestens 1 Log vorhanden
- Reset, wenn mehr als 1 Tag Lücke
- UTC-basiert
```

### XP & Levels
```
- Level = floor(total_xp / 100) + 1
- Jedes Level benötigt mehr XP
- XP aus:
  - Zigaretten loggen: +10 XP
  - Verlangen widerstehen: +50 XP
  - Tagesziel erreicht: +100 XP
  - Meilensteine: +500 XP
```

---

# 🎨 10. VISUELLE HIERARCHIE

## 10.1 Informationshierarchie

### Ebene 1: Primär (Hero)
- Große Zahlen (Display 72px)
- Reise-Übersicht-Karte
- Haupt-Aktionen (Gradient-Buttons)

### Ebene 2: Sekundär
- Überschriften (Heading 1-3)
- Status-Karten
- Wichtige Statistiken

### Ebene 3: Tertiär
- Fließtext (Body)
- Sekundäre Informationen
- Links

### Ebene 4: Unterstützend
- Captions
- Platzhalter
- Hilfstext

## 10.2 Fokus & Betonung

### Primär-Fokus
- Gradient-Buttons
- Hero-Karten mit Glow
- Aktive Tab-Icons (Teal)

### Sekundär-Fokus
- Outlined-Buttons
- Standard-Karten
- Hervorgehobene Textstellen

### Neutral
- Ghost-Buttons
- Inaktive Elemente (Grau)
- Hintergrund-Elemente

---

# 🔄 11. ANIMATIONEN & ÜBERGÄNGE

## 11.1 Standard-Übergänge

### Screen-Übergänge
- **Push**: Von rechts (iOS-Stil)
- **Modal**: Von unten (Sheet)
- **Tab-Wechsel**: Fade oder Slide

### Button-Interaktionen
- **Tap**: Scale 0.98 (aktiv)
- **Hover**: TranslateY(-2px) + Schatten verstärkt
- **Loading**: Spinner in Button

### Modal-Öffnen/Schließen
- **Öffnen**: Fade in + Slide up (0.3s)
- **Schließen**: Fade out + Slide down (0.2s)
- **Overlay**: Fade in/out (0.2s)

## 11.2 Spezielle Animationen

### Fortschrittsbalken
- **Update**: Smooth Fill-Animation (0.5s ease-out)

### Badge-Freischaltung
- **Erfolg**: Scale (1.0 → 1.1 → 1.0) + Glow (0.6s)
- **Konfetti**: Optional bei Meilensteinen

### Streak-Update
- **Zähler**: Count-up Animation (1s)

---

# ✅ 12. ZUSAMMENFASSUNG FÜR FIGMA MAKE

## 12.1 Checkliste für 1:1 Visualisierung

### Design System
- ✅ Alle Farben dokumentiert (HEX-Werte)
- ✅ Typografie-System vollständig
- ✅ Abstände-System (4px-Basis)
- ✅ Border Radius definiert
- ✅ Schatten & Glows spezifiziert

### Screens
- ✅ Alle Screens dokumentiert (8 Haupt-Screens)
- ✅ Layout-Strukturen als ASCII-Art
- ✅ Alle UI-Elemente aufgelistet
- ✅ Interaktionen beschrieben

### Komponenten
- ✅ Alle wiederverwendbaren Komponenten (20+)
- ✅ Props & Verhalten dokumentiert
- ✅ Modals vollständig beschrieben

### Platform-Spezifika
- ✅ iOS-Anforderungen
- ✅ Android-Anforderungen
- ✅ Responsive Design-Regeln

### Interaktionen
- ✅ Alle Flows dokumentiert
- ✅ Animationen beschrieben
- ✅ Benachrichtigungen spezifiziert

## 12.2 Wichtige Hinweise für Figma Make

### Dark Mode First
- **Alle Screens sind Dark Mode**
- Hintergrund: #0F0F0F
- Karten: #242424
- Text: #FFFFFF (Primary), #A0A0A0 (Secondary)

### Gradient-Verwendung
- **Primäre Buttons**: Immer Gradient (Teal → Cyan, 135deg)
- **Hero-Karten**: Gradient-Hintergrund (8% Opacity)
- **Fortschrittsbalken**: Gradient-Fill

### Native Platform-Feel
- **iOS**: SF Pro, native Navigation, Sheet-Modals
- **Android**: Roboto, Material Design, Bottom Navigation

### Touch-Targets
- **Minimum**: 44px × 44px
- **Buttons**: 48px Höhe (Groß)
- **Tab Bar**: 60px Höhe

---

# 📝 13. ZUSÄTZLICHE NOTIZEN

## 13.1 Lokalisierung
- **Sprachen**: Deutsch (Standard), Englisch
- **Alle Texte**: In `locales/de.json` und `locales/en.json`
- **Formatierung**: Datum, Zahlen, Währungen lokalisiert

## 13.2 Zugänglichkeit
- **Touch-Targets**: Mindestens 44px
- **Kontraste**: WCAG AA-konform
- **Screen Reader**: Labels für alle interaktiven Elemente

## 13.3 Performance
- **60 FPS**: Alle Animationen
- **Lazy Loading**: Für Listen
- **Caching**: Lokale Daten mit AsyncStorage

---

**ENDE DER DOKUMENTATION**

Diese Dokumentation enthält alle notwendigen Informationen für eine 1:1 Visualisierung der MyQuitly-App in Figma Make für Android und iOS.

**Version:** 1.0  
**Zuletzt aktualisiert:** 2025

