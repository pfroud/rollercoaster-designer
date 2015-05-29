"use strict";

// http://stackoverflow.com/questions/23859512/how-to-get-the-width-height-length-of-a-mesh-in-three-js
// json template for track pieces

/**
 * TRACK_TYPES is an object that stores all the constant types
 *
 * every type has the following:
 *
 * name: The name of the piece, used primarily for debugging
 *
 * size: the x, y, and z values of the size of the track types
 *
 * vertChange: true if the piece changes vertically, false if it does not
 *
 * inOffset: how much the piece must be inOffset to appear proper in x, y, z;
 */
var TRACK_TYPES;
TRACK_TYPES = {
    FLAT: {
        name: "flat",
        filename: "modelJS/straight.json",
        size: {
            x: 0.5999999865889549,
            y: 0.1679979962449521,
            z: 0.40799499088060115
        },
        inOffset: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },outOffset: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        vertChange: false
    },
    FLAT_TO_UP: {
        name: "flat to up",
        filename: "modelJS/slopeFlatToUp.json",
        size: {
            x: 0.6433779856193811,
            y: 0.38746599133946,
            z: 0.4079999908804893
        },
        vertChange: true,
        outOffset: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        inOffset: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        }
    },
    UP: {
        name: "up",
        filename: "modelJS/up.json",
        size: {
            x: 0.5430565758606418,
            y: 0.5430565758606419,
            z: 0.40799499088060115
        },
        vertChange: true,
        outOffset: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        inOffset: {
            x: 0.1188,
            y: 0.1188,
            z: 0.0
        }
    },
    UP_TO_FLAT: {
        name: "up to flat",
        filename: "modelJS/slopeUpToFlat.json",
        size: {
            x: 0.5245829882746562,
            y: 0.3382589924393222,
            z: 0.4079999908804893
        },
        vertChange: false,
        outOffset: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        inOffset: {
            x: 0.1188,
            y: 0.1188,
            z: 0.0
        }// TODO: check this yo

    },
    FLAT_TO_DOWN: {
        name: "flat to down",
        filename: "modelJS/slopeFlatToDown.json",
        size: {
            x: 0.5245829882746562,
            y: 0.3382589924393222,
            z: 0.4079999908804893
        },
        vertChange: true,
        inOffset: {
            x: 0.002,// TODO: check this also
            y: 0.0,
            z: 0.0
        }
    },
    DOWN: {
        name: "down",
        filename: "",
        size: {
            x: 0.5430565758606418,
            y: 0.5430565758606419,
            z: 0.40799499088060115
        },
        vertChange: true,
        outOffset: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        inOffset: {
            x: -0.1188,
            y: -0.1188,
            z: 0.0
        }
    },
    DOWN_TO_FLAT: {
        name: "Down to Flat",
        filename: "modelJS/slopeDownToFlat.json",
        size: {
            x: 0.6433779856193811,
            y: 0.38746599133946,
            z: 0.4079999908804893
        },
        vertChange: false,
        outOffset: {
            x: 0.0,
            y: 0.0,
            z: 0.0
        },
        inOffset:{
            x:0.12,
            y:0.12,
            z: 0.0
        }
    }
};


// super hacky way to correct all our silly variables
/*for (var key in TRACK_TYPES){
    TRACK_TYPES[key].size.x = (TRACK_TYPES[key].size.x) /(0.01);
    TRACK_TYPES[key].size.y = (TRACK_TYPES[key].size.y) /(0.01);
    TRACK_TYPES[key].size.z = (TRACK_TYPES[key].size.z) /(0.01);
    TRACK_TYPES[key].inOffset.x = (TRACK_TYPES[key].inOffset.x) /(0.01);
    TRACK_TYPES[key].inOffset.y = (TRACK_TYPES[key].inOffset.y) /(0.01);
    TRACK_TYPES[key].inOffset.z = (TRACK_TYPES[key].inOffset.z) /(0.01);
}*/
