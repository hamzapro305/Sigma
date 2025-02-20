import { useAppSelector } from "@/Redux/Hooks";
import { Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const AllUserCursors = () => {
    const users = useAppSelector((s) => s.CursorSlice.users);
    const cursorTexture = useLoader(THREE.TextureLoader, "/cursor.png");

    return (
        <group>
            {users.map((user, index) => (
                <group key={index} position={[user.x, user.y, 1]}>
                    {/* Cursor Image */}
                    <sprite
                        material={
                            new THREE.SpriteMaterial({ map: cursorTexture })
                        }
                    />

                    {/* Username */}
                    <Text position={[0, -0.8, 0]} fontSize={0.3} color="black">
                        {user.name}
                    </Text>
                </group>
            ))}
        </group>
    );
};

export default AllUserCursors;
