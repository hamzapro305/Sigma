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
            camera={{
                position: [0, 0, 5],
                fov: 50,
            }}
        >
            <color attach="background" args={["white"]} />
            {children}
        </Canvas>
    );
};

export default CanvasSetup;
