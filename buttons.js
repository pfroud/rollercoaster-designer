"use strict";



// TEMP GUI FOR TESTING ========================================================
var MAIN_MENU = new dat.GUI();

var debugFolder = MAIN_MENU.addFolder("Debug");

var debugJSON = {
    ToggleBoxes: function(){
        TRACK.toggleBoxes();
    },
    TogglePerspective: function(){
        // TODO: code goes here for perspective Peter
    }
};

debugFolder.add(debugJSON, "ToggleBoxes").name("Toggle Boxes");
debugFolder.add(debugJSON, "TogglePerspective").name("Toggle Perspective");

// REMOVE THIS LINE TO KEEP DEBUG FOLDER OPEN
debugFolder.close();




var testingFolder = MAIN_MENU.addFolder("New Track code");

var testingButtonJson = {
    Flat: function(){
        new Piece(TRACK_TYPES.FLAT);
    },
    Delete: function(){
        TRACK.delete();
    },
    DeleteAll: function(){
        TRACK.deleteAll();
    },
    ToggleBoxes: function(){
        TRACK.toggleBoxes();
    }
};


testingFolder.add(testingButtonJson,"Flat");
testingFolder.add(testingButtonJson, "Delete");
testingFolder.add(testingButtonJson, "DeleteAll");
testingFolder.add(testingButtonJson, "ToggleBoxes");
testingFolder.open(); // CHANGE THIS TO close() TO SET FOLDER CLOSED
