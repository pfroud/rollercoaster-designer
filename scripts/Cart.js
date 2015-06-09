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

var curve;


function generateCurve() {
    var array = [];
    var ps = TRACK.pieces;
    var curr, x, y, z;

    for (var i = 0; i < ps.length; i++) {
        curr = ps[i];

        y = curr.y + curr.centerOffset.y;
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

        array.push(new THREE.Vector3(x, y, z));

        var point = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10), new THREE.MeshBasicMaterial({color: 0xffffff}));
        point.position.x = x;
        point.position.y = y;
        point.position.z = z;
        scene.add(point);

        if (curr.extraPoints.length > 0) {
            var offset;
            for (var j = 0; j < curr.extraPoints.length; j++) {
                offset = curr.extraPoints[j];

                var x1, z1;
                switch (curr.facing) {
                    case "forward":
                        x1 = x + offset.x;
                        z1 = z + offset.z;
                        break;

                    case "left":
                        x1 = x + offset.z;
                        z1 = z - offset.x;
                        break;

                    case "right":
                        x1 = x - offset.z;
                        z1 = z + offset.x;
                        break;

                    case "back":
                        x1 = x - offset.x;
                        z1 = z - offset.z;
                        break;
                    default:
                        throw "ERROR: reached default case! Time to debug!"
                }


                array.push(new THREE.Vector3(x1, y, z1));

                var mat;
                if (j == 0) {
                    mat = new THREE.MeshBasicMaterial({color: 0xff00ff});
                } else {
                    mat = new THREE.MeshBasicMaterial({color: 0xffff00});
                }

                point = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 10), mat);
                point.position.x = x1;
                point.position.y = y;
                point.position.z = z1;
                scene.add(point);
            }
        }

    }

    curve = new THREE.SplineCurve3(array);
    scene.add(new THREE.Mesh(
            new THREE.TubeGeometry(curve, 50, 0.015, 10, false),
            new THREE.MeshLambertMaterial({color: 0x0000ff}))
    );
    animReady = true;
}


var steps = 0;
var amountOfPoints = 100;

var box = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial({color: 0xff3388}));
//box.matrixAutoUpdate = true;
scene.add(box);


function animStep() {

    if (steps < amountOfPoints && animReady) {
        box.rotation.x += 0.1;
        //console.log("animStep");
        steps++;

        var t = curve.getUtoTmapping(steps / amountOfPoints);
        var pos = curve.getPoint(t);
        box.position.x = pos.x;
        box.position.y = pos.y;
        box.position.z = pos.z;

        var rotation = curve.getTangent(t);
    }
}