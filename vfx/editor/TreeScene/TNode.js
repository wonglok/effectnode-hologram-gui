import { Text } from "@react-three/drei";

export function TNode({ item, hasChildren, level, onToggle, idx, height }) {
  return (
    <group position={[0, 0, 0]}>
      <Text position={[0, 0, 0]}>{item.name}</Text>
    </group>
  );
}
