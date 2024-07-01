import { quizCreationSchema } from "@/app/(dashboard)/(routes)/teacher/courses/_components/_utils/form-validation";
import { strict_output } from "@/lib/gpt";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        // const { userId } = auth();

        // if (!userId) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const body = await req.json();
        const { amount, topic, type, level } = quizCreationSchema.parse(body);

        // Define fixed data for testing
        const testOpenEndedQuestions = [
            { question: "What is the impact of climate change?", answer: "Increased global temperatures and extreme weather events" },
            { question: "Describe the water cycle.", answer: "Evaporation, condensation, precipitation, and collection" },
            { question: "Explain photosynthesis.", answer: "Process by which plants make food using sunlight" },
            // Add more test questions as needed
        ];

        const testMCQQuestions = [
            {
                question: "What is the capital of France?",
                answer: "Paris",
                option1: "Paris",
                option2: "London",
                option3: "Berlin",
            },
            {
                question: "Which element has the atomic number 1?",
                answer: "Hydrogen",
                option1: "Hydrogen",
                option2: "Oxygen",
                option3: "Carbon",
            },
            {
                question: "What is the largest planet in our solar system?",
                answer: "Jupiter",
                option1: "Jupiter",
                option2: "Saturn",
                option3: "Neptune",
            },
            // Add more test questions as needed
        ];

        let questions;
        if (type === "open_ended") {
            // Use fixed test data for open-ended questions
            // questions = testOpenEndedQuestions.slice(0, amount);
            // Comment out the actual API call
            questions = await strict_output(
                "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
                new Array(amount).fill(
                    `You are to generate a random ${level} difficulty open-ended/identification questions about ${topic}`
                ),
                {
                    question: "question",
                    answer: "answer with max length of 15 words",
                }
            );
        } else if (type === "mcq") {
            // Use fixed test data for MCQ questions
            // questions = testMCQQuestions.slice(0, amount);
            // Comment out the actual API call

            questions = await strict_output(
                "You are a helpful AI that is able to generate multiple choice questions questions and answers, the length of each answer should not be more than 15 words, options count is 4 with the answer, options must be unique, store all answers and questions and options in a JSON array",
                new Array(amount).fill(
                    `You are to generate a random ${level} difficulty multiple choice questions about ${topic}`
                ),
                {
                    question: "question",
                    answer: "answer with max length of 15 words",
                    option1: "option1 with max length of 15 words",
                    option2: "option2 with max length of 15 words",
                    option3: "option3 with max length of 15 words",
                }
            );


        }

        if (!questions) {
            return NextResponse.json({ error: "No questions found/Invalid generated questions" }, { status: 400 });
        }

        return NextResponse.json(
            {
                questions: questions,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.log("[QUIZ]", error)
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues },
                {
                    status: 400,
                }
            );
        } else {
            return new NextResponse("Internal Error 2", { status: 500 });
        }
    }
}
