import { OrbitControls, OrthographicCamera } from "@react-three/drei";

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
                position={[0, 0, 5]} // Adjust the Z position to frame the scene properly
                zoom={50} // Adjust the zoom level
                near={0.1}
                far={1000}
            />

            {/* OrbitControls for Figma-like panning and zooming */}
            {/* <OrbitControls
                enableZoom={true} // Allow zooming
                enablePan={true} // Allow panning
                enableRotate={false} // Disable rotation
                zoomSpeed={0.5} // Adjust zoom speed for smoother experience
                panSpeed={1} // Adjust pan speed for smoother experience
                maxDistance={10} // Maximum zoom-out distance
                minDistance={2} // Minimum zoom-in distance
                mouseButtons={{
                    LEFT: 2, // Left-click for panning (drag)
                    MIDDLE: 1, // Middle-click for zooming
                    RIGHT: 0, // Disable right-click
                }}
            /> */}
        </group>
    );
};

export default ApplicationSetup;