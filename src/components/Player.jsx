import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import useKeyboard from "../hooks/useKeyboard";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4;

const Player = () => {
  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboard();

  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  // position player
  const position = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => (position.current = p));
  }, [api.position]);

  // velocity player
  const velocity = useRef([0, 0.5, 0]);

  useEffect(() => {
    api.velocity.subscribe((p) => (velocity.current = p));
  }, [api.velocity]);

  useFrame(() => {
    //This is to put the camera on the same position as the player
    camera.position.copy(
      new Vector3(
        position.current[0], // x
        position.current[1], // y
        position.current[2] // Z)
      )
    );

    const direction = new Vector3();

    // moving forward
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    // moving sideways
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(CHARACTER_SPEED)
      .applyEuler(camera.rotation);

    // This is controlling the camera
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    // this is controlling the jump and also preventing that you can jump 2 before you touch the ground
    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(
        velocity.current[0],
        CHARACTER_JUMP_FORCE,
        velocity.current[2]
      );
    }
  });

  return <mesh ref={ref} />;
};

export default Player;
