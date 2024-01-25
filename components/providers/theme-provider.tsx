"use client";

import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({children, ...props} : ThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}