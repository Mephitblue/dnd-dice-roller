"use client";
import { Box, Typography, Chip, Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import DiceIcon from "./DiceIcon";
import { DiceType, QueuedDie } from "@/types/dice";
import { DICE_CONFIGS } from "@/utils/diceUtils";

interface DiceQueueProps {
  queue: QueuedDie[];
  onRemove: (id: string) => void;
  onRoll: () => void;
  isRolling: boolean;
}

export default function DiceQueue({ queue, onRemove, onRoll, isRolling }: DiceQueueProps) {
  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        border: "1px solid #2a2a3e",
        borderRadius: 2,
        background: "#14141f",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: "#9a8d70", fontFamily: '"Cinzel", serif', letterSpacing: "0.1em" }}
        >
          {queue.length === 0 ? "Select dice to roll" : `${queue.length} ${queue.length === 1 ? "die" : "dice"} queued`}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          minHeight: 40,
          mb: queue.length > 0 ? 2 : 0,
        }}
      >
        <AnimatePresence>
          {queue.map((die) => {
            const cfg = DICE_CONFIGS[die.type];
            return (
              <motion.div
                key={die.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Chip
                  label={cfg.label}
                  onDelete={() => onRemove(die.id)}
                  icon={<DiceIcon type={die.type} color={cfg.color} size={18} />}
                  size="small"
                  sx={{
                    border: `1px solid ${cfg.color}60`,
                    background: `${cfg.color}15`,
                    color: cfg.color,
                    "& .MuiChip-deleteIcon": { color: `${cfg.color}80`, "&:hover": { color: cfg.color } },
                    "& .MuiChip-icon": { ml: 0.5 },
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 700,
                    fontSize: "0.65rem",
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={onRoll}
        disabled={queue.length === 0 || isRolling}
        sx={{
          py: 1.5,
          fontSize: "1rem",
          letterSpacing: "0.2em",
          fontFamily: '"Cinzel Decorative", cursive',
          fontWeight: 700,
          background: queue.length > 0 && !isRolling
            ? "linear-gradient(135deg, #d4a843 0%, #8a6d2b 100%)"
            : "#2a2a3e",
          border: queue.length > 0 && !isRolling ? "1px solid #f0c95c" : "1px solid #3a3a52",
          color: queue.length > 0 && !isRolling ? "#0a0a0f" : "#4a4a5e",
          animation: queue.length > 0 && !isRolling ? "pulseGlow 2s ease-in-out infinite" : "none",
          "&:hover": {
            background: "linear-gradient(135deg, #f0c95c 0%, #d4a843 100%)",
          },
          "&:disabled": {
            background: "#2a2a3e",
            color: "#4a4a5e",
          },
        }}
      >
        {isRolling ? "Rolling..." : "⚔ Roll the Dice ⚔"}
      </Button>
    </Box>
  );
}
