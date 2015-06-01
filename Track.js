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
 * @direction: the direction of the track in number of right turns taken
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

    //this.direction = 0;
    this.facing = "forward";

    this.boxes = true;

    //supports
    this.counter = 0; //this counter is advanced. (counter % supportSpacing == 0) used to tell when to add support.
    this.supportSpacing = 2;
    this.supportIntersect = 3 * SCALE; //move the support up slightly into the track mesh so it looks better
    this.supportRadius = 3 * SCALE;


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
            // rotate the mesh so it faces the correct way.
            // TODO: Make Math.PI /2 * -1 a constant
            mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0),
                track.facingToDegrees());

            // place the mesh where the track currently is
            mesh.position.x = track.currentX;
            mesh.position.y = track.currentY;
            mesh.position.z = track.currentZ;
            // scale it to fit in the world
            mesh.scale.set(track.scale, track.scale, track.scale);
            // add it to the scene
            scene.add(mesh);

            // give the made piece variable the appropriate values
            track.currPiece.mesh = mesh;
            track.currPiece.x = track.currentX;
            track.currPiece.y = track.currentY;
            track.currPiece.z = track.currentZ;
            // update piece's facing field
            track.currPiece.facing = track.facing;


            //supports
            track.counter++;
            var heightDifference = track.currentY - GROUND_HEIGHT;
            if (track.counter % track.supportSpacing == 0 && heightDifference > 0.5) {

                //CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
                var support = new THREE.Mesh(new THREE.CylinderGeometry(
                    track.supportRadius, track.supportRadius,
                    heightDifference + track.supportIntersect + track.currPiece.extraSupportHeight,
                        32),
                    track.MATERIAL_SUPPORT);

                var center = track.currPiece.getCenter();
                support.position.x = center.x;
                support.position.y = center.y -  heightDifference / 2 + track.supportIntersect;
                support.position.z = center.z;
                /*
                support.position.x = track.currentX + track.currPiece.size.x / 2;
                support.position.y = track.currentY - heightDifference / 2 + track.supportIntersect
                    + track.currPiece.extraSupportHeight/2;
                support.position.z = track.currentZ - track.currPiece.size.z / 2;
                */
                scene.add(support);
                track.currPiece.support = support;
            }

            // create the bounding box of the mesh
            var bbox = new THREE.BoxHelper(mesh);
            track.currPiece.boundingBox = bbox;
            scene.add(bbox);
            // makes them visible or not as appropriate
            bbox.visible = track.boxes;
            track.advanceCurrent(); //moves where the next piece will go

            // recursive call to place the next piece of the array
            if (recur)track.insertPiece(piece);
        }
    );
};

Track.prototype.facingToDegrees = function (){
    var dir;

    switch(this.facing){
        case "forward": dir = 0; break;
        case "left": dir = 1; break;
        case "right": dir = -1; break;
        case "back": dir = 2; break;
        default: throw "reached default"
    }
    return Math.PI / 2 * dir;
};


// DEBUG CODE!!!! ==================================================
// function that updates the debugging sphere.
Track.prototype.updateDebug = function(){
    this.setDebugPosition(toVec(this.currentX, this.currentY, this.currentZ));
};

/**
 * Sets the position of the debug sphere based on an x,y,z vector
 *
 * @param vec
 * @see the helper function toVec()
 */
Track.prototype.setDebugPosition = function (vec){
    this.debugSphere.position.x  = vec.x;
    this.debugSphere.position.y  = vec.y;
    this.debugSphere.position.z  = vec.z;
};

/**
 * Helper function to switch values into an object. Very simple
 *
 * @param x: x magnitude
 * @param y: y magnitude
 * @param z: z magnitude
 * @returns {{x: *, y: *, z: *}}
 */
function toVec(x, y, z){
    return {x: x, y: y, z: z};
}
// END OF DEBUG CODE ==================================================

/**
 * Advances currentX, CurrentY, and CurrentZ based on the new piece
 * TODO: rotations and the Y plane
 * How it works: makes the current X position of the track
 */
Track.prototype.advanceCurrent = function(){
    var curr = this.currPiece;// temp reference for code readability

    // dx, dy, and dz are the change in x, y, and z RELATIVE TO THE PIECE
    var dx = (curr.size.x * curr.direction.x) + curr.out.x;
    var dy = (curr.size.y * curr.direction.y) + curr.out.y;
    var dz = (curr.size.z * curr.direction.z) + curr.out.z;

    // debugging logs
    console.log ("current direction before advance: " + this.facing);
    
     // here's where the magic happens, advances x, y, and z based on the
     // correct direction. Note that all that changes is dx, and dz.
    switch(this.facing){
        case "forward":
            this.currentX += dx; console.log("advancing X by "+ dx);
            this.currentY += dy;
            this.currentZ += dz; console.log("advancing z by "+ dz);
            break;
        case "left":
            this.currentZ -= dx; console.log("advancing Z by "+ dx * -1);
            this.currentY += dy;
            this.currentX += dz; console.log("advancing X by "+ dz);
            break;
        case "right":
            this.currentZ += dx; console.log("advancing z by "+ dx);
            this.currentY += dy;
            this.currentX -= dz; console.log("advancing X by "+ dz * -1);
            break;
        case "back":
            this.currentX -= dx; console.log("advancing x by "+ dx * -1);
            this.currentY += dy;
            this.currentZ -= dz; console.log("advancing z by "+ dz * -1);
            break;
        default: throw "ERROR: reached default case! Time to debug!"
        }

    // changing the track's direction to get the new one
    //this.direction += curr.direction.z;


    // debug code, updates the position of the debugging sphere
    this.updateDebug();
    this.updateFacing();
    console.log("direction after: " + this.facing);

};

