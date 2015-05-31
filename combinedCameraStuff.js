/*
 * code pasted from canvas_camera_orthographic2.html
 */

var lookAtScene = true;

function setFov( fov ) {
    camera.setFov( fov );
    document.getElementById('fov').innerHTML = 'FOV '+ fov.toFixed(2) +'&deg;' ;
}

function setLens( lens ) {
    var fov = camera.setLens( lens );
    document.getElementById('fov').innerHTML = 'Converted ' + lens + 'mm lens to FOV '+ fov.toFixed(2) +'&deg;' ;
}

function setOrthographic() {
    camera.toOrthographic();
    document.getElementById('fov').innerHTML = 'Orthographic mode' ;
}

function setPerspective() {
    camera.toPerspective();
    document.getElementById('fov').innerHTML = 'Perspective mode' ;
}