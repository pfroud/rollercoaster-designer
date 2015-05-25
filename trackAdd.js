"use strict";

//starting coordinates of track
var currentX = -2, //start to the left a bit
    currentY = -1,
    currentZ = 0;

var prevPiece, currentPiece; //needs to be global?
var jsonLoader = new THREE.JSONLoader(), //does the heavy lifting
    scale = 0.01; //how much to scale every piece by
var filename = "";

/**
 * This is pretty terrible. The hard-coded alignment numbers work. It can probably be simplified.
 *
 * jsonLoader.load() calls a callback function which runs asynchronously, so jsonLoader.load() calls addPieces().
 * Thus you only call addPieces() once and they all get added.
 */
function addPieces() {
    if (pieces.length == 0) return; //recursion base case

    filename = ""; //gets set depending on which piece you want
    currentPiece = pieces.shift(); //removes and returns the first element in array

    setFilename();

    prevPiece = currentPiece;

    //createScene() is a callback function and is called asynchronously
    jsonLoader.load(filename,
        function createScene(geometry) { //argument geometry is provided by the json loader
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

            doPreCorrections(currentPiece);

            mesh.position.x = currentX;
            mesh.position.y = currentY;
            mesh.position.z = currentZ;
            mesh.scale.set(scale, scale, scale);

            advanceCurrent(currentPiece);

            scene.add(mesh);
            scene.add(new THREE.BoxHelper(mesh));
            //console.log(new THREE.Box3().setFromObject(mesh).size());
            addPieces(); //recur
        });


}


var pieces = [
    slope.flat,
    slope.turnLeftSmall,
    slope.flat
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