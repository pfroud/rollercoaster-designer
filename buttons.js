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