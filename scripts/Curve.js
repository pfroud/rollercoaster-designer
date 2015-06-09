"use strict";

function Curve() {
    this.spline; // A THREE.SplineCurve3 object.
    this.curveMesh; //Mesh made from spline
    this.ballArray = [];
    this.generated = false;
}

var CURVE = new Curve();


/**
 * Generate a 3D spline which goes through the middle of all the track pieces.
 * Called at the end of insertPiece() in Track.js.
 *
 * YOU SHOULD NEVER CALL THIS, CALL REFRESH() INSTEAD
 */
Curve.prototype.generate = function () {
    var vectorArray = []; //array of THREE.Vector3's which will construct the curve.
    var curr,//the current piece while we iterate over TRACK.pieces.
        x, y, z; //point to get added to the curve.

    for (var i = 0; i < TRACK.pieces.length; i++) {
        curr = TRACK.pieces[i];

        y = curr.y + curr.centerOffset.y; //Y goes up, so it doesn't matter what direction we're facing.
        switch (curr.facing) {
            case "forward":
                x = curr.x + curr.centerOffset.z;
                z = curr.z + curr.centerOffset.x;
                break;

            case "left":
                x = curr.x + curr.centerOffset.x;
                z = curr.z + curr.centerOffset.z;
                break;

            case "right":
                x = curr.x - curr.centerOffset.x;
                z = curr.z - curr.centerOffset.z;
                break;

            case "back":
                x = curr.x - curr.centerOffset.z;
                z = curr.z - curr.centerOffset.x;
                break;
            default:
                throw "ERROR: reached default case! Time to debug!"
        }

        vectorArray.push(new THREE.Vector3(x, y, z)); //add the point to the curve

        /*var visiblePoint = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10),
            new THREE.MeshBasicMaterial({color: 0xffffff})); //create a ball so we can see where the curve goes.
        visiblePoint.position.x = x;
        visiblePoint.position.y = y;
        visiblePoint.position.z = z;
        scene.add(visiblePoint);
        this.ballArray.push(visiblePoint);*/

        if (curr.extraPoints.length > 0) addExtraPoints(this); //turn pieces have two extra points to make curve smooth.
    }

    this.spline = new THREE.SplineCurve3(vectorArray); //make the curve from an array of THREE.Vector3's.
    /*this.curveMesh = new THREE.Mesh(
        //  TubeGeometry(path, segments, radius, radialSegments, closed)
        new THREE.TubeGeometry(this.spline, 1000, 0.015, 10, false),
        new THREE.MeshLambertMaterial({color: 0x0000ff}));

    scene.add(this.curveMesh);*/
    animReady = true; //tell when the curve for animation is ready. Checked in the render function in index.js.
    this.generated = true;


    /**
     * Adds points to the curve for track pieces that need it.
     * curr.extraPoints is an array of javascript objects. For example [ {x:0, y:0}, {x:0, y:0} ]
     * The for loop iterates over the array. Each object represents one point.
     */
    function addExtraPoints(that) {
        var offsetsObj; //gets set to the object with the offsets for where to put the additional points
        for (var j = 0; j < curr.extraPoints.length; j++) { //iterate over the array of javascript objects
            offsetsObj = curr.extraPoints[j];

            var x1, z1; //values which get offset from the track piece origin
            switch (curr.facing) {
                case "forward":
                    x1 = x + offsetsObj.x;
                    z1 = z + offsetsObj.z;
                    break;

                case "left":
                    x1 = x + offsetsObj.z;
                    z1 = z - offsetsObj.x;
                    break;

                case "right":
                    x1 = x - offsetsObj.z;
                    z1 = z + offsetsObj.x;
                    break;

                case "back":
                    x1 = x - offsetsObj.x;
                    z1 = z - offsetsObj.z;
                    break;
                default:
                    throw "ERROR: reached default case! Time to debug!"
            }


            vectorArray.push(new THREE.Vector3(x1, y, z1)); //add extra points to curve. notice that y isn't changed.

            //this colors the first and second extra point different colors. probably not needed any more.
           /* var mat;
            if (j == 0) {
                mat = new THREE.MeshBasicMaterial({color: 0xff00ff});
            } else {
                mat = new THREE.MeshBasicMaterial({color: 0xffff00});
            }

            //adds a colored ball so we can see where the curve goes
            visiblePoint = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10), mat);
            visiblePoint.position.x = x1;
            visiblePoint.position.y = y;
            visiblePoint.position.z = z1;
            scene.add(visiblePoint);
            that.ballArray.push(visiblePoint);*/
        }
    }
};

/**
 * Deleted the displayed curve.
 */
Curve.prototype.delete = function () {
    scene.remove(this.curveMesh);

    while (this.ballArray.length > 0) {
        scene.remove(this.ballArray.shift());
    }
};

/**
 * Deletes and recomputes the displayed curve.
 */
Curve.prototype.refresh = function () {
    if (this.generated) this.delete();
    this.generate();
};