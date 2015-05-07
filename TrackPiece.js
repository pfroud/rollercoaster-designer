/*
 x, y, z initial and final (integer)
 lift (boolean)
 slope initial and final (enum)
 direction initial and final (number of enum)
 */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
"use strict";


var TrackPiece = function(xIn, yIn, zIn, dx, dy, dirIn, dirOut) {
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

    this.slopeIn = TrackPiece.enumerate.slope.SLOPE_FLAT;
    this.slopeOut = TrackPiece.enumerate.slope.SLOPE_FLAT;

    this.dirIn = dirIn;
    this.dirOut = dirOut;
};


TrackPiece.preset = {

    //north-south straight piece
    straight_N: function(x, y){return new TrackPiece(x,y,0, 0,1, TrackPiece.enumerate.direction.NORTH, TrackPiece.enumerate.direction.NORTH)},

    //east-west straight piece
    straight_E: function(x, y){return new TrackPiece(x,y,0, 1,0, TrackPiece.enumerate.direction.EAST, TrackPiece.enumerate.direction.EAST)}
};

//would be called "enum" but that's a reserved word, even though JS doesn't have enum types...
TrackPiece.enumerate = {};

TrackPiece.enumerate.slope = {
    SLOPE_FLAT: "flat",
    SLOPE_UP: "up"
};

TrackPiece.enumerate.direction = {
    NORTH: "north",
    EAST: "east",
    SOUTH: "south",
    WEST: "west"
}
