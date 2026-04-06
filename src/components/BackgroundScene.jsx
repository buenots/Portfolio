import { Stars } from "@react-three/drei";
import { C } from "../constants";

export function BackgroundScene() {
  return (
    <group>
      <ambientLight intensity={0.1} />
      <pointLight color={C.neon} intensity={1.5} position={[4, 4, 4]} />
      <pointLight color="#ffffff" intensity={0.5} position={[-4, -3, 3]} />
      <Stars radius={25} depth={12} count={600} factor={2} saturation={0} fade speed={0.8} />
    </group>
  );
}
