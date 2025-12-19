import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const records = await prisma.gallery.findMany({ orderBy: { createdAt: "desc" } });
    const items = records.map((r) => ({ id: r.id, title: r.title, subtitle: r.subtitle, image: r.imageUrl }));
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching gallery from DB:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
