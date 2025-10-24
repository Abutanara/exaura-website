# App Store Setup Instructions

## 📱 App Store URLs

To complete your Exaura website setup, you need to update the app store URLs in the JavaScript file:

### File to Update: `script.js`

Find this section around line 93-96:

```javascript
const appStoreLinks = {
    ios: 'https://apps.apple.com/app/exaura/id123456789', // Replace with your iOS App Store URL
    android: 'https://play.google.com/store/apps/details?id=com.exaura.quitsmokingapp' // Replace with your Google Play URL
};
```

### How to Get Your App Store URLs:

#### iOS App Store:
1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select your Exaura app
3. Copy the App Store URL from the app details
4. Replace the placeholder URL in the JavaScript file

#### Google Play Store:
1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your Exaura app
3. Copy the Play Store URL from the app details
4. Replace the placeholder URL in the JavaScript file

### Current Package Names:
- **iOS Bundle ID**: `com.exaura.quitsmokingapp`
- **Android Package**: `com.exaura.quitsmokingapp`

### Testing:
- The app store buttons currently show a notification "App store links will be available soon!" when clicked
- Once you update the URLs, the buttons will open the respective app stores in new tabs

### Additional Notes:
- Make sure your apps are published and available in the app stores before updating the URLs
- Test the links on both desktop and mobile devices
- Consider adding analytics tracking for app store clicks (code is already prepared in the JavaScript)

## 🚀 Quick Setup:
1. Get your app store URLs from the respective stores
2. Update the URLs in `script.js` (lines 94-95)
3. Test the download buttons
4. Deploy your website!

Your Exaura quit smoking app website is ready to go! 🚭
