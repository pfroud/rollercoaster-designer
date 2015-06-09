const MATERIAL_TRAIN = new THREE.MeshLambertMaterial({color: "#00ff00"});


var jsonLoader = new THREE.JSONLoader();
var sc = 0.01;

var cart;

jsonLoader.load("train 3D models/3 - json/Cart_dims.json",
    function createScene(geometry, materials) {

        cart = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));

        cart.scale.set(sc, sc, sc);
        scene.add(cart);
        //scene.add(new THREE.BoxHelper(cart));
    }
);


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


function animStep() {

    if (steps < amountOfPoints && animReady) {
        steps += 0.1;

        var u = steps / amountOfPoints;
        var t = curve.getUtoTmapping(u);
        var pos = curve.getPoint(t);
        cart.position.x = pos.x;
        cart.position.y = pos.y;
        cart.position.z = pos.z;

        rot = curve.getTangent(t);
        //cart.rotation.x = rot.x;
        //cart.rotation.y = rot.y;
        cart.rotation.z = rot.z;


    }
}