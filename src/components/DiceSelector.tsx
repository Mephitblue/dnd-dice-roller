"use client";
import { Box, ButtonBase, Typography, Badge } from "@mui/material";
import DiceIcon from "./DiceIcon";
import { DiceType } from "@/types/dice";
import { DICE_CONFIGS } from "@/utils/diceUtils";

const DICE_TYPES: DiceType[] = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

interface DiceSelectorProps {
  queue: { type: DiceType }[];
  onAdd: (type: DiceType) => void;
  onRemoveOne: (type: DiceType) => void;
  onClear: () => void;
}

export default function DiceSelector({ queue, onAdd, onRemoveOne, onClear }: DiceSelectorProps) {
  const countByType = (type: DiceType) => queue.filter((d) => d.type === type).length;

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(4, 1fr)", sm: "repeat(7, 1fr)" },
          gap: 1.5,
        }}
      >
        {DICE_TYPES.map((type) => {
          const cfg = DICE_CONFIGS[type];
          const count = countByType(type);
          return (
            <ButtonBase
              key={type}
              onClick={() => onAdd(type)}
              onContextMenu={(e) => {
                e.preventDefault();
                onRemoveOne(type);
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5,
                p: 1.5,
                borderRadius: 2,
                border: `1px solid ${count > 0 ? cfg.color : "#2a2a3e"}`,
                background: count > 0 ? `${cfg.color}18` : "#14141f",
                transition: "all 0.2s",
                minHeight: 80,
                position: "relative",
                "&:hover": {
                  border: `1px solid ${cfg.color}`,
                  background: `${cfg.color}25`,
                  boxShadow: `0 0 12px ${cfg.color}40`,
                },
              }}
            >
              <Badge
                badgeContent={count}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    background: cfg.color,
                    color: "#0a0a0f",
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 700,
                    fontSize: "0.65rem",
                  },
                }}
              >
                <DiceIcon type={type} color={cfg.color} size={36} />
              </Badge>
              <Typography
                variant="caption"
                sx={{
                  color: count > 0 ? cfg.color : "#9a8d70",
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                }}
              >
                {cfg.label}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>
      <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
        <ButtonBase
          onClick={onClear}
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 1,
            border: "1px solid #3a3a52",
            color: "#9a8d70",
            fontFamily: '"Cinzel", serif',
            fontSize: "0.7rem",
            letterSpacing: "0.05em",
            "&:hover": { border: "1px solid #8b1a1a", color: "#8b1a1a" },
          }}
        >
          Clear All
        </ButtonBase>
      </Box>
    </Box>
  );
}
