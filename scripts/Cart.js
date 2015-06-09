"use strict";
var jsonLoader = new THREE.JSONLoader(); //used to load the json file

var cart; //The mesh for the cart, set by the jsonLoader. Global so can be seen by function animStep().

/*jsonLoader.load("train 3D models/3 - json/Cart_dims.json",
    function createScene(geometry, materials) {
        cart = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        cart.scale.set(SCALE, SCALE, SCALE);
        scene.add(cart);
        //scene.add(new THREE.BoxHelper(cart));
    }
);*/



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
        var t = TRACK.spline.getUtoTmapping(u); // t is between 0 and 1
        var pos = TRACK.spline.getPoint(t); // Returns a vector for point t of the curve where t is between 0 and 1
        cart.position.x = pos.x;
        cart.position.y = pos.y;
        cart.position.z = pos.z;

        var rot = TRACK.spline.getTangent(t); // Returns a unit vector tangent at t. Could also do getTangentAt(u), same thing.
        //cart.rotation.x = rot.x;
        //cart.rotation.y = rot.y;
        cart.rotation.z = rot.z;
    }
}

/**
 *
 */
function RefPoints (){

    var material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var geometry = new THREE.SphereGeometry(.05, 32, 32);

    this.point1 = new THREE.Mesh(geometry, material);
    this.point2 = new THREE.Mesh(geometry, material);
}

function debugPoints(){
    if (!REF_POINTS.point1.visible ||
        !REF_POINTS.point2.visible) {
        REF_POINTS.point1.visible = true;
        REF_POINTS.point2.visible = true;
    }
}

RefPoints.prototype.getAngle = function(){
    var dx = this.point1.position.x - this.point2.position.x;
    var dz = this.point1.position.z - this.point2.position.z;
    return  Math.tan(dx / dz);
};

// global variable for the ref points
var REF_POINTS = new RefPoints();
