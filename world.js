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
 * the grid is perfectly cubic, however that isn't necessarily what
 * the end result of the project will be
 */



// =====================================================================
// CONSTANTS ===========================================================
// =====================================================================

// the maximum coordinates of the world
var MAX_X = 10;
var MAX_Y = 10;
var MAX_Z = 10;

/**
 * the center of the world, on the ground. Uses coordinate class
 * properly initilized in Grid() constructor
 */
var CENTER;


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

// Grid ===============================================================
// a 3D array of coordinates.
function Grid() {
    this.array = [];


    // Initializing self
    for (i = 0; i < MAX_X; i++) {
        this.array.push([]);

        for (n = 0; n < MAX_Y; n++) {
            this.array[i].push([]);

            for (k = 0; k < MAX_Z; k++) {
                this.array[i][n].push(new Coordinate(i, n, k));
            }
        }
    }

    var centerX = Math.floor((MAX_X + 1) / 2);
    var centerY = Math.floor((MAX_Y + 1) / 2);
    var centerZ = Math.floor((MAX_Z + 1) / 2);

    CENTER = this.array[centerX][centerY][centerZ];

}

// coordinate getter, unnecessary, but neat.
Grid.prototype.getCoord = function (x, y, z){
    return this.array[x][y][z];
};

// =====================================================================
// GLOBALS =============================================================
// =====================================================================
// These are the global variables of the world


/**
 * An array of all of the track pieces. New pieces are placed into the
 * array, when a piece is deleted it should be removed from the array
 * for more info look at Track.js
 */
var track = new Track();

// the instance of Grid class
var grid = new Grid();

// iterators
var i, n, j, k;
