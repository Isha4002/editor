"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"           // ✅ IMPORTANT
      defaultTheme="system"       // ✅ recommended
      enableSystem               // ✅ recommended
      disableTransitionOnChange  // ✅ smooth UI
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}