import { Text } from "@react-three/drei";

export function TNode({ item, hasChildren, level, onToggle, idx, height }) {
  return (
    <group position={[0, 0, 0]}>
      <Text position={[0, 0, 0]}>{item.name}</Text>

      {hasChildren && (
        <group position={[-0.5, -0.1, 0]} onClick={onToggle}>
          <Text>toggle</Text>
        </group>
      )}
    </group>
  );
}
