// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript

"use strict";

/**
 * Use this to make (almost) and track piece.
 * I haven't added argument for dz, slope, or lift because nothing uses them yet.
 *
 * Use the presets to make ones you would actually use.
 */
var TrackPiece = function(xIn, yIn, zIn, dx, dy, dirIn, dirOut) {
    
    // the world coordinates from the previous piece of track
    this.xIn = xIn;
    this.yIn = yIn;
    this.zIn = zIn;
    // how many world coordinates the piece changes by
    this.dx = dx;
    this.dy = dy;
    this.dz = 0;
    // the coordinate that the piece exits.
    this.xOut = xIn+dx;
    this.yOut = yIn+dy;
    this.zOut = zIn + this.dz;

// Do we really need these booleans? dz, zIn, and zOut should have overlap with them
    // if the piece rises a level. If this is true zOut should be zIn + 1; 
    this.lift = false;

    // if the piece falls down a level 
    this.fall = false;
    
    // the slope at which the pieces enter and exit
    this.slopeIn = TrackPiece.enumerate.slope.SLOPE_FLAT;
    this.slopeOut = TrackPiece.enumerate.slope.SLOPE_FLAT;

    // the directions we enter and exit from
 // Do we really need this with xIn, yIn and zIn?
    this.dirIn = dirIn;
    this.dirOut = dirOut;
    
    // key value of the piece to be added to tracks[] in world.js
    this.key;
    
    /**
     * This is some experimental code for the track. Insert it as you
     * will
     */
   tracks.insert(this);
    
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


// the slope of the piece as in concave vs convex vs flat
TrackPiece.enumerate.slope = {
    SLOPE_FLAT: "flat",
    SLOPE_UP: "up",
    SLOPE_DOWN: "down"
};

// the direction facing.
// Is this really necessary with dx, dy, dz
TrackPiece.enumerate.direction = {
    NORTH: "north",
    EAST: "east",
    SOUTH: "south",
    WEST: "west"
}


