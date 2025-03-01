import { DrawingItem, UserCursor } from "@/Redux/slices/DrawingSlice"

type WebSocketNewPosMessage = {
    type: "user_new_pos"
    name: string
    position: UserCursor["position"]
}

type WebSocketSyncUsersMessage = {
    type: "sync_users"
    all_users: UserCursor[]
}

type WebSocketUserLeftMessage = {
    type: "user_left"
    name: string
}
type WebSocketUserJoinMessage = {
    type: "user_join"
    name: string
}

type WebSocketNewDrawingMessage = {
    type: "new_drawing",
    drawing: DrawingItem
}

type WebSocketMessage =
    | WebSocketNewPosMessage
    | WebSocketSyncUsersMessage
    | WebSocketUserLeftMessage
    | WebSocketUserJoinMessage
    | WebSocketNewDrawingMessage

export type {
    WebSocketMessage
}