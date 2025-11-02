# MyQuitly - Alle relevanten Codes für Figma Make

**Erstellt:** 2025  
**Zweck:** Code-Referenz für 1:1 Visualisierung in Figma Make  
**Hinweis:** Dieses Dokument enthält die wichtigsten Code-Ausschnitte der App für die Implementierung in Figma Make.

---

## 📋 INHALTSVERZEICHNIS

1. [Design System & Theme](#1-design-system--theme)
2. [Gradient-Konfigurationen](#2-gradient-konfigurationen)
3. [Wiederverwendbare Komponenten](#3-wiederverwendbare-komponenten)
4. [Haupt-Screens](#4-haupt-screens)
5. [Authentifizierung](#5-authentifizierung)
6. [Onboarding](#6-onboarding)
7. [Navigation & Layout](#7-navigation--layout)

---

# 1. DESIGN SYSTEM & THEME

## 1.1 Theme Context (ThemeContext.tsx)

```typescript
// lib/ThemeContext.tsx
// Vollständige Theme-Definition für Dark Mode (Standard)

// Dark Mode Colors
const darkColors: ThemeColors = {
  // Backgrounds
  background: '#0F0F0F',              // Haupt-App-Hintergrund
  backgroundSecondary: '#1A1A1A',      // Sekundäre Flächen
  backgroundCard: '#242424',           // Karten-Hintergründe
  backgroundElevated: '#2D2D2D',       // Modal-Hintergründe
  backgroundInput: '#2A2A2A',          // Eingabefelder
  backgroundTabBar: '#1A1A1A',         // Bottom Tab Bar
  backgroundNested: '#1E1E1E',         // Verschachtelte Elemente
  
  // Text Colors
  text: '#FFFFFF',                     // Primärer Text
  textSecondary: '#A0A0A0',            // Sekundärer Text
  textTertiary: '#6B6B6B',             // Tertiärer Text
  textInverse: '#111827',              // Inverse Text (für helle Buttons)
  
  // Brand Colors
  primary: '#20C997',                  // Teal (Primär)
  primaryHover: '#2DD4A6',             // Teal Hover
  primaryActive: '#1BB887',            // Teal Active
  brandSecondary: '#06B6D4',           // Cyan (Sekundär)
  
  // Semantic Colors
  success: '#10B981',                  // Erfolg (Grün)
  successLight: '#1A2A25',             // Erfolg Hell
  warning: '#FBBF24',                  // Warnung (Orange)
  warningLight: '#2A2418',              // Warnung Hell
  error: '#EF4444',                    // Fehler (Rot)
  errorLight: '#F87171',                // Fehler Hell
  info: '#60A5FA',                     // Info (Blau)
  
  // Streak Colors
  streak: '#FF6B35',                    // Streak Orange
  streakGlow: 'rgba(255, 107, 53, 0.3)', // Streak Glow
  streakFire: '#FF8C42',                // Streak Feuer
  
  // Borders & Dividers
  border: '#3A3A3A',                   // Standard Border
  borderFocus: '#20C997',               // Focus Border (Teal)
  divider: '#2A2A2A',                  // Trennlinien
  
  // Overlays
  overlay: 'rgba(0, 0, 0, 0.6)',       // Modal Overlay
  overlayLight: 'rgba(0, 0, 0, 0.3)',  // Leichtes Overlay
  
  // Status Colors
  onTrack: '#059669',                   // Auf Kurs
  struggling: '#DC2626',                // Schwierigkeiten
  excelling: '#D97706',                 // Exzellent
};
```

**Verwendung:**
```typescript
import { useTheme } from '../lib/ThemeContext';

const { colors } = useTheme();
// colors.primary, colors.background, etc.
```

---

## 1.2 Gradient-Konfigurationen (gradients.ts)

```typescript
// lib/gradients.ts

export const Gradients = {
  // Brand Gradient (Primary) - 135deg diagonal
  // Verwendung: Primäre Buttons, Hero-Elemente
  brand: {
    colors: ['#20C997', '#06B6D4'],  // Teal → Cyan
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },              // 135deg diagonal
  },

  // Horizontal Gradient - 90deg
  // Verwendung: Fortschrittsbalken, horizontale Elemente
  brandHorizontal: {
    colors: ['#20C997', '#06B6D4'],  // Teal → Cyan
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },            // Horizontal
  },

  // Reverse Gradient
  brandReverse: {
    colors: ['#06B6D4', '#20C997'],  // Cyan → Teal
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Subtle Background Gradient (8% opacity)
  // Verwendung: Hero-Karten-Hintergründe
  brandSubtle: {
    colors: ['rgba(32, 201, 151, 0.08)', 'rgba(6, 182, 212, 0.08)'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};
```

**React Native Implementation:**
```typescript
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '../lib/gradients';

<LinearGradient
  colors={Gradients.brand.colors}
  start={Gradients.brand.start}
  end={Gradients.brand.end}
  style={styles.button}
>
  <Text>Button Text</Text>
</LinearGradient>
```

---

# 2. WIEDERVERWENDBARE KOMPONENTEN

## 2.1 PrimaryButton (PrimaryButton.tsx)

```typescript
// components/PrimaryButton.tsx

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'solid' | 'outline';
}

export function PrimaryButton({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false,
  variant = 'solid'
}: PrimaryButtonProps) {
  // Solid Variant (Gradient)
  if (variant === 'solid') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={Gradients.brand.colors}  // ['#20C997', '#06B6D4']
          start={Gradients.brand.start}     // { x: 0, y: 0 }
          end={Gradients.brand.end}         // { x: 1, y: 1 }
          style={[
            styles.button,
            {
              paddingVertical: 16,
              paddingHorizontal: 24,
              borderRadius: 12,
              minHeight: 48,
              // Shadow für iOS
              shadowColor: '#20C997',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              // Elevation für Android
              elevation: 4,
            }
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Outline Variant
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 12,
          minHeight: 48,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: '#06B6D4',  // Cyan
        }
      ]}
    >
      <Text style={{ color: '#06B6D4', fontSize: 16, fontWeight: '700' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
```

**Wichtige Styles:**
- Padding: 16px vertikal, 24px horizontal
- Border Radius: 12px
- Min Height: 48px
- Font Size: 16px
- Font Weight: 700 (Bold)
- Shadow: Teal Glow für iOS/Android

---

## 2.2 ProgressBar (ProgressBar.tsx)

```typescript
// components/ProgressBar.tsx

interface ProgressBarProps {
  progress: number;  // 0-1 oder 0-100
  variant?: 'default' | 'thick' | 'thin';
  showGlow?: boolean;
}

export function ProgressBar({ 
  progress, 
  variant = 'default',
  showGlow = false 
}: ProgressBarProps) {
  const { colors } = useTheme();
  
  // Normalisiere auf 0-100
  const normalizedProgress = progress > 1 ? progress / 100 : progress;
  const progressPercent = Math.max(0, Math.min(100, normalizedProgress * 100));

  // Höhe basierend auf Variant
  const height = variant === 'thick' ? 16 : variant === 'thin' ? 8 : 12;
  const borderRadius = variant === 'thick' ? 8 : 4;

  return (
    <View 
      style={{
        width: '100%',
        height,
        backgroundColor: colors.border,  // #3A3A3A
        borderRadius,
        overflow: 'hidden',
        // Optional: Glow
        ...(showGlow && {
          shadowColor: '#20C997',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        })
      }}
    >
      {progressPercent > 0 && (
        <LinearGradient
          colors={Gradients.brandHorizontal.colors}  // Teal → Cyan horizontal
          start={Gradients.brandHorizontal.start}
          end={Gradients.brandHorizontal.end}
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            borderRadius,
          }}
        />
      )}
    </View>
  );
}
```

**Verwendung:**
```typescript
<ProgressBar progress={45} variant="default" />
<ProgressBar progress={0.67} variant="thick" showGlow />
```

---

# 3. HAUPT-SCREENS

## 3.1 Home Tab (app/(tabs)/index.tsx)

### Wichtigste Strukturen:

#### Journey Overview Card
```typescript
<View style={{
  backgroundColor: colors.backgroundCard,  // #242424
  borderRadius: 24,
  padding: 24,
  marginHorizontal: 16,
  marginBottom: 16,
}}>
  {/* Phase Badge */}
  <View style={{
    backgroundColor: colors.backgroundNested,  // #1E1E1E
    borderWidth: 1,
    borderColor: colors.border,  // #3A3A3A
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  }}>
    <Text style={{ color: colors.text, fontSize: 14, fontWeight: '700' }}>
      {phaseInfo.emoji} {phaseInfo.message}
    </Text>
  </View>

  {/* Countdown Section */}
  <View style={{ alignItems: 'center', marginBottom: 24 }}>
    <Text style={{
      fontSize: 72,           // Display Large
      fontWeight: 'bold',
      color: colors.primary,   // #20C997
      letterSpacing: -2,
    }}>
      {daysRemaining}
    </Text>
    <Text style={{
      fontSize: 16,
      color: colors.textSecondary,  // #A0A0A0
      fontWeight: '600',
      marginTop: -8,
      marginBottom: 8,
    }}>
      {t('home.daysUntilQuitDate')}
    </Text>
    <Text style={{
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    }}>
      {formatQuitDate(quitJourney.quit_date)}
    </Text>
  </View>

  {/* Progress Bar */}
  <View style={{ marginBottom: 24 }}>
    <View style={{
      height: 12,
      backgroundColor: colors.border,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 8,
    }}>
      <LinearGradient
        colors={Gradients.brandHorizontal.colors}
        start={Gradients.brandHorizontal.start}
        end={Gradients.brandHorizontal.end}
        style={{
          width: `${progress}%`,
          height: '100%',
          borderRadius: 12,
        }}
      />
    </View>
    <Text style={{
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    }}>
      {Math.round(progress)}% {t('home.complete')}
    </Text>
  </View>

  {/* Today's Target */}
  <View style={{
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: colors.divider,  // #2A2A2A
  }}>
    <Text style={{
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '600',
      marginBottom: 8,
    }}>
      {t('home.todayProgress')}
    </Text>
    <Text style={{
      fontSize: 36,
      fontWeight: 'bold',
      color: todayCount > target ? colors.error : colors.text,
    }}>
      {todayCount}
      <Text style={{
        fontSize: 18,
        color: colors.textSecondary,
        fontWeight: '600',
      }}>
        /{target}
      </Text>
    </Text>
  </View>
</View>
```

#### Streak Card (Duolingo-Style)
```typescript
<View style={{
  backgroundColor: colors.backgroundCard,  // #242424
  borderRadius: 24,
  padding: 32,
  marginHorizontal: 16,
  marginBottom: 16,
  alignItems: 'center',
  justifyContent: 'center',
  // Orange Glow für Streak
  shadowColor: '#F97316',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 5,
}}>
  <Text style={{ fontSize: 64, marginBottom: 8 }}>🔥</Text>
  <Text style={{
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.streak,  // #FF6B35
    marginBottom: 4,
  }}>
    {currentStreak}
  </Text>
  <Text style={{
    fontSize: 20,
    fontWeight: '700',
    color: colors.streak,
    marginBottom: 16,
  }}>
    {t('home.consecutiveDays')}
  </Text>

  {/* Weekly Days View */}
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  }}>
    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day, index) => {
      const dayData = weeklyStreakData[index];
      const hasEntry = dayData?.hasEntry || false;
      
      return (
        <View key={index} style={{ alignItems: 'center', gap: 4 }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '600',
            color: colors.textTertiary,
            marginBottom: 4,
          }}>
            {day}
          </Text>
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: hasEntry ? colors.streak : 'transparent',
            borderWidth: hasEntry ? 0 : 1,
            borderColor: hasEntry ? 'transparent' : colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {hasEntry && (
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#FFFFFF',
              }}>
                ✓
              </Text>
            )}
          </View>
        </View>
      );
    })}
  </View>
</View>
```

#### Today's Wins Card
```typescript
<View style={{
  backgroundColor: colors.backgroundCard,
  borderRadius: 24,
  padding: 24,
  marginHorizontal: 16,
  marginBottom: 16,
}}>
  <Text style={{
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  }}>
    💪 {t('home.todaysWins')}
  </Text>

  <View style={{
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  }}>
    {/* Cravings Resisted */}
    <View style={{
      flex: 1,
      backgroundColor: colors.backgroundNested,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    }}>
      <Text style={{ fontSize: 32, marginBottom: 8 }}>🛡️</Text>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
      }}>
        {todayCravingsResisted}
      </Text>
      <Text style={{
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: '600',
        textAlign: 'center',
      }}>
        {t('home.cravingsResisted')}
      </Text>
    </View>

    {/* On Track Status */}
    <View style={{
      flex: 1,
      backgroundColor: colors.backgroundNested,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    }}>
      <Text style={{ fontSize: 32, marginBottom: 8 }}>🎯</Text>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
      }}>
        {todayCount}/{target}
      </Text>
      <Text style={{
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: '600',
        textAlign: 'center',
      }}>
        {todayCount <= target ? t('home.onTrack') : t('home.overTarget')}
      </Text>
    </View>
  </View>
</View>
```

---

## 3.2 Log Tab (app/(tabs)/log.tsx)

### Wichtigste Strukturen:

#### Today Status Card
```typescript
<View style={{
  backgroundColor: colors.backgroundCard,  // #242424
  borderWidth: 2,
  borderColor: colors.border,              // #3A3A3A
  borderRadius: 16,
  padding: 16,
  margin: 16,
}}>
  {/* Header */}
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  }}>
    <Text style={{
      fontSize: 12,
      fontWeight: '500',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }}>
      {t('log.cigarettesToday')}
    </Text>
    
    {/* Status Badge */}
    {todayCount === 0 && (
      <View style={{
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
      }}>
        <Text style={{ fontSize: 11, fontWeight: '700' }}>
          🌟 {t('log.perfect')}
        </Text>
      </View>
    )}
    {todayCount < limit * 0.8 && (
      <View style={{
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
      }}>
        <Text style={{ fontSize: 11, fontWeight: '700' }}>
          ✅ {t('log.onTrack')}
        </Text>
      </View>
    )}
    {/* Weitere Status-Badges... */}
  </View>

  {/* Count & Progress Bar */}
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  }}>
    <Text style={{
      fontSize: 24,
      fontWeight: 'bold',
      color: todayCount > limit ? colors.error : colors.text,
      letterSpacing: -1,
    }}>
      {todayCount}
    </Text>
    <Text style={{
      fontSize: 16,
      color: colors.textSecondary,
      marginLeft: 2,
      fontWeight: '600',
    }}>
      /{limit}
    </Text>
    
    <View style={{
      flex: 1,
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 4,
      overflow: 'hidden',
    }}>
      {todayCount > limit ? (
        <View style={{
          width: `${Math.min((todayCount / limit) * 100, 100)}%`,
          height: '100%',
          backgroundColor: colors.error,
        }} />
      ) : (
        <LinearGradient
          colors={Gradients.brandHorizontal.colors}
          start={Gradients.brandHorizontal.start}
          end={Gradients.brandHorizontal.end}
          style={{
            width: `${Math.min((todayCount / limit) * 100, 100)}%`,
            height: '100%',
          }}
        />
      )}
    </View>
    
    <Text style={{
      fontSize: 12,
      fontWeight: '700',
      color: colors.textSecondary,
      minWidth: 40,
    }}>
      {Math.round((todayCount / limit) * 100)}%
    </Text>
  </View>

  {/* Timer Section */}
  {lastLogTime && (
    <View style={{
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    }}>
      <Text style={{
        fontSize: 11,
        fontWeight: '600',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
      }}>
        {t('log.timeSinceLastCigarette')}
      </Text>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: timerInfo.isOvertime ? colors.success : colors.primary,
          letterSpacing: -0.5,
          minWidth: 60,
        }}>
          {timerInfo.display}
        </Text>
        
        <View style={{
          flex: 1,
          height: 6,
          backgroundColor: colors.border,
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          {timerInfo.isOvertime ? (
            <View style={{
              width: `${timerInfo.progress}%`,
              height: '100%',
              backgroundColor: colors.success,
            }} />
          ) : (
            <LinearGradient
              colors={Gradients.brandHorizontal.colors}
              start={Gradients.brandHorizontal.start}
              end={Gradients.brandHorizontal.end}
              style={{
                width: `${timerInfo.progress}%`,
                height: '100%',
              }}
            />
          )}
        </View>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
      }}>
        <Text style={{
          fontSize: 12,
          color: colors.textSecondary,
          fontWeight: '500',
        }}>
          {timerInfo.isOvertime ? (
            <>
              {t('log.nextAvailable')} <Text style={{
                fontSize: 12,
                fontWeight: '700',
                color: colors.success,
              }}>
                {t('log.now')}
              </Text>
            </>
          ) : (
            <>
              {t('log.nextAt')} <Text style={{
                fontSize: 12,
                fontWeight: '700',
                color: colors.primary,
              }}>
                {formatTime(timerInfo.targetTime)}
              </Text>
            </>
          )}
        </Text>
      </View>
    </View>
  )}
</View>
```

#### Action Buttons
```typescript
<View style={{
  flexDirection: 'row',
  gap: 12,
  marginHorizontal: 16,
  marginBottom: 16,
}}>
  {/* SOS Button (Craving Help) */}
  <TouchableOpacity
    style={{
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 12,
      backgroundColor: colors.error,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }}
  >
    <Text style={{ fontSize: 24 }}>🆘</Text>
    <Text style={{
      color: colors.textInverse,
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'left',
      flex: 1,
    }}>
      {t('log.iHaveCraving')}
    </Text>
  </TouchableOpacity>

  {/* Log Cigarette Button (Gradient) */}
  <TouchableOpacity>
    <LinearGradient
      colors={Gradients.brand.colors}
      start={Gradients.brand.start}
      end={Gradients.brand.end}
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 12,
        minHeight: 48,
        shadowColor: '#20C997',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 24, marginTop: -6 }}>🚬</Text>
      <Text style={{
        color: colors.textInverse,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'left',
        flex: 1,
      }}>
        {t('log.logCigarette')}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
</View>
```

#### Log Entry Item
```typescript
<View style={{
  backgroundColor: colors.backgroundCard,
  padding: 20,
  borderRadius: 16,
  marginBottom: 12,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}}>
  <View style={{ flex: 1, gap: 6 }}>
    {/* Time Row */}
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
      }}>
        {formatTime(log.logged_at)}
      </Text>
      {log.over_target && (
        <View style={{
          backgroundColor: '#FEE2E2',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 12,
        }}>
          <Text style={{
            fontSize: 11,
            fontWeight: '700',
            color: '#DC2626',
          }}>
            {t('log.overTarget')}
          </Text>
        </View>
      )}
    </View>

    {/* Context Chips */}
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 8,
    }}>
      {log.trigger_type && (
        <View style={{
          backgroundColor: colors.backgroundNested,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 12,
        }}>
          <Text style={{
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: '500',
          }}>
            {getTriggers(t).find(t => t.value === log.trigger_type)?.emoji}{' '}
            {getTriggers(t).find(t => t.value === log.trigger_type)?.label}
          </Text>
        </View>
      )}
      {/* Weitere Chips für Emotion und Location... */}
    </View>

    {/* Notes */}
    {log.notes && (
      <Text style={{
        fontSize: 14,
        color: colors.textSecondary,
        fontStyle: 'italic',
        marginTop: 8,
      }}>
        "{log.notes}"
      </Text>
    )}
  </View>

  {/* Action Buttons */}
  <View style={{ flexDirection: 'row', gap: 4 }}>
    <TouchableOpacity
      style={{
        padding: 12,
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 20 }}>✏️</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        padding: 12,
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 22 }}>🗑️</Text>
    </TouchableOpacity>
  </View>
</View>
```

---

## 3.3 Stats Tab (app/(tabs)/stats.tsx)

### Wichtigste Strukturen:

#### Time Range Tabs
```typescript
<View style={{
  flexDirection: 'row',
  padding: 16,
  gap: 10,
}}>
  {[
    { key: 'today', label: t('stats.timeRanges.today') },
    { key: '7days', label: t('stats.timeRanges.7days') },
    { key: '30days', label: t('stats.timeRanges.30days') },
  ].map((range) => (
    <TouchableOpacity
      key={range.key}
      style={{
        flex: 1,
        padding: 14,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: timeRange === range.key 
          ? colors.primary      // Gradient wird als Solid dargestellt
          : colors.backgroundCard,
        alignItems: 'center',
      }}
    >
      <Text style={{
        fontSize: 15,
        fontWeight: '600',
        color: timeRange === range.key 
          ? colors.textInverse 
          : colors.text,
      }}>
        {range.label}
      </Text>
    </TouchableOpacity>
  ))}
</View>
```

#### Stats Grid (2-Spalten)
```typescript
<View style={{
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: 16,
  gap: 12,
}}>
  {/* Total Smoked Card */}
  <View style={{
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    borderWidth: 2,
    borderColor: colors.border,
  }}>
    <Text style={{ fontSize: 32, marginBottom: 8 }}>🚬</Text>
    <Text style={{
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }}>
      {t('stats.totalSmoked')}
    </Text>
    <Text style={{
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      letterSpacing: -1,
    }}>
      {stats.total}
    </Text>
    <Text style={{
      fontSize: 12,
      color: colors.textTertiary,
      marginTop: 4,
      fontWeight: '500',
    }}>
      {t('stats.units.cigarettes')}
    </Text>
  </View>

  {/* Total Cost Card */}
  <View style={{
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    borderWidth: 2,
    borderColor: colors.border,
  }}>
    <Text style={{ fontSize: 32, marginBottom: 8 }}>
      {t('profile.currency.moneyIcon')}
    </Text>
    <Text style={{
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }}>
      {t('stats.totalCost')}
    </Text>
    <Text style={{
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      letterSpacing: -1,
    }}>
      {t('profile.currency.symbol')}{stats.cost.toFixed(2)}
    </Text>
    <Text style={{
      fontSize: 12,
      color: colors.textTertiary,
      marginTop: 4,
      fontWeight: '500',
    }}>
      {t('stats.units.spent')}
    </Text>
  </View>

  {/* Success Cards mit grünem Hintergrund */}
  <View style={{
    backgroundColor: colors.successLight,  // #1A2A25 (Dark Mode)
    borderRadius: 16,
    padding: 20,
    width: '48%',
    borderWidth: 2,
    borderColor: colors.success,  // #10B981
  }}>
    {/* Reduktion oder Geld gespart */}
  </View>
</View>
```

#### Trigger Patterns Card
```typescript
<View style={{
  marginTop: 32,
  marginBottom: 24,
}}>
  <Text style={{
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  }}>
    🎯 {t('stats.triggerPatterns')}
  </Text>
  <Text style={{
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 16,
  }}>
    {t('stats.triggerPatternsSubtitle')}
  </Text>

  <View style={{ gap: 12, marginTop: 16, paddingHorizontal: 16 }}>
    {triggerPatterns.slice(0, 5).map((pattern, index) => (
      <View
        key={index}
        style={{
          backgroundColor: colors.backgroundCard,
          borderRadius: 16,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderWidth: 2,
          borderColor: colors.border,
        }}
      >
        <Text style={{ fontSize: 28 }}>
          {getTriggerEmoji(pattern.trigger)}
        </Text>
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{
            fontSize: 15,
            fontWeight: '600',
            color: colors.text,
            textTransform: 'capitalize',
          }}>
            {translateTrigger(pattern.trigger)}
          </Text>
          <View style={{
            height: 6,
            backgroundColor: colors.border,
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            <LinearGradient
              colors={Gradients.brandHorizontal.colors}
              start={Gradients.brandHorizontal.start}
              end={Gradients.brandHorizontal.end}
              style={{
                width: `${pattern.percentage}%`,
                height: '100%',
                borderRadius: 3,
              }}
            />
          </View>
        </View>
        <Text style={{
          fontSize: 18,
          fontWeight: '700',
          color: colors.primary,
        }}>
          {pattern.count}
        </Text>
      </View>
    ))}
  </View>
</View>
```

---

## 3.4 Profile Tab (app/(tabs)/profile.tsx)

**Hinweis:** Der Profile Tab ist sehr umfangreich. Hier die wichtigsten Bereiche:

### Struktur:
- Konto-Bereich (Anzeigename, E-Mail, Passwort)
- Tracking-Einstellungen (Tagesziel, Normale Menge, Packungspreis, etc.)
- Benachrichtigungen (Toggle + Zeitpicker)
- Aufhörreise (Reisebeginn, Zielaufhörtag, Phase, Fortschritt)
- Motivation (Kategorie, Persönliche Nachricht)
- Sprache & Aussehen (Dropdowns)
- Abmelden Button

**Style-Pattern:**
```typescript
// Section Card
<View style={{
  backgroundColor: colors.backgroundCard,
  borderRadius: 16,
  padding: 24,
  marginHorizontal: 16,
  marginBottom: 16,
}}>
  <Text style={{
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  }}>
    {sectionTitle}
  </Text>

  {/* Input Field */}
  <View style={{ marginBottom: 16 }}>
    <Text style={{
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
      marginLeft: 4,
    }}>
      {label}
    </Text>
    <TextInput
      style={{
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.backgroundInput,
      }}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      value={value}
      onChangeText={setValue}
    />
  </View>

  {/* Save Button */}
  <TouchableOpacity>
    <LinearGradient
      colors={Gradients.brand.colors}
      start={Gradients.brand.start}
      end={Gradients.brand.end}
      style={{
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
      }}
    >
      <Text style={{
        color: colors.textInverse,
        fontSize: 16,
        fontWeight: '700',
      }}>
        {t('common.save')}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
</View>
```

---

# 4. AUTHENTIFIZIERUNG

## 4.1 Login Screen (app/(auth)/login.tsx)

### Struktur:

```typescript
<View style={{
  flex: 1,
  backgroundColor: colors.background,  // #0F0F0F
  paddingHorizontal: 24,
  paddingVertical: 40,
}}>
  {/* Back Button */}
  <Pressable style={{ marginBottom: 32, padding: 8 }}>
    <ArrowLeft size={24} color={colors.textSecondary} />
  </Pressable>

  {/* Header */}
  <View style={{ marginBottom: 24 }}>
    <Text style={{
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    }}>
      {t('auth.welcomeBack')}
    </Text>
    <Text style={{
      fontSize: 16,
      color: colors.textSecondary,
    }}>
      {t('auth.signInSubtitle')}
    </Text>
  </View>

  {/* OAuth Buttons */}
  <View style={{ width: '100%', marginBottom: 24, gap: 12 }}>
    {/* Google Button */}
    <TouchableOpacity
      style={{
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.backgroundCard,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 12,
      }}
    >
      <Image source={require('../../assets/images/google_logo.png')} />
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
      }}>
        {t('auth.loginWithGoogle')}
      </Text>
    </TouchableOpacity>

    {/* Apple Button (iOS only) */}
    {Platform.OS === 'ios' && (
      <TouchableOpacity
        style={{
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#000000',
          backgroundColor: '#000000',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <Image source={require('../../assets/images/apple_logo3.png')} />
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#FFFFFF',
        }}>
          {t('auth.loginWithApple')}
        </Text>
      </TouchableOpacity>
    )}
  </View>

  {/* Divider */}
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  }}>
    <View style={{
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    }} />
    <Text style={{
      paddingHorizontal: 16,
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '500',
    }}>
      {t('common.or')}
    </Text>
    <View style={{
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    }} />
  </View>

  {/* Email Input */}
  <View style={{ gap: 8, marginBottom: 20 }}>
    <Text style={{
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginLeft: 4,
    }}>
      {t('auth.email')}
    </Text>
    <TextInput
      style={{
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.backgroundCard,
      }}
      placeholder={t('auth.emailPlaceholder')}
      placeholderTextColor={colors.textSecondary}
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      keyboardType="email-address"
    />
  </View>

  {/* Password Input */}
  <View style={{ gap: 8, marginBottom: 20 }}>
    <Text style={{
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginLeft: 4,
    }}>
      {t('auth.password')}
    </Text>
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 12,
      backgroundColor: colors.backgroundCard,
    }}>
      <TextInput
        style={{
          flex: 1,
          padding: 16,
          fontSize: 16,
          color: colors.text,
        }}
        placeholder={t('auth.passwordPlaceholder')}
        placeholderTextColor={colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={{ padding: 16 }}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Text style={{ fontSize: 20 }}>
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>

  {/* Forgot Password Link */}
  <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 8 }}>
    <Text style={{
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    }}>
      {t('auth.forgotPassword.link')}
    </Text>
  </TouchableOpacity>

  {/* Login Button */}
  <TouchableOpacity>
    <LinearGradient
      colors={Gradients.brand.colors}
      start={Gradients.brand.start}
      end={Gradients.brand.end}
      style={{
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#20C997',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text style={{
        color: colors.textInverse,
        fontSize: 16,
        fontWeight: '700',
      }}>
        {t('auth.signIn')}
      </Text>
    </LinearGradient>
  </TouchableOpacity>

  {/* Sign Up Link */}
  <TouchableOpacity style={{ alignItems: 'center', marginTop: 16 }}>
    <Text style={{
      color: colors.textSecondary,
      fontSize: 14,
    }}>
      {t('auth.dontHaveAccount')}{' '}
      <Text style={{
        color: colors.primary,
        fontWeight: '700',
      }}>
        {t('auth.signUp')}
      </Text>
    </Text>
  </TouchableOpacity>
</View>
```

---

## 4.2 Signup Screen (app/(auth)/signup.tsx)

### Struktur (ähnlich wie Login):

```typescript
// Gleiche Struktur wie Login, aber:
// - Titel: "Konto erstellen"
// - Passwort-Validierung mit Checkliste
// - Bestätigungs-Passwort-Feld
// - Button: "Konto erstellen"

// Passwort-Validierung Container
{password.length > 0 && (
  <View style={{
    marginTop: 8,
    backgroundColor: colors.backgroundNested,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  }}>
    <Text style={{
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    }}>
      {t('profile.passwordValidation.title')}
    </Text>

    {/* Validation Items */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 8 }}>
      {validation.length ? (
        <Check size={16} color={colors.success} />
      ) : (
        <X size={16} color={colors.error} />
      )}
      <Text style={{
        fontSize: 14,
        color: validation.length ? colors.success : colors.textSecondary,
      }}>
        {t('profile.passwordValidation.atLeastCharacters')}
      </Text>
    </View>
    {/* Weitere Validierungs-Items... */}
  </View>
)}
```

---

# 5. ONBOARDING

## 5.1 Onboarding Flow (app/onboarding.tsx)

### Step 1: Name & Motivation
```typescript
// Step 1: Name eingeben
<View>
  <Text style={{
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  }}>
    {t('onboarding.whatsYourName')}
  </Text>
  <Text style={{
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  }}>
    {t('onboarding.personalizeExperience')}
  </Text>

  <TextInput
    style={{
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.backgroundCard,
    }}
    placeholder={t('onboarding.namePlaceholder')}
    value={displayName}
    onChangeText={setDisplayName}
  />
</View>

// Step 2: Motivation wählen
<View>
  <Text style={{
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  }}>
    {t('onboarding.whyDoYouWantToQuit')}
  </Text>
  <Text style={{
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  }}>
    {t('onboarding.whyMotivatesYou')}
  </Text>

  {/* Motivation Categories */}
  <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  }}>
    {MOTIVATION_CATEGORIES.map((category) => (
      <TouchableOpacity
        key={category}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: motivationCategory === category 
            ? colors.primary 
            : colors.border,
          backgroundColor: motivationCategory === category 
            ? colors.primary + '20'  // 20% Opacity
            : colors.backgroundCard,
        }}
        onPress={() => setMotivationCategory(category)}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: motivationCategory === category 
            ? colors.primary 
            : colors.text,
        }}>
          {t(`onboarding.motivationCategories.${category}`)}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Motivation Text */}
  <Text style={{
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
  }}>
    {t('onboarding.describeYourWhy')}
  </Text>
  <TextInput
    style={{
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.backgroundCard,
      minHeight: 100,
      textAlignVertical: 'top',
    }}
    placeholder={t('onboarding.motivationPlaceholder')}
    value={motivationText}
    onChangeText={setMotivationText}
    multiline
    numberOfLines={4}
  />
</View>
```

### Step 3: Rauchverhalten
```typescript
// Step 3: Rauchverhalten eingeben
<View>
  <Text style={{
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  }}>
    {t('onboarding.yourCurrentSmoking')}
  </Text>

  {/* Aktuelle tägliche Menge */}
  <View style={{ marginBottom: 20 }}>
    <Text style={{
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    }}>
      {t('onboarding.currentDailyAmount')}
    </Text>
    <TextInput
      style={{
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.backgroundCard,
      }}
      placeholder={t('onboarding.currentAmountPlaceholder')}
      value={currentAmount}
      onChangeText={setCurrentAmount}
      keyboardType="numeric"
    />
  </View>

  {/* Packungspreis */}
  <View style={{ marginBottom: 20 }}>
    <Text style={{
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    }}>
      {t('onboarding.packCost')}
    </Text>
    <TextInput
      style={{
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.backgroundCard,
      }}
      placeholder={t('onboarding.packCostPlaceholder')}
      value={packCost}
      onChangeText={setPackCost}
      keyboardType="decimal-pad"
    />
  </View>

  {/* Zigaretten pro Packung */}
  <View style={{ marginBottom: 20 }}>
    <Text style={{
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    }}>
      {t('onboarding.cigarettesPerPack')}
    </Text>
    <TextInput
      style={{
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.backgroundCard,
      }}
      placeholder="20"
      value={cigarettesPerPack}
      onChangeText={setCigarettesPerPack}
      keyboardType="numeric"
    />
  </View>
</View>
```

### Step 4: Aufhörtag
```typescript
// Step 4: Aufhörtag wählen
<View>
  <Text style={{
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  }}>
    {t('onboarding.yourQuitDate')}
  </Text>
  <Text style={{
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  }}>
    {t('onboarding.chooseWhenSmokeFree')}
  </Text>

  {/* Date Picker Button */}
  <TouchableOpacity
    style={{
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      backgroundColor: colors.backgroundCard,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    }}
    onPress={openDatePicker}
  >
    <Text style={{ fontSize: 20 }}>📅</Text>
    <Text style={{
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    }}>
      {quitDate || t('onboarding.selectYourQuitDate')}
    </Text>
  </TouchableOpacity>

  {/* Info Box */}
  <View style={{
    marginTop: 24,
    padding: 20,
    backgroundColor: colors.backgroundNested,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  }}>
    <Text style={{
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
    }}>
      {t('onboarding.whyFourToEightWeeks')}
    </Text>
    <Text style={{
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 8,
    }}>
      • {t('onboarding.timeToBuildHabits')}
    </Text>
    <Text style={{
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 8,
    }}>
      • {t('onboarding.gradualSustainableReduction')}
    </Text>
    {/* Weitere Punkte... */}
  </View>
</View>
```

### Step 5: Tagesroutine
```typescript
// Step 5: Tagesroutine (Wake Time & Bedtime)
<View>
  <Text style={{
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  }}>
    {t('onboarding.dailyRoutine')}
  </Text>
  <Text style={{
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  }}>
    {t('onboarding.wakeBedtimeDescription')}
  </Text>

  {/* Wake Time */}
  <View style={{ marginBottom: 20 }}>
    <Text style={{
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    }}>
      {t('onboarding.wakeTime')}
    </Text>
    <TouchableOpacity
      style={{
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        backgroundColor: colors.backgroundCard,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
      onPress={() => setShowWakeTimePicker(true)}
    >
      <Text style={{ fontSize: 20 }}>🕐</Text>
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
      }}>
        {wakeTime}
      </Text>
    </TouchableOpacity>
  </View>

  {/* Bedtime */}
  <View style={{ marginBottom: 20 }}>
    <Text style={{
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    }}>
      {t('onboarding.bedtime')}
    </Text>
    <TouchableOpacity
      style={{
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        backgroundColor: colors.backgroundCard,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
      onPress={() => setShowBedtimePicker(true)}
    >
      <Text style={{ fontSize: 20 }}>🕐</Text>
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
      }}>
        {bedtime}
      </Text>
    </TouchableOpacity>
  </View>

  {/* Info Box */}
  <View style={{
    marginTop: 24,
    padding: 20,
    backgroundColor: colors.backgroundNested,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  }}>
    <Text style={{
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    }}>
      {t('onboarding.customDayBoundaryDescription')}
    </Text>
  </View>
</View>
```

### Navigation Buttons
```typescript
{/* Navigation Footer */}
<View style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 24,
  paddingVertical: 20,
  borderTopWidth: 1,
  borderTopColor: colors.border,
}}>
  {/* Back Button */}
  {step > 1 && (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: colors.backgroundCard,
      }}
      onPress={() => setStep(step - 1)}
    >
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
      }}>
        {t('common.back')}
      </Text>
    </TouchableOpacity>
  )}

  {/* Next / Start Button */}
  <TouchableOpacity
    onPress={step === 5 ? handleCompleteSetup : handleNext}
    style={{ flex: step === 1 ? 1 : undefined }}
  >
    <LinearGradient
      colors={Gradients.brand.colors}
      start={Gradients.brand.start}
      end={Gradients.brand.end}
      style={{
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#20C997',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text style={{
        color: colors.textInverse,
        fontSize: 18,
        fontWeight: '700',
      }}>
        {step === 5 ? t('onboarding.startJourneyButton') : t('common.next')}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
</View>
```

---

# 6. NAVIGATION & LAYOUT

## 6.1 Tab Navigation Layout (app/(tabs)/_layout.tsx)

```typescript
// app/(tabs)/_layout.tsx

<Tabs
  screenOptions={{
    tabBarActiveTintColor: colors.primary,        // #20C997
    tabBarInactiveTintColor: colors.textTertiary, // #6B6B6B
    tabBarStyle: {
      backgroundColor: colors.backgroundTabBar,    // #1A1A1A
      height: 60,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingBottom: 8,
      paddingTop: 8,
    },
    headerShown: true,
    headerTransparent: false,
    headerStyle: {
      backgroundColor: colors.backgroundCard,      // #242424
      height: 56,
    },
    headerLeft: () => <MyQuitlyLogo />,           // Logo-Komponente
    headerTitle: () => <HeaderTitle />,            // "My Quitly"
    headerRight: () => <ProfileButton />,          // 👤 Profil-Button
  }}
>
  <Tabs.Screen
    name="index"
    options={{
      title: t('home.title'),
      tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>
    }}
  />
  <Tabs.Screen
    name="log"
    options={{
      title: t('log.title'),
      tabBarIcon: () => <Text style={{ fontSize: 20 }}>➕</Text>
    }}
  />
  <Tabs.Screen
    name="stats"
    options={{
      title: t('stats.title'),
      tabBarIcon: () => <Text style={{ fontSize: 20 }}>📊</Text>
    }}
  />
  <Tabs.Screen
    name="profile"
    options={{
      title: t('profile.title'),
      href: null,  // Nicht in Tab Bar sichtbar
    }}
  />
</Tabs>
```

### Header Logo
```typescript
function MyQuitlyLogo() {
  return (
    <View style={{
      marginLeft: 16,
      padding: 4,
    }}>
      <Image 
        source={require('../../assets/images/myquitly-icon-1024x1024_new.png')}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
```

### Header Title
```typescript
function HeaderTitle() {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: '600',
        color: '#14B8A6',  // Teal (könnte auch colors.primary sein)
      }}>
        My Quitly
      </Text>
    </View>
  );
}
```

---

# 7. MODALS

## 7.1 Modal-Styling (Standard)

```typescript
// Standard Modal Overlay & Content
<Modal
  visible={visible}
  animationType="slide"
  transparent
  onRequestClose={onClose}
>
  <View style={{
    flex: 1,
    backgroundColor: colors.overlay,  // rgba(0, 0, 0, 0.6)
    justifyContent: 'flex-end',
  }}>
    <View style={{
      backgroundColor: colors.backgroundElevated,  // #2D2D2D
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      padding: 24,
      maxHeight: '90%',
      paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    }}>
      {/* Modal Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: colors.text,
        }}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={onClose}
          style={{
            padding: 8,
            minWidth: 44,
            minHeight: 44,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{
            fontSize: 28,
            color: colors.textSecondary,
            fontWeight: '300',
          }}>
            ✕
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Content hier */}
      </ScrollView>

      {/* Modal Footer Buttons */}
      <View style={{
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 18,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: colors.border,
            backgroundColor: colors.backgroundCard,
            alignItems: 'center',
          }}
          onPress={onCancel}
        >
          <Text style={{
            fontSize: 16,
            fontWeight: '700',
            color: colors.text,
          }}>
            {t('common.cancel')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onConfirm}>
          <LinearGradient
            colors={Gradients.brand.colors}
            start={Gradients.brand.start}
            end={Gradients.brand.end}
            style={{
              flex: 1,
              padding: 18,
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 56,
            }}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.textInverse,
            }}>
              {t('common.confirm')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
```

---

# 8. STYLE-KONSTANTEN (ZUSAMMENFASSUNG)

## 8.1 Abstände
```typescript
const spacing = {
  xs: 4,      // Tight spacing
  sm: 8,      // Small spacing
  md: 12,     // Medium spacing
  lg: 16,     // Large spacing
  xl: 20,     // Extra large (screen padding)
  '2xl': 24,  // Card padding
  '3xl': 32,  // Section spacing
  '4xl': 40,  // Large section spacing
  '5xl': 48,  // Extra large spacing
};

// Layout Constants
const layout = {
  screenPadding: 20,        // Horizontal screen padding
  cardPadding: 24,          // Card padding
  buttonPaddingVertical: 16,
  buttonPaddingHorizontal: 24,
  inputPadding: 16,
  minTouchTarget: 44,       // Minimum touch target size
  tabBarHeight: 60,
  headerHeight: 56,
};
```

## 8.2 Border Radius
```typescript
const borderRadius = {
  none: 0,
  small: 8,        // Small elements, mini badges
  medium: 12,      // Inputs, buttons, small cards
  large: 16,       // Standard cards
  xlarge: 20,      // Hero cards, large cards
  '2xlarge': 24,   // Modals (top corners only)
  full: 999,       // Pills, badges, avatars
};
```

## 8.3 Schatten
```typescript
const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  // Brand Glows
  tealGlow: {
    shadowColor: '#20C997',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  orangeGlow: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
};
```

## 8.4 Typografie
```typescript
const typography = {
  displayLarge: {
    fontSize: 72,
    lineHeight: 72,
    fontWeight: '700',
    letterSpacing: -1,
  },
  display: {
    fontSize: 48,
    lineHeight: 53,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  heading1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: 0,
  },
  heading2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: 0,
  },
  heading3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
    letterSpacing: 0,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0,
  },
  tiny: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '400',
    letterSpacing: 0,
  },
};
```

---

# 9. WICHTIGE HINWEISE FÜR FIGMA MAKE

## 9.1 Dark Mode First
- **Alle Screens nutzen Dark Mode als Standard**
- Hintergrund: #0F0F0F (nicht #000000)
- Karten: #242424
- Text: #FFFFFF (Primary), #A0A0A0 (Secondary)

## 9.2 Gradient-Verwendung
- **Primäre Buttons**: Immer Gradient (Teal → Cyan, 135deg)
- **Fortschrittsbalken**: Gradient horizontal (Teal → Cyan, 90deg)
- **Hero-Karten**: Subtle Gradient-Hintergrund (8% Opacity)

## 9.3 Native Platform-Spezifika
- **iOS**: SF Pro Schrift, native Date/Time Picker, Sheet-Modals
- **Android**: Roboto Schrift, Material Design Picker, Bottom Navigation

## 9.4 Touch-Targets
- **Minimum**: 44px × 44px
- **Buttons**: 48px Höhe (groß)
- **Tab Bar**: 60px Höhe

## 9.5 Komponenten-Hierarchie
1. **Screen** → Background #0F0F0F
2. **Card** → Background #242424, Padding 24px, Border Radius 16-20px
3. **Input** → Background #2A2A2A, Border 2px #3A3A3A, Focus: #20C997
4. **Button** → Gradient für Primary, Outline für Secondary

---

# 10. ZUSAMMENFASSUNG: WICHTIGSTE CODE-PATTERNS

## 10.1 Button Pattern
```typescript
// Primary Button (Gradient)
<TouchableOpacity>
  <LinearGradient
    colors={['#20C997', '#06B6D4']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      minHeight: 48,
      shadowColor: '#20C997',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 4,
    }}
  >
    <Text style={{
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    }}>
      Button Text
    </Text>
  </LinearGradient>
</TouchableOpacity>
```

## 10.2 Card Pattern
```typescript
<View style={{
  backgroundColor: '#242424',
  borderRadius: 16,
  padding: 24,
  marginHorizontal: 16,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 3,
}}>
  {/* Card Content */}
</View>
```

## 10.3 Input Pattern
```typescript
<View>
  <Text style={{
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0A0',
    marginBottom: 8,
    marginLeft: 4,
  }}>
    Label
  </Text>
  <TextInput
    style={{
      borderWidth: 2,
      borderColor: '#3A3A3A',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: '#FFFFFF',
      backgroundColor: '#2A2A2A',
      minHeight: 56,
    }}
    placeholder="Placeholder"
    placeholderTextColor="#6B6B6B"
  />
</View>
```

## 10.4 Progress Bar Pattern
```typescript
<View style={{
  width: '100%',
  height: 12,
  backgroundColor: '#3A3A3A',
  borderRadius: 6,
  overflow: 'hidden',
}}>
  <LinearGradient
    colors={['#20C997', '#06B6D4']}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
    style={{
      width: `${progress}%`,
      height: '100%',
      borderRadius: 6,
    }}
  />
</View>
```

---

**ENDE DER CODE-DOKUMENTATION**

Diese Dokumentation enthält alle relevanten Code-Patterns und -Strukturen für die 1:1 Visualisierung in Figma Make.

**Version:** 1.0  
**Zuletzt aktualisiert:** 2025

