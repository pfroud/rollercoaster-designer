/*************************** SETUP *********************************/
var SCALE = 0.01;
var CAMERA_PERSPECTIVE = false; //true if the perspective camera is used, flase if ortho camera is used

/*Use if changing SCALE.
 Sets the size of the skybox, ground plane, and orthographic camera view size.*/
var WORLD_SIZE = SCALE * (CAMERA_PERSPECTIVE ? 1000 : 500);

var scene = new THREE.Scene();

if (CAMERA_PERSPECTIVE) {
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
} else {
    var viewSize = WORLD_SIZE / 2;
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-viewSize * aspect, viewSize * aspect, viewSize, -viewSize, 1, 10000);
}
/* Camera distance only does anything with perspective camera.
With ortho camera, things will get cut off if camera is too close, but otherwise there's no difference. */

var camDist = WORLD_SIZE / (CAMERA_PERSPECTIVE ? 3 : 1);
camera.position.x = camera.position.y = camera.position.z = camDist;
camera.lookAt(0, 0, 0);


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
var GROUND_HEIGHT = -WORLD_SIZE / 5;

var GROUND_PLANE;
//ground plane
//the callback function is called when the texture is done loading
var tex = THREE.ImageUtils.loadTexture("texture/grass1.jpg", {}, function () {
    GROUND_PLANE = new THREE.Mesh(new THREE.PlaneBufferGeometry(WORLD_SIZE, WORLD_SIZE, 1, 1),
        new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide}));
    GROUND_PLANE.rotateX(Math.PI / -2); //rotate so it's horizontal
    GROUND_PLANE.translateZ(GROUND_HEIGHT); //move down a tiny bit so track and axis helper draw on top of it.
    // Z is translated instead of Y because the mesh is rotated.
    scene.add(GROUND_PLANE);


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
        var viewSize = WORLD_SIZE / 2;
        var aspect = window.innerWidth / window.innerHeight;
        camera.left = -viewSize * aspect;
        camera.right = viewSize * aspect;
        camera.top = viewSize;
        camera.bottom = -viewSize;
        camera.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);

}


/*************************** RENDER *********************************/
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
};
render();

/*************************** OTHER GLOBAL VARIABLES ******************/

