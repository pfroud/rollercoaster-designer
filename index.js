/*************************** SETUP *********************************/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 2;
camera.lookAt(0, 0, 0);
// setup rendered
var renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

/*************************** CONSTANTS *********************************/

const SEGMENT_WIDTH = 1; //width of any track segment
const SEGMENT_LENGTH = 3; //length of any track segment
const RAIL_HEIGHT = 0.1; //height of rails to tell which side is up

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
var offsetX = 0;
var materialBase = new THREE.MeshBasicMaterial({color: "green", side: THREE.DoubleSide});
var materialRails = new THREE.MeshBasicMaterial({color: "yellow", side: THREE.DoubleSide});

/*addSegment();
addSegment();
addSegment();*/


function addSegment() {
    //bottom
    var bottomMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(SEGMENT_LENGTH, SEGMENT_WIDTH, 1, 1), materialBase);
    bottomMesh.rotation.x = Math.PI / 2;
    bottomMesh.translateX(offsetX);
    scene.add(bottomMesh);

    //rail 1
    var railMesh1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(SEGMENT_LENGTH, RAIL_HEIGHT, 1, 1), materialRails);
    railMesh1.translateX(offsetX); //move to offset
    railMesh1.translateY(RAIL_HEIGHT / 2); //move rail on top of bottom plane
    railMesh1.translateZ(SEGMENT_WIDTH / 2); //move rail to side of bottom plane
    scene.add(railMesh1);

    //rail 2
    var railMesh2 = new THREE.Mesh(new THREE.PlaneBufferGeometry(SEGMENT_LENGTH, RAIL_HEIGHT, 1, 1), materialRails);
    railMesh2.translateX(offsetX);
    railMesh2.translateY(RAIL_HEIGHT / 2);
    railMesh2.translateZ(-SEGMENT_WIDTH / 2);
    scene.add(railMesh2);

    offsetX += SEGMENT_LENGTH;
}


/*************************** OLD TRACK *********************************/
var jsonLoader = new THREE.JSONLoader();
var scale = 0.01;

function addPiece(filename, x, y, z) {
    jsonLoader.load(filename, function createScene(geometry, materials) {
        var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
        mesh.scale.set(scale, scale, scale);
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        scene.add(mesh);
    });
}
addPiece("track.js", -1.4, 0, 0);
addPiece("track.js", -0.7, 0, 0);
addPiece("track.js", 0, 0, 0);
addPiece("track.js", 0.7, 0, 0);
addPiece("track.js", 1.4, 0, 0);


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