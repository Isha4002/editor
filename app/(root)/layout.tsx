import { Metadata } from "next";
import { Header } from "@/modules/home/header";
import {Footer} from "@/modules/home/footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    template: "VibeCode - Editor",
    default: "Code Editor for Everyone - VibeCode",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      {/* 🔥 Background Wrapper */}
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-[#0f172a] to-black">

        {/* 🔲 Grid Background */}
        <div
          className={cn(
            "absolute inset-0 z-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />

        {/* 🌫️ Soft Overlay (does NOT kill gradient) */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        {/* 🚀 Main Content */}
        <main className="relative z-20 w-full">
          {children}
        </main>

      </div>

      <Footer />
    </>
  );
}
