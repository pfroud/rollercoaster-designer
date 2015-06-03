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
function Piece(type) {
    // copying values from JSON
    this.type = type; // reference to the type of it
    this.name = type.name; // reference to name, could be redundant with type
    this.filename = type.filename;

    this.size = {
        x: type.size.x,
        y: type.size.y,
        z: type.size.z
    };

    this.startOffset = {
        x: type.startOffset.x,
        y: type.startOffset.y,
        z: type.startOffset.z
    };
    this.endOffset = {
        x: type.endOffset.x,
        y: type.endOffset.y,
        z: type.endOffset.z
    };
    this.advanceAxis = {
        x: type.advanceAxis.x,
        y: type.advanceAxis.y,
        z: type.advanceAxis.z
    };

    this.facing = "";
    this.directionChange = type.directionChange;
    /*
     Supports normally end at the bottom of the bounding boxes.
     Add this number to the height so supports touch the track for up and down pieces.
     */
    this.extraSupportHeight = type.extendSupportPastBoundingBox;

    // X, Y, and Z positions of the piece in the world
    this.x;
    this.y;
    this.z;

    // references to meshes, bounding box, and support (null initially)
    this.mesh = null;
    this.boundingBox = null;
    this.support = null;

    // reference to the track it is a part of
    this.track;
}

// aliasing piece insert to insert into the track
Piece.prototype.insert = function (track) {
    track.insertPiece(this);
};

/**
 * returns the x,y,z coordinates of the center of the track
 */
Piece.prototype.getCenter = function(){
    // error handling
    if (this.facing == "") throw "ERROR: facing not defined";

    var xDist = this.size.x / 2;
   // var yDist = this.size.y / 2;
    var zDist = this.size.z / 2;

    switch (this.facing){
        case "forward":
            return {
                x: this.x + xDist,
                y: this.y,
                z: this.z + zDist
            };
        case "left": return {
            x: this.x + zDist,
            y: this.y,
            z: this.z - xDist
        };
        case "right": return {
            x: this.x - zDist,
            y: this.y,
            z: this.z + xDist
            };
        case "back": return {
            x: this.x - xDist,
            y: this.y,
            z: this.z - zDist
        };
        default: throw "reached default! Time to debug!"
    }

};

Piece.prototype.makeSupport = function(){

};