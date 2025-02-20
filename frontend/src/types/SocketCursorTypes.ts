type WebSocketNewPosMessage = {
    type: "user_new_pos"
    name: string
    x: number
    y: number
}

type WebSocketSyncUsersMessage = {
    type: "sync_users"
    all_users: {
        name: string
        x: number
        y: number
    }[]
}

type WebSocketUserLeftMessage = {
    type: "user_left"
    name: string
}
type WebSocketUserJoinMessage = {
    type: "user_join"
    name: string
}

type WebSocketMessage =
    | WebSocketNewPosMessage
    | WebSocketSyncUsersMessage
    | WebSocketUserLeftMessage
    | WebSocketUserJoinMessage

export type {
    WebSocketMessage
}