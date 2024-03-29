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
    this.multiple = false;
    this.insertArray = [];
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
        return;
    }

    // if we not on a flat place, make it flat
    if (this.isUp()){
        piece = new Piece(TRACK_TYPES.UP_TO_FLAT);
        this.insertPiece(piece);
        return;
    }
    if(this.isDown()) {
        piece = new Piece(TRACK_TYPES.DOWN_TO_FLAT);
        this.insertPiece(piece);
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
    if (this.isUp()){
        piece = new Piece(TRACK_TYPES.UP);
    }

    // if we are flat, then make our piece correct to up
    if (this.isFlat()){
        piece = new Piece(TRACK_TYPES.FLAT_TO_UP);
    }

    // if it's down, make it go more up
    if (this.isDown()){
        piece = new Piece(TRACK_TYPES.DOWN_TO_FLAT);
    }

    // error handling
    if (piece == undefined){
        throw "ERROR! Piece not defined"
    }

    // final insert
    this.insertPiece(piece);

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

    this.insertPiece(piece);

};

/**
 * Inserts a small left turn, if the track isn't flat it inserts a piece to make
 * it flat before it inserts the turn
 */
Gui.prototype.insertLeftSmall = function(){
    this.updateType();
    var pieces =  [];

    if (this.isUp()){
        pieces.push(new Piece(TRACK_TYPES.UP_TO_FLAT));
    }
    if (this.isDown()){
        pieces.push(new Piece(TRACK_TYPES.DOWN_TO_FLAT));
    }
    pieces.push(new Piece(TRACK_TYPES.TURN_LEFT_SMALL));
    this.insertPiece(pieces);
};

/**
 * Inserts a big left turn, if the track isn't flat it inserts a piece to make
 * it flat before it inserts the turn
 */
Gui.prototype.insertLeftBig = function(){
    this.updateType();
    var pieces =  [];

    if (this.isUp()){
        pieces.push(new Piece(TRACK_TYPES.UP_TO_FLAT));
    }
    if (this.isDown()){
        pieces.push(new Piece(TRACK_TYPES.DOWN_TO_FLAT));
    }
    pieces.push(new Piece(TRACK_TYPES.TURN_LEFT_BIG));
    this.insertPiece(pieces);
};

/**
 * Inserts a big right turn, if the track isn't flat it inserts a piece to make
 * it flat before it inserts the turn
 */
Gui.prototype.insertRightBig = function(){
    this.updateType();
    var pieces =  [];

    if (this.isUp()){
        pieces.push(new Piece(TRACK_TYPES.UP_TO_FLAT));
    }
    if (this.isDown()){
        pieces.push(new Piece(TRACK_TYPES.DOWN_TO_FLAT));
    }
    pieces.push(new Piece(TRACK_TYPES.TURN_RIGHT_BIG));
    this.insertPiece(pieces);
};

/**
 * Inserts a small left turn, if the track isn't flat it inserts a piece to make
 * it flat before it inserts the turn
 */
Gui.prototype.insertRightSmall = function(){
    this.updateType();
    var pieces =  [];

    if (this.isUp()){
        pieces.push(new Piece(TRACK_TYPES.UP_TO_FLAT));
    }
    if (this.isDown()){
        pieces.push(new Piece(TRACK_TYPES.DOWN_TO_FLAT));
    }
    pieces.push(new Piece(TRACK_TYPES.TURN_RIGHT_SMALL));
    this.insertPiece(pieces);
};

function genRandTrack(length){
    var rand;
    GUI.multiple = true;
    for(var i=0; i< length; i++){
        rand = getRandomInt(1, 5);
        switch(rand){
            case 1:
                GUI.insertLeftSmall();
                break;
            case 2:
                GUI.insertRightSmall();
                break;
            case 3:
                GUI.insertRightBig();
                break;
            case 4:
                GUI.insertLeftBig();
                break;
        }
    }
    this.multiple = false;
    TRACK.insertPiece(GUI.insertArray);
    this.insertArray = [];

    /**
     * Returns a random integer between min (included) and max (excluded).
     * from
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}



// PRIVATE FUNCTIONS ===========================================================
/**
 * Private function used to determine if the previous piece is flat
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

    return this.checkType(flatTypes);
};

/**
 * Private function used to determine if the previous piece is going up
 * @returns {boolean} true if the previous piece is going up, false otherwise
 * @private
 */
Gui.prototype.isUp = function(){
    var upTypes = [
        TRACK_TYPES.UP,
        TRACK_TYPES.FLAT_TO_UP
    ];

    return this.checkType(upTypes);
};

/**
 * Private function used to determine if the previous piece is going down
 * @returns {boolean} true if the previous piece is going down, false otherwise
 * @private
 */
Gui.prototype.isDown = function(){
    var upTypes = [
        TRACK_TYPES.DOWN,
        TRACK_TYPES.FLAT_TO_DOWN
    ];

    return this.checkType(upTypes);
};

// helper function for isDown
Gui.prototype.checkType = function(types){

    var type;

    if (this.multiple && this.insertArray.length > 0) {
        type = this.insertArray[this.insertArray.length - 1];
    } else{
        type = this.prevPiece.type;
    }

    for (var i = 0; i < types.length; i++){
        if (type == types[i])
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

Gui.prototype.insertPiece = function(piece){
    if (Array.isArray(piece) && this.multiple){
        for (var i = 0; i < piece.length; i++)
            this.insertArray.push(piece[i]);
        return;
    }

    if (this.multiple){
        this.insertArray.push(piece);
        return;
    }

    TRACK.insertPiece(piece);

};

var GUI = new Gui();