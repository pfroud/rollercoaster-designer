"use strict";

//starting coordinates of track
var currentX = -1,
    currentY = 0,
    currentZ = 1;

var prevPiece, currentPiece;
var jsonLoader = new THREE.JSONLoader(),
    scale = 0.01; //how much to scale every piece by

var filename = ""; //gets set to the javascript file with the model in setFilename()

var direction = 0; //IN PROGRESS

/**
 * This is pretty terrible. The hard-coded alignment numbers work. It can probably be simplified.
 *
 * jsonLoader.load() calls a callback function which runs asynchronously, so jsonLoader.load() calls addPieces().
 * Thus you only call addPieces() once and they all get added.
 */
function addPieces() {
    if (pieces.length == 0) return; //recursion base case

    filename = "";
    currentPiece = pieces.shift(); //removes and returns the first element in array

    setFilename();

    prevPiece = currentPiece;

    //createScene() is a callback function and is called asynchronously
    jsonLoader.load(filename,
        function createScene(geometry) { //argument geometry is provided by the json loader
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

            doPreCorrections(currentPiece); //moves where the current piece will go

            mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2 * direction); //IN PROGREESS
            mesh.position.x = currentX;
            mesh.position.y = currentY;
            mesh.position.z = currentZ;
            mesh.scale.set(scale, scale, scale);

            advanceCurrent(currentPiece); //moves where the next pece will go

            scene.add(mesh);
            scene.add(new THREE.BoxHelper(mesh)); //draws the yellow bounding boxes
            //console.log(new THREE.Box3().setFromObject(mesh).size()); //use this to measure the size of each mesh
            addPieces(); //recur
        });


}


var pieces = [
/*    slope.flat, //uncomment to start with some tracks
    slope.turnLeftSmall,
    slope.turnLeftSmall,
    slope.flat,
    slope.flat*/
];

addPieces();


/*
 +X is right, -X is left
 +Y is up, -Y is down
 +Z is forward, -Z is back
 */
function setFilename() {
    switch (currentPiece) {
        case slope.down:
            filename = "modelJS/down.js";
            break;
        case slope.up:
            filename = "modelJS/up.js";
            break;
        case slope.flat:
            filename = "modelJS/straight.js";
            break;
        case slope.downToFlat:
            filename = "modelJS/slopeDownToFlat.js";
            break;
        case slope.flatToUp:
            filename = "modelJS/slopeFlatToUp.js";
            break;
        case slope.flatToDown:
            filename = "modelJS/slopeFlatToDown.js";
            break;
        case slope.upToFlat:
            filename = "modelJS/slopeUpToFlat.js";
            break;
        case slope.turnLeftBig:
            filename = "modelJS/turnLeftBig.js";
            break;
        case slope.turnLeftSmall:
            filename = "modelJS/turnLeftSmall.js";
            break;
        case slope.turnRightBig:
            filename = "modelJS/turnRightBig.js";
            break;
        case slope.turnRightSmall:
            filename = "modelJS/turnRightSmall.js";
            break;
        default:
            throw "- bad track type \"" + currentPiece + "\"";
    }
}