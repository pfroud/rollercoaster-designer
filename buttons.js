"use strict";


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

for (var key in buttonJson){
    pieceAdder.add(buttonJson, key.toString());
}

function addPiece(piece){
    pieces = [piece];
    addPieces();
}