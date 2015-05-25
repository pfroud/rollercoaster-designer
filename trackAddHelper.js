"use strict";


/*
 in current camera:
 +X is right, -X is left
 +Y is up, -Y is down
 Z is forward / back
 */
function doPreCorrections(piece) {
    switch (piece) {
        case slope.flat:
            break;
        case slope.down:
            currentY -= size.down.y - 0.12;
            break;
        case slope.downToFlat:
            currentY -= size.downToFlat.y - 0.12;
            break;
        case slope.flatToUp:
        case slope.upToFlat:
        case slope.up:
        case slope.turnLeftSmall:
            break;

        case slope.flatToDown:
            //moves the top of flatToDown to the top of flat. you can uncomment to see why needed
            // YES THIS IS ACTUALLY NEEDED
            currentY -= size.flat.y + 0.002;
            break;
        default:
            throw "- bad track type \"" + piece + "\"";
    }

}

/*
 in current camera:
 +X is right, -X is left
 +Y is up, -Y is down
 Z is forward / back
 */

function advanceCurrent(piece) {
    switch (piece) {
        case slope.up:
            currentX += size.up.x - 0.1188;
            currentY += size.up.y - 0.1188;
            break;
        case slope.flat:
            currentX += size.flat.x;
            break;
        case slope.flatToUp:
            currentX += size.flatToUp.x - 0.12;
            currentY += size.flatToUp.y - 0.12;
            break;
        case slope.upToFlat:
            currentX += size.upToFlat.x;
            currentY += size.upToFlat.y;
            break;

        case slope.flatToDown:
            currentX += size.flatToDown.x - 0.12;
            break;
        case slope.down:
            currentX += size.down.x - 0.1188;
            break;
        case slope.downToFlat:
            currentX += size.downToFlat.x;
            break;

        case slope.turnLeftSmall:
            currentX += size.turnLeftSmall.x;
            currentZ -= size.turnLeftSmall.z;
            break;

        default:
            throw "- bad track type \"" + piece + "\"";
    }

    if (prevPiece == slope.upToFlat) {
        currentY -= size.flat.y;
    }
}