# App Store URLs Setup Guide

## 📱 Current Status
The app store buttons are currently set to placeholder URLs. You need to replace them with your actual app store URLs.

## 🔧 How to Update App Store URLs

### 1. Open the JavaScript file
Open `script.js` and find this section around line 93-96:

```javascript
const appStoreLinks = {
    ios: 'https://apps.apple.com/app/exaura/id123456789', // Replace with your actual iOS App Store URL
    android: 'https://play.google.com/store/apps/details?id=com.exaura.quitsmokingapp' // Replace with your actual Google Play URL
};
```

### 2. Replace with Your Actual URLs

#### For iOS App Store:
Replace the iOS URL with your actual App Store URL:
```javascript
ios: 'https://apps.apple.com/app/exaura/id[YOUR_APP_ID]'
```

#### For Google Play Store:
Replace the Android URL with your actual Google Play URL:
```javascript
android: 'https://play.google.com/store/apps/details?id=com.exaura.quitsmokingapp'
```

## 📋 How to Get Your App Store URLs

### iOS App Store:
1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select your Exaura app
3. Go to "App Information" 
4. Copy the App Store URL

### Google Play Store:
1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your Exaura app
3. Go to "Store presence" > "Main store listing"
4. Copy the Play Store URL

## 🎯 Example with Real URLs

Once you have your actual URLs, update the JavaScript like this:

```javascript
const appStoreLinks = {
    ios: 'https://apps.apple.com/app/exaura/id1234567890', // Your real iOS URL
    android: 'https://play.google.com/store/apps/details?id=com.exaura.quitsmokingapp' // Your real Android URL
};
```

## ✅ Testing

After updating the URLs:
1. Save the `script.js` file
2. Refresh your website
3. Click the app store buttons
4. They should now open the correct app stores

## 🚨 Current Behavior

Right now, both buttons might be directing to Google Play because:
- The placeholder iOS URL might not be valid
- The buttons might not be correctly identifying which store to open

## 🔍 Debug Information

Open your browser's Developer Tools (F12) and check the Console when you click the app store buttons. You should see messages like:
- "App store button clicked, store: ios"
- "Opening ios app store: [URL]"

This will help you verify that the correct URLs are being used.

## 📞 Need Help?

If you need help getting your app store URLs or updating the code, let me know!
