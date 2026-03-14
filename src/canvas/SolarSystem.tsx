import { Canvas } from "@react-three/fiber";

import Stars from "./Stars";
import Sun from "./Sun";
import Earth from "./Earth";
import Mars from "./Mars";
import Jupiter from "./Jupiter";
import OrbitControls from "./OrbitControls";
import Camera from "./Camera";

export default function SolarSystem() {
  return (
    <Canvas>
      <Camera />

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={3} />

      <Stars />

      <Sun />
      <Earth />
      <Mars />
      <Jupiter />

      <OrbitControls />
    </Canvas>
  );
}