import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserCursor = {
    name: string
    position: { x: number, y: number }
}
export type DrawingItem = {
    id: string
    position: { x: number, y: number }
}
export type DrawingSliceT = {
    tool: "GRAB" | "ITEMS" | "CREATE"
    users: UserCursor[]
    isSelected: string | null
    drawingItems: DrawingItem[]
}

const initialState: DrawingSliceT = {
    users: [],
    tool: "GRAB",
    isSelected: null,
    drawingItems: [
        {
            id: "123",
            position: { x: 1, y: 5 }
        },
        {
            id: "321",
            position: { x: 1, y: -5 }
        }
    ]
};

export const Slice = createSlice({
    name: "DrawingSlice",
    initialState,
    reducers: {
        setTool: (state, { payload }: PayloadAction<DrawingSliceT["tool"]>) => {
            state.tool = payload
        },
        SyncUsers: (state, { payload }: PayloadAction<UserCursor[]>) => {
            state.users = payload
        },
        UserJoin: (state, { payload }: PayloadAction<string>) => {
            state.users.push({
                name: payload,
                position: { x: 0, y: 0, }
            })
        },
        UserLeft: (state, { payload }: PayloadAction<string>) => {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].name == payload) {
                    state.users.splice(i, 1)
                    break;
                }
            }
        },
        UserNewPos: (state, { payload }: PayloadAction<UserCursor>) => {
            for (let i = 0; i < state.users.length; i++) {
                const user = state.users[i]
                if (user.name == payload.name) {
                    user.position = payload.position;
                    break;
                }
            }
        },
        setSelectedItem: (state, { payload }: PayloadAction<string | null>) => {
            state.isSelected = payload
        },
        setDrawingItems: (state, { payload }: PayloadAction<DrawingItem[]>) => {
            state.drawingItems = payload
        },
        setDrawingItemPosition: (state, { payload }: PayloadAction<DrawingItem>) => {
            for (let i = 0; i < state.drawingItems.length; i++) {
                const item = state.drawingItems[i];
                if (item.id === payload.id) {
                    item.position = payload.position
                    break;
                }
            }
        },
        NewDrawing: (state, { payload }: PayloadAction<DrawingItem>) => {
            state.drawingItems.push(payload)
        }
    },
});

// Action creators are generated for each case reducer function
export const DrawingActions = Slice.actions;

export default Slice.reducer;
