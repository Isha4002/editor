import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserButton from "../auth/components/user-button";

export function Header() {
  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      
      {/* ✅ THEME BASED BACKGROUND */}
      <div className="bg-background text-foreground w-full">

        <div className="flex items-center justify-center w-full flex-col">
          
          <div
            className="
              flex items-center justify-between

              /* ✅ FIXED gradient */
              bg-gradient-to-b 
              from-background via-muted to-background

              shadow-[0_2px_20px_-2px_rgba(0,0,0,0.1)]
              backdrop-blur-md

              border-x border-b 
              border-border

              w-full sm:min-w-[800px] sm:max-w-[1200px]
              rounded-b-[28px]
              px-4 py-2.5
              relative
              transition-all duration-300 ease-in-out
            "
          >
            <div className="relative z-10 flex items-center justify-between w-full gap-2">
              
              {/* LEFT */}
              <div className="flex items-center gap-6 justify-center">
                <Link href="/" className="flex items-center gap-2 justify-center">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    height={60}
                    width={60}
                  />
                  <span className="hidden sm:block font-extrabold text-lg">
                    VibeCode Editor
                  </span>
                </Link>

                <span className="text-muted-foreground">|</span>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center gap-4">
                  <Link
                    href="/docs/components/background-paths"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Docs
                  </Link>

                  <Link
                    href="https://codesnippetui.pro/templates"
                    target="_blank"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    API
                    <span className="text-green-500 border border-green-500 rounded-lg px-1 py-0.5 text-xs">
                      New
                    </span>
                  </Link>
                </div>
              </div>

              {/* RIGHT */}
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-muted-foreground">|</span>
                <ThemeToggle />
                <UserButton />
              </div>

              {/* MOBILE */}
              <div className="flex sm:hidden items-center gap-4">
                <ThemeToggle />
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}