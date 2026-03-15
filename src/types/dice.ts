export type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";
export type AdvantageMode = "none" | "advantage" | "disadvantage";

export interface DiceConfig {
  type: DiceType;
  sides: number;
  color: string;
  icon: string;
  label: string;
}

export interface QueuedDie {
  id: string;
  type: DiceType;
}

export interface DieResult {
  id: string;
  type: DiceType;
  value: number;
  isCritSuccess: boolean;
  isCritFail: boolean;
  timestamp: number;
  advantageMode?: AdvantageMode;
}

export interface RollRecord {
  id: string;
  dice: DieResult[];
  total: number;
  timestamp: number;
}
