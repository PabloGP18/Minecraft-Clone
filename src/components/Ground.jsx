import { usePlane } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";
import { grassTexture } from "../images/textures";

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // x, y, z rotation for 3D
    position: [0, -0.5, 0], // x, y, z position for 3D
  }));

  // state to addCubes from global context state useStore
  const [addCube] = useStore((state) => [state.addCube]);

  // to repeat the image of grassTexture
  grassTexture.repeat.set(100, 100);

  const handleClickGround = (event) => {
    event.stopPropagation(); // to not go true the ground
    console.log(event.point);
    const [x, y, z] = Object.values(event.point).map((n) => Math.ceil(n));
    addCube(x, y, z);
  };

  return (
    <mesh onClick={handleClickGround} ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={grassTexture} />
    </mesh>
  );
};

export default Ground;
