"use strict";


var pieceAdder = new dat.GUI();


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


pieceAdder.add(buttonJson, "Flat");
pieceAdder.add(buttonJson, "FlatToUp");
pieceAdder.add(buttonJson, "Up");
pieceAdder.add(buttonJson, "UpToFlat");
pieceAdder.add(buttonJson, "FlatToDown");
pieceAdder.add(buttonJson, "Down");
pieceAdder.add(buttonJson, "DownToFlat");


function addPiece(piece){
    pieces = [piece];
    addPieces();
}