/*************************** SETUP *********************************/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.lookAt(0, 0, 0);
// setup rendered
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

/*************************** CONSTANTS *********************************/

const SEGMENT_WIDTH = 1;
const SEGMENT_LENGTH = 3;
const RAIL_HEIGHT = 3;

/*************************** CUBE *********************************/

/*scene.add(new THREE.Mesh(
 new THREE.BoxGeometry(1, 1, 1, 1, 1, 1),
 new THREE.MeshNormalMaterial({
 color: 0xffff33,
 specular: 0x009900,
 shininess: 30,
 shading: THREE.FlatShading
 })
 ));*/

/*************************** NEW TRACK *********************************/

var mat = new THREE.MeshBasicMaterial({color: 0x00cc33, side: THREE.DoubleSide});
var bottomPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(SEGMENT_LENGTH, SEGMENT_WIDTH, 1, 1), mat);
//var rail = new THREE.mesh(new THREE.PlaneBufferGeometry(SEGMENT_LENGTH, RAIL_HEIGHT), mat);
bottomPlane.rotation.x = Math.PI / 2;
scene.add(bottomPlane);


/*************************** OLD TRACK *********************************/
/*var jsonLoader = new THREE.JSONLoader();
 function addPiece(filename, x, y, z) {
 jsonLoader.load(filename, function createScene(geometry, materials) {
 var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
 mesh.scale.set(0.1, 0.1, 0.1);
 mesh.position.x = x;
 mesh.position.y = y;
 mesh.position.z = z;
 scene.add(mesh);
 });
 }
 addPiece("modelJS/straight.js", 0, 0, 0);
 addPiece("modelJS/straight.js", 7.5, 0, 0);*/


/*************************** SKYBOX *********************************/

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
var skyBoxMaterial = new THREE.ShaderMaterial({
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


/*************************** RENDER *********************************/
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
};
render();