/*************************** SETUP *********************************/
var scene = new THREE.Scene();

///////////////// uncomment to use perspective camera ////////////////////////
//var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
///////////////////////////////////////////////////////////////////////////////

///////////////// uncomment to use orthographic camera ////////////////////////
var viewSize = 3;
var aspect = window.innerWidth / window.innerHeight;
camera = new THREE.OrthographicCamera(-viewSize * aspect, viewSize * aspect, viewSize, -viewSize, 1, 10000);
var camDist = 2;
camera.position.x = camera.position.y = camera.position.z = camDist;
camera.lookAt(0, 0, 0);
///////////////////////////////////////////////////////////////////////////////


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); //make canvas take up whole screen
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

//scene.add(new THREE.AxisHelper(0.5)); //draws red, green, and blue lines for axis at the origin

//ground plane                                               5 units square
/*var groundPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x999999}));
groundPlane.rotateX(Math.PI/-2); //rotate so it's horozontal
groundPlane.translateZ(-0.001); //move down a tiny bit so track and axis helper draw on top of it
scene.add(groundPlane);*/

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

/*************************** OTHER GLOBAL VARIABLES ******************/

// iterators
var i, n, j, t = 0;
var SCALE = 0.01;