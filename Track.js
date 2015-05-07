"use strict";

var Track = {};

Track.validate = function (trackArray) {
    if (trackArray.length == 1) return true;

    var currentPiece;

    var xOut_prev     = trackArray[0].xOut;
    var yOut_prev     = trackArray[0].yOut;
    var zOut_prev     = trackArray[0].zOut;
    var slopeOut_prev = trackArray[0].slopeOut;
    var dirOut_prev   = trackArray[0].dirOut;

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

        if (xOut_prev     != xIn_curr ||
            yOut_prev     != yIn_curr ||
            zOut_prev     != zIn_curr ||
            slopeOut_prev != slopeIn_curr ||
            dirOut_prev   != dirIn_curr) {

            throw "Track.validate(): something wrong at index "+i;
        }
        xOut_prev     = currentPiece.xOut;
        yOut_prev     = currentPiece.yOut;
        zOut_prev     = currentPiece.zOut;
        slopeOut_prev = currentPiece.slopeOut;
        dirOut_prev   = currentPiece.dirOut;
    }
    return true;
};

var aTrack = [TrackPiece.presets.straight_NS(0, 0, 1)];

console.log(Track.validate(aTrack));
