/*
 x, y, z initial and final (integer)
 lift (boolean)
 slope initial and final (enum)
 direction initial and final (number of enum)
 */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
"use strict";



var TrackPiece = function(xIn, yIn, zIn, dx, dy) {
    this.xIn = xIn;
    this.yIn = yIn;
    this.zIn = zIn;
    this.dx = dx;
    this.dy = dy;
    this.dz = 0;
    this.xOut = xIn+dx;
    this.yOut = yIn+dy;
    this.zOut = zIn+this.dz;

    this.lift = false;

    this.slopeIn = TrackPiece.enums.slope.SLOPE_FLAT;
    this.slopeOut = TrackPiece.enums.slope.SLOPE_FLAT;

    this.dirIn = TrackPiece.enums.direction.EAST;
    this.dirOut = TrackPiece.enums.direction.EAST;
};


TrackPiece.presets = {

    straight: function(xI, yI, zI){return new TrackPiece(xI, yI, zI, 1, 1, 0)}

};

TrackPiece.enums = {};

TrackPiece.enums.slope = {
    SLOPE_FLAT: "flat",
    SLOPE_UP: "up"
};

TrackPiece.enums.direction = {
    NORTH: 1,
    EAST: 0,
    SOUTH: 3,
    WEST: 2
}
