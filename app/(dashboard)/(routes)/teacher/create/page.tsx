"use client"

import { CreateCourse } from "@/app/(dashboard)/_components/create-course";

const CreatePage = () => {

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify center h-full p-6">
            <CreateCourse />
        </div>
    );
}

export default CreatePage;
