"use client";
import { useState, useCallback } from "react";
import { Box, Container, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DiceSelector from "./DiceSelector";
import DiceQueue from "./DiceQueue";
import RollResults from "./RollResults";
import RollHistory from "./RollHistory";
import { DiceType, QueuedDie, DieResult, RollRecord, AdvantageMode } from "@/types/dice";
import { DICE_CONFIGS, rollDie, rollD100, rollD20WithMode, isCriticalSuccess, isCriticalFail } from "@/utils/diceUtils";

export default function DiceRoller() {
  const [queue, setQueue] = useState<QueuedDie[]>([]);
  const [results, setResults] = useState<DieResult[]>([]);
  const [history, setHistory] = useState<RollRecord[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [advantageMode, setAdvantageMode] = useState<AdvantageMode>("none");

  const addToQueue = useCallback((type: DiceType) => {
    setQueue((prev) => [...prev, { id: uuidv4(), type }]);
  }, []);

  const removeOneFromQueue = useCallback((type: DiceType) => {
    setQueue((prev) => {
      const idx = [...prev].reverse().findIndex((d) => d.type === type);
      if (idx === -1) return prev;
      const realIdx = prev.length - 1 - idx;
      return prev.filter((_, i) => i !== realIdx);
    });
  }, []);

  const removeById = useCallback((id: string) => {
    setQueue((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const clearQueue = useCallback(() => setQueue([]), []);

  const roll = useCallback(() => {
    if (queue.length === 0 || isRolling) return;
    setIsRolling(true);
    setResults([]);

    const rolled: DieResult[] = queue.map((die) => {
      const cfg = DICE_CONFIGS[die.type];
      const isD20 = die.type === "d20";
      const value = die.type === "d100"
        ? rollD100()
        : isD20
        ? rollD20WithMode(advantageMode)
        : rollDie(cfg.sides);
      return {
        id: die.id,
        type: die.type,
        value,
        isCritSuccess: isCriticalSuccess(die.type, value, cfg.sides),
        isCritFail: isCriticalFail(die.type, value),
        timestamp: Date.now(),
        advantageMode: isD20 ? advantageMode : undefined,
      };
    });

    setResults(rolled);

    const record: RollRecord = {
      id: uuidv4(),
      dice: rolled,
      total: rolled.reduce((s, r) => s + r.value, 0),
      timestamp: Date.now(),
    };

    setHistory((prev) => [record, ...prev].slice(0, 10));
    setQueue([]);

    setTimeout(() => setIsRolling(false), 1500);
  }, [queue, isRolling]);

  return (
    <Container maxWidth="md" sx={{ py: 4, position: "relative", zIndex: 1 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: '"Cinzel Decorative", cursive',
            color: "#d4a843",
            animation: "torchFlicker 3s ease-in-out infinite",
            letterSpacing: "0.1em",
            mb: 0.5,
            fontSize: { xs: "1.6rem", sm: "2.4rem" },
          }}
        >
          Dungeon Dice
        </Typography>
        <Box
          sx={{
            height: 2,
            background: "linear-gradient(90deg, transparent, #d4a843, transparent)",
            mb: 0.5,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "#9a8d70",
            fontFamily: '"Cinzel", serif',
            letterSpacing: "0.3em",
            fontSize: "0.65rem",
          }}
        >
          ✦ ROLL YOUR FATE ✦
        </Typography>
      </Box>

      <DiceSelector
        queue={queue}
        onAdd={addToQueue}
        onRemoveOne={removeOneFromQueue}
        onClear={clearQueue}
      />

      <DiceQueue
        queue={queue}
        onRemove={removeById}
        onRoll={roll}
        isRolling={isRolling}
        advantageMode={advantageMode}
        onAdvantageChange={setAdvantageMode}
      />

      <RollResults results={results} isRolling={isRolling} />

      <RollHistory history={history} onClear={() => setHistory([])} />
    </Container>
  );
}
