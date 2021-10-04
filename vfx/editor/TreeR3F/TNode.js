import { Text } from "@react-three/drei";

export function TNode({ item }) {
  return (
    <group>
      <Text>{item.name}</Text>
    </group>
  );
}
