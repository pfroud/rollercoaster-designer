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
    },
    DisplayCurrPos: function (){
        scene.add(TRACK.debugSphere);
    }
};

// REMOVE THIS LINE TO KEEP DEBUG FOLDER OPEN
debugFolder.close();

var testingFolder = MAIN_MENU.addFolder("New Track code");

var testingButtonJson = {
    Flat: function(){
        TRACK.insertPiece(new Piece(TRACK_TYPES.FLAT));
    },
    FlatUp: function(){
        TRACK.insertPiece(new Piece(TRACK_TYPES.FLAT_TO_UP));
    },
    Up: function(){
        TRACK.insertPiece(new Piece(TRACK_TYPES.UP));
    },
    UpFlat: function(){
        TRACK.insertPiece(new Piece(TRACK_TYPES.UP_TO_FLAT));
    },
    FlatDown: function(){
        TRACK.insertPiece(new Piece(TRACK_TYPES.FLAT_TO_DOWN));
    },
    Down: function(){
        TRACK.insertPiece(new Piece(TRACK_TYPES.DOWN));
    },
    DownFlat: function(){
        TRACK.insertPiece(new Piece(TRACK_TYPES.DOWN_TO_FLAT));
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