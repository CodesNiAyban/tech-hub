import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CheckOutPage = () => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }
    return (
        <div>
            Purhcase Successful!
        </div>
    );
}

export default CheckOutPage;