"use strict";

// GLOBAL VARIABLES ============================================================
var i = 0;

var LOADER = new THREE.JSONLoader(), SCALE = 0.01;

/**
 * Track object, referred to by global variable TRACK
 * @constructor
 *
 *
 *
 */

function Track() {
    this.trackArray = [];
    this.trackMeshes = [];
    this.boundingBoxes = [];
    this.counter = 0; // OLD, may be unnecessary
    this.currentX = -1;
    this.currentY = 0;
    this.currentZ = 1;

    this.prevPiece = null;
    this.currPiece = null;

    this.jsonLoader = new THREE.JSONLoader();
    this.scale = SCALE;

    this.direction = 0;
}



Track.prototype.insertTrack = function(piece){
    if (this.currPiece != null){
        this.prevPiece = TRACK.currPiece;
        this.currpiece = piece;
    } else {
        this.currPiece = piece;
    }

    this.jsonLoader.load(piece.filename,
        function createScene(geometry) {

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



Track.prototype.advanceCurrent = function(){
    console.log("advance Current!");
    this.currentX += this.currPiece.size.x;
};

Track.prototype.doPreCorrections = function (){
    console.log("precorrections!");

};

// inserts an array of pieces
Track.prototype.insertPieces = function (pieces){
  for (var i = pieces.length; i > 0; i--){
      this.insert(pieces.pop());
  }
};

// TODO: lots of testing
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


// Global variable for the track
  var TRACK = new Track();

//var tmpPiece = new Piece(TRACKTYPES.FLAT);
//insertTrack(tmpPiece);

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
