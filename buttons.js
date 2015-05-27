"use strict";



// TEMP GUI FOR TESTING ========================================================
var MAIN_MENU = new dat.GUI();

var debugFolder = MAIN_MENU.gui.addFolder("Debug");

debugFolder.close();


var debugJSON = {
    ToggleBoxes: function(){

    }
};


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
testingFolder.open();
