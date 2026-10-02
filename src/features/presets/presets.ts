import type { Preset } from "../../types";
import { CORE_PRESETS } from "./presets-core";
import { CREATIVE_PRESETS } from "./presets-creative";

/** The 20 built-in shot presets shipped with PromptLens (Phase 1). */
export const PRESETS: Preset[] = [...CORE_PRESETS, ...CREATIVE_PRESETS];
