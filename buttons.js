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

// REMOVE THIS LINE TO KEEP DEBUG FOLDER OPEN
debugFolder.close();

var testingFolder = MAIN_MENU.addFolder("New Track code");

var testingButtonJson = {
    Flat: function(){
        new Piece(TRACK_TYPES.FLAT);
    },
    FlatUp: function(){
        new Piece(TRACK_TYPES.FLAT_TO_UP);
    },
    Up: function(){
        new Piece(TRACK_TYPES.UP);
    },
    Delete: function(){
        TRACK.deletePiece();
    },
    DeleteAll: function(){
        TRACK.deleteAll();
    }
};

// add all buttons to the folders
addButtonsToFolder(debugFolder, debugJSON);
addButtonsToFolder(testingFolder, testingButtonJson);

testingFolder.open(); // CHANGE THIS TO close() TO SET FOLDER CLOSED


// lazy function to add buttons to a folder
function addButtonsToFolder(folder, json){
    for (var key in json){
        folder.add(json, key.toString());
    }
}