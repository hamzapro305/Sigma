import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initGlobalVarsT = {
    tool: "GRAB" | "ITEMS"
    ws: WebSocket | null
    name: string | null
};

type Payload<T extends keyof initGlobalVarsT> = PayloadAction<initGlobalVarsT[T]>

const initialState: initGlobalVarsT = {
    tool: "GRAB",
    ws: null,
    name: null
};

export const Slice = createSlice({
    name: "GlobalVars",
    initialState,
    reducers: {
        setTool: (state, { payload }: Payload<"tool">) => {
            state.tool = payload
        },
        setWebSocket: (state, { payload }: Payload<"ws">) => {
            state.ws = payload
        },
        setName: (state, { payload }: Payload<"name">) => {
            state.name = payload
        }
    },
});

// Action creators are generated for each case reducer function
export const GlobalVarsActions = Slice.actions;

export default Slice.reducer;
