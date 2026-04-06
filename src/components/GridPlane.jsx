import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { C } from "../constants";

export function GridPlane() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 2.0; 
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        pos.setY(i, Math.sin((x + t * 0.4) * 0.5) * 0.2 + Math.cos((z + t * 0.3) * 0.5) * 0.2);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[30, 30, 40, 40]} />
      <meshBasicMaterial color={C.neon} wireframe transparent opacity={0.05} />
    </mesh>
  );
}
