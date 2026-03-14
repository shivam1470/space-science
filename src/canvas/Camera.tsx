import { PerspectiveCamera } from "@react-three/drei";

export default function Camera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 10, 20]}
      fov={60}
    />
  );
}