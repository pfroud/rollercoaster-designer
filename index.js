/*************************** SETUP *********************************/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera.position.y = 2;
camera.position.z = 5;
//camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

/*************************** CONSTANTS *********************************/

function doPreCorrections(piece) {
    switch (piece) {
        case slope.flat:
        case slope.downToFlat:
        case slope.flatToUp:
            break;

        case slope.flatToDown:
        case slope.upToFlat:
            console.log("correcting c");
            currentX -= 0.1188; //left
            currentY -= 0.1188; //down
            //currentZ += 0.4079999908804893;
            break;
        default:
            throw "- bad track type \"" + piece + "\"";
    }
}




/*
 DO NOT CHANGE THESE NUMBERS
 */
/*
 downToFlat is flatToUp mirrored.
 flatToDown is upToFlat mirrored.
 */
function advanceCurrent(piece) {
    switch (piece) {
        case slope.flat:
            console.log("a");
            currentX += 0.5999999865889549;
            //currentY += 0.1679979962449521;
            //currentZ += 0.40799499088060115;
            break;

        case slope.downToFlat:
        case slope.flatToUp:
            console.log("b");
            currentX += 0.6433779856193811;
            currentY += 0.38746599133946;
            //currentZ += 0.4079999908804893;
            break;

        case slope.flatToDown:
        case slope.upToFlat:
            console.log("c");
            currentX += 0.5245829882746562;
            currentY += 0.3382589924393222;
            //currentZ += 0.4079999908804893;
            break;
        default:
            throw "- bad track type \"" + piece + "\"";
    }

    if(prevPiece == slope.upToFlat) {
        currentY -= 0.1679979962449521; //Y size of flat
    }
}


/*************************** TRACK *********************************/

/*
 in current camera:
 +X is right, -X is left
 +Y is up, -Y is down
 Z is forward / back
 */

//starting coordinates of track
var currentX = -1.7, //start to the left a bit
    currentY = -0.5,
    currentZ = 0;

//fake enum type
var slope = {
    flat: "flat",
    flatToUp: "flatToUp",
    upToFlat: "upToFlat",
    flatToDown: "flatToDown",
    downToFlat: "downToFlat"
};

var prevPiece, currentPiece; //needs to be global?

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

    var filename = ""; //gets set depending on which piece you want
    currentPiece = pieces.shift(); //removes and returns the first element in array
    var mirror = false;

    /*
     +X is right, -X is left
     +Y is up, -Y is down
     +Z is forward, -Z is back
     */

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
        //intentional fall-through (no break)

        case slope.flatToUp:
            filename = "modelJS/slopeFlatToUp.js";
            break;

        case slope.flatToDown:
            mirror = true;
        //intentional fall-through (no break)

        case slope.upToFlat:
            filename = "modelJS/slopeUpToFlat.js";
            break;

        default:
            throw "- bad track type \"" + currentPiece + "\"";
    }

    prevPiece = currentPiece;

    //createScene() is a callback function and is called asynchronously
    jsonLoader.load(filename,
        function createScene(geometry) { //argument geometry is provided by the json loader
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

            if (mirror) {
                console.log("MIRROR");
                var mat = (new THREE.Matrix4()).identity();
                mat.elements[10] = -1;
                mesh.applyMatrix(mat);
            }

            doPreCorrections(currentPiece);

            mesh.position.x = currentX;
            mesh.position.y = currentY;
            mesh.position.z = currentZ;
            mesh.scale.set(scale, scale, scale);

            advanceCurrent(currentPiece);


            scene.add(mesh);
            addPieces(); //recur
        });
}


var pieces = [
    slope.flat,
    slope.flat,
    slope.flatToUp,
    slope.upToFlat,
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