function insertPiece(type){
    var piece = new Piece(type);
    TRACK.insertPiece(piece);
}

/**
 * The class that holds all the functions that the buttons call
 * @constructor
 */
function Gui (){
    this.prevPiece = TRACK.currPiece;
}

/**
 *  Inserts a flat piece into the track. If flat is not a valid choice it makes
 *  the track one degree closer to flat (which at this time there is only one
 *  degree)
 */
Gui.prototype.flatTrack = function (){

    // Update the type first
    this.updateType();

    // reference of what to insert
    var piece;

    if (this.isFlat()){
        // insert since it's now flat, make it more flat
        piece = new Piece(TRACK_TYPES.FLAT);
        TRACK.insertPiece(piece);
        return
    }

    // if we not on a flat place, make it flat
    if (this.prevPiece.type == TRACK_TYPES.UP ||
        this.prevPiece.type == TRACK_TYPES.FLAT_TO_UP
    ){
        piece = new Piece(TRACK_TYPES.UP_TO_FLAT);
        TRACK.insertPiece(piece);
        return;
    }
    if(this.prevPiece.type == TRACK_TYPES.DOWN ||
        this.prevPiece.type == TRACK_TYPES.FLAT_TO_DOWN) {
        piece = new Piece(TRACK_TYPES.DOWN_TO_FLAT);
        TRACK.insertPiece(piece);
        return;
    }

    console.log("ERROR: reached end!!")
};

/**
 * This inserts an up piece into the track. If up is not a valid choice of piece
 * then it inserts a piece that is one closer to up
 */
Gui.prototype.insertUp = function(){

    this.updateType();
    var piece;

    // if the previous piece is valid insert a new one
    if (this.prevPiece.type == TRACK_TYPES.FLAT_TO_UP ||
        this.prevPiece.type == TRACK_TYPES.UP
    ){
        piece = new Piece(TRACK_TYPES.UP);
    }

    // if we are flat, then make our piece correct to up
    if (this.isFlat()){
        piece = new Piece(TRACK_TYPES.FLAT_TO_UP);
    }

    // if it's down, make it go more up
    if (this.prevPiece.type == TRACK_TYPES.DOWN ||
        this.prevPiece.type == TRACK_TYPES.FLAT_TO_DOWN
    ){
        piece = new Piece(TRACK_TYPES.DOWN_TO_FLAT);
    }

    // error handling
    if (piece == undefined){
        throw "ERROR! Piece not defined"
    }

    // final insert
    TRACK.insertPiece(piece);

};

/**
 * This inserts a down piece into the track. If down is not a valid choice
 * it then changes the way the track is pointing to one degree down
 */
Gui.prototype.insertDown = function (){
    this.updateType();
    var piece;

    // if it's flat insert a down piece and be done
    if (this.isFlat()){
        piece = new Piece(TRACK_TYPES.FLAT_TO_DOWN);

    }
    // if we are going up move a degree towards down
    if (this.prevPiece.type == TRACK_TYPES.UP ||
        this.prevPiece.type == TRACK_TYPES.FLAT_TO_UP
    ){
        piece = new Piece(TRACK_TYPES.UP_TO_FLAT);
    }

    // otherwise insert the down piece
    if (this.prevPiece.type == TRACK_TYPES.FLAT_TO_DOWN ||
        this.prevPiece.type == TRACK_TYPES.DOWN
    ){
        piece = new Piece(TRACK_TYPES.DOWN);
    }

    // error handling
    if (piece == undefined){
        throw "ERROR! Piece not defined"
    }

    TRACK.insertPiece(piece);

};

Gui.prototype.insertLeftSmall = function(){

};

Gui.prototype.insertRightSmall = function(){

};


// PRIVATE FUNCTION ===========================================================
/**
 * Private function used to determine
 * @returns {boolean} true if the previous piece is flat, false otherwise
 */
Gui.prototype.isFlat = function(){

    var flatTypes = [
        TRACK_TYPES.FLAT,
        TRACK_TYPES.DOWN_TO_FLAT,
        TRACK_TYPES.UP_TO_FLAT,
        TRACK_TYPES.TURN_LEFT_BIG,
        TRACK_TYPES.TURN_LEFT_SMALL,
        TRACK_TYPES.TURN_RIGHT_BIG,
        TRACK_TYPES.TURN_RIGHT_SMALL
    ];

    for (var i = 0; i < flatTypes.length; i++){
        if (this.prevPiece.type == flatTypes[i])
            return true;
    }
    return false;
};

/**
 * inner helper function that updates the reference in GUI to be the current
 * piece that TRACK is pointing at
 */
Gui.prototype.updateType = function(){
    this.prevPiece = TRACK.currPiece;
};

var GUI = new Gui();