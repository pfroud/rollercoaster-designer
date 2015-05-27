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
    // making the fields so that WebStorm will not complain that they don't exist
    this.name;
    this.filename;
    this.size = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    this.preOffset;
    this.postOffset;

    // copy all fields in JSON to the piece
    if (typeof(type) == "string"){ // error handling
        var JSONType = TRACK_TYPES[type];
        for (var key in JSONType){
            this[key.toString()] = JSONType[key.toString()];
        }
    } else{
        for (var key in type){
            this[key] = type[key];
        }
    }


    this.x;
    this.y;
    this.z;


    this.mesh;
    this.boundingBox;


    TRACK.pieces.push(this);
    TRACK.insertPiece(this);
}

Piece.prototype.doPreCorrections = function(){
    TRACK.currentX -= this.preOffset;
    TRACK.currentY -= this.preOffset;
};


// aliasing piece insert to insert into the track
Piece.prototype.insert = function(){
    TRACK.insert(this);
};