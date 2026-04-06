import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { C } from "../constants";

export function FluidBlob() {
  const meshRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;

      // Mouse reactivity (subtle follow)
      // Pointer brings values from -1 to 1 basically
      meshRef.current.position.x += (pointer.x * 2 - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (pointer.y * 2 - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color={C.neon} />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#ffffff" />
      
      <Sphere ref={meshRef} visible args={[2.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color={C.bg} // dark base
          emissive={C.neon} // glowing green/yellow
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.4} // strong distortion
          speed={2} // speed of liquid movement
        />
      </Sphere>
    </group>
  );
}
