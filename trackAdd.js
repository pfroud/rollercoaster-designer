"use strict";

//starting coordinates of track
var currentX = -1,
    currentY = 0,
    currentZ = 1;

var allTracks = [];
var allBoundingBoxes = [];

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
            allTracks.push(mesh);
            var bbox = new THREE.BoxHelper(mesh);
            allBoundingBoxes.push(bbox);
            scene.add(bbox); //draws the yellow bounding boxes
            //console.log(new THREE.Box3().setFromObject(mesh).size()); //use this to measure the size of each mesh
            addPieces(); //recur
        }
    );
}


var pieces = [
    slope.flat, //uncomment to start with some tracks
    slope.flatToUp,
    slope.up,
    slope.upToFlat

];

// addPieces();


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

function advanceCurrent(piece) {
    switch (piece) {
        case slope.up:
            currentX += size.up.x - 0.1188;
            currentY += size.up.y - 0.1188;
            break;
        case slope.flat:
            if (direction == 0) { //IN PROGRESS
                currentX += size.flat.x;
            } else if (direction == 1) {
                currentZ -= size.flat.x; //move on the Z direction by the x size of the piece
            }
            break;
        case slope.flatToUp:
            currentX += size.flatToUp.x - 0.12;
            currentY += size.flatToUp.y - 0.12;
            break;
        case slope.upToFlat:
            currentX += size.upToFlat.x;
            currentY += size.upToFlat.y;
            break;
        case slope.flatToDown:
            currentX += size.flatToDown.x - 0.12;
            break;
        case slope.down:
            currentX += size.down.x - 0.1188;
            break;
        case slope.downToFlat:
            currentX += size.downToFlat.x;
            break;
        case slope.turnLeftSmall:
            currentX += size.turnLeftSmall.x;
            currentZ -= size.turnLeftSmall.z;
            direction = 1;
            break;

        default:
            throw "- bad track type \"" + piece + "\"";
    }

    if (prevPiece == slope.upToFlat) {
        currentY -= size.flat.y;
    }
}

/*
 in current camera:
 +X is right, -X is left
 +Y is up, -Y is down
 Z is forward / back
 */
/**
 * sets where the current piece goes
 * @param piece
 */
function doPreCorrections(piece) {
    switch (piece) {
        case slope.flatToUp:
        case slope.upToFlat:
        case slope.up:
        case slope.flat:
        case slope.turnLeftSmall:
            break;

        case slope.down:
            currentY -= size.down.y - 0.12;
            break;
        case slope.downToFlat:
            currentY -= size.downToFlat.y - 0.12;
            break;
        case slope.flatToDown:
            //moves the top of flatToDown to the top of flat. you can uncomment to see why needed
            currentY -= size.flat.y + 0.002;
            break;
        default:
            throw "- bad track type \"" + piece + "\"";
    }

}

