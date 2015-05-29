/**
 *
 */

"use strict";

/**
 * Function to generate a track piece.
 * @param: must be a JSON, or a string of the type piece. Appropriate values
 * are in TRACK_TYPES
 * @see constant.js
 */
function Piece (type){
    // copying values from JSON
    this.type = type;
    this.name = type.name;
    this.filename = type.filename;
    this.size = {
        x: type.size.x,
        y: type.size.y,
        z: type.size.z
    };
    this.inOffset = {
        x: type.inOffset.x,
        y: type.inOffset.y,
        z: type.inOffset.z
    };
    this.outOffset = {
        x: type.outOffset.x,
        y: type.outOffset.y,
        z: type.outOffset.z
    };

    this.vertChange = type.vertChange;

    // X, Y, and Z positions
    this.x;
    this.y;
    this.z;

    // TODO: implement this
    this.nextX;
    this.nextY;
    this.nextZ;

    // references to meshes, bounding box, and support (null initially)
    this.mesh =  null;
    this.boundingBox = null;
    this.support = null;

    // reference to the track it is a part of
    this.track;

    // TODO: change to be generic (for multiple tracks)
    TRACK.insertPiece(this);
}

// aliasing piece insert to insert into the track
Piece.prototype.insert = function(){
    TRACK.insert(this);
};