import { useStore } from "../hooks/useStore";
import { Cube } from "./Cube";

export const Cubes = () => {
  // this will manage and rander the state from cubes in Usestore.js
  const [cubes] = useStore((state) => [state.cubes]);

  return cubes.map(({ id, position, texture }) => {
    return <Cube key={id} id={id} position={position} texture={texture} />;
  });
};
