/*
 x, y, z initial and final (integer)
 lift (boolean)
 slope initial and final (enum)
 direction initial and final (number of enum)
 */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
"use strict";



var TrackPiece = function(xInit, yInit, zInit, dx, dy, dz) {
    this.xInit = xInit;
    this.yInit = yInit;
    this.zInit = zInit;
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;

    this.lift = false;

    this.slopeInit = TrackPiece.slopeEnum.SLOPE_FLAT;
    this.slopeFin = TrackPiece.slopeEnum.SLOPE_FLAT;

    this.dirInit = 0;
    this.dirFin = 0;
};


TrackPiece.presets = {

    straight: function(xI, yI, zI){return new TrackPiece(xI, yI, zI, 1, 1, 0)}

};


TrackPiece.slopeEnum = {
    SLOPE_FLAT: "flat",
    SLOPE_UP: "up"
};
