"use strict";

var Track = {}; //empty namespace thing

/**
 * Checks integrity of a track.
 * Iterates over all the track pieces and makes sure the out properties of piece n equal the in properties of piece n+1.
 *
 * @returns {boolean} True if the track is valid.
 */
Track.validate = function (trackArray) {
    if (trackArray.length == 1) return true;

    var currentPiece;

    //for loop starts at 1, this is initial stuff to compare with
    var xOut_prev     = trackArray[0].xOut;
    var yOut_prev     = trackArray[0].yOut;
    var zOut_prev     = trackArray[0].zOut;
    var slopeOut_prev = trackArray[0].slopeOut;
    var dirOut_prev   = trackArray[0].dirOut;

    //these get set in the fop loop
    var xIn_curr;
    var yIn_curr;
    var zIn_curr;
    var slopeIn_curr;
    var dirIn_curr;

    for (var i = 1; i < trackArray.length; i++) {
        currentPiece = trackArray[i];

        xIn_curr     = currentPiece.xIn;
        yIn_curr     = currentPiece.yIn;
        zIn_curr     = currentPiece.zIn;
        slopeIn_curr = currentPiece.slopeIn;
        dirIn_curr   = currentPiece.dirIn;

        if (xOut_prev != xIn_curr) {
            throw "Track.validate(): at index " + i + ": xOut_prev=" + xOut_prev + " but xIn_curr=" + xIn_curr;
        }
        if (yOut_prev != yIn_curr) {
            throw "Track.validate(): at index " + i + ": yOut_prev=" + yOut_prev + " but yIn_curr=" + yIn_curr;
        }
        if (zOut_prev != zIn_curr) {
            throw "Track.validate(): at index " + i + ": zOut_prev=" + zOut_prev + " but zIn_curr=" + zIn_curr;
        }
        if (slopeOut_prev != slopeIn_curr) {
            throw "Track.validate(): at index " + i + ": slopeOut_prev=" + slopeOut_prev + " but slopeIn_curr=" + slopeIn_curr;
        }
        if (dirOut_prev != dirIn_curr) {
            throw "Track.validate(): at index " + i + ": dirOut_prev=" + dirOut_prev + " but dirIn_curr=" + dirIn_curr;
        }

        xOut_prev     = currentPiece.xOut;
        yOut_prev     = currentPiece.yOut;
        zOut_prev     = currentPiece.zOut;
        slopeOut_prev = currentPiece.slopeOut;
        dirOut_prev   = currentPiece.dirOut;
    }
    return true;
};

var aTrack;

//this track is valid
aTrack = [Segment.preset.straight_N(0,0), Segment.preset.straight_N(0, 1), Segment.preset.straight_N(0, 2)];
console.log(Track.validate(aTrack));

//this track is invalid
aTrack = [Segment.preset.straight_N(0,0), Segment.preset.straight_E(0, 1), Segment.preset.straight_N(6, 9)];
console.log(Track.validate(aTrack));