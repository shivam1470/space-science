import { Stars as DreiStars } from "@react-three/drei";

export default function Stars() {
  return (
    <DreiStars
      radius={300}
      depth={60}
      count={5000}
      factor={7}
      saturation={0}
      fade
      speed={1}
    />
  );
}