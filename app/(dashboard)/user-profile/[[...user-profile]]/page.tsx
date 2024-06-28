"use client";

import { useState } from "react";
import { UserProfile, useClerk } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/user-confirm-modal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export const maxDuration = 60;

const UserProfilePage = () => {
    const router = useRouter();
    const { signOut } = useClerk();

    const deleteAccount = async () => {
        try {
            const response = await axios.delete(`/api/user`);
            if (response.data.deleted) {
                await signOut();
            }
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleDeleteAccount = async () => {
        try {
            toast.promise(
                deleteAccount(),
                {
                    loading: "Deleting...",
                    error: "An error occurred, please try again later.",
                    success: "Account Deleted"
                }
            );
        } catch (error) {
            console.log("[DELETE_USER]: ", error);
            toast.error("Failed to delete account");
        }
    };

    return (
        <div className="flex h-full items-center justify-center p-4 mt-24">
            <div className="shadow-lg rounded-lg p-6">
                <UserProfile path="/user-profile" />
                <div className="flex justify-end mt-4">
                    <ConfirmModal
                        onConfirm={handleDeleteAccount}
                    >
                        <Button size="sm" variant="destructive" className="flex items-center justify-center">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete Account
                        </Button>
                    </ConfirmModal>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
