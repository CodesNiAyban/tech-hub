import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex hover:opacity-75 transition items-center gap-x-2">
      <Image src="/logo.svg" alt="Logo" height={100} width={100} />
      <p
        className={cn(
          "font-bold", // Use a bold font
          "text-yellow-500"
        )}
      >
        <span className="flex-column text-foreground mr-[0.5px]">Tech</span>
        <span className="flex-column bg-primary text-black rounded-md px-1 py-1">
          Sub
        </span>
      </p>
    </div>
  );
};
