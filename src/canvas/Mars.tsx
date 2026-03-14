import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Mars() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    ref.current.rotation.y += 0.008;
  });

  return (
    <mesh ref={ref} position={[10, 0, 0]}>
      <sphereGeometry args={[0.9, 64, 64]} />
      <meshStandardMaterial color="#c1440e" />
    </mesh>
  );
}