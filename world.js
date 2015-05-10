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

