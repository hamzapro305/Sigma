import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { DrawingActions } from "@/Redux/slices/DrawingSlice";
import { FC, useRef } from "react";
import { Mesh } from "three";
import { TransformControls } from "@react-three/drei";

const DraggableBox: FC<{ id: string }> = ({ id }) => {
    const { isSelected } = useAppSelector((s) => s.DrawingSlice);
    const meshRef = useRef<Mesh>(null);
    const dispatch = useAppDispatch();

    const SelectThisItemOnClick = () => {
        dispatch(DrawingActions.setSelectedItem(id));
    };

    return (
        <TransformControls
            object={meshRef.current as any}
            enabled={isSelected === id}
        >
            <mesh onClick={SelectThisItemOnClick} ref={meshRef}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color="hotpink" />
            </mesh>
        </TransformControls>
    );
};

export default DraggableBox;
