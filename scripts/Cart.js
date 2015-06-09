"use strict";
var jsonLoader = new THREE.JSONLoader(); //used to load the json file

var cart; //The mesh for the cart, set by the jsonLoader. Global so can be seen by function animStep().

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
        steps += 0.1; //This also changes the speed. I don't know how it compares with amountOfPoints.

        var u = steps / amountOfPoints; // u is "relative position in curve according to arc length"? see three.js docs
        
        var u1 = (steps + 1) / amountOfPoints;
        var u2 = u;
        
        var t1 = curve.getUtoTmapping(u1);
        var t2 = curve.getUtoTmapping(u2);
        
        var pos1 = curve.getPoint(t1);
        var pos2 = curve.getPoint(t2);
        
        REF_POINTS.setPositions(pos1, pos2);

        var cartPoint = REF_POINTS.getMidpoint();

        cart.position.x = cartPoint.x;
        cart.position.y = cartPoint.y;
        cart.position.z = cartPoint.z;
        
    }
}

/**
 *  Class that holds the points for the cart
 */
function RefPoints (){

    var material1 = new THREE.MeshBasicMaterial({color: 0xffff00});
    var material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var geometry = new THREE.SphereGeometry(.05, 32, 32);

    
    this.u1 = 0.0;
    this.u2 = 0.0;
    
    this.point1 = new THREE.Mesh(geometry, material1);
    this.point2 = new THREE.Mesh(geometry, material2);
    
    scene.add(this.point1);
    scene.add(this.point2);
}

function debugPoints(){
    if (!REF_POINTS.point1.visible ||
        !REF_POINTS.point2.visible) {
        REF_POINTS.point1.visible = true;
        REF_POINTS.point2.visible = true;
    }
}

RefPoints.prototype.getFlatAngle = function(){
    var dx = this.point1.position.x - this.point2.position.x;
    var dz = this.point1.position.z - this.point2.position.z;
    return  Math.tan(dx / dz);
};

RefPoints.prototype.getMidpoint = function(){
    var ret = {};
    var dx = this.point1.position.x - this.point2.position.x;
    var dy = this.point1.position.y - this.point2.position.y;
    var dz = this.point1.position.z - this.point2.position.z;

    ret.x = this.point1.position.x + (dx / 2);
    ret.y = this.point1.position.y + (dy / 2);
    ret.z = this.point1.position.z + (dz / 2);
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
