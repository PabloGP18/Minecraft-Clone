import { useState, useEffect } from "react";

const useKeyboard = () => {
  const ACTIONS_KEYBOARD_MAP = {
    KeyZ: "moveForward", // keyW on Azerty keyboard
    KeyS: "moveBackward",
    KeyQ: "moveLeft", // keyA on Azerty keyboard
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };
  // state to move
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  // using useEffect to listen every event when you use the keyboard

  useEffect(() => {
    // to detect when you push a key
    const handleKeyDown = (event) => {
      const { code } = event;
      const action = ACTIONS_KEYBOARD_MAP[code];
      console.log(code);

      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: true,
        }));
      }
    };

    // to detect when you stop pushing a key
    const handleKeyUp = (event) => {
      const { code } = event;
      const action = ACTIONS_KEYBOARD_MAP[code];

      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: false,
        }));
      }
    };

    // adding to the DOM
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // removing it from the DOM
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return actions;
};

export default useKeyboard;
