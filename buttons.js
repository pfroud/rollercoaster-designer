"use strict";

// dat.gui object (menu in the top)
var pieceAdder = new dat.GUI();

// Json telling dat.GUI what each button does
var buttonJson= {
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

// add button to GUI
for (var key in buttonJson){
    pieceAdder.add(buttonJson, key.toString());
}

// quick little function for adding pieces to make JSON more readable
function addPiece(piece){
    pieces = [piece];
    addPieces();
}