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