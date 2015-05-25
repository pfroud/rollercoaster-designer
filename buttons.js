"use strict";
function stuff() {

    document.getElementById("flat").onclick = function () {
        console.log("clicked on flat");
        pieces = [slope.flat];
        addPieces();
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

    document.getElementById("down").onclick = function() {
        pieces = [slope.down];
        addPieces();
    };

    document.getElementById("downToFlat").onclick = function () {
        pieces = [slope.downToFlat];
        addPieces();
    };
}