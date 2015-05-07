"use strict";

var Track = {};

Track.validate = function (trackArray) {
    if (trackArray.length == 1) return true;

    var xOut_prev     = trackArray[0].xOut;
    var yOut_prev     = trackArray[0].yOut;
    var zOut_prev     = trackArray[0].zOut;
    var slopeOut_prev = trackArray[0].slopeOut;
    var dirOut_prev   = trackArray[0].dirOut;

    var xOut_curr;
    var yOut_curr;
    var zOut_curr;
    var slopeOut_curr;
    var dirOut_curr;

    for (var i = 1; i < trackArray.length; i++) {

        xOut_curr     = trackArray[i].xOut;
        yOut_curr     = trackArray[i].yOut;
        zOut_curr     = trackArray[i].zOut;
        slopeOut_curr = trackArray[i].slopeOut;
        dirOut_curr   = trackArray[i].dirOut;

        if (xOut_prev     != xOut_curr ||
            yOut_prev     != yOut_curr ||
            zOut_prev     != zOut_curr ||
            slopeOut_prev != slopeOut_curr ||
            dirOut_prev   != dirOut_curr) {

            throw "Track.validate(): something wrong at index "+i;
            return false;
        }
        xOut_prev     = xOut_curr;
        yOut_prev     = yOut_curr;
        zOut_prev     = zOut_curr;
        slopeOut_prev = slopeOut_curr;
        dirOut_prev   = dirOut_curr;
    }

    return true;

};

var aTrack = [TrackPiece.presets.straight(0, 0, 1)];

Track.validate(aTrack);

var thing = new TrackPiece(5, 3, 9, 1, 1, 0);

var a = TrackPiece.presets.straight(2, 2, 2);

