import MultipleCursorProvider from "@/Providers/MultipleCursorProvider";
import { useAppDispatch } from "@/Redux/Hooks";
import { DrawingActions } from "@/Redux/slices/DrawingSlice";
import { Canvas } from "@react-three/fiber";
import { FC, ReactNode } from "react";

const CanvasSetup: FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch();

    const handlePointerMissed = () => {
        // Reset selected item only if click missed all objects
        dispatch(DrawingActions.setSelectedItem(null));
    };

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
            onPointerMissed={handlePointerMissed} // Detects clicks on empty space
            dpr={[1, 2]} // For better performance on high-DPI screens
            shadows // Enable shadows
        >
            <color attach="background" args={["white"]} />
            <MultipleCursorProvider>{children}</MultipleCursorProvider>
        </Canvas>
    );
};

export default CanvasSetup;
