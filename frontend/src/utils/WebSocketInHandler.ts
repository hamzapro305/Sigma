import { DrawingActions } from "@/Redux/slices/DrawingSlice";
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
                    DrawingActions.SyncUsers(message.all_users ?? [])
                )
                break;
            case "user_join":
                dispatch(
                    DrawingActions.UserJoin(
                        message.name
                    )
                )
                break;
            case "user_left":
                dispatch(
                    DrawingActions.UserLeft(
                        message.name
                    )
                )
                break;
            case "user_new_pos":
                dispatch(
                    DrawingActions.UserNewPos(message)
                )
                break;
            default:
                break;
        }
    }
}

export default WebSocketInHandler