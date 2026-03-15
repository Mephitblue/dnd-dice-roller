"use client";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, ButtonBase } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RollRecord } from "@/types/dice";
import { DICE_CONFIGS } from "@/utils/diceUtils";

interface RollHistoryProps {
  history: RollRecord[];
  onClear: () => void;
}

export default function RollHistory({ history, onClear }: RollHistoryProps) {
  if (history.length === 0) return null;

  return (
    <Accordion
      sx={{
        background: "#14141f",
        border: "1px solid #2a2a3e",
        "&:before": { display: "none" },
        borderRadius: "8px !important",
        mt: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#9a8d70" }} />}
        sx={{ "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1 } }}
      >
        <Typography
          sx={{ fontFamily: '"Cinzel", serif', color: "#9a8d70", fontSize: "0.8rem", letterSpacing: "0.1em" }}
        >
          Roll History ({history.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {history.map((record, idx) => (
            <Box
              key={record.id}
              sx={{
                px: 2,
                py: 1.5,
                borderTop: "1px solid #2a2a3e",
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: idx % 2 === 0 ? "transparent" : "#1a1a2e40",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#4a4a5e", fontFamily: '"Cinzel", serif', minWidth: 60, fontSize: "0.65rem" }}
              >
                {new Date(record.timestamp).toLocaleTimeString()}
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", flex: 1 }}>
                {record.dice.map((die) => (
                  <Typography
                    key={die.id}
                    variant="caption"
                    sx={{
                      color: die.isCritSuccess ? "#d4a843" : die.isCritFail ? "#8b1a1a" : DICE_CONFIGS[die.type].color,
                      fontFamily: '"Cinzel", serif',
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      background: `${DICE_CONFIGS[die.type].color}15`,
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 0.5,
                      border: `1px solid ${DICE_CONFIGS[die.type].color}40`,
                    }}
                  >
                    {DICE_CONFIGS[die.type].label}{die.advantageMode && die.advantageMode !== "none" ? `(${die.advantageMode === "advantage" ? "ADV" : "DIS"})` : ""}: {die.value}{die.discardedValue !== undefined ? ` [✕${die.discardedValue}]` : ""}
                    {die.isCritSuccess ? "★" : die.isCritFail ? "✗" : ""}
                  </Typography>
                ))}
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Cinzel Decorative", cursive',
                  color: "#d4a843",
                  fontWeight: 700,
                  fontSize: "1rem",
                  minWidth: 30,
                  textAlign: "right",
                }}
              >
                {record.total}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ p: 1.5, borderTop: "1px solid #2a2a3e", display: "flex", justifyContent: "flex-end" }}>
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
              "&:hover": { border: "1px solid #8b1a1a", color: "#8b1a1a" },
            }}
          >
            Clear History
          </ButtonBase>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
