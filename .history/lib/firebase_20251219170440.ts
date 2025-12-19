// Deprecated: Firebase has been replaced with Supabase + Prisma.
// This file remains to avoid breaking accidental imports. Do not add new usage.
// Export lightweight placeholders so imports won't throw during build.
export const db = null as any;
export const storage = null as any;
export const firebaseDeprecated = true;

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
	// Log a friendly warning in development when the deprecated file is imported.
	// Avoid throwing so build-time imports (type generation, etc.) do not fail.
	// Consumers should switch to `@/lib/supabase` + `@/lib/prisma`.
	// eslint-disable-next-line no-console
	console.warn("lib/firebase.ts is deprecated. Use lib/supabase.ts and lib/prisma.ts instead.");
}
