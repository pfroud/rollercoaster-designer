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

    this.slopeIn = TrackPiece.enmr.slope.SLOPE_FLAT;
    this.slopeOut = TrackPiece.enmr.slope.SLOPE_FLAT;

    this.dirIn = TrackPiece.enmr.direction.EAST;
    this.dirOut = TrackPiece.enmr.direction.EAST;
};


TrackPiece.preset = {

    //north-south straight piece
    straight_NS: function(x, y){return new TrackPiece(x,y,0, 0,1)},

    //east-west straight piece
    straight_EW: function(x, y){return new TrackPiece(x,y,0, 1,0)}
};

//would be called "enum" but that's a reserved word, even though JS doesn't have enum types...
TrackPiece.enmr = {};

TrackPiece.enmr.slope = {
    SLOPE_FLAT: "flat",
    SLOPE_UP: "up"
};

TrackPiece.enmr.direction = {
    NORTH: 1,
    EAST: 0,
    SOUTH: 3,
    WEST: 2
}
