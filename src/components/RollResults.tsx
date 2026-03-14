"use client";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DiceAnimation from "./DiceAnimation";
import { DieResult } from "@/types/dice";

interface RollResultsProps {
  results: DieResult[];
  isRolling: boolean;
}

export default function RollResults({ results, isRolling }: RollResultsProps) {
  const [displayTotal, setDisplayTotal] = useState(0);
  const total = results.reduce((sum, r) => sum + r.value, 0);

  useEffect(() => {
    if (results.length === 0) {
      setDisplayTotal(0);
      return;
    }
    let start = 0;
    const increment = total / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= total) {
        setDisplayTotal(total);
        clearInterval(timer);
      } else {
        setDisplayTotal(Math.floor(start));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [results, total]);

  if (results.length === 0 && !isRolling) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "center",
          mb: 3,
        }}
      >
        <AnimatePresence>
          {results.map((result, i) => (
            <DiceAnimation key={result.id} result={result} delay={i * 0.1} />
          ))}
        </AnimatePresence>
      </Box>

      {results.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Box
            sx={{
              textAlign: "center",
              p: 2,
              border: "1px solid #d4a84360",
              borderRadius: 2,
              background: "radial-gradient(circle, #d4a84315 0%, transparent 70%)",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#9a8d70", fontFamily: '"Cinzel", serif', letterSpacing: "0.2em", display: "block", mb: 0.5 }}
            >
              TOTAL
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Cinzel Decorative", cursive',
                fontSize: "3rem",
                fontWeight: 900,
                color: "#d4a843",
                textShadow: "0 0 20px #d4a84380",
                lineHeight: 1,
              }}
            >
              {displayTotal}
            </Typography>
          </Box>
        </motion.div>
      )}
    </Box>
  );
}
