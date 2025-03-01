import MultipleCursorProvider from "@/Providers/MultipleCursorProvider";
import { Canvas } from "@react-three/fiber";
import { FC, ReactNode } from "react";

const CanvasSetup: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Canvas
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: -2,
            }}
        >
            <color attach="background" args={["white"]} />
            <MultipleCursorProvider>

            {children}
            </MultipleCursorProvider>
        </Canvas>
    );
};

export default CanvasSetup;
