"use strict";

// http://stackoverflow.com/questions/23859512/how-to-get-the-width-height-length-of-a-mesh-in-three-js
// json template for track pieces

var TRACK_HEIGHT = 16.7998 * SCALE;
var TRACK_WIDTH = 40.7995 * SCALE;

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
 * TRACK_TYPES is an object that stores all the constant types
 *
 * every type has the following:
 *
 * name: The name of the piece, used primarily for debugging
 *
 * filename: name of the json file with the mesh
 *
 * size: the x, y, and z values of the size of the track types
 *
 * size: size of the mesh before scaled. SCALE is set at the bottom of index.js.
 *
 * in: how much the piece must be moved back in to appear properly.
 *
 * out: out much current x needs to be moved back in order to appear properly
 *
 * vertChange: true if the piece changes vertically, false if it does not
 *
 * direction: how much the piece must advance the trackin x, y, z. The number
 * is a value of size going from -1 to 1 with 0 being not at all, and 1 being
 * the whole thing, and -1 being the whole thing down.
 *
 * extendSupportPastBoundingBox: supports normally end at the bottom of the bounding boxes.
 * Add this number to the height so supports touch the track for up and down pieces.
 * Should probably give this a less stupid name;
 */
 /*var TRACK_TYPES = {
    FLAT: {
        name: "flat",
        filename: "modelJS/straight.json",
        size: {
            x: 60 * SCALE,
            y: 16.7998 * SCALE,
            z: 40.7995 * SCALE
        },
        in: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        out: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        vertChange: false,
        direction: {
            x: 1,
            y: 0,
            z: 0
        },
        directionChange: "none",
        extendSupportPastBoundingBox: 0
    },
    FLAT_TO_UP: {
        name: "flat to up",
        filename: "modelJS/slopeFlatToUp.json",
        size: {
            x: 64.3378 * SCALE,
            y: 38.7466 * SCALE,
            z: 40.8 * SCALE
        },
        vertChange: true,
        out: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        in: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        direction: {
            x: 1,
            y: 1,
            z: 0
        },
        directionChange: "none",
        extendSupportPastBoundingBox: 0
    },
    UP: {
        name: "up",
        filename: "modelJS/up.json",
        size: {
            x: 54.3057 * SCALE,
            y: 54.3057 * SCALE,
            z: 40.7995 * SCALE
        },
        vertChange: true,
        out: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        in: {
            x: 11.88 * SCALE,
            y: 11.88 * SCALE,
            z: 0.0
        },
        direction: {
            x: 1,
            y: 1,
            z: 0
        },
        directionChange: "none",
        extendSupportPastBoundingBox: 15 * SCALE
    },
    UP_TO_FLAT: {
        name: "up to flat",
        filename: "modelJS/slopeUpToFlat.json",
        size: {
            x: 52.4583 * SCALE,
            y: 33.8259 * SCALE,
            z: 40.8 * SCALE
        },
        vertChange: false,
        out: {
            x: 0.0,
            y: 33.8259 * SCALE - TRACK_HEIGHT,
            z: 0.0
        },
        in: {
            x: 11.88 * SCALE,
            y: 11.88 * SCALE,
            z: 0.0
        },// TODO: check this yo
        direction: {
            x: 1,
            y: 0,
            z: 0
        },
        directionChange: "none",
        extendSupportPastBoundingBox: 15 * SCALE

    },
    FLAT_TO_DOWN: {
        name: "flat to down",
        filename: "modelJS/slopeFlatToDown.json",
        size: {
            x: 52.4583 * SCALE,
            y: 33.8259 * SCALE,
            z: 40.8 * SCALE
        },
        vertChange: true,
        out: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        in: {
            x: 0,
            y: 16.7998 * SCALE + 0.2 * SCALE, // y-height of flat plus little alignment. because fuck you, that's why.
            z: 0.0
        },
        direction: {
            x: 1,
            y: 0,
            z: 0
        },
        directionChange: "none",
        extendSupportPastBoundingBox: 15 * SCALE

    },
    DOWN: {
        name: "down",
        filename: "modelJS/down.json",
        size: {
            x: 54.3057 * SCALE,
            y: 54.3057 * SCALE,
            z: 40.7995 * SCALE
        },
        vertChange: true,
        out: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        in: {
            x: 11.88 * SCALE,
            y: -11.88 * SCALE,
            z: 0.0
        },
        direction: {
            x: 1,
            y: -1, // negative denotes down
            z: 0
        },
        directionChange: "none",
        extendSupportPastBoundingBox: 15 * SCALE
    },
    DOWN_TO_FLAT: {
        name: "Down to Flat",
        filename: "modelJS/slopeDownToFlat.json",
        size: {
            x: 64.3378 * SCALE,
            y: 38.7466 * SCALE,
            z: 40.8 * SCALE
        },
        vertChange: false,
        out: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        in: {
            x: 12 * SCALE,
            y: 26.6 * SCALE,
            z: 0.0
        },
        direction: {
            x: 1,
            y: 0,
            z: 0
        },
        directionChange: "none",
        extendSupportPastBoundingBox: 0
    },
    TURN_LEFT_SMALL:{
        name:"Turn Left Small",
        filename: "modelJS/turnLeftSmall.json",
        size:{
            x: 113.99999745190144 * SCALE,
            y: 16.799999624490738 * SCALE,
            z: 112.3539974886924 * SCALE
        },
        vertChange: false,
        out: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        in: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        direction:{
            x: 1.0,
            y: 0.0,
            z: -1.0
        },
        directionChange:"left"
    },
    TURN_RIGHT_SMALL:{
        name:"Turn Right Small",
        filename: "modelJS/turnRightSmall.json",
        size:{
            x: 113.99999745190144 * SCALE,
            y: 16.799999624490738 * SCALE,
            z: 112.3539974886924 * SCALE
        },
        vertChange: false,
        out: {
            x: -1 * TRACK_WIDTH,
            y: 0.0,
            z: 0.0
        },
        in: {
            x: 0.0,
            y: 0.0,
            z: ((112.3539974886924 * SCALE) - TRACK_WIDTH) * -1
        },
        direction:{
            x: 1.0,
            y: 0.0,
            z: 0.0
        },
        directionChange: "right"
    }
};
/*

// correcting values in the ugliest fashion
TRACK_TYPES.UP_TO_FLAT.out.y = TRACK_TYPES.UP_TO_FLAT.size.y - TRACK_TYPES.FLAT.size.y;
TRACK_TYPES.DOWN.in.y += TRACK_TYPES.DOWN.size.y;
TRACK_TYPES.DOWN.out.y = TRACK_TYPES.DOWN.size.y;

TRACK_TYPES.TURN_RIGHT_SMALL.out.z = (TRACK_TYPES.FLAT.size.z - TRACK_WIDTH) * -1;

// super hacky way to correct all our silly variables
/*for (var key in TRACK_TYPES){
 TRACK_TYPES[key].size.x = (TRACK_TYPES[key].size.x) /(0.01);
 TRACK_TYPES[key].size.y = (TRACK_TYPES[key].size.y) /(0.01);
 TRACK_TYPES[key].size.z = (TRACK_TYPES[key].size.z) /(0.01);
 TRACK_TYPES[key].in.x = (TRACK_TYPES[key].in.x) /(0.01);
 TRACK_TYPES[key].in.y = (TRACK_TYPES[key].in.y) /(0.01);
 TRACK_TYPES[key].in.z = (TRACK_TYPES[key].in.z) /(0.01);
 }*/

// NEW!!!

function TrackConst() {
    // call all functions
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

// FLAT ========================================================================
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
    return flat;
};

// FLAT_TO_UP ==================================================================
TrackConst.prototype.flatToUp = function() {
    var flatToUp = new TrackType();
    flatToUp.name = "flat to up";
    flatToUp.filename = "modelJS/slopeFlatToUp.json"
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
    return downToFlat;
};

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
    return turnLeftSmall;

};
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

// child object of TrackConst
function TrackType(){
    this.name = "";
    this.filename = "";
    this.size = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    this.startOffset = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    this.endOffset = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    this.advanceAxis = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    this.directionChange = "";
}

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
};

const TRACK_TYPES = new TrackConst();