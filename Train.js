"use strict";

const MATERIAL_TRAIN = new THREE.MeshLambertMaterial({color: "#00ff00"});

function addTrain() {
    var jsonLoader = new THREE.JSONLoader();
    var sc = 0.01;

    jsonLoader.load("train 3D models/3 - json/Cart_dims.json",
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
    );
}