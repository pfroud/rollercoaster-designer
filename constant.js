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
const TRACK_TYPES = {
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
            y: 0.1679979962449521, //this is the Y size of flat. You can't do TRACK_TYPES.FLAT.size.y here which sucks.
            z: 0.0
        },
        in: {
            x: 11.88 * SCALE,
            y: 11.88 * SCALE,
            z: 0.0
        },// TODO: check this yo
        direction: {
            x: 1,
            y: 0, // TODO: test
            z: 0
        },
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
        }
    }
};

// correcting values in the ugliest fashion
TRACK_TYPES.UP_TO_FLAT.out.y = TRACK_TYPES.UP_TO_FLAT.size.y - TRACK_TYPES.FLAT.size.y;
TRACK_TYPES.DOWN.in.y += TRACK_TYPES.DOWN.size.y;
TRACK_TYPES.DOWN.out.y = TRACK_TYPES.DOWN.size.y;

// super hacky way to correct all our silly variables
/*for (var key in TRACK_TYPES){
 TRACK_TYPES[key].size.x = (TRACK_TYPES[key].size.x) /(0.01);
 TRACK_TYPES[key].size.y = (TRACK_TYPES[key].size.y) /(0.01);
 TRACK_TYPES[key].size.z = (TRACK_TYPES[key].size.z) /(0.01);
 TRACK_TYPES[key].in.x = (TRACK_TYPES[key].in.x) /(0.01);
 TRACK_TYPES[key].in.y = (TRACK_TYPES[key].in.y) /(0.01);
 TRACK_TYPES[key].in.z = (TRACK_TYPES[key].in.z) /(0.01);
 }*/
