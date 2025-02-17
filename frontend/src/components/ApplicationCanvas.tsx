import { Canvas } from "@react-three/fiber";

const ApplicationCanvas = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial color="red" />
            </mesh>
        </Canvas>
    );
};

export default ApplicationCanvas;
