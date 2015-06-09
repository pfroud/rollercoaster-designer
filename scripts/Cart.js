"use strict";
var jsonLoader = new THREE.JSONLoader(); //used to load the json file
var debugSphere;
var cart; //The mesh for the cart, set by the jsonLoader. Global so can be seen by function animStep().
var SPEED = .1;
jsonLoader.load("train 3D models/3 - json/Cart_dims.json",
    function createScene(geometry, materials) {
        cart = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        cart.scale.set(SCALE, SCALE, SCALE);
        scene.add(cart);
        //cart.visible = false;
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
        steps += SPEED; //This also changes the speed. I don't know how it compares with amountOfPoints.


        var u = steps / amountOfPoints; // u is "relative position in curve according to arc length"? see three.js docs
        
        var u1 = (steps + (20/TRACK.pieces.length)) / amountOfPoints;
        var u2 = u;

        // loop back to the beginning if we are at the end
        if (u1 > 1){
            steps = 0;
            return;
        }

        var t1 = CURVE.spline.getUtoTmapping(u1);
        var t2 = CURVE.spline.getUtoTmapping(u2);
        
        var pos1 = CURVE.spline.getPoint(t1);
        var pos2 = CURVE.spline.getPoint(t2);
        
        REF_POINTS.setPositions(pos1, pos2);

        var cartPoint = REF_POINTS.getMidpoint();

        debugSphere.position.x = cartPoint.x;
        debugSphere.position.y = cartPoint.y;
        debugSphere.position.z = cartPoint.z;

        if (typeof cart !== "undefined"){
            // update position
            cart.position.x = cartPoint.x;
            cart.position.y = cartPoint.y;
            cart.position.z = cartPoint.z;

            REF_POINTS.rotateHorizontal();
            REF_POINTS.rotateVertical();
        }
    }
}

/**
 *  Class that holds the points for the cart
 */
function RefPoints (){

    var material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
    var material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var material3 = new THREE.MeshBasicMaterial({color: 0xff0000});
    var geometry = new THREE.SphereGeometry(.05, 32, 32);

    
    this.u1 = 0.0;
    this.u2 = 0.0;
    
    this.point1 = new THREE.Mesh(geometry, material1);
    this.point2 = new THREE.Mesh(geometry, material2);
    
    scene.add(this.point1);
    scene.add(this.point2);

    debugSphere = new THREE.Mesh(geometry, material3);
    scene.add(debugSphere);
}

function debugPoints(){
    if (!REF_POINTS.point1.visible ||
        !REF_POINTS.point2.visible) {
        REF_POINTS.point1.visible = true;
        REF_POINTS.point2.visible = true;
    }
}


RefPoints.prototype.rotateHorizontal = function(){
    var dx = this.point1.position.x - this.point2.position.x;
    var dy = this.point1.position.y - this.point2.position.y;
    var dz = this.point1.position.z - this.point2.position.z;

    var divide = dx / dz;
    var ret = Math.atan(divide);

    if (dz < 0){
        ret += Math.PI;
    }
    ret -= Math.PI/2;

    cart.rotation.y = ret;
};

RefPoints.prototype.rotateVertical = function(){
    var dx = this.point1.position.x - this.point2.position.x;
    var dy = this.point1.position.y - this.point2.position.y;
    var dz = this.point1.position.z - this.point2.position.z;

    if (dz < 0 && dx >= 0) {
        cart.rotation.z = Math.atan(dy/dz);
        cart.rotation.z *= -1;
        return;
    }

    if (dz >= 0 && dx < 0) {

        cart.rotation.z = Math.atan(dy/dx);
        cart.rotation.z *= -1;
        return;
    }
    if (dz < 0 && dx < 0){
        console.log("LOG");

        cart.rotation.z = Math.atan(dy/dz);
        return;
    }

    //console.log(cart.rotation.z);
    if (dz >= 0 && dx > 0){

        cart.rotation.z = Math.atan(dy/dx);
        return;
    }
};

RefPoints.prototype.getMidpoint = function(){
    var ret = {};
    var dx = this.point1.position.x + this.point2.position.x;
    var dy = this.point1.position.y + this.point2.position.y;
    var dz = this.point1.position.z + this.point2.position.z;

    ret.x = dx / 2;
    ret.y = dy / 2;
    ret.z = dz / 2;
    return ret;
};


RefPoints.prototype.setPositions = function (pos1, pos2){
    this.point1.position.x = pos1.x;
    this.point1.position.y = pos1.y;
    this.point1.position.z = pos1.z;

    this.point2.position.x = pos2.x;
    this.point2.position.y = pos2.y;
    this.point2.position.z = pos2.z;
};
// global variable for the ref points
var REF_POINTS = new RefPoints();
