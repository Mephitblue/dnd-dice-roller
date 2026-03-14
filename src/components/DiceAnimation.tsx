"use client";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import DiceIcon from "./DiceIcon";
import { DieResult } from "@/types/dice";
import { DICE_CONFIGS } from "@/utils/diceUtils";

interface DiceAnimationProps {
  result: DieResult;
  delay?: number;
}

export default function DiceAnimation({ result, delay = 0 }: DiceAnimationProps) {
  const cfg = DICE_CONFIGS[result.type];
  const [displayValue, setDisplayValue] = useState<number>(1);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    setSettled(false);
    setDisplayValue(1);

    const startTime = Date.now() + delay * 1000;
    const duration = 1200;
    let frame: ReturnType<typeof setTimeout>;

    function cycle() {
      const now = Date.now();
      if (now < startTime) {
        frame = setTimeout(cycle, 50);
        return;
      }
      const elapsed = now - startTime;
      if (elapsed < duration - 200) {
        setDisplayValue(Math.floor(Math.random() * cfg.sides) + 1);
        const interval = 50 + (elapsed / duration) * 150;
        frame = setTimeout(cycle, interval);
      } else {
        setDisplayValue(result.value);
        setSettled(true);
      }
    }

    frame = setTimeout(cycle, 50);
    return () => clearTimeout(frame);
  }, [result.id, result.value, cfg.sides, delay]);

  const glowColor = result.isCritSuccess
    ? "#d4a843"
    : result.isCritFail
    ? "#8b1a1a"
    : cfg.color;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{
        scale: [0, 1.2, 0.9, 1.1, 1],
        rotate: [0, 360, 540],
        opacity: 1,
      }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <motion.div
        animate={
          settled
            ? result.isCritSuccess
              ? {
                  boxShadow: [
                    `0 0 0px ${glowColor}`,
                    `0 0 30px ${glowColor}`,
                    `0 0 15px ${glowColor}`,
                    `0 0 25px ${glowColor}`,
                    `0 0 10px ${glowColor}`,
                  ],
                }
              : result.isCritFail
              ? {
                  x: [-5, 5, -5, 5, -3, 3, 0],
                  boxShadow: [
                    "0 0 0px #8b1a1a",
                    "0 0 20px #8b1a1a",
                    "0 0 5px #8b1a1a",
                  ],
                }
              : {}
            : {}
        }
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: 90, sm: 110 },
            height: { xs: 90, sm: 110 },
            border: `2px solid ${glowColor}80`,
            borderRadius: 2,
            background: result.isCritSuccess
              ? `radial-gradient(circle, ${glowColor}30 0%, #1a1a2e 70%)`
              : result.isCritFail
              ? "radial-gradient(circle, #8b1a1a30 0%, #1a1a2e 70%)"
              : "#1a1a2e",
            boxShadow: settled ? `0 0 ${result.isCritSuccess || result.isCritFail ? 20 : 8}px ${glowColor}40` : "none",
            overflow: "hidden",
          }}
        >
          <Box sx={{ position: "absolute", opacity: 0.15 }}>
            <DiceIcon type={result.type} color={glowColor} size={70} />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Cinzel Decorative", cursive',
              fontSize: { xs: "1.6rem", sm: "2rem" },
              fontWeight: 900,
              color: glowColor,
              lineHeight: 1,
              zIndex: 1,
              textShadow: `0 0 10px ${glowColor}80`,
            }}
          >
            {displayValue}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: `${glowColor}90`,
              fontFamily: '"Cinzel", serif',
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              zIndex: 1,
            }}
          >
            {cfg.label}
          </Typography>
          {result.isCritSuccess && settled && (
            <Box
              sx={{
                position: "absolute",
                top: 2,
                right: 4,
                fontSize: "0.6rem",
                color: "#d4a843",
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
              }}
            >
              CRIT!
            </Box>
          )}
          {result.isCritFail && settled && (
            <Box
              sx={{
                position: "absolute",
                top: 2,
                right: 4,
                fontSize: "0.6rem",
                color: "#8b1a1a",
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
              }}
            >
              FAIL
            </Box>
          )}
        </Box>
      </motion.div>
    </motion.div>
  );
}
