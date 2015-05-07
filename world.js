/**
 * Jonathan Bridge
 * jvbridge@ucsc.edu
 * 
 * Perter Froud
 * pfroud@ucsc.edu
 * 
 * This is the file that specifies the properties of the world the 
 * coaster exits in. It contains three parts, constants, globals and
 * definitions of classes to be used in relation to the world
 */
 
 /**
  * About the world:
  * The world the coaster takes place in is a grid of pieces of track 
  * used to simplify the structure of how a coaster is made. By 
  * convention no roller coaster track piece should exist in the same
  * node in the grid as any other, nor should it exit its node.
  * 
  * The grid goes from 0 to the max values. The standard should be that
  * the grid is perfectly square, however that isn't necessarily what 
  * the end result of the project will be
  */
 
 
 
// =====================================================================
// CONSTANTS ===========================================================
// =====================================================================

// the maximum coordinates of the world
var MAX_X = 10000;
var MAX_Y = 10000;
var MAX_Z = 10000;

// the center of the world, on the ground. Uses coordinate class.
var CENTER = new Coordinate(
   Math.floor((MAX_X + 1) / 2),
   Math.floor((MAX_Y+ 1) / 2),
   0
   );

// =====================================================================
// CLASSES =============================================================
// =====================================================================

// Coordinate ==========================================================
// specifies a world coordinate. Doesn't have a specific use yet.
function Coordinate(x, y, z) {
   this.x = x;
   this.y = y; 
   this.z = z;
   
   if (x > MAX_X || y > MAX_Y || z > MAX_Z) {
      throw "ERROR: coordinate made with too large arguments";
   }
   if (x, y, z < 0) {
      throw "ERROR: coordinate made with negative arguments";
   }
}

// Tracks ==========================================================
/** 
 * The set of all tracks, held in a class to apply methods upon them
 * 
 * set: array of all tracks, every track is held as a key-value pair
 * for quick deletion
 * 
 * counter: an integer that starts at 0, to give track piece a unique
 * key. Resets to zero
 */
function Tracks(){
   this.set = []; // the actual array
   this.counter = 0; // a counter to make unique key values
}

// insert a track piece
Tracks.prototype.insert = function (track) {
   // increment the counter to get a new key
   this.counter++;
   // set the track's key 
   track.key = this.counter;
   // put the key in 
   this.set[String(this.counter)] = track;
};

Tracks.prototype.delete = function (key) {
   this.set[String(key)] = null; 
};

Tracks.prototype.deleteAll = function () {
   this.counter = 0;
   this.set = [];
};


// =====================================================================
// GLOBALS =============================================================
// =====================================================================
/**
 * These are the global variables of the world
 */

/**
 * An array of all of the track pieces. New pieces are placed into the
 * array, when a piece is deleted it should be removed from the array
 */
var tracks = new Tracks();