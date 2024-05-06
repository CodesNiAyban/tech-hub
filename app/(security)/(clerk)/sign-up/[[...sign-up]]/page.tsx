import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <SignUp
        appearance={{
          baseTheme: dark
        }}
      />
    </div>
  );
}
