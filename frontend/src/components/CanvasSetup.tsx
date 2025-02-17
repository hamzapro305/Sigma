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
            }}
            camera={{
                position: [0, 0, 5],
                fov: 50,
            }}
        >
            {children}
        </Canvas>
    );
};

export default CanvasSetup;
