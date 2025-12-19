# Supabase + Prisma Gallery Setup - Complete Guide

## What's Been Implemented

✅ Server-side upload API (bypasses CORS completely)
✅ Admin authentication page
✅ Image validation (type, size, dimensions)
✅ Upload progress tracking
✅ Optimistic delete
✅ Supabase Storage for files
✅ Prisma + Postgres for metadata
✅ Error handling and recovery

## File Structure

```
app/
├── admin/gallery/page.tsx          ← Admin upload interface
├── api/upload-gallery/route.ts     ← Server-side upload handler
└── gallery/page.tsx                ← Public gallery view

components/
├── GalleryDynamic.tsx              ← Gallery display component
└── Navbar.tsx                      ← Navigation (with gallery link)

lib/
├── supabase.ts                    ← Supabase client wrapper
├── prisma.ts                      ← Prisma client wrapper
├── gallery.ts                      ← Client-side gallery logic (calls API)
└── gallery-actions.ts              ← Server actions (auth protected)
```

## Step 1: Verify Environment Variables

Create `.env.local` in project root and set the following values (use your Supabase project values):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
SUPABASE_BUCKET=gallery

# Database (Prisma)
DATABASE_URL=postgresql://user:pass@host:port/dbname

# Admin Settings
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
ADMIN_SECRET_KEY=your_secret_key
```

## Step 2: Install & Generate Prisma Client

Install packages and generate Prisma client:

```powershell
pnpm install
pnpm prisma generate
```

Then create and apply migrations (or use Supabase SQL to create tables):

```powershell
pnpm prisma migrate dev --name init
```

## Step 3: Restart Development Server

```powershell
pnpm dev
```

## Step 4: Test the Upload Flow

### Access Admin Panel
```
http://localhost:3000/admin/gallery
```

### Login
- Default password: `admin123`

### Upload Test Image
1. Enter title: "Test Image"
2. Enter subtitle: "This is a test"
3. Select any image (JPEG, PNG, WebP, GIF)
4. File size must be < 500 KB
5. Image dimensions: 400-4000px width, 300-4000px height

### Expected Result
- See progress bar (0-100%)
- Green success message
- Image appears in `/gallery` page

## Step 5: Verify Data in Supabase + Postgres (Prisma)

### Check Database (Prisma)
1. Connect to your Postgres database (via psql, pgAdmin, or Supabase SQL editor)
2. Run `SELECT * FROM "Gallery" ORDER BY "createdAt" DESC;` to inspect records

### Check Storage
1. Open your Supabase project → Storage → Buckets → `gallery`
2. Look for files named `{timestamp}_{filename}` under the bucket

## Troubleshooting & Notes

- The implementation uses server-side uploads to avoid CORS issues.
- Ensure `SUPABASE_SERVICE_KEY` is set for server-side uploads; the client uses the public anon key for read-only operations.

## Next Steps

- Secure admin flow with proper auth for production.
- Review Supabase bucket policies and Postgres permissions.
- Run `pnpm prisma migrate deploy` in production when ready.

1. ✅ Run `pnpm dev`
2. ✅ Go to `/admin/gallery`
3. ✅ Upload a test image
4. ✅ Check `/gallery` to see it
5. ✅ Test delete functionality

You're all set! 🎉
