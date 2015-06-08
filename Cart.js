const MATERIAL_TRAIN = new THREE.MeshLambertMaterial({color: "#00ff00"});


var jsonLoader = new THREE.JSONLoader();
var sc = 0.01;

/*jsonLoader.load("train 3D models/3 - json/Cart_dims.json",
 function createScene(geometry, materials) {

 // create the mesh and add it to the scene
 var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));

 //mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), 1);

 mesh.position.x = 0;
 mesh.position.y = 0;
 mesh.position.z = 0;
 mesh.scale.set(sc, sc, sc);
 scene.add(mesh);


 var bbox = new THREE.BoxHelper(mesh);
 scene.add(bbox);
 }
 );*/

/*[
 new THREE.Vector3(-10, 0, 10),
 new THREE.Vector3(-5, 5, 5),
 new THREE.Vector3(0, 0, 0),
 new THREE.Vector3(5, -5, 5),
 new THREE.Vector3(10, 0, 10)
 ]*/

var array = [];
var ps = TRACK.pieces;
var curr;

function curve() {

    for (var i = 0; i < ps.length; i++) {
        //console.log("i is", i);
        curr = ps[i];
        //console.log(curr);
        array.push(new THREE.Vector3(curr.x, curr.y, curr.z));
        var point = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10));
        point.position.x = curr.x;
        point.position.y = curr.y;
        point.position.z = curr.z;
        scene.add(point)
    }

    scene.add(new THREE.Mesh(
            new THREE.TubeGeometry(new THREE.SplineCurve3(array), 50, 0.02, 10, false),
            new THREE.MeshLambertMaterial({color: 0x0000ff}))
    );
}