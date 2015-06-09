var jsonLoader = new THREE.JSONLoader(); //used to load the json file
var sc = 0.01; //amount to scale the cart by

var cart; //The mesh for the cart, set by the jsonLoader. Global so can be seen by function animStep().

jsonLoader.load("train 3D models/3 - json/Cart_dims.json",
    function createScene(geometry, materials) {
        cart = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        cart.scale.set(sc, sc, sc);
        scene.add(cart);
        //scene.add(new THREE.BoxHelper(cart));
    }
);

var curve; // A THREE.SplineCurve3 object. Global so can be seen by function animStep().

/**
 * Generate a 3D spline which goes through the middle of all the track pieces.
 * Called at the end of insertPiece() in Track.js.
 */
function generateCurve() {
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

        var visiblePoint = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10),
            new THREE.MeshBasicMaterial({color: 0xffffff})); //create a ball so we can see where the curve goes.
        visiblePoint.position.x = x;
        visiblePoint.position.y = y;
        visiblePoint.position.z = z;
        scene.add(visiblePoint);

        if (curr.extraPoints.length > 0) addExtraPoints(); //turn pieces have two extra points to make curve smooth.
    }

    curve = new THREE.SplineCurve3(vectorArray); //make the curve from an array of THREE.Vector3's.

    scene.add(new THREE.Mesh(
            //  TubeGeometry(path, segments, radius, radialSegments, closed)
            new THREE.TubeGeometry(curve, 50, 0.015, 10, false),
            new THREE.MeshLambertMaterial({color: 0x0000ff}))
    );
    animReady = true; //tell when the curve for animation is ready. Checked in the render function in index.js.


    /**
     * Adds points to the curve for track pieces that need it.
     * curr.extraPoints is an array of javascript objects. For example [ {x:0, y:0}, {x:0, y:0} ]
     * The for loop iterates over the array. Each object represents one point.
     */
    function addExtraPoints() {
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
            var mat;
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
        }
    }
}


var steps = 0; //counts how many frames the animation has gone for
var amountOfPoints = 100; //Number of points to move over? Smaller number goes faster. Does not change motion smoothness.

/**
 * Moves the cart a small amount along the curve.
 * Called from render() in index.js.
 *
 * from
 * https://github.com/mrdoob/three.js/issues/743#issuecomment-2716407
 */
function animStep() {
    if (steps < amountOfPoints) {
        steps += 0.1; //This also changes the speed. I don't know how it compares with amountOfPoints.

        var u = steps / amountOfPoints; // u is "relative position in curve according to arc length"? see three.js docs
        var t = curve.getUtoTmapping(u); // t is between 0 and 1
        var pos = curve.getPoint(t); // Returns a vector for point t of the curve where t is between 0 and 1
        cart.position.x = pos.x;
        cart.position.y = pos.y;
        cart.position.z = pos.z;

        rot = curve.getTangent(t); // Returns a unit vector tangent at t. Could also do getTangentAt(u), same thing.
        //cart.rotation.x = rot.x;
        //cart.rotation.y = rot.y;
        cart.rotation.z = rot.z;


    }
}