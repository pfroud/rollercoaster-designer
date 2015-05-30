"use strict";

// GLOBAL VARIABLES ============================================================
var TRACK = new Track(); // TODO: make unnecessary

/**
 * @summary Track object, referred to by global variable TRACK
 * @constructor
 * @type: class
 *
 * @member pieces: list of all track pieces. Must be of class type Piece
 * @see Piece.js
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
 *
 * @direction: the direction of the track in degrees
 *
 *
 */

function Track() {
    this.pieces = [];

    // the starting positions for the track
    this.START_X = -2.5;
    this.START_Y = 0;
    this.START_Z = 1;
    // The X axis is red. The Y axis is green. The Z axis is blue.

    // initialize current positions to the starting ones
    this.currentX = this.START_X;
    this.currentY = this.START_Y;
    this.currentZ = this.START_Z;

    this.currPiece = null;

    this.jsonLoader = new THREE.JSONLoader();
    this.scale = SCALE;

    this.direction = 0;

    this.boxes = true;

    //supports
    this.counter = 0; //this counter is advanced. (counter % supportSpacing == 0) used to tell when to add support.
    this.supportSpacing = 2;
    this.supportIntersect = 0.03; //move the support up slightly into the track mesh so it looks better
    this.supportRadius = 0.03;

    //materials
    //play with http://threejs.org/docs/scenes/material-browser.html#MeshLambertMaterial
    this.MATERIAL_TRACK = new THREE.MeshLambertMaterial({color: "#00ffff"});
    this.MATERIAL_SUPPORT = new THREE.MeshLambertMaterial({color: "#cc3333"});


    // DEBUG CODE!!!! =========================================================
    var geometry = new THREE.SphereGeometry(.1, 32, 32);
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = this.currentX;
    sphere.position.y = this.currentY;
    sphere.position.z = this.currentZ;
    this.debugSphere = sphere;
    // scene.add(this.debugSphere);
}


/**
 * Inserts the piece into the world and appends it to the track
 * @param piece must be an object or array of objects of class type Piece
 * @see Piece.js
 *
 * This function works recursively and takes an array or a single piece as
 * arguments. Will only be called once with a single piece, but will be called
 * n times for an array of pieces of length n.
 */
Track.prototype.insertPiece = function (piece) {

    // make function recursive in order to preserve order of tracks
    // TODO: use callbacks if we can instead
    var recur = false;

    // if the argument is an array, shift the element off and recur
    if (Array.isArray(piece)){
        // the arrray can be of length one, this catches that problem
        if (piece.length > 1) recur = true;
        this.currPiece = piece.shift();
        this.pieces.push(this.currPiece);

    } else{
        // handles the case in which the piece is just one piece
        this.currPiece = piece;
        this.pieces.push(piece);
    }

    // JS sucks and doesn't let us use "this" in the inner function.
    var track = this;
    // give a reference to the track of the piece with this
    this.currPiece.track = this;


    // this part creates the pieces and the box
    this.jsonLoader.load(this.currPiece.filename, /*this.createScene(geometry)*/
        function createScene(geometry) {

            // move the mesh back if necessary
            track.doPreCorrections();

            // create the mesh and add it to the scene
            var mesh = new THREE.Mesh(geometry, track.MATERIAL_TRACK);
            //mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2 * TRACK.direction); //IN PROGREESS


            mesh.position.x = track.currentX;
            mesh.position.y = track.currentY;
            mesh.position.z = track.currentZ;
            mesh.scale.set(track.scale, track.scale, track.scale);
            scene.add(mesh);

            // give the made piece variable the appropriate values
            track.currPiece.mesh = mesh;
            track.currPiece.x = track.currentX;
            track.currPiece.y = track.currentY;
            track.currPiece.z = track.currentZ;


            //supports
            track.counter++;
            var heightDifference = track.currentY - GROUND_HEIGHT;
            if (track.counter % track.supportSpacing == 0 && heightDifference > 0.5) {

                //CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
                var support = new THREE.Mesh(new THREE.CylinderGeometry(
                    track.supportRadius, track.supportRadius, heightDifference + track.supportIntersect, 32),
                    track.MATERIAL_SUPPORT);

                support.position.x = track.currentX + track.currPiece.size.x / 2;
                support.position.y = track.currentY - heightDifference / 2 + track.supportIntersect;
                support.position.z = track.currentZ - track.currPiece.size.z / 2;
                /*console.log(track.currentX + piece.size.x / 2);
                console.log(track.currentY - heightDifference / 2 + track.supportIntersect);
                console.log(track.currentZ - piece.size.z / 2);*/

                scene.add(support);
                // give a reference to the support in this track
                track.currPiece.support = support;
            }


            // create the bounding box of the mesh
            var bbox = new THREE.BoxHelper(mesh);
            track.currPiece.boundingBox = bbox;
            scene.add(bbox);
            // makes them visible or not as appropriate
            bbox.visible = track.boxes;
            track.advanceCurrent(); //moves where the next piece will go

            // DEBUG CODE!!!! ==================================================
            track.debugSphere.position.x = track.currentX;
            track.debugSphere.position.y = track.currentY;
            track.debugSphere.position.z = track.currentZ;
            // DEBUG CODE!!!! ==================================================

            // recursive call to place the next piece of the array
            if (recur){
                track.insertPiece(piece);
            }
        }

    );
};


