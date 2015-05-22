/*************************** SETUP *********************************/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera.position.y = 2;
camera.position.z = 5;
//camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

/*************************** TRACK *********************************/

/*
 in current camera:
 +X is right, -X is left
 +Y is up, -Y is down
 Z is forward / back
 */

//starting coordinates of track
var currentX = -3, //start to the left a bit
    currentY = 0,
    currentZ = 0;

//fake enum type
var trackType = {straight: "straight", slopeFlatToUp: "slopeFlatToUp", slopeUpToFlat: "slopeUpToFlat"};

var previousPiece; //needs to be global

var jsonLoader = new THREE.JSONLoader(), //does the heavy lifting
    scale = 0.01; //how much to scale every piece by

/**
 * This is pretty terrible. The hard-coded alignment numbers work. It can probably be simplified.
 *
 * jsonLoader.load() calls a callback function which runs asynchronously, so jsonLoader.load() calls addPieces().
 * Thus you only call addPieces() once and they all get added.
 */
function addPieces() {
    if (pieces.length == 0) return; //recursion base case

    var filename = "", //gets set depending on which piece you want
    //these are used for alignment:
        dX = 0.6, //length of every piece
        dY = 0,
        dZ = 0;

    var currentPiece = pieces.shift(); //removes and returns the first element in array

    if (previousPiece == trackType.slopeUpToFlat) {
        dX -= 0.08;
        dY += 0.17;
    }

    if (currentPiece == trackType.straight) {
        filename = "modelJS/straight.js";

    } else if (currentPiece == trackType.slopeFlatToUp) {
        filename = "modelJS/slopeFlatToUp.js";

    } else if (currentPiece == trackType.slopeUpToFlat) {
        filename = "modelJS/slopeUpToFlat.js";
        dX -= 0.08; //need extra alignment for the slope
        dY += 0.264;

    } else {
        throw "bad track type";
    }

    previousPiece = currentPiece;

    //createScene() is a callback function and is called asynchronously
    jsonLoader.load(filename,
        function createScene(geometry) { //argument geometry is provided by the json loader
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
            mesh.scale.set(scale, scale, scale);
            mesh.position.x = currentX += dX;
            mesh.position.y = currentY += dY;
            mesh.position.z = currentZ += dZ;
            scene.add(mesh);
            addPieces(); //recur
        });
}

var pieces = [
    trackType.straight,
    trackType.straight,
    trackType.slopeFlatToUp,
    trackType.slopeUpToFlat,
    trackType.straight,
    trackType.slopeFlatToUp,
    trackType.slopeUpToFlat,
    trackType.straight
];

addPieces();


/*************************** SKYBOX *********************************/

var skyboxImages = [
    "skybox/skybox1.jpg",
    "skybox/skybox2.jpg",
    "skybox/skybox3.jpg",
    "skybox/skybox4.jpg",
    "skybox/skybox5.jpg",
    "skybox/skybox6.jpg"
];

var cubemap = THREE.ImageUtils.loadTextureCube(skyboxImages); // load textures
cubemap.format = THREE.RGBFormat;

var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
shader.uniforms['tCube'].value = cubemap; // apply textures to shader

// create shader material
var skyBoxMaterial = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
});

// create skybox mesh
var skybox = new THREE.Mesh(
    new THREE.BoxGeometry(1000, 1000, 1000),
    skyBoxMaterial
);
scene.add(skybox);


/*************************** RENDER *********************************/
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
};
render();