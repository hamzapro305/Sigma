import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    name: string
    x: number
    y: number
}
type SliceT = {
    users: User[]
}

const initialState: SliceT = {
    users: []
};

export const Slice = createSlice({
    name: "CursorSlice",
    initialState,
    reducers: {
        SyncUsers: (state, { payload }: PayloadAction<User[]>) => {
            state.users = payload
        },
        UserJoin: (state, { payload }: PayloadAction<string>) => {
            state.users.push({
                name: payload,
                x: 0,
                y: 0
            })
        },
        UserLeft: (state, { payload }: PayloadAction<string>) => {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].name == payload) {
                    state.users.splice(i, 1)
                }
            }
        },
        UserNewPos: (state, { payload }: PayloadAction<User>) => {
            for (let i = 0; i < state.users.length; i++) {
                const user = state.users[i]
                if (user.name == payload.name) {
                    user.x = payload.x
                    user.y = payload.y
                }
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const CursorActions = Slice.actions;

export default Slice.reducer;
