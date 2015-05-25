"use strict";

window.onload = function () {

    document.getElementById("flat").onclick = function () {
        pieces = [slope.flat];
        addPieces();
    };

    document.getElementById("delete").onclick = function () {
        scene.remove(allTracks.pop());
        scene.remove(allBoundingBoxes.pop());
    };

    document.getElementById("flatToUp").onclick = function () {
        pieces = [slope.flatToUp];
        addPieces();
    };

    document.getElementById("up").onclick = function () {
        pieces = [slope.up];
        addPieces();
    };

    document.getElementById("upToFlat").onclick = function () {
        pieces = [slope.upToFlat];
        addPieces();
    };

    document.getElementById("flatToDown").onclick = function () {
        pieces = [slope.flatToDown];
        addPieces();
    };

    document.getElementById("down").onclick = function () {
        pieces = [slope.down];
        addPieces();
    };

    document.getElementById("downToFlat").onclick = function () {
        pieces = [slope.downToFlat];
        addPieces();
    };
};
=======
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
>>>>>>> jonathans_branch
