import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Clock, PlayCircle, Swords } from "lucide-react";

export const TakeAQuizCard = () => {
    return (
        <Card className="mb-6 hover:cursor-pointer hover:opacity-75">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-2xl font-bold">
                    Quiz Me!
                </CardTitle>
                <Swords className="h-8 w-8 text-primary"/>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Challenge yourself with AI generated quiz.
                </p>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary"/>
                        <p className="text-sm">
                            Timed quizzes to improve your speed.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary"/>
                        <p className="text-sm">
                            Earn badges and rewards as you progress.
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                    <PlayCircle className="h-5 w-5 text-primary mr-2"/>
                    <p className="text-sm font-medium text-primary">
                        Start Quiz
                    </p>
            </CardFooter>
        </Card>
    );
}

export default TakeAQuizCard;
