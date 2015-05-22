/*
 Jonathan Bridge & Peter Froud
 cs160 spring 2015
 */

function doTheThing() {
    /*************************** SETUP *********************************/
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 5;
    camera.position.x = -3;
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("theCanvas")});
    renderer.setSize(1500, 800);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

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
}