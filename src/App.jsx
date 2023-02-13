import { Canvas } from "@react-three/fiber"; // Importing the canvas from the packaged fiber
import { Sky } from "@react-three/drei"; // Importing the sky from the packaged drei
import { Physics } from "@react-three/cannon";
import Ground from "./components/Ground";
import FPV from "./components/FPV";
import Player from "./components/Player";
import { Cubes } from "./components/Cubes";
import { TextureSelector } from "./components/TextureSelector";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          <Cubes />
          <Player />
          <Ground />
        </Physics>
      </Canvas>
      <div className="pointer">+</div>
      <TextureSelector />
    </>
  );
}

export default App;
