var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// setup rendered
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// add plane
var geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
var material = new THREE.MeshNormalMaterial({
    color: 0xffff33,
    specular: 0x009900,
    shininess: 30,
    shading: THREE.FlatShading
});
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);


camera.position.z = 5;
controls = new THREE.OrbitControls(camera, renderer.domElement);


var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
    controls.update();

    //plane.rotation.x += 0.1;
    //cube.rotation.y += 0.1;
};
render();