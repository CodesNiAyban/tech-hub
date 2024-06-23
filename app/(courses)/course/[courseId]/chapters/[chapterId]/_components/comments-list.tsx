import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@clerk/nextjs/server";
import { Comments } from "@prisma/client";
import { Heart, MessageCircle } from "lucide-react";

interface CommentSectionProps {
    comments: Comments[];
    users: User[];
}

const CommentList = ({ comments, users }: CommentSectionProps) => {
    return (
        <div className="mt-6 space-y-4 p-4">
            {comments.map((comment) => {
                const user = users.find((u) => u.id === comment.userId);
                return (
                    <Card key={comment.id} className="w-full bg-white shadow-md rounded-lg p-2 border border-gray-200">
                        <CardHeader>
                            <div className="flex items-center">
                                <Avatar className="flex w-8 h-8 mr-3">
                                    <AvatarImage src={user?.imageUrl} />
                                    <AvatarFallback>test</AvatarFallback>
                                </Avatar>
                                <p className="flex text-md font-semibold">{user?.username}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-2">
                            <p>{comment.comment}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                                <Heart className="text-red-500 cursor-pointer" />
                                <MessageCircle className="text-blue-500 cursor-pointer" />
                            </div>
                            <p className="text-sm text-gray-500">{comment.createdAt.toLocaleDateString()}</p>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
};

export default CommentList;
