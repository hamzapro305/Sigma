import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import AllUserCursors from "./AllUserCursors";
import DraggableBox from "./DraggableBox";
import { useAppSelector } from "@/Redux/Hooks";

const ApplicationSetup = () => {
    const { isSelected, drawingItems } = useAppSelector((s) => s.DrawingSlice);
    const StopCamera = () => {
        if (!isSelected) return true;
        return false;
    };
    return (
        <group>
            {drawingItems.map((item) => {
                return <DraggableBox key={item.id} item={item} />;
            })}

            {/* Orthographic Camera to make it 2D */}
            <OrthographicCamera
                makeDefault
                position={[0, 0, 5]} // Adjust the Z position to frame the scene properly
                zoom={100} // Adjust the zoom level
                near={0.1}
                far={1000}
            />

            {/* OrbitControls for Figma-like panning and zooming */}
            <OrbitControls
                enableZoom={StopCamera()} // Zoom sirf jab selected na ho
                enablePan={StopCamera()} // Pan sirf jab selected na ho
                enableRotate={StopCamera()} // Rotate sirf jab selected na ho
                zoomSpeed={0.5}
                panSpeed={1}
                maxDistance={10}
                minDistance={2}
                mouseButtons={{
                    LEFT: StopCamera() ? 2 : 0, // Drag sirf jab selected na ho
                    MIDDLE: StopCamera() ? 1 : 0, // Zoom sirf jab selected na ho
                    RIGHT: 0, // Right-click hamesha disabled rahega
                }}
            />
            <AllUserCursors />
        </group>
    );
};

export default ApplicationSetup;
