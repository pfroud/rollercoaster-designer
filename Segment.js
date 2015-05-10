// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript

"use strict";

/**
 * Use this to make (almost) and track piece.
 * I haven't added argument for dz, slope, or lift because nothing uses them yet.
 *
 * Use the presets to make ones you would actually use.
 */
var Segment = function(xIn, yIn, zIn, dx, dy, dirIn, dirOut) {


    /**
     * These are mostly used for validator code. In the future we might reimplement them, but for now we don't really
     * care that much.
     */
    // the world coordinates from the previous piece of track
    this.xIn = xIn;
    this.yIn = yIn;
    this.zIn = zIn;
    // how many world coordinates the piece changes by
    this.dx = dx;
    this.dy = dy;
    this.dz = 0; // should only be 1, -1, or 0
    // the coordinate that the piece exits.
    this.xOut = xIn+dx;
    this.yOut = yIn+dy;
    this.zOut = zIn + this.dz;

    // Whether or not the piece has a chain lift 
    this.lift = false;
    
    // the slope at which the pieces enter and exit
    this.slopeIn = Segment.enumerate.slope.SLOPE_FLAT;
    this.slopeOut = Segment.enumerate.slope.SLOPE_FLAT;

    // the directions we enter and exit from
    this.dirIn = dirIn;
    this.dirOut = dirOut;
    
    // key value of the piece to be added to tracks[] in World.js
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
Segment.preset = {

    /** straight piece going north */
    straight_N: function(x, y){return new Segment(x,y,0, 0,1, Segment.enumerate.direction.NORTH, Segment.enumerate.direction.NORTH)},

    /** straight piece going south */
    straight_S: function(x, y){return new Segment(x,y,0, 0,-1, Segment.enumerate.direction.SOUTH, Segment.enumerate.direction.SOUTH)},

    /** straight piece going east */
    straight_E: function(x, y){return new Segment(x,y,0, 1,0, Segment.enumerate.direction.EAST, Segment.enumerate.direction.EAST)},

    /** straight piece going west */
    straight_W: function(x, y){return new Segment(x,y,0, -1,0, Segment.enumerate.direction.WEST, Segment.enumerate.direction.WEST)}
};

//would be called "enum" but that's a reserved word, even though JS doesn't have enum types...
Segment.enumerate = {};


// the slope of the piece as in concave vs convex vs flat
Segment.enumerate.slope = {
    SLOPE_FLAT: "flat",
    SLOPE_UP: "up",
    SLOPE_DOWN: "down"
};

// the direction facing.
// Is this really necessary with dx, dy, dz
Segment.enumerate.direction = {
    NORTH: "north",
    EAST: "east",
    SOUTH: "south",
    WEST: "west"
};


