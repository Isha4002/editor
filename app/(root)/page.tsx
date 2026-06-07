import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
   
  return (
    <div
      className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      px-4
      bg-background
      bg-[linear-gradient(to_right,rgba(120,120,120,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.15)_1px,transparent_1px)]
      bg-[size:40px_40px]
      "
    >
      <div className="flex flex-col items-center text-center max-w-5xl">
        <Image
          src="/hero.svg"
          alt="Hero Section"
          width={450}
          height={450}
          priority
          className="w-auto h-auto"
        />

        <h1
          className="
          mt-4
          text-5xl
          md:text-7xl
          font-extrabold
          tracking-tight
          leading-tight
          bg-gradient-to-r
          from-rose-500
          via-red-500
          to-pink-500
          bg-clip-text
          text-transparent
          "
        >
          Vibe Code With Intelligence
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl">
          VibeCode Editor is a powerful and intelligent code editor that
          enhances your coding experience with advanced features and seamless
          integration. It helps you write, debug and optimize code efficiently.
        </p>

        <Link href="/dashboard" className="mt-8">
          <Button variant="brand" size="lg">
            Get Started
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}