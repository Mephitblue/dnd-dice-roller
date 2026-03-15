import { DiceType, AdvantageMode } from "@/types/dice";

export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollD100(): number {
  const tens = Math.floor(Math.random() * 10) * 10;
  const ones = Math.floor(Math.random() * 10);
  return tens + ones === 0 ? 100 : tens + ones;
}

export function isCriticalSuccess(
  type: DiceType,
  value: number,
  sides: number
): boolean {
  return type === "d20" && value === sides;
}

export function isCriticalFail(type: DiceType, value: number): boolean {
  return type === "d20" && value === 1;
}

export function rollD20WithMode(mode: AdvantageMode): { kept: number; discarded: number | null } {
  if (mode === "advantage") {
    const a = rollDie(20), b = rollDie(20);
    return a >= b ? { kept: a, discarded: b } : { kept: b, discarded: a };
  }
  if (mode === "disadvantage") {
    const a = rollDie(20), b = rollDie(20);
    return a <= b ? { kept: a, discarded: b } : { kept: b, discarded: a };
  }
  return { kept: rollDie(20), discarded: null };
}

export const DICE_CONFIGS: Record<DiceType, { sides: number; color: string; label: string }> = {
  d4:   { sides: 4,   color: "#2ecc71", label: "D4" },
  d6:   { sides: 6,   color: "#3498db", label: "D6" },
  d8:   { sides: 8,   color: "#9b59b6", label: "D8" },
  d10:  { sides: 10,  color: "#e74c3c", label: "D10" },
  d12:  { sides: 12,  color: "#f39c12", label: "D12" },
  d20:  { sides: 20,  color: "#d4a843", label: "D20" },
  d100: { sides: 100, color: "#bdc3c7", label: "D100" },
};
