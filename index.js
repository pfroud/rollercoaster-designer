/*************************** SETUP *********************************/
var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
var a = 2;
var aspect = window.innerWidth/window.innerHeight;
console.log(aspect);
camera = new THREE.OrthographicCamera(-a*aspect, a*aspect, 2, -2, 1, 10000);
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

// http://stackoverflow.com/questions/23859512/how-to-get-the-width-height-length-of-a-mesh-in-three-js
const size = {

    flat: {
        x: 0.5999999865889549,
        y: 0.1679979962449521,
        z: 0.40799499088060115
    },

    //---------------------------

    //SAME SIZE
    downToFlat: {
        x: 0.6433779856193811,
        y: 0.38746599133946,
        z: 0.4079999908804893
    },
    flatToUp: {
        x: 0.6433779856193811,
        y: 0.38746599133946,
        z: 0.4079999908804893
    },

    //---------------------------

    //SAME SIZE
    flatToDown: {
        x: 0.5245829882746562,
        y: 0.3382589924393222,
        z: 0.4079999908804893
    },
    upToFlat: {
        x: 0.5245829882746562,
        y: 0.3382589924393222,
        z: 0.4079999908804893
    },

    //---------------------------

    //SAME SIZE
    up: {
        x: 0.5430565758606418,
        y: 0.5430565758606419,
        z: 0.40799499088060115
    },
    down: {
        x: 0.5430565758606418,
        y: 0.5430565758606419,
        z: 0.40799499088060115
    }

};

/*
 in current camera:
 +X is right, -X is left
 +Y is up, -Y is down
 Z is forward / back
 */
function doPreCorrections(piece) {
    switch (piece) {
        case slope.flat:
        case slope.down:
        case slope.downToFlat:
        case slope.flatToUp:
            break;

        case slope.up:
            //currentY -= 0.12;
            //currentX -= 0.001;
            break;

        case slope.flatToDown:
            currentY -= size.flat.y + 0.002; //move down a tiny bit extra
            break;
        case slope.upToFlat:
            //currentX -= 0.1188; //left
            //currentY -= 0.1188; //down
            break;
        default:
            throw "- bad track type \"" + piece + "\"";
    }

    if (mirror) {
        currentZ -= size.flatToDown.z;
        currentX += size.flatToDown.x;
    }

}

/*
 in current camera:
 +X is right, -X is left
 +Y is up, -Y is down
 Z is forward / back
 */

/*
 downToFlat is flatToUp mirrored.
 flatToDown is upToFlat mirrored.
 */
function advanceCurrent(piece) {
    switch (piece) {
        case slope.down:
        case slope.up:
            currentX += size.up.x - 0.1188;
            currentY += size.up.y - 0.1188;
            break;

        case slope.flat:
            currentX += size.flat.x;
            break;

        case slope.downToFlat:
        case slope.flatToUp:
            currentX += size.downToFlat.x - 0.001;
            currentY += size.downToFlat.y - 0.12;
            break;

        case slope.flatToDown:
            currentX += size.flatToDown.x;
            currentY -= size.flatToDown.y;
            break;
        case slope.upToFlat:
            currentX += size.flatToDown.x;
            currentY += size.flatToDown.y;
            break;
        default:
            throw "- bad track type \"" + piece + "\"";
    }

    if (prevPiece == slope.upToFlat) {
        currentY -= size.flat.y;
    }
}


/*************************** TRACK *********************************/



//starting coordinates of track
var currentX = -1, //start to the left a bit
    currentY = -0.5,
    currentZ = 0;

//fake enum type
var slope = {
    flat: "flat",
    flatToUp: "flatToUp",
    upToFlat: "upToFlat",
    flatToDown: "flatToDown",
    downToFlat: "downToFlat",
    down: "down",
    up: "up"
};

var prevPiece, currentPiece; //needs to be global?
var mirror = false, down = false, up = false;

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

    mirror = false, down = false, up = false;

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
        case slope.down:
            down = true;
            filename = "modelJS/straight.js";
            break;

        case slope.up:
            up = true;
            filename = "modelJS/straight.js";
            break;

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
                var mat = (new THREE.Matrix4()).identity();
                mat.elements[10] = -1;
                mesh.applyMatrix(mat);
            }

            if (down) {
                mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 4);
            }
            if (up) {
                mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 4);
            }


            doPreCorrections(currentPiece);

            mesh.position.x = currentX;
            mesh.position.y = currentY;
            mesh.position.z = currentZ;
            mesh.scale.set(scale, scale, scale);

            advanceCurrent(currentPiece);

            scene.add(mesh);
            scene.add(new THREE.BoxHelper(mesh));
            addPieces(); //recur
        });
}


var pieces = [
    slope.flat,
    slope.flatToUp,
    slope.up,
    slope.upToFlat
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
var skyboxSize = 6; // was 1000
var skybox = new THREE.Mesh(
    new THREE.BoxGeometry(skyboxSize, skyboxSize, skyboxSize),
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