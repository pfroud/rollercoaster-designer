/**
 *
 */

"use strict";

/**
 * Function to generate a piece of the track.
 *
 * @param: must be a JSON, or a string of the type piece. Appropriate values
 * are in TRACK_TYPES
 * @see constant.js
 */
function Piece(type) {
    // copying values from JSON
    this.type = type; // reference to the type of it
    this.name = type.name; // reference to name, could be redundant with type
    this.filename = type.filename;

    // the size of the track piece. Already scaled as appropriate for the world
    this.size = {
        x: type.size.x,
        y: type.size.y,
        z: type.size.z
    };

    // the size of the correction needed to make the track piece fit, values
    // are how far the piece moves backwards relative to the track
    this.startOffset = {
        x: type.startOffset.x,
        y: type.startOffset.y,
        z: type.startOffset.z
    };

    // the size of the correction needed to make the next piece fit
    this.endOffset = {
        x: type.endOffset.x,
        y: type.endOffset.y,
        z: type.endOffset.z
    };
    // the values determining how far and which direction the track advances
    // should only be 1, 0, and -1.
    this.advanceAxis = {
        x: type.advanceAxis.x,
        y: type.advanceAxis.y,
        z: type.advanceAxis.z
    };

    // string in english showing which direction the piece is facing
    this.facing = "";
    // string in english showing which way the track is facing
    this.directionChange = type.directionChange;

    // X, Y, and Z positions of the piece in the world
    this.x;
    this.y;
    this.z;

    // references to meshes, bounding box, and support (null initially)
    this.mesh = null;
    this.boundingBox = null;

    // reference to the track it is a part of
    this.track;

    // array of all the data for the supports
    this.supportData = [];

    // copy all the objects over by a copy method since JS passes by reference
    for (i = 0; i < type.supportData.length; i++)
        this.supportData.push(type.supportData[i].copy())

    // list of the meshes of the supports of the piece, will be pushed to when
    // the supports are generated
    this.supports = [];
}

/**
 * This function creates new supports. Passes a reference of the piece to the
 * support
 */
Piece.prototype.makeSupports = function(){
    for (var i = this.supportData.length; i > 0; i--)
        new Support(this.supportData.pop(), this)
};

/**
 * Deletes the piece and also calls the function to delete all of the supports
 * the piece has as well
 */
Piece.prototype.delete = function(){
    scene.remove(this.mesh);
    scene.remove(this.boundingBox);
    for (var i = 0; i < this.supports.length; i++) {
        this.supports[i].delete();
    }
};

/**
 * function to toggle the bounding boxes of all the pieces as well as the
 * supports
 */
Piece.prototype.toggleBox = function(){
    this.boundingBox.visible = !this.boundingBox.visible;
    for (var i = 0; i <  this.supports.length; i++)
        this.supports[i].toggleBox();
};

