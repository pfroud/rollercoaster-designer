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

        if (xOut_prev != xIn_curr) {
            throw "Track.validate(): index " + i + ": xOut_prev=" + xOut_prev + " but xIn_curr=" + xIn_curr;
        }
        if (yOut_prev != yIn_curr) {
            throw "Track.validate(): index " + i + ": yOut_prev=" + yOut_prev + " but yIn_curr=" + yIn_curr;
        }
        if (zOut_prev != zIn_curr) {
            throw "Track.validate(): index " + i + ": zOut_prev=" + zOut_prev + " but zIn_curr=" + zIn_curr;
        }
        if (slopeOut_prev != slopeIn_curr) {
            throw "Track.validate(): index " + i + ": slopeOut_prev=" + slopeOut_prev + " but slopeIn_curr=" + slopeIn_curr;
        }
        if (dirOut_prev != dirIn_curr) {
            throw "Track.validate(): index " + i + ": dirOut_prev=" + dirOut_prev + " but dirIn_curr=" + dirIn_curr;
        }

        xOut_prev     = currentPiece.xOut;
        yOut_prev     = currentPiece.yOut;
        zOut_prev     = currentPiece.zOut;
        slopeOut_prev = currentPiece.slopeOut;
        dirOut_prev   = currentPiece.dirOut;
    }
    return true;
};

var aTrack = [TrackPiece.preset.straight_NS(0,0), TrackPiece.preset.straight_NS(0, 1), TrackPiece.preset.straight_NS(0, 2)];
console.log(Track.validate(aTrack));

aTrack = [TrackPiece.preset.straight_NS(0,0), TrackPiece.preset.straight_EW(0, 1), TrackPiece.preset.straight_NS(6, 9)];
console.log(Track.validate(aTrack));