// AccountData.tsx
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/role";
import { AccountDataParams, User } from "../_components/_utils/types";
import AccountDataTable from "../_components/account-data";

const AccountData = async ({ searchParams }: AccountDataParams) => {
  // Uncomment the following lines if you want to check the role and redirect if not admin
  // if (!checkRole("admin")) {
  //   redirect("/");
  // }

  const query = searchParams?.search || "";

  try {
    const getUsers = await clerkClient.users.getUserList({ query });
    const users: User[] = JSON.parse(JSON.stringify(getUsers.data));

    if (!Array.isArray(users)) {
      console.error("Fetched users is not an array:", users);
      throw new Error("Fetched users is not an array");
    }

    return (
      <div className="container mx-auto mt-10 p-4">
        <AccountDataTable users={users} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return <div>Error fetching users</div>;
  }
};

export default AccountData;
