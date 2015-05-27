"use strict";


var mainMenu = new dat.GUI();

// dat.gui object (menu in the top)
var piecesFolder = mainMenu.addFolder("Pieces");

// Json telling dat.GUI what each button does
var buttonJson= {
    Pieces: 1,
    Flat: function(){
        addPiece(slope.flat);
    },
    FlatToUp:function(){
        addPiece(slope.flatToUp);
    },
    Up: function(){
        addPiece(slope.up);
    },
    UpToFlat: function(){
        addPiece(slope.upToFlat);
    },
    FlatToDown: function(){
        addPiece(slope.flatToDown);
    },
    Down: function(){
        addPiece(slope.down);
    },
    DownToFlat: function(){
        addPiece(slope.downToFlat);
    }

};



// add buttons to GUI
for (var key in buttonJson){
    piecesFolder.add(buttonJson, key.toString());
}

// Add delete button
mainMenu.add({DELETE: function(){
    if (allTracks.length > 0) {
        scene.remove(allTracks.pop());
    }
    if (allBoundingBoxes.length > 0){
        scene.remove(allBoundingBoxes.pop());
    }
}}, "DELETE");


// quick little function for adding pieces to make JSON more readable
function addPiece(piece){
    pieces = [piece];
    addPieces();
}

piecesFolder.close();

