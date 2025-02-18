import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initGlobalVarsT = {
    tool: "GRAB" | "ITEMS"
};

const initialState: initGlobalVarsT = {
    tool: "GRAB"
};

export const Slice = createSlice({
    name: "GlobalVars",
    initialState,
    reducers: {
        setTool: (state, { payload }: PayloadAction<initGlobalVarsT["tool"]>) => {
            state.tool = payload
        }
    },
});

// Action creators are generated for each case reducer function
export const GlobalVarsActions = Slice.actions;

export default Slice.reducer;
