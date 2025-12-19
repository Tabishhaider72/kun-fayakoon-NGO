# Firebase Gallery Upload - Troubleshooting Guide

## CORS Error Solutions

### Error: "Access to XMLHttpRequest has been blocked by CORS policy"

**Root Cause:** Firebase Storage has strict CORS policies. Client-side uploads need proper configuration.

**Solution We Implemented:** Server-side API route that bypasses CORS entirely.

### Quick Fix Checklist

✅ **Using the new API route:**
- Upload endpoint: `/api/upload-gallery`
- Method: `POST`
- Type: `FormData` with file, title, subtitle
- No CORS configuration needed!

### Common Issues & Fixes

#### 1. Upload Still Failing with CORS Error
**Fix:**
```
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check .env.local has all Firebase credentials
- Verify API route exists at /app/api/upload-gallery/route.ts
```

#### 2. Upload Hangs or Times Out
**Fix:**
```
- Check file size (must be < 500 KB)
- Verify internet connection
- Check Firebase project is active in console.firebase.google.com
- Check storage bucket permissions in Firebase
```

#### 3. "Admin access required" Error
**Fix:**
```
- Verify admin password: default is "admin123"
- If custom, check .env.local for NEXT_PUBLIC_ADMIN_PASSWORD
- Make sure you're logged in before uploading
```

#### 4. File Uploaded But Not Appearing in Gallery
**Fix:**
```
- Check Firestore: go to console.firebase.google.com
- Look in "gallery" collection for the document
- If missing, metadata wasn't saved (check API response)
- Check browser console for error messages
```

## Setup Instructions

### 1. Environment Variables
Create `.env.local` in project root:

```env
# Firebase Config (REQUIRED)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin Configuration
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
ADMIN_SECRET_KEY=your_admin_secret_key
```

### 2. Firebase Security Rules

Set these in Firebase Console → Storage → Rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow server to upload
    match /gallery/{allPaths=**} {
      allow read: if request.auth != null || resource.metadata.public == true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    // Public access for viewing
    match /gallery/{fileName} {
      allow get: if true;
      allow list: if true;
    }
  }
}
```

### 3. Firestore Security Rules

Set in Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /gallery/{document=**} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.token.admin == true;
      allow update: if request.auth != null && request.auth.token.admin == true;
      allow delete: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Testing the Upload

1. **Access Admin Page:**
   ```
   http://localhost:3000/admin/gallery
   ```

2. **Login:**
   - Password: `admin123` (or your custom password)

3. **Upload Image:**
   - Enter title and subtitle
   - Select image (JPEG, PNG, WebP, GIF)
   - Max size: 500 KB
   - Image dimensions: 400-4000px

4. **View in Gallery:**
   ```
   http://localhost:3000/gallery
   ```

## Network Debugging

### Check API Route in Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Upload an image
4. Look for request to `/api/upload-gallery`
5. Check Response tab for errors

### Check Firestore

1. Go to `console.firebase.google.com`
2. Select your project
3. Open Firestore Database
4. Look for "gallery" collection
5. Should contain documents with: title, subtitle, imageUrl, storagePath, createdAt

### Check Storage

1. Go to `console.firebase.google.com`
2. Select your project
3. Open Storage
4. Look for `/gallery/{timestamp}_{filename}` files

## Still Having Issues?

1. **Check console errors:**
   - Browser: F12 → Console tab
   - Server: Terminal where `pnpm dev` is running

2. **Enable debug logging:**
   ```typescript
   // Add to lib/firebase.ts
   import { enableLogging } from "firebase/firestore";
   enableLogging(true);
   ```

3. **Common Firebase issues:**
   - Credentials wrong: File won't exist on upload
   - Storage bucket misconfigured: Storage reference fails
   - Firestore rules blocking: Metadata won't save

## Production Deployment

When deploying to Vercel/production:

1. Add environment variables to deployment platform
2. Storage automatically handles CORS on same domain
3. No additional configuration needed
4. Update admin password for security

## Contact Support

If issues persist:
1. Check Firebase status: `status.firebase.google.com`
2. Review your Firebase project's usage metrics
3. Verify billing is active (free tier available)
