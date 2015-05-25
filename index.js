/*************************** SETUP *********************************/
var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
var viewSize = 1;
var aspect = window.innerWidth / window.innerHeight;
camera = new THREE.OrthographicCamera(-viewSize * aspect, viewSize * aspect, viewSize, -viewSize, 1, 10000);
var camDist = 2;
camera.position.x = camera.position.y =  camera.position.z = camDist;
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(1700, 900);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);



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
var skyboxSize = 5; // was 1000
var skybox = new THREE.Mesh(
    new THREE.BoxGeometry(skyboxSize, skyboxSize, skyboxSize),
    skyBoxMaterial
);
scene.add(skybox);

/*************************** WINDOW RESIZE FIX ********************************
 from
 http://stackoverflow.com/questions/20290402/three-js-resizing-canvas
 */
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


/*************************** RENDER *********************************/
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
};
render();