import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { GlobalVarsActions } from "@/Redux/slices/GlobalVars";
import WebSocketInHandler from "@/utils/WebSocketInHandler";
import { FC, ReactNode, useState } from "react";

type SocketProviderT = FC<{ children: ReactNode }>;
const SocketProvider: SocketProviderT = ({ children }) => {
    const [name, setName] = useState("");

    const { ws, name: _name } = useAppSelector((s) => s.GlobalVars);
    const dispatch = useAppDispatch();

    const onSubmit = () => {
        if (name) {
            const _ws = new WebSocket(`ws://localhost:8080/ws/${name}`);

            _ws.addEventListener("open", () => {
                dispatch(GlobalVarsActions.setName(name));
                dispatch(GlobalVarsActions.setWebSocket(_ws));
            });

            _ws.onmessage = (event) => {
                const receivedData = JSON.parse(event.data);
                WebSocketInHandler.BasicMessageHandler(receivedData, dispatch);
            };

            // Handle WebSocket close
            _ws.onclose = () => {
                console.log("WebSocket Disconnected");
            };
        }
    };

    if (ws) {
        return children;
    }
    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};

export default SocketProvider;
