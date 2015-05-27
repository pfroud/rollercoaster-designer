"use strict";

// GLOBAL VARIABLES ============================================================
var TRACK = new Track();

/**
 * @summary Track object, referred to by global variable TRACK
 * @constructor
 * @type: class
 *
 * @member pieces: list of all track pieces. Must be of class type Piece
 * @see Piece.js
 *
 * @member trackMeshes: list of all the meshes of the track. May also be
 * accessed through pieces[pieceIndex].mesh
 *
 * @private boundingBoxes: list of all the bounding boxes of the pieces. May also
 * be accessed through pieces[pieceIndex].boundingBox
 *
 * @member currentX currentY currentZ: the current position in the scene of the
 * end of the track
 *
 * @member prevPiece: the piece directly before the current piece. May also be
 * accessed through pieces[pieces.length - 2]
 *
 * @member currPiece: the last piece on the track. May also be accessed
 * through pieces[pieces.length -1]
 *
 * @jsonLoader: the jsonloader for THREE.js to access
 *
 * @scale: the global scale variable imported, allowed so that if we wish to
 * overload we don't need to change the global
 */

function Track() {
    this.pieces = [];
    this.trackMeshes = [];
    this.boundingBoxes = [];
    this.currentX = -1;
    this.currentY = 0;
    this.currentZ = 1;

    this.prevPiece = null;
    this.currPiece = null;

    this.jsonLoader = new THREE.JSONLoader();
    this.scale = SCALE;

    this.direction = 0;
}


/**
 * Inserts the piece into the world and appends it to the track
 * @param piece must be an object of class type Piece
 * @see Piece.js
 */
Track.prototype.insertPiece = function (piece){
    if (this.currPiece != null){
        this.prevPiece = this.currPiece;
        this.currpiece = piece;
    } else {
        this.currPiece = piece;
    }

    this.jsonLoader.load(piece.filename, /*this.createScene(geometry)*/
        function createScene(geometry) {

            if (TRACK == undefined){
                throw "ERROR: GLOBAL NOT DEFINED";
            } else {
                var track = TRACK;
            }
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
            mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2 * TRACK.direction); //IN PROGREESS
            mesh.position.x = TRACK.currentX;
            mesh.position.y = TRACK.currentY;
            mesh.position.z = TRACK.currentZ;
            mesh.scale.set(SCALE, SCALE, SCALE);
            scene.add(mesh);
            
            TRACK.doPreCorrections(); //moves where the current piece will go

            piece.mesh = mesh;

            TRACK.advanceCurrent(); //moves where the next piece will go


            TRACK.trackMeshes.push(mesh);
            var bbox = new THREE.BoxHelper(mesh);
            TRACK.boundingBoxes.push(bbox);
            scene.add(bbox);
        }
    );
};


/**
 * Inserts multiple pieces from an array. Works recursively
 * @param pieces: an array of pieces
 */
Track.prototype.insertPieces = function(pieces){
    if (pieces.length == 0) return;
    this.insertPiece(pieces.pop());
    this.insertPieces(pieces);
};


// UNUSED PROTOTYPE CODE
Track.prototype.createScene = function(geometry){
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2 * TRACK.direction); //IN PROGREESS
    mesh.position.x = this.currentX;
    mesh.position.y = this.currentY;
    mesh.position.z = this.currentZ;
    mesh.scale.set(SCALE, SCALE, SCALE);
    scene.add(mesh);

    this.doPreCorrections(); //moves where the current piece will go



    piece.mesh = mesh;

    this.advanceCurrent(); //moves where the next piece will go


    this.trackMeshes.push(mesh);
    var bbox = new THREE.BoxHelper(mesh);
    this.boundingBoxes.push(bbox);
    scene.add(bbox);
};


/**
 * Advances currentX, CurrentY, and CurrentZ based on the new piece
 * TODO: rotations and the Y plane
 */
Track.prototype.advanceCurrent = function(){
    this.currentX += this.currPiece.size.x;
};

/**
 * Does the precorrections necessary
 * TODO: implement
 */
Track.prototype.doPreCorrections = function (){
    console.log("precorrections!");

};

/**
 * TODO: lots of testing
 */

Track.prototype.delete = function () {
    if (this.trackMeshes.length > 0){
        scene.remove(trackMeshes.pop());
    }
    if (this.boundingBoxes.length > 0){
        scene.remove(allBoundingBoxes.pop());
    }

};

// Deletes all tracks.
Track.prototype.deleteAll = function () {
    for (var i = this.trackMeshes.length; i > 0; i--){
        this.delete()
    }
};

Track.prototype.toggleBoxes = function(){
    var numBoxes = this.boundingBoxes.length;
    if (numBoxes == 0) {
        for (i = 0; i < this.trackMeshes.length; i++){
            var bbox = new THREE.BoxHelper(this.trackMeshes[i]);
            this.boundingBoxes.push(bbox);
            scene.add(bbox);
        }
        return;
    }
    for (i = 0; i < numBoxes; i++){
        scene.remove(this.boundingBoxes.pop());
    }

};


// =============================================================================
// TESTING GUI FOR CODE ========================================================
// =============================================================================
var testingFolder = mainMenu.addFolder("New Track code");

var testingButtonJson = {
  Flat: function(){
      new Piece(TRACKTYPES.FLAT);
  }
};


testingFolder.add(testingButtonJson,"Flat");
testingFolder.open();
