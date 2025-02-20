import { CursorActions } from "@/Redux/slices/CursorSlice";
import { AppDispatch } from "@/Redux/store";
import { WebSocketMessage } from "@/types/SocketCursorTypes"

class WebSocketInHandler {
    static BasicMessageHandler = (
        message: WebSocketMessage,
        dispatch: AppDispatch,
    ) => {
        switch (message.type) {
            case "sync_users":
                dispatch(
                    CursorActions.SyncUsers(message.all_users ?? [])
                )
                break;
            case "user_join":
                dispatch(
                    CursorActions.UserJoin(
                        message.name
                    )
                )
                break;
            case "user_left":
                dispatch(
                    CursorActions.UserLeft(
                        message.name
                    )
                )
                break;
            case "user_new_pos":
                dispatch(
                    CursorActions.UserNewPos(message)
                )
                break;
            default:
                break;
        }
    }
}

export default WebSocketInHandler