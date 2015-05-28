"use strict";

// http://stackoverflow.com/questions/23859512/how-to-get-the-width-height-length-of-a-mesh-in-three-js
const size = {

    flat: {
        x: 0.5999999865889549,
        y: 0.1679979962449521,
        z: 0.40799499088060115
    },

    //---------------------------

    //SAME SIZE
    downToFlat: {
        x: 0.6433779856193811,
        y: 0.38746599133946,
        z: 0.4079999908804893
    },
    flatToUp: {
        x: 0.6433779856193811,
        y: 0.38746599133946,
        z: 0.4079999908804893
    },

    //---------------------------

    //SAME SIZE
    flatToDown: {
        x: 0.5245829882746562,
        y: 0.3382589924393222,
        z: 0.4079999908804893
    },
    upToFlat: {
        x: 0.5245829882746562,
        y: 0.3382589924393222,
        z: 0.4079999908804893
    },

    //---------------------------

    //SAME SIZE
    up: {
        x: 0.5430565758606418,
        y: 0.5430565758606419,
        z: 0.40799499088060115
    },
    down: {
        x: 0.5430565758606418,
        y: 0.5430565758606419,
        z: 0.40799499088060115
    },

    //---------------------------

    //SAME SIZE
    turnLeftBig: {
        x: 1.8599999584257603,
        y: 0.16799999624490738,
        z: 1.9125699572507293
    },
    turnRightBig: {
        x: 1.8599999584257603,
        y: 0.16799999624490738,
        z: 1.9125699572507293
    },

    //---------------------------

    //SAME SIZE
    turnLeftSmall: {
        x: 1.1399999745190144,
        y: 0.16799999624490738,
        z: 1.123539974886924
    },
    turnRightSmall: {
        x: 1.1399999745190144,
        y: 0.16799999624490738,
        z: 1.123539974886924
    }

};

//fake enum type
const slope = {
    flat: "flat",
    flatToUp: "flatToUp",
    upToFlat: "upToFlat",
    flatToDown: "flatToDown",
    downToFlat: "downToFlat",
    down: "down",
    up: "up",
    turnLeftBig: "turnLeftBig",
    turnLeftSmall: "turnLeftSmall",
    turnRightBig: "turnRightBig",
    turnRightSmall: "turnRightSmall"
};


// json template for track pieces
var TRACK_TYPES = {
    FLAT: {
        name: "flat",
        filename: "modelJS/straight.js",
        size: {
            x: 0.5999999865889549,
            y: 0.1679979962449521,
            z: 0.40799499088060115
        },
        preOffset: 0.0,
        postOffset: 0.0

    },
    FLAT_TO_UP: {
        name: "flat to up",
        filename: "modelJS/slopeFlatToUp.js",
        size: {
            x: 0.6433779856193811,
            y: 0.38746599133946,
            z: 0.4079999908804893
        },
        preOffset: 0.0,
        postOffset: 0.12
    },
    UP: {
        name:"up",
        filename: "modelJS/up.js",
        size:{
            x: 0.5430565758606418,
            y: 0.5430565758606419,
            z: 0.40799499088060115
        },
        preOffset: 0.1188,
        postOffset: 0.1188
    },
    UP_TO_FLAT: {
        name: "up to flat",
        filename: "modelJS/slopeUpToFlat.js",
        size: {
            x: 0.5245829882746562,
            y: 0.3382589924393222,
            z: 0.4079999908804893
        },
        preOffset: 0.0, // TODO: check this yo
        postOffset: 0.0 //TODO
    },
    FLAT_TO_DOWN: {
        name: "flat to down",
        filename: "modelJS/slopeFlatToDown.js",
        size:{
            x: 0.5245829882746562,
            y: 0.3382589924393222,
            z: 0.4079999908804893
        },
        preOffset: 0.002,// TODO: check this also
        postOffset: 0.0
    },
    DOWN: {
        name: "down",
        filename: "",
        size: {
            x: 0.5430565758606418,
            y: 0.5430565758606419,
            z: 0.40799499088060115
        },
        postOffset: 0.1188,
        preOffset: 0.12
    },
    DOWN_TO_FLAT: {
        name: "Down to Flat",
        filename: "modelJS/slopeDownToFlat.js",
        size: {
            x: 0.6433779856193811,
            y: 0.38746599133946,
            z: 0.4079999908804893
        },
        preOffset: 0.0,
        postOffset: 0.12
    }
};


// super hacky way to correct all our silly variables
for (var key in TRACK_TYPES){
    TRACK_TYPES[key].size.x = (TRACK_TYPES[key].size.x) /(0.01);
    TRACK_TYPES[key].size.y = (TRACK_TYPES[key].size.y) /(0.01);
    TRACK_TYPES[key].size.z = (TRACK_TYPES[key].size.z) /(0.01);
}
