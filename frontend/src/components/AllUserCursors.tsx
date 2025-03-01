import { useAppSelector } from "@/Redux/Hooks";
import { UserCursor } from "@/Redux/slices/DrawingSlice";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FC } from "react";
import * as THREE from "three";

const AllUserCursors = () => {
    const users = useAppSelector((s) => s.DrawingSlice.users);

    return (
        <group>
            {users.map((user) => (
                <UserCursorComponent key={user.name} user={user} />
            ))}
        </group>
    );
};

type UserCursorComponentT = {
    user: UserCursor;
};

const UserCursorComponent: FC<UserCursorComponentT> = ({ user }) => {
    const cursorTexture = useLoader(THREE.TextureLoader, "/cursor.png");

    const { position } = useSpring({
        position: [user.x, user.y, 1],
        config: { mass: 0.2, tension: 120, friction: 14 },
    });

    return (
        <animated.group position={position as unknown as THREE.Vector3Tuple}>
            <sprite>
                <spriteMaterial attach="material" map={cursorTexture} />
            </sprite>
            <Text position={[0, -0.8, 0]} fontSize={0.3} color="black">
                {user.name}
            </Text>
        </animated.group>
    );
};

export default AllUserCursors;
