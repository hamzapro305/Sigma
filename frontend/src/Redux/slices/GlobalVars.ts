import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initGlobalVarsT = {
    ws: WebSocket | null
    name: string | null
};

type Payload<T extends keyof initGlobalVarsT> = PayloadAction<initGlobalVarsT[T]>

const initialState: initGlobalVarsT = {
    ws: null,
    name: null
};

export const Slice = createSlice({
    name: "GlobalVars",
    initialState,
    reducers: {
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
