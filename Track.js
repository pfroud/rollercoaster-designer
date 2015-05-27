"use strict";

var LOADER = new THREE.JSONLoader(), SCALE = 0.01;

function Track() {
    this.trackArray = []; // OLD, may be Unnecessary
    this.trackMeshes = [];
    this.boundingBoxes = [];
    this.counter = 0; // OLD, may be unnecessary
    this.currentX = -1;
    this.currentY = 0;
    this.currentZ = 1;

    this.prevPiece = null;
    this.currPiece = null;

    this.jsonLoader = new THREE.JSONLoader();
    this.SCALE = 0.01;

    this.currFileName ="";
    this.direction = 0;
}



Track.prototype.insertTrack = function(piece){
    if (TRACK.currPiece != null){
        TRACK.prevPiece = TRACK.currPiece;
        TRACK.currpiece = piece;
    } else {
        TRACK.currPiece = piece;
    }

    LOADER.load(piece.filename,
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
/**
 * Function to generate a track piece.
 * @param: must be a JSON, or a string of the type
 */
function Piece (type){
    // making the fields so that WebStorm will not complain that they don't exist
    this.name;
    this.filename;
    this.size = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    this.preOffset;
    this.postOffset;

    // copy all fields in JSON to the piece
    if (typeof(type) == "string"){ // error handling
        var JSONType = TRACKTYPES[type];
        for (var key in JSONType){
            this[key.toString()] = JSONType[key.toString()];
        }
    } else{
        for (var key in type){
            this[key] = type[key];
        }
    }


    // TODO: implement position for pieces
    this.x;
    this.y;
    this.z;


    this.mesh;
    this.boundingBox;

    TRACK.trackArray.push(this);
    TRACK.insertTrack(this);
}

Piece.prototype.doPreCorrections = function(){
    TRACK.currentX -= this.preOffset;
    TRACK.currentY -= this.preOffset;
};


// aliasing piece insert to insert into the track
Piece.prototype.insert = function(){
    TRACK.insert(this);
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
