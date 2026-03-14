import SolarSystem from "../canvas/SolarSystem";

export default function MarsScene() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-purple-500/30">
      <SolarSystem />
    </div>
  );
}