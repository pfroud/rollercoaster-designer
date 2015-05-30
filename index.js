/*************************** SETUP *********************************/
var scene = new THREE.Scene();

var CAMERA_PERSPECTIVE = false; //true if the perspective camera is used, flase if ortho camera is used

if (CAMERA_PERSPECTIVE) {
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
} else {
    var viewSize = 200;
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-viewSize * aspect, viewSize * aspect, viewSize, -viewSize, 1, 10000);
    var camDist = 200;
    camera.position.x = camera.position.y = camera.position.z = camDist;
    camera.lookAt(0, 0, 0);
}


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); //make canvas take up whole screen
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff);
//scene.add(light);

//scene.add(new THREE.AxisHelper(0.5)); // The X axis is red. The Y axis is green. The Z axis is blue.


// add subtle ambient lighting
//var ambientLight = new THREE.AmbientLight(0x222222);
//scene.add(ambientLight);

// directional lighting
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Y height of ground plane
var GROUND_HEIGHT = -100;

//ground plane
//the callback function is called when the texture is done loading
var tex = THREE.ImageUtils.loadTexture("texture/grass1.jpg", {}, function () {
    var groundPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500, 1, 1),
        new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide}));
    groundPlane.rotateX(Math.PI / -2); //rotate so it's horizontal
    groundPlane.translateZ(GROUND_HEIGHT); //move down a tiny bit so track and axis helper draw on top of it.
    // Z is translated instead of Y because the mesh is rotated.
    scene.add(groundPlane);


});


/*************************** WINDOW RESIZE FIX ********************************
 from
 http://stackoverflow.com/questions/20290402/three-js-resizing-canvas
 */
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    if (CAMERA_PERSPECTIVE) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    } else {
        var viewSize = 3;
        var aspect = window.innerWidth / window.innerHeight;
        camera.left = -viewSize * aspect;
        camera.right = viewSize * aspect;
        camera.top = viewSize;
        camera.bottom = -viewSize;
        camera.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function toggleCamera(){
    console.log("camera toggle")
}


/*************************** RENDER *********************************/
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
};
render();

/*************************** OTHER GLOBAL VARIABLES ******************/

// iterators
var i, n, j, t = 0;
var SCALE = 1;