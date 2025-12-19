# Firebase Gallery - Architecture & Flow Diagrams

## Upload Flow (No CORS Issues!)

```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Admin Page: /admin/gallery                               │  │
│  │  - Enter title & subtitle                                 │  │
│  │  - Select image file                                      │  │
│  │  - See progress bar (0-100%)                              │  │
│  └───────────────┬─────────────────────────────────────────┘  │
└──────────────────┼──────────────────────────────────────────────┘
                   │ FormData (multipart)
                   │ - file
                   │ - title
                   │ - subtitle
                   ↓
┌─────────────────────────────────────────────────────────────────┐
│                NEXT.JS SERVER (Same Origin)                     │
│                    ❌ NO CORS HERE! ✅                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  API Route: POST /api/upload-gallery                      │  │
│  │  1. Receive FormData                                      │  │
│  │  2. Validate file (type, size, dimensions)                │  │
│  │  3. Convert to buffer                                     │  │
│  │  4. Upload to Firebase Storage                            │  │
│  │  5. Get download URL                                      │  │
│  │  6. Save metadata to Firestore (via server action)        │  │
│  │  7. Return success response                               │  │
│  └───────────────┬─────────────────────────────────────────┘  │
└──────────────────┼──────────────────────────────────────────────┘
                   │ Server-to-Firebase (No CORS)
         ┌─────────┴─────────┐
         ↓                   ↓
    ┌─────────────┐    ┌──────────────┐
    │   Storage   │    │  Firestore   │
    │    /gallery │    │  /gallery    │
    │  /timestamp │    │  collection  │
    │  _filename  │    │              │
    └─────────────┘    └──────────────┘

Success Response ← JSON {id, imageUrl}
         ↓
   Update UI
   Show success message
   List updates with new image
```

## Data Flow Architecture

```
                     USER ACTIONS
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
    Upload          View Gallery       Delete
    (Admin)         (Public)           (Admin)
        │                ↓                │
        ↓                │                ↓
   /admin/gallery   /gallery         (same page)
   (Protected)      (Public)         (Protected)
        │                │                │
        ↓                ↓                ↓
    API Route       Server Action    Server Action
    /api/           getGalleryImages deleteGalleryImage
    upload-gallery  (Read only)      (Auth protected)
        │                ↓                │
        │          Firestore Query       │
        │          order by createdAt    │
        │          descending            │
        │                ↓                ↓
        └────────────────┴────────────────┘
                        │
                   Firebase
                        │
         ┌──────────────┼──────────────┐
         ↓              ↓              ↓
     Storage       Firestore       Rules
     (Images)    (Metadata)      (Security)
```

## Component Hierarchy

```
App
│
├── Navbar
│   ├── Links
│   │   ├── /
│   │   ├── /#about-section
│   │   ├── /donate
│   │   ├── /#campaigns-section
│   │   ├── /#blog-section
│   │   └── /gallery ← NEW
│   │
│   └── Mobile Menu
│       └── Same links
│
├── /gallery (Page)
│   └── GalleryDynamic (Component)
│       ├── useEffect → getGalleryImages()
│       ├── Gallery Items Grid
│       ├── Delete Handler → deleteGalleryImageServer()
│       └── Optimistic Delete UI
│
└── /admin/gallery (Page)
    ├── Login Form
    │   └── Verify Password
    └── Upload Form (After Auth)
        ├── Title Input
        ├── Subtitle Input
        ├── File Input
        │   └── POST /api/upload-gallery
        ├── Progress Bar
        ├── Error Display
        └── Success Message
```

## Firestore Data Model

```
DATABASE: Firestore
│
└── Collection: gallery
    │
    ├── Document: auto-generated-id
    │   ├── title: string
    │   │   └── "Winter Relief Drive"
    │   ├── subtitle: string
    │   │   └── "Blankets for families on streets"
    │   ├── imageUrl: string
    │   │   └── "https://firebasestorage.googleapis.com/..."
    │   ├── storagePath: string
    │   │   └── "gallery/1702874741000_image.jpg"
    │   └── createdAt: Timestamp (server)
    │       └── 2025-12-17 17:45:41
    │
    ├── Document: another-id
    │   ├── title: "Warmth for Elders"
    │   └── ...
    │
    └── Document: ...
```

## Storage Structure

```
BUCKET: gs://kun-fayakoon.appspot.com
│
└── folder: gallery/
    ├── 1702874741000_winter-relief.jpg
    ├── 1702874742000_elders-support.jpg
    ├── 1702874743000_village-camp.jpg
    └── ...
```

## Authentication & Authorization Flow

```
┌──────────────────────────────┐
│   Admin Access Request       │
│   http://localhost:3000      │
│   /admin/gallery             │
└─────────────┬────────────────┘
              │
              ↓
      ┌───────────────┐
      │  Login Form   │
      │  Enter Pass   │
      └───────┬───────┘
              │
              ↓
      ┌──────────────────┐
      │ Verify Password  │ ← Matches NEXT_PUBLIC_ADMIN_PASSWORD
      │ (Client-side)    │
      └─────────┬────────┘
                │
        ┌───────┴────────┐
        │                │
      YES              NO
        │                │
        ↓                ↓
    Access         "Invalid
    Granted        Password"
        │                │
        ↓                ↓
    Upload        Deny Access
    Form          (Show Error)

On Upload:
    │
    ↓
FormData → /api/upload-gallery (Server)
    │
    ↓
Server verifies ADMIN_SECRET_KEY in .env
    │
    ✓ Allowed / ✗ Rejected
```

## Error Handling Flow

```
File Selected
    │
    ↓ ┌──────────────────────┐
  ─────│ Validate            │
    │ ├─ Type check         │
    │ ├─ Size check         │
    │ ├─ Dimensions check   │
    │ └─ Title check        │
    │ └──────────────────────┘
    │         │
    ├─────────┴─────────┐
    │                   │
   FAIL               PASS
    │                   │
    ↓                   ↓
Show Error         Upload Start
Message               │
    │                 ↓
    │            Progress Bar
    │                 │
    │                 ↓
    │         Upload in progress
    │                 │
    │                 ↓
    │         ┌───────────────────┐
    │         │ Success/Error?    │
    │         └─────────┬─────────┘
    │                   │
    │           ┌───────┴────────┐
    │           │                │
    │        SUCCESS            ERROR
    │           │                │
    │           ↓                ↓
    │       Show Success     Show Error
    │       Update Gallery   Clear Form
    │           │            Restore UI
    │           │
    └───────────┴────────────→ User sees result
```

## CORS Problem & Solution

### OLD WAY (CORS Problem ❌)
```
Browser makes direct request to Firebase Storage
    ↓
Browser → Firebase Storage POST request
    ↓
Firebase checks CORS headers
    ↓
CORS not configured OR mismatch
    ↓
Browser blocks request ❌
    ↓
"Access-Control-Allow-Origin header missing"
```

### NEW WAY (No CORS ✅)
```
Browser makes request to own server (same origin)
    ↓
Browser → Your Next.js Server POST /api/upload-gallery
    ↓
✓ Same origin (localhost:3000 to localhost:3000)
✓ No CORS check needed!
    ↓
Server processes request
    ↓
Server → Firebase Storage (server-to-server, no CORS)
    ↓
✓ Server-to-server communication has no CORS restrictions
✓ Upload succeeds!
    ↓
Server → Browser with success response
    ↓
UI updates with new image
```

## Performance Optimization

```
User Upload
    │
    ├─→ Client validates (fast)
    │   ├─ File type check (instant)
    │   ├─ File size check (instant)
    │   └─ Dimensions check (< 1s)
    │
    ├─→ Upload starts
    │   ├─ Progress updates (real-time)
    │   └─ Max 500 KB (< 2s on 2 Mbps)
    │
    ├─→ Server validates (< 100ms)
    │   ├─ Type re-check
    │   ├─ Size re-check
    │   └─ Dimensions re-check
    │
    ├─→ Firebase Storage upload (< 2s)
    │   └─ Get download URL (< 1s)
    │
    └─→ Firestore save (< 500ms)
        └─ Server timestamp
```

---

**Key Insight:** The API route is the "magic" that makes everything work seamlessly! 🎉
