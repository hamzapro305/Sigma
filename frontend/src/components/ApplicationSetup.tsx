import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import React from "react";

const ApplicationSetup = () => {
    return (
        <group>
            {/* Ambient Light */}
            <ambientLight intensity={0.5} />

            {/* 2D Boxes */}
            <mesh position={[-2, 0, 0]}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color="red" />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color="green" />
            </mesh>
            <mesh position={[2, 0, 0]}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color="blue" />
            </mesh>

            {/* Orthographic Camera to make it 2D */}
            <OrthographicCamera
                makeDefault
                position={[0, 0, 5]}
                zoom={50}
                near={0.1}
                far={1000}
            />

            {/* OrbitControls for panning and zooming (no rotation) */}
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={false} // Disable rotation (Figma-style)
                maxDistance={10}
                minDistance={2}
                mouseButtons={{
                    LEFT: 2, // Left-click for dragging
                    MIDDLE: 1, // Middle-click for zooming
                    RIGHT: 0, // Right-click disabled
                }}
            />
        </group>
    );
};

export default ApplicationSetup;
