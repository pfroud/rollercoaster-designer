// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript

"use strict";

/**
 * Use this to make (almost) and track piece.
 * I haven't added argument for dz, slope, or lift because nothing uses them yet.
 *
 * Use the presets to make ones you would actually use.
 */
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

/**
 * Presets for track pieces.
 * I did this without much though, it might be better to do inheritance, if that even exists.
 */
TrackPiece.preset = {

    /** straight piece going north */
    straight_N: function(x, y){return new TrackPiece(x,y,0, 0,1, TrackPiece.enumerate.direction.NORTH, TrackPiece.enumerate.direction.NORTH)},

    /** straight piece going south */
    straight_S: function(x, y){return new TrackPiece(x,y,0, 0,-1, TrackPiece.enumerate.direction.SOUTH, TrackPiece.enumerate.direction.SOUTH)},

    /** straight piece going east */
    straight_E: function(x, y){return new TrackPiece(x,y,0, 1,0, TrackPiece.enumerate.direction.EAST, TrackPiece.enumerate.direction.EAST)},

    /** straight piece going west */
    straight_W: function(x, y){return new TrackPiece(x,y,0, -1,0, TrackPiece.enumerate.direction.WEST, TrackPiece.enumerate.direction.WEST)}
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
