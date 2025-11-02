# 🔥 Firebase Database Troubleshooting Guide

## Issue: Database Not Created After Cookie Acceptance

If you're not seeing the database collections created in Firebase after accepting cookies, follow these steps:

### 1. 🧪 Test Firebase Connection

Visit: `https://your-domain.com/firebase-test.html`

This test page will help you diagnose the issue by testing:
- Firebase initialization
- Firestore write permissions
- Session creation
- Cookie consent storage
- Data reading

### 2. ✅ Check Firebase Console Setup

#### Enable Firestore Database:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `e3rbly-io`
3. Navigate to **Firestore Database**
4. If not enabled, click **Create database**
5. Choose **Start in test mode** (for now)
6. Select a location (preferably close to your users)

#### Verify Security Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. 🔍 Debug in Browser Console

Open your website and check the browser console:

1. **Open Developer Tools** (F12)
2. **Go to Console tab**
3. **Accept cookies** on your website
4. **Look for these messages**:
   - ✅ `🚀 Initializing session tracking...`
   - ✅ `✅ Session started successfully with ID: ...`
   - ✅ `🍪 Saving cookie consent: true`
   - ✅ `✅ Cookie consent saved with ID: ...`

### 4. 🛠️ Manual Testing Functions

In the browser console, you can run these commands:

```javascript
// Test Firebase connection
testFirebaseConnection()

// Force create a session
forceCreateSession()

// Check current session info
getSessionInfo()

// Show session dashboard
showSessionDashboard()
```

### 5. 🚨 Common Issues & Solutions

#### Issue: "Permission denied" error
**Solution**: Update Firestore security rules to allow writes:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

#### Issue: "Firestore not enabled"
**Solution**: 
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Click "Create database"
4. Choose "Start in test mode"

#### Issue: Network errors
**Solution**: 
1. Check if your domain is added to Firebase authorized domains
2. Verify Firebase configuration keys are correct
3. Ensure no ad blockers are blocking Firebase requests

#### Issue: CORS errors
**Solution**: 
1. Add your domain to Firebase authorized domains
2. Check if you're testing on `localhost` or a proper domain

### 6. 📊 Expected Database Structure

After successful setup, you should see these collections in Firestore:

#### `sessions` collection:
```javascript
{
  sessionId: "session_1699123456789_abc123def",
  startTime: Timestamp,
  device: { browserName, osName, screenResolution, ... },
  location: { city, country, ip, ... },
  interactions: { clicks, scrollDepth, downloads, ... },
  isActive: true,
  ...
}
```

#### `cookies` collection:
```javascript
{
  consent: true,
  timestamp: Timestamp,
  userAgent: "Mozilla/5.0...",
  sessionId: "session_1699123456789_abc123def",
  ...
}
```

### 7. 🔧 Firebase Project Settings

Verify these settings in Firebase Console:

1. **Project Settings > General**:
   - Project ID: `e3rbly-io`
   - Web API Key: `AIzaSyC7b_GlGfVTgpCHlB8lb8Gn89C3syNvJU0`

2. **Project Settings > Service Accounts**:
   - Ensure service account is active

3. **Authentication > Settings > Authorized Domains**:
   - Add your domain (e.g., `e3rbly-io.web.app`)
   - Add `localhost` for testing

### 8. 🧪 Step-by-Step Testing

1. **Open your website**
2. **Open browser console** (F12)
3. **Accept cookies** when prompted
4. **Check console for success messages**
5. **Go to Firebase Console > Firestore**
6. **Look for `sessions` and `cookies` collections**
7. **Verify documents are being created**

### 9. 🆘 If Still Not Working

If the database is still not being created:

1. **Check Firebase billing**: Ensure you're on the correct plan
2. **Verify project ownership**: Make sure you have admin access
3. **Test with a simple document**:
   ```javascript
   // Run this in console
   testFirebaseConnection()
   ```
4. **Check browser network tab** for failed requests
5. **Try incognito mode** to rule out browser extensions

### 10. 📞 Getting Help

If you're still having issues:

1. **Check Firebase Console logs**
2. **Review browser console errors**
3. **Test with the provided `firebase-test.html` page**
4. **Verify all Firebase services are enabled**

---

## Quick Fix Commands

Run these in your browser console for quick testing:

```javascript
// Test basic connection
testFirebaseConnection()

// Create test document
forceCreateSession()

// Check session status
getSessionInfo()

// View detailed session info
showSessionDashboard()
```

The database should be created automatically once these functions run successfully!