"use strict";
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

        var rot = curve.getTangent(t); // Returns a unit vector tangent at t. Could also do getTangentAt(u), same thing.
        //cart.rotation.x = rot.x;
        //cart.rotation.y = rot.y;
        cart.rotation.z = rot.z;


    }
}