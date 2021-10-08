import { useProgress } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function Loading() {
  let { total, loaded } = useProgress();
  let { get } = useThree();
  return (
    <group>
      {createPortal(
        <group position={[0, 0, -3]}>
          <Text color={"black"}>
            Loading: {loaded} / {total}
          </Text>
        </group>,
        get().camera
      )}
      <primitive object={get().camera}></primitive>
    </group>
  );
}
