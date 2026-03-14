"use client";
import { createTheme } from "@mui/material/styles";

const dungeonTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#d4a843" },
    secondary: { main: "#6a3d9a" },
    background: {
      default: "#0a0a0f",
      paper: "#1a1a2e",
    },
    text: {
      primary: "#d4c5a0",
      secondary: "#9a8d70",
    },
    error: { main: "#8b1a1a" },
    success: { main: "#1a8b3a" },
  },
  typography: {
    fontFamily: '"Cinzel", serif',
    h1: { fontFamily: '"Cinzel Decorative", cursive' },
    h2: { fontFamily: '"Cinzel Decorative", cursive' },
    h3: { fontFamily: '"Cinzel Decorative", cursive' },
    h4: { fontFamily: '"Cinzel Decorative", cursive' },
    h5: { fontFamily: '"Cinzel Decorative", cursive' },
    h6: { fontFamily: '"Cinzel Decorative", cursive' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontFamily: '"Cinzel", serif',
          fontWeight: 600,
          letterSpacing: "0.1em",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #d4a843 0%, #8a6d2b 100%)",
          border: "1px solid #f0c95c",
          "&:hover": {
            background: "linear-gradient(135deg, #f0c95c 0%, #d4a843 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#1a1a2e",
          border: "1px solid #2a2a3e",
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Cinzel", serif',
          fontWeight: 600,
        },
      },
    },
  },
});

export default dungeonTheme;
