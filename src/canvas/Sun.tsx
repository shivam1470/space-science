export default function Sun() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        emissive="yellow"
        color="orange"
        emissiveIntensity={2}
      />
    </mesh>
  );
}