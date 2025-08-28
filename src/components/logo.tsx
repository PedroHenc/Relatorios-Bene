import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="https://forum-cfx-re.akamaized.net/original/4X/f/4/c/f4c3c447d46220f48d5b2eae5cb15ae7a387dd48.png"
        alt="Benny's Logo"
        width={100}
        height={100}
        className="object-contain"
        data-ai-hint="logo benny's"
      />
    </div>
  );
}
