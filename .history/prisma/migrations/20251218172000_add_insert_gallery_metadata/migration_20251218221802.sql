-- Migration: add SECURITY DEFINER function to insert gallery metadata
-- Creates a server-side insert function which can bypass RLS when
-- executed. Adjust ownership and grants to match your production DB roles.

CREATE OR REPLACE FUNCTION public.insert_gallery_metadata(
  p_title text,
  p_subtitle text,
  p_imageUrl text,
  p_storagePath text
)
RETURNS TABLE(id text, imageUrl text)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public."Gallery" (title, subtitle, "imageUrl", "storagePath")
  VALUES (p_title, p_subtitle, p_imageUrl, p_storagePath)
  RETURNING id::text, "imageUrl";
END;
$$;

-- Grant execute to the DB role used by your application (adjust as needed).
-- For a quick setup you can GRANT to PUBLIC, but it's better to grant to the
-- specific role in production, e.g.:
--   GRANT EXECUTE ON FUNCTION public.insert_gallery_metadata(text,text,text,text) TO your_db_role;

GRANT EXECUTE ON FUNCTION public.insert_gallery_metadata(text,text,text,text) TO PUBLIC;

-- IMPORTANT: After applying this migration, consider changing the function
-- owner to a privileged role (e.g. the DB owner) so the SECURITY DEFINER
-- executes with the intended privileges:
--   ALTER FUNCTION public.insert_gallery_metadata(text,text,text,text) OWNER TO postgres;
