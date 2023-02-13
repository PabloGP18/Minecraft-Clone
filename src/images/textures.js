import { grassImg, dirtImg, logImg, glassImg, woodImg } from "./images";

import { NearestFilter, RepeatWrapping, TextureLoader } from "three";

// load images as texture
const grassTexture = new TextureLoader().load(grassImg);
const dirtTexture = new TextureLoader().load(dirtImg);
const logTexture = new TextureLoader().load(logImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);

// to repeat texture horizontally and vertically
grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;

// to make the image large and maintain the image quality
grassTexture.magFilter = NearestFilter;
dirtTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;

export { grassTexture, dirtTexture, logTexture, glassTexture, woodTexture };