/**
 * Inserts multiple pieces from an array. Works recursively.
 *
 * This function does not work. The pieces are added out of order. Try code below.
 *
 * @param pieces: an array of pieces
 *
Track.prototype.insertPieces = function (pieces) {
    if (pieces.length == 0) return;
    var insert = pieces.pop();
    console.log("Inserting: " + insert.type);
    this.insertPiece(insert);
    this.insertPieces(pieces);
};*/// NO LONGER NEEDED, BUT KEPT FOR POSTERITY



/**
 * Advances currentX, CurrentY, and CurrentZ based on the new piece
 * TODO: rotations and the Y plane
 * How it works: makes the current X position of the track
 */
Track.prototype.advanceCurrent = function(){
    var curr = this.currPiece;// temp reference for code readability

    // the change in x, y, and z relatively
    var dx = (curr.size.x * curr.direction.x) + curr.out.x;
    var dy = (curr.size.y * curr.direction.y) + curr.out.y;
    var dz = (curr.size.z * curr.direction.z) + curr.out.z;

    // adding the changes to the track
    this.currentX += dx;// * this.scale;
    this.currentY += dy;
    this.currentZ += dz;

};

/**
 * Does the precorrections necessary
 * TODO: implement
 */
Track.prototype.doPreCorrections = function (){
    var curr = this.currPiece;// temp reference for code readability

    //special case
    if(curr.type == TRACK_TYPES.FLAT_TO_DOWN){
        this.currentY += curr.out.y;
    }
    this.currentX -= curr.in.x;// * this.scale;
    this.currentY -= curr.in.y;// * this.scale;
    this.currentZ -= curr.in.z;
};

/**
 * Deletes the last track member of the track
 */
Track.prototype.deletePiece = function () {
    if (this.pieces.length > 0) {
        var tmp = this.pieces.pop();
        scene.remove(tmp.mesh);
        scene.remove(tmp.boundingBox);
        scene.remove(tmp.support);
        this.counter--;
        this.updatePosition();
    }
};

/**
 * Update current x, y, and z of the track to be in accordance with what it
 * should be.
 */
Track.prototype.updatePosition = function () {
    // if there are no pieces in the track, just set it to the default values
    if (this.pieces.length == 0) {
        this.currentX = this.START_X;
        this.currentY = this.START_Y;
        this.currentZ = this.START_Z;
        return;
    }
    // otherwise get the position of the last piece in the list
    var lastPiece = this.pieces[this.pieces.length - 1];
    this.currentX = lastPiece.x;
    this.currentY = lastPiece.y;
    this.currentZ = lastPiece.z;
    // make the current piece the correct one
    this.currPiece = lastPiece;
    this.advanceCurrent();// advance it properly to catch up.
};


// Deletes all tracks.
Track.prototype.deleteAll = function () {
    for (var i = this.pieces.length; i > 0; i--){
        this.deletePiece();
    }
};

Track.prototype.toggleBoxes = function () {
    this.boxes = !this.boxes;
    for (i = 0; i < this.pieces.length; i++) this.pieces[i].boundingBox.visible = this.boxes;
};

TRACK.insertPiece([
    new Piece(TRACK_TYPES.FLAT),
    new Piece(TRACK_TYPES.FLAT_TO_UP),
    new Piece(TRACK_TYPES.UP),
    new Piece(TRACK_TYPES.UP_TO_FLAT),
    new Piece(TRACK_TYPES.FLAT),
    new Piece(TRACK_TYPES.FLAT_TO_DOWN)//,
    //new Piece(TRACK_TYPES.DOWN),
    //new Piece(TRACK_TYPES.DOWN_TO_FLAT)
]);