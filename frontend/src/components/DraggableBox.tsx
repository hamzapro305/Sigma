import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { DrawingActions, DrawingItem } from "@/Redux/slices/DrawingSlice";
import { FC, useEffect, useRef } from "react";
import { Mesh } from "three";
import { TransformControls } from "@react-three/drei";

const DraggableBox: FC<{ item: DrawingItem }> = ({ item }) => {
    const { isSelected } = useAppSelector((s) => s.DrawingSlice);
    const { id, position } = item;
    const meshRef = useRef<Mesh>(null);
    const dispatch = useAppDispatch();

    const SelectThisItemOnClick = () => {
        dispatch(DrawingActions.setSelectedItem(id));
    };

    // Update Mesh Position
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.position.set(position.x, position.y, 0);
        }
    }, [position]);

    // Save Position on Transform End
    const handleTransformEnd = () => {
        const pos = meshRef.current?.position;
        if (pos) {
            dispatch(
                DrawingActions.setDrawingItemPosition({
                    id,
                    position: { x: pos.x, y: pos.y },
                })
            );
        }
    };

    return (
        <TransformControls
            object={meshRef.current as any}
            enabled={!!isSelected}
            showZ={false}
            onMouseUp={handleTransformEnd} // Save position on mouse release
        >
            <mesh onClick={SelectThisItemOnClick} ref={meshRef}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color="hotpink" />
            </mesh>
        </TransformControls>
    );
};

export default DraggableBox;
