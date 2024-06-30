import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ChapterQuizPage = () => {
    const { userId } = auth();
    
    if (!userId) {
        return redirect("/sign-in");
    }

    return (
        <div>
            Chapter Quiz Page
        </div>
    );
}

export default ChapterQuizPage;