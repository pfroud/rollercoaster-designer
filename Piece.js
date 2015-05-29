/**
 *
 */

/**
 * Function to generate a track piece.
 * @param: must be a JSON, or a string of the type piece. Appropriate values
 * are in TRACK_TYPES
 * @see constant.js
 */
function Piece (type){
    // copying values from JSON
    this.name = type.name;
    this.filename = type.filename;
    this.size = {
        x: type.size.x,
        y: type.size.y,
        z: type.size.z
    };
    this.offset = {
        x: type.offset.x,
        y: type.offset.y,
        z: type.offset.z
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

    // references to meshes and bounding boxes (null initially)
    this.mesh =  null;
    this.boundingBox = null;

    // reference to the track it is a part of
    this.track;

    // TODO: change to be generic (for multiple tracks)
    TRACK.insertPiece(this);
}

// aliasing piece insert to insert into the track
Piece.prototype.insert = function(){
    TRACK.insert(this);
};