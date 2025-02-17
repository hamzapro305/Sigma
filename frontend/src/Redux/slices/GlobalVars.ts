import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initGlobalVars = {
    tool: "GRAB" | "ITEMS"
};

const initialState: initGlobalVars = {
    tool: "GRAB"
};

export const Slice = createSlice({
    name: "GlobalVars",
    initialState,
    reducers: {
        setTool: (state, { payload }: PayloadAction<initGlobalVars["tool"]>) => {
            state.tool = payload
        }
    },
});

// Action creators are generated for each case reducer function
export const GlobalVarsActions = Slice.actions;

export default Slice.reducer;
