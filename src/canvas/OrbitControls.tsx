import { OrbitControls as DreiOrbitControls } from "@react-three/drei";

export default function OrbitControls() {
  return (
    <DreiOrbitControls
      enableZoom
      enableRotate
      enablePan
    />
  );
}