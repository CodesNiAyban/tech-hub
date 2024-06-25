import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deleted = await clerkClient.users.deleteUser(userId);

        return NextResponse.json({ deleted });
    } catch (error) {
        console.log("[USER_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
