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

    var prevPiece = null;
    var currPiece = null;

    var jsonLoader = new THREE.JSONLoader();
    var SCALE = 0.01

    var currFileName ="";
    var direction = 0;
}


// TODO
function insertTrack(piece) {
    // this.counter++;
    // piece.key = this.counter;
    // this.trackArray[String(this.counter)] = piece;
/*
    if (piece == undefined){
        return;
    }
*/
    if (TRACK.currPiece != null){
        TRACK.prevPiece = TRACK.currPiece;
        TRACK.currpiece = piece;
    } else {
        TRACK.currPiece = piece;
    }

    LOADER.load(piece.filename,
        function createScene(geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

            TRACK.doPreCorrections(currentPiece); //moves where the current piece will go

            mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2 * TRACK.direction); //IN PROGREESS
            mesh.position.x = TRACK.currentX;
            mesh.position.y = TRACK.currentY;
            mesh.position.z = TRACK.currentZ;
            mesh.scale.set(TRACK.scale, TRACK.scale, TRACK.scale);

            piece.mesh = mesh;

            TRACK.advanceCurrent(currentPiece); //moves where the next piece will go

            scene.add(mesh);
            TRACK.trackMeshes.push(mesh);
            var bbox = new THREE.BoxHelper(mesh);
            TRACK.boundingBoxes.push(bbox);
            scene.add(bbox); //draws the yellow bounding boxes
            // insertTrack();
        }
    );
}

Track.prototype.createTrack = function(geometry){
    var mesh = new THREE.mesh(geometry, new THREE.MeshNormalMaterial());

    TRACK.doPreCorrections(currentPiece); //moves where the current piece will go

    mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2 * TRACK.direction); //IN PROGREESS
    mesh.position.x = TRACK.currentX;
    mesh.position.y = TRACK.currentY;
    mesh.position.z = TRACK.currentZ;
    mesh.scale.set(SCALE, SCALE, SCALE);

    piece.mesh = mesh;

    TRACK.advanceCurrent(currentPiece); //moves where the next piece will go

    scene.add(mesh);
    TRACK.trackMeshes.push(mesh);
    var bbox = new THREE.BoxHelper(mesh);
    TRACK.boundingBoxes.push(bbox);
    scene.add(bbox); //draws the yellow bounding boxes
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
 * Checks integrity of a track.
 * Iterates over all the track pieces and makes sure the out properties
 * of piece n equal the in properties of piece n+1.
 *
 * @returns {boolean} True if the track is valid.
 */
Track.prototype.validate = function () {
    if (this.this.trackArray.length == 1) return true;

    var currentPiece;

    //for loop starts at 1, this is initial stuff to compare with
    var xOut_prev = this.trackArray[0].xOut;
    var yOut_prev = this.trackArray[0].yOut;
    var zOut_prev = this.trackArray[0].zOut;
    var slopeOut_prev = this.trackArray[0].slopeOut;
    var dirOut_prev = this.trackArray[0].dirOut;

    //these get set in the fop loop
    var xIn_curr;
    var yIn_curr;
    var zIn_curr;
    var slopeIn_curr;
    var dirIn_curr;

    for (var i = 1; i < this.trackArray.length; i++) {
        currentPiece = this.trackArray[i];

        xIn_curr = currentPiece.xIn;
        yIn_curr = currentPiece.yIn;
        zIn_curr = currentPiece.zIn;
        slopeIn_curr = currentPiece.slopeIn;
        dirIn_curr = currentPiece.dirIn;

        if (xOut_prev != xIn_curr) {
            throw "Track.validate(): at index " + i + ": xOut_prev=" +
            xOut_prev + " but xIn_curr=" + xIn_curr;
        }
        if (yOut_prev != yIn_curr) {
            throw "Track.validate(): at index " + i + ": yOut_prev=" +
            yOut_prev + " but yIn_curr=" + yIn_curr;
        }
        if (zOut_prev != zIn_curr) {
            throw "Track.validate(): at index " + i + ": zOut_prev=" +
            zOut_prev + " but zIn_curr=" + zIn_curr;
        }
        if (slopeOut_prev != slopeIn_curr) {
            throw "Track.validate(): at index " + i +
            ": slopeOut_prev=" + slopeOut_prev +
            " but slopeIn_curr=" + slopeIn_curr;
        }
        if (dirOut_prev != dirIn_curr) {
            throw "Track.validate(): at index " + i + ": dirOut_prev=" +
            dirOut_prev + " but dirIn_curr=" + dirIn_curr;
        }

        xOut_prev = currentPiece.xOut;
        yOut_prev = currentPiece.yOut;
        zOut_prev = currentPiece.zOut;
        slopeOut_prev = currentPiece.slopeOut;
        dirOut_prev = currentPiece.dirOut;
    }
    return true;
};


// Example code!
/*
var aTrack;

//this track is valid
aTrack = [Segment.preset.straight_N(0, 0), Segment.preset.straight_N(0, 1), Segment.preset.straight_N(0, 2)];
console.log(Track.validate(aTrack));

//this track is invalid
aTrack = [Segment.preset.straight_N(0, 0), Segment.preset.straight_E(0, 1), Segment.preset.straight_N(6, 9)];
console.log(Track.validate(aTrack));*/


/**
 * Function to generate a track piece.
 * @param: must be a JSON, or a string of the type
 */
function Piece (type){
    // making the fields so that WebStorm will not complain that they don't exist
    var name;
    var filename;
    var size = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    var preOffset;
    var postOffset;

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
    var x;
    var y;
    var z;


    var mesh;
    var boundingBox;

    // TODO: ask Peter if he wants pieces to auto insert themselves

    TRACK.trackArray.push(this);
    insertTrack(this);
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

var tmpPiece = new Piece(TRACKTYPES.FLAT);
insertTrack(tmpPiece);

// =============================================================================
// TESTING GUI FOR CODE ========================================================
// =============================================================================
var testingFolder = mainMenu.addFolder("New Track code");

var testingButtonJson = {
  Flat: function(){
      var tempPiece = new Piece(TRACKTYPES.FLAT);
  }
};


testingFolder.add(testingButtonJson,"Flat");
testingFolder.open();


