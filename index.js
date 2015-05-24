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
var slope = {
    flat: "flat",
    flatToUp: "flatToUp",
    upToFlat: "upToFlat",
    flatToDown: "flatToDown",
    downToFlat: "downToFlat"
};

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

    if (previousPiece == slope.upToFlat) {
        dX -= 0.08;
        dY += 0.17;
    }

    var mirror = false;


    /*
    downToFlat is flatToUp mirrored.
    flatToDown is upToFlat mirrored.
     */
    switch (currentPiece) {
        case slope.flat:
            filename = "modelJS/straight.js";
            break;
        case slope.downToFlat:
            mirror = true;
        //INTENTIONAL FALL-THROUGH (no break)
        case slope.flatToUp:
            filename = "modelJS/slopeFlatToUp.js";
            break;
        case slope.flatToDown:
            mirror = true;
            //INTENTIONAL FALL-THROUGH (no break)
        case slope.upToFlat:
            filename = "modelJS/slopeUpToFlat.js";
            dX -= 0.08; //need extra alignment for the slope
            dY += 0.264;
            break;
        default:
            throw "- bad track type \"" + currentPiece + "\"";
    }


    previousPiece = currentPiece;

    //createScene() is a callback function and is called asynchronously
    jsonLoader.load(filename,
        function createScene(geometry) { //argument geometry is provided by the json loader
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
            if (mirror) {
                console.log("mirrored a thing");
                var mat = (new THREE.Matrix4()).identity();
                mat.elements[10] = -1; //mirror the mesh
                mesh.applyMatrix(mat);
            }
            mesh.scale.set(scale, scale, scale);
            mesh.position.x = currentX += dX;
            mesh.position.y = currentY += dY;
            mesh.position.z = currentZ += dZ;


            scene.add(mesh);
            addPieces(); //recur
        });
}

var pieces = [
    slope.flat,
    slope.flatToUp,
    slope.upToFlat,
    slope.flatToDown,
    slope.downToFlat,
    slope.flat
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

/*************************** WINDOW RESIZE FIX ********************************
 from
 http://stackoverflow.com/questions/20290402/three-js-resizing-canvas
 */
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


/*************************** RENDER *********************************/
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
};
render();