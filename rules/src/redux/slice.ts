import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Rule {
  id: number;
  measurementName: string;
  comparator: "is" | ">=" | "<";
  comparedValue: string | number;
  findingName: string;
  unitName: string;

  action: "Normal" | "Reflux";
}

export interface Ruleset {
  name: string;
  id: number;
  rules: Rule[];
}

interface RulesState {
  rulesets: Ruleset[];
}

const initialState: RulesState = {
  rulesets: [
    {
      name: "Initial US map",
      id: 1,
      rules: [
        {
          id: 1,
          measurementName: "SFG RT Size",
          comparator: "is",
          comparedValue: "Not Present",
          unitName: "",
          findingName: "Right GSV1",
          action: "Normal",
        },
        {
          id: 2,
          measurementName: "GS RT PROX Size",
          comparator: "is",
          comparedValue: "Not Present",
          unitName: "",
          findingName: "Right GSV DS",
          action: "Normal",
        },
        {
          id: 3,
          measurementName: "GS RT Dist Size",
          comparator: "is",
          comparedValue: "Not Present",
          unitName: "",
          findingName: "Right GSV3-5 Mild",
          action: "Reflux",
        },
      ],
    },
    {
      name: "T3-Test",
      id: 2,
      rules: [
        {
          id: 5,
          measurementName: "SSV Rt Mild Reflex",
          comparator: ">=",
          comparedValue: 500,
          unitName: "ms",
          findingName: "Right Svs",
          action: "Normal",
        },
      ],
    },
  ],
};

const slice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    updateRuleset: (state, action: PayloadAction<Ruleset>) => {
      const index = state.rulesets.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.rulesets[index] = action.payload;
      }
    },
    copyRuleset: (state, action: PayloadAction<number>) => {
      const ruleset = state.rulesets.find((r) => r.id === action.payload);
      if (ruleset) {
        state.rulesets.push({
          name: `${ruleset.name}_1`,
          rules: [...ruleset.rules],
          id:
            state.rulesets.reduce(
              (max, rule) => (rule.id > max ? rule.id : max),
              0
            ) + 1,
        });
      }
    },
    deleteRuleset: (state, action: PayloadAction<number>) => {
      state.rulesets = state.rulesets.filter((r) => r.id !== action.payload);
    },
  },
});

export const { updateRuleset, copyRuleset, deleteRuleset } = slice.actions;
export default slice.reducer;
