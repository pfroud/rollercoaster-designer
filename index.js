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


camera.position.z = 5;
controls = new THREE.OrbitControls(camera, renderer.domElement);

var skyboxImages = [
    "skybox/skybox1.jpg",
    "skybox/skybox2.jpg",
    "skybox/skybox3.jpg",
    "skybox/skybox4.jpg",
    "skybox/skybox5.jpg",
    "skybox/skybox6.jpg"
];

var cubemap = THREE.ImageUtils.loadTextureCube(skyboxImages); // load textures
cubemap.format = THREE.RGBFormat;

var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
shader.uniforms['tCube'].value = cubemap; // apply textures to shader

// create shader material
var skyBoxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
});

// create skybox mesh
var skybox = new THREE.Mesh(
    new THREE.BoxGeometry(1000, 1000, 1000),
    skyBoxMaterial
);

scene.add(skybox);

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
    controls.update();

    //plane.rotation.x += 0.1;
    //cube.rotation.y += 0.1;
};
render();