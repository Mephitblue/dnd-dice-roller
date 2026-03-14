"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import dungeonTheme from "@/theme/theme";
import DungeonBackground from "./DungeonBackground";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={dungeonTheme}>
      <CssBaseline />
      <DungeonBackground />
      {children}
    </ThemeProvider>
  );
}
