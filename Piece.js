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

    this.in = {
        x: type.in.x,
        y: type.in.y,
        z: type.in.z
    };
    this.out = {
        x: type.out.x,
        y: type.out.y,
        z: type.out.z
    };
    this.direction = {
        x: type.direction.x,
        y: type.direction.y,
        z: type.direction.z
    };

    this.facing = "";
    /*
     Supports normally end at the bottom of the bounding boxes.
     Add this number to the height so supports touch the track for up and down pieces.
     */
    this.extraSupportHeight = type.extendSupportPastBoundingBox;

    this.vertChange = type.vertChange;

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