import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CheckOutPage = async () => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }

    const user = await db.stripeCustomer.findUnique({
        where: {
            userId
        },
    });


    return (
        <div>
            user status: {user?.status}
            user sub:{user?.subscription}
        </div>
    );
}

export default CheckOutPage;