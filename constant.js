"use strict";

// http://stackoverflow.com/questions/23859512/how-to-get-the-width-height-length-of-a-mesh-in-three-js
// json template for track pieces

// the height and width of the track. NOTE: UNSCALED
var PIECE_HEIGHT = 16.7998;
var PIECE_WIDTH = 40.7995;

// helper function to clone objects since JS passes objects by reference
function cloneVector(object){
    var clone = {
        x: object.x,
        y: object.y,
        z: object.z
    };
    return clone;
}

// iterators
var i, n, j, t = 0;

/**
 * TrackConst is an object which makes all of the constants. It was chosen over
 * a regular JSON object due to it's ability to reference itself
 * @constructor just calls itself, shouldn't be called anywhere else
 */
function TrackConst() {
    // call all functions for the tracks
    this.FLAT = this.flat();
    this.FLAT_TO_UP = this.flatToUp();
    this.UP = this.up();
    this.UP_TO_FLAT =  this.upToFlat();
    this.FLAT_TO_DOWN = this.flatToDown();
    this.DOWN = this.down();
    this.DOWN_TO_FLAT = this.downToFlat();
    this.TURN_LEFT_SMALL = this.turnLeftSmall();
    this.TURN_RIGHT_SMALL = this.turnRightSmall();

    // END OF TRACK DECLARATIONS

    // scale all tracks as appropriate
    this.scale();
}

/*
 * This is simple function to scale them all, I tried using a for loop, but it
 * was all sorts of buggy.
 */
TrackConst.prototype.scale = function(){
    this.FLAT.scale();
    this.FLAT_TO_UP.scale();
    this.UP.scale();
    this.UP_TO_FLAT.scale();
    this.FLAT_TO_DOWN.scale();
    this.DOWN.scale();
    this.DOWN_TO_FLAT.scale();
    this.TURN_LEFT_SMALL.scale();
    this.TURN_RIGHT_SMALL.scale();
};

/*
 * These are the functions for the constants, every constant has a function
 * which generates an object of type TrackType (see below)
 */

// FLAT type ===================================================================
TrackConst.prototype.flat = function(){
    var flat = new TrackType();
    flat.name = "name";
    flat.filename = "modelJS/straight.json";
    flat.size = {
        x: 60,
        y: 16.7998,
        z: 40.7995
    };
    flat.advanceAxis = {
        x: 1,
        y: 0,
        z: 0
    };
    flat.name = "Flat";
    flat.directionChange = "none";

    var support = new SupportDataObj();
    support.x = flat.size.x / 2;
    support.z = flat.size.z / 2;
    support.heightOffset = 4;
    flat.supportData.push(support);

    return flat;
};

// FLAT_TO_UP ==================================================================
TrackConst.prototype.flatToUp = function() {
    var flatToUp = new TrackType();
    flatToUp.name = "flat to up";
    flatToUp.filename = "modelJS/slopeFlatToUp.json";
    flatToUp.size = {
        x: 64.3378,
        y: 38.7466,
        z: 40.8
    };
    flatToUp.advanceAxis = {
        x: 1,
        y: 1,
        z: 0
    };
    flatToUp.directionChange = "none";

    var support = new SupportDataObj();
    support.x = flatToUp.size.x / 2;
    support.z = flatToUp.size.z / 2;
    support.heightOffset = 6;
    flatToUp.supportData.push(support);

    return flatToUp;

};

// UP ==========================================================================
TrackConst.prototype.up = function(){
    var up = new TrackType();
    up.filename = "modelJS/up.json";
    up.name = "Up";
    up.size = {
        x: 54.3057,
        y: 54.3057,
        z: 40.7995
    };
    up.startOffset = {
        x: 11.88,
        y: 11.88,
        z: 0.0
    };
    // this is zero because the start offset compensates
    up.endOffset = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    up.advanceAxis = cloneVector(this.FLAT_TO_UP.advanceAxis);
    up.directionChange = "none";

    var support = new SupportDataObj();
    support.x = up.size.x / 2;
    support.z = up.size.z / 2;
    support.heightOffset = 20;
    up.supportData.push(support);

    return up;
};

// UP TO FLAT ==================================================================
TrackConst.prototype.upToFlat = function(){

    var upToFlat = new TrackType();
    upToFlat.name = "Up To Flat";
    upToFlat.filename = "modelJS/slopeUpToFlat.json";
    upToFlat.size = {
        x: 52.4583,
        y: 33.8259,
        z: 40.8
    };
    upToFlat.startOffset = cloneVector(this.UP.startOffset);
    // the end offset defaults work except y
    upToFlat.endOffset.y = upToFlat.size.y - this.FLAT.size.y;

    upToFlat.advanceAxis = {
        x: 1,
        y: 0,
        z: 0
    };
    upToFlat.directionChange= "none";

    var support = new SupportDataObj();
    support.x = upToFlat.size.x / 2;
    support.z = upToFlat.size.z / 2;
    support.heightOffset = 20;
    upToFlat.supportData.push(support);

    return upToFlat;
};


// FLAT TO DOWN ================================================================
TrackConst.prototype.flatToDown = function(){
    var flatToDown = new TrackType();
    flatToDown.name = "flat to down";
    flatToDown.filename = "modelJS/slopeFlatToDown.json";

    flatToDown.size = {
        x: 52.4583,
        y: 33.8259,
        z: 40.8
    };
    flatToDown.startOffset.y = (this.FLAT.size.y + 0.2);
    flatToDown.advanceAxis.x = 1;
    flatToDown.directionChange = "none";

    var support = new SupportDataObj();
    support.x = flatToDown.size.x / 2;
    support.z = flatToDown.size.z / 2;
    support.heightOffset = 20;
    flatToDown.supportData.push(support);

    return flatToDown;
};

// DOWN ========================================================================
TrackConst.prototype.down = function(){
    var down = new TrackType();
    down.name = "down";
    down.filename = "modelJS/down.json";
    down.size = {
        x: 54.3057,
        y: 54.3057,
        z: 40.7995
    };
    down.startOffset.x = 11.88;
    down.startOffset.y = down.size.y - 11.88;
    down.endOffset.y = down.size.y;
    down.advanceAxis = {
        x: 1,
        y: -1,
        z: 0
    };
    down.directionChange = "none";

    var support = new SupportDataObj();
    support.x = down.size.x / 2;
    support.z = down.size.z /2;
    support.heightOffset = 20;
    down.supportData.push(support);

    return down;
};

// DOWN TO FLAT ================================================================
TrackConst.prototype.downToFlat = function (){
    var downToFlat = new TrackType();
    downToFlat.name = "down to flat";
    downToFlat.filename = "modelJS/slopeDownToFlat.json";
    downToFlat.size = cloneVector(this.FLAT_TO_UP.size);
    downToFlat.startOffset = {
        x: 12,
        y: 26.6,
        z: 0.0
    };
    downToFlat.advanceAxis.x = 1;
    downToFlat.directionChange = "none";

    var support = new SupportDataObj();
    support.x = downToFlat.size.x / 2;
    support.z = downToFlat.size.z / 2;
    support.heightOffset = 10;
    downToFlat.supportData.push(support);

    return downToFlat;
};

// SMALL LEFT TURN =============================================================
TrackConst.prototype.turnLeftSmall =  function() {
    var turnLeftSmall = new TrackType();
    turnLeftSmall.name = "turn left small";
    turnLeftSmall.filename = "modelJS/turnLeftSmall.json"
    turnLeftSmall.size = {
        x: 113.99999745190144,
        y: 16.799999624490738,
        z: 112.3539974886924
    };
    turnLeftSmall.advanceAxis = {
        x: 1.0,
        y: 0.0,
        z: -1.0
    };
    turnLeftSmall.directionChange = "left";

    var support1 = new SupportDataObj();
    support1.x = 6;
    support1.z = PIECE_WIDTH / 2;
    support1.heightOffset = 2;
    turnLeftSmall.supportData.push(support1);

    console.log("left turn support 1 pushed");

    var support2 = new SupportDataObj();
    support2.x = turnLeftSmall.size.x - (PIECE_WIDTH / 2);
    support2.z = turnLeftSmall.size.z - 6;
    support2.heightOffset = 2;
    turnLeftSmall.supportData.push(support2);

    console.log("left turn support data 2 pushed");
    console.log(turnLeftSmall.supportData);

    return turnLeftSmall;

};

// SMALL RIGHT TURN ============================================================
TrackConst.prototype.turnRightSmall =  function() {
    var turnRightSmall = new TrackType();

    turnRightSmall.name = "turn right small";

    turnRightSmall.filename = "modelJS/turnRightSmall.json";

    turnRightSmall.size = cloneVector(this.TURN_LEFT_SMALL.size);

    turnRightSmall.startOffset.z = (turnRightSmall.size.z - this.FLAT.size.z) * -1;
    turnRightSmall.endOffset.x =  this.FLAT.size.z * (-1);

    turnRightSmall.advanceAxis = {
        x: 1.0,
        y: 0.0,
        z: 0.0
    };

    turnRightSmall.directionChange = "right";

    return turnRightSmall;
};

/**
 * TrackType is a small class that has many of the fields of the class Piece,
 * however it is only intended to generate an object to serve as children of
 * TrackConst
 *
 * @constructor takes no arguments because of how specific every constant is,
 * they're redefined in the functions of TrackConst
 */
function TrackType(){
    this.name = ""; // name of the piece
    this.filename = ""; // the path to the filename of the modelJSON
    // the size of the piece (unscaled)
    this.size = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    // the offset that the piece must be moved back by in order to be in the
    // right place. Is SUBTRACTED from Track.currentX, Y, and Z
    this.startOffset = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    // Similar to end offset, positioning to
    this.endOffset = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    /*
     * Which way the track should advance for every axis relative to the piece
     * should only be 1, -1, or 0 and never anything else
     */
    this.advanceAxis = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    // string which holds the direction the piece changes the track in english
    this.directionChange = "";

    // an array of objects of type SupportDataObj see said class below for more
    this.supportData = [];
}

// Function to scale all fields, called on generation by TrackConst.scale()
TrackType.prototype.scale = function (){
    function scaleVector(vector) {
        var ret = {};
        ret.x = vector.x * SCALE;
        ret.y = vector.y * SCALE;
        ret.z = vector.z * SCALE;
        return ret;
    }
    this.size = scaleVector(this.size);
    this.startOffset = scaleVector(this.startOffset);
    this.endOffset = scaleVector(this.endOffset);

    for (i = 0; i < this.supportData.length; i++)
        this.supportData[i].scale();

};

/**
 * This class is meant to be a child of the TrackType class. It holds the data
 * necessary to generate supports for the pieces in constants. Every piece will
 * use different data, and some will make more supports than others. Hence why
 * it's in an array
 *
 * @constructor does not do anything, but initialize to default values. The
 * TrackConst class will make all values correct
 */
function SupportDataObj() {

    this.intersect = 0;
    // how high the piece should go past the bounding box to connect with the
    // track
    this.heightOffset = 0.0;
    // the x, y, and z values of the support relative to it's parent
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    // the radius of the support (it's just a cylinder)
    this.radius = 3;
}

// another scaling function, scales all fields
SupportDataObj.prototype.scale = function(){
    this.intersect *= SCALE;
    this.heightOffset *= SCALE;
    this.x *= SCALE;
    this.y *= SCALE;
    this.z *= SCALE;
    this.radius  *= SCALE;
};

/**
 * helper function that copies all fields of the object into a new one and
 * returns it. Implemented because of JavaScript's tendency to pass by reference
 */
SupportDataObj.prototype.copy = function(){
    var ret = {};
    ret.intersect = this.intersect;
    ret.heightOffset = this.heightOffset;
    ret.x = this.x;
    ret.y = this.y;
    ret.z = this.z;
    ret.radius = this.radius;
    return ret;
};

// Declaring the global variable here. Executes all code in this file.
const TRACK_TYPES = new TrackConst();
