import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, image } = body;

    // Validate that at least one field is being updated
    if (!name && image === undefined) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    // Build update object dynamically
    const updateData: { name?: string; image?: string | null } = {};
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