Track.prototype.updateFacing = function(){
    if (this.pieces.length == 0) {
        this.facing = "forward";
        console.log("deleted last piece, now facing forward");
        return;
    }
    var change = this.currPiece.directionChange;
    switch (change){
        case "none": break;
        case "left": this.turnLeft(); break;
        case "right": this.turnRight(); break;
        default: throw "Error: reached default, time to debug!"
    }
    console.log("updateFacing() finished! Now facing: " + this.facing);
};

Track.prototype.turnLeft = function(){
    switch(this.currPiece.facing){
        case "left":
            this.facing = "back";
            break;
        case "right":
            this.facing = "forward";
            break;
        case "forward":
            this.facing = "left";
            break;
        case "back":
            this.facing = "right";
            break;
        default: throw "effor: reached default case, time to debug!"
    }
};

Track.prototype.turnRight = function(){
    switch(this.currPiece.facing){
        case "left":
            this.facing = "forward";
            break;
        case "right":
            this.facing = "back";
            break;
        case "forward":
            this.facing = "right";
            break;
        case "back":
            this.facing = "left";
            break;
        default: throw "effor: reached default case, time to debug!"
    }
};
/**
 * Function that returns the current direction as a string
 * @return string of current direction
 *
 * will return "left", "right", "forward", or "back"
 *
 * the track starts facing forward.
 *
 * forward: axis are normal.
 *
 * left: dx should be multiplied by -1 and added to z instead of x, dz should
 * NOT be multiplied, and added to x instead of z
 *
 * right: same as left but reversed. dx is added to z instead of x AND IS NOT
 * multiplied by -1, dz is added to x and IS multiplied by -1
 *
 * back: dx and dz are just multiplied by -1
 *
Track.prototype.getCurrentDirection = function () {
    // get variable for manipulation and ease of code reading
    var dir = this.direction;

    // if the direction variable is less than zero, modulus doesn't work
    if (dir < 0){
        dir = dir * -1; // converts dir into the number of left turns taken
        dir = dir % 4; // four turns is a full 360, so don't count full turns
        switch (dir){
            case 0: return "forward"; // no left turns.
            case 1: return "left"; // one left turn
            case 2: return "back"; // two left turns
            case 3: return "right"; // three left turns
            default: throw "ERROR: invalid direction given"
        }
    }
    // dir is now the number of right turns taken by the coaster, modulus by 4
    // to ignore full turns
    dir = dir % 4;
    switch (dir){
        case 0: return "forward";
        case 1: return "right"; // one right turn
        case 2: return "back"; // two right turns
        case 3: return "left"; // three right turns
        default: throw "ERROR: invalid direction given"
    }

};
*/
/**
 * Does the precorrections necessary
 * precorrections are adjusting where the piece is so that it fits properly
 * on the track.
 */
Track.prototype.doPreCorrections = function (){
    var curr = this.currPiece;// temp reference for code readability

    //special case, flat has a weird out TODO: implement for all pieces
    if(curr.type == TRACK_TYPES.FLAT_TO_DOWN){
        this.currentY += curr.out.y;
    }
    // change the perspective based on the direction. Works the same way that
    // advanceCurrent() does. Literally the same code, but all +'s and -'s are
    // flipped
    // TODO: make this into a function?
    var facing = this.facing;
    console.log("correcting: " + curr.name);
    switch(facing){
        case "forward":
            this.currentX -= curr.in.x; console.log("correcting x by "+ curr.in.x * -1);
            this.currentY -= curr.in.y;
            this.currentZ -= curr.in.z; console.log("correcting z by "+ curr.in.z * -1);
            break;
        case "left":
            this.currentZ += curr.in.x; console.log("correcting z by "+ curr.in.x);
            this.currentY -= curr.in.y;
            this.currentX -= curr.in.z; console.log("correcting x by "+ curr.in.z * -1);
            break;
        case "right":
            this.currentZ -= curr.in.x; console.log("correcting z by "+ curr.in.x * -1);
            this.currentY -= curr.in.y;
            this.currentX += curr.in.z; console.log("correcting x by "+ curr.in.z);
            break;
        case "back":
            this.currentX += curr.in.x; console.log("correcting x by "+ curr.in.x);
            this.currentY -= curr.in.y;
            this.currentZ += curr.in.z; console.log("correcting z by "+ curr.in.z);
            break;
        default: throw "ERROR: reached default case! Time to debug!"
    }
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
        this.direction += tmp.direction.z;
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
        this.direction = 0;
        this.updateDebug();
        this.updateFacing();
        return;
    }
    // otherwise get the position of the last piece in the list
    var lastPiece = this.pieces[this.pieces.length - 1];
    this.currentX = lastPiece.x;
    this.currentY = lastPiece.y;
    this.currentZ = lastPiece.z;
    this.facing = lastPiece.facing;
    console.log("direction before delete: " + this.facing);

    // update the direction
    //this.direction += lastPiece.direction.z;

    // make the current piece the correct one
    this.currPiece = lastPiece;
    this.advanceCurrent();// advance it properly to catch up.
    console.log("direction after delete: " + this.facing);
};


/**
 * Delete all track pieces
 */
Track.prototype.deleteAll = function () {
    for (var i = this.pieces.length; i > 0; i--){
        this.deletePiece();
    }
};

/**
 * Toggles drawing boulding boxes
 */
Track.prototype.toggleBoxes = function () {
    this.boxes = !this.boxes;
    for (i = 0; i < this.pieces.length; i++) this.pieces[i].boundingBox.visible = this.boxes;
};

// FOR DEBUG
TRACK.insertPiece([
    new Piece(TRACK_TYPES.TURN_LEFT_SMALL),
    new Piece(TRACK_TYPES.TURN_RIGHT_SMALL)
]);
scene.add(TRACK.debugSphere);