import { useAppSelector } from "@/Redux/Hooks";
import Debounce from "@/utils/debounce";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const useMultipleCursorProvider = () => {
    const { ws, name } = useAppSelector(s => s.GlobalVars)
    const { pointer: mouse, camera } = useThree();
    const lastPosition = useRef({ x: 0, y: 0 });


    // const SendPosition = Debounce((x: number, y: number) => {
    //     if (ws) {
    //         const body = JSON.stringify({
    //             type: "user_new_pos",
    //             name: name,
    //             x,
    //             y,
    //         });
    //         ws.send(body);
    //     }
    // }, 50)

    const SendPosition = (x: number, y: number) => {
        if (ws) {
            const body = JSON.stringify({
                type: "user_new_pos",
                name: name,
                x,
                y,
            });
            ws.send(body);
        }
    }

    useFrame(() => {
        if (ws && name) {
            const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
            vector.unproject(camera); // Convert screen space to world space

            // Agar position change hui ho to hi send karein
            if (lastPosition.current.x !== vector.x || lastPosition.current.y !== vector.y) {
                lastPosition.current = { x: vector.x, y: vector.y };
                SendPosition(vector.x, vector.y);
            }
        }
    });


    return
};

export default useMultipleCursorProvider;
