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

    //var jsonLoader = new THREE.JSONLoader();
    var SCALE = 0.01;

    var currFileName ="";
    var direction = 0;
}


// TODO
function insertTrack(piece) {
    if (TRACK.currPiece != undefined){
        TRACK.prevPiece = TRACK.currPiece;
        TRACK.currpiece = piece;
    } else {
        TRACK.currPiece = piece;
    }



    LOADER.load(piece.filename,
        function createScene(geometry) {

            //var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());


            scene.add(new THREE.Mesh(new THREE.BoxGeometry(Math.random(), Math.random(), Math.random(), 1, 1, 1), new THREE.MeshNormalMaterial({wireframe: true})));
            return;

            TRACK.doPreCorrections(currentPiece); //moves where the current piece will go

            mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2 * TRACK.direction); //IN PROGREESS
            mesh.position.x = TRACK.currentX;
            mesh.position.y = TRACK.currentY;
            mesh.position.z = TRACK.currentZ;
            mesh.scale.set(TRACK.scale, TRACK.scale, TRACK.scale);

            piece.mesh = mesh;

            TRACK.advanceCurrent(currentPiece); //moves where the next piece will go


            TRACK.trackMeshes.push(mesh);
            /*var bbox = new THREE.BoxHelper(mesh);
            TRACK.boundingBoxes.push(bbox);
            scene.add(bbox); //draws the yellow bounding boxes*/
        }
    );
}



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

//var tmpPiece = new Piece(TRACKTYPES.FLAT);
//insertTrack(tmpPiece);

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
