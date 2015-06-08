
/**
 * Support class, an object to represent the supports of the track.
 * @param data the supportDataObj from Constant.js
 * @param piece the Piece that this is placed next to. See Piece.js
 * @constructor
 */
function Support (data, piece){

    // the height of the support
    this.height = piece.y - GROUND_HEIGHT + data.heightOffset;

    // the material all supports are made of
    var material = MATERIAL_SUPPORT;

    // the geometry of the cylinder, defined by the radius and the height
    var geometry = new THREE.CylinderGeometry(
        data.radius,
        data.radius,
        this.height,
        32
    );

    this.mesh = new THREE.Mesh(geometry, material);

    // set the position
    this.setPosition(data, piece);

    this.boundingBox = new THREE.BoxHelper(this.mesh);
    scene.add(this.mesh);
    scene.add(this.boundingBox);
    this.boundingBox.visible = TRACK.boxes;

    piece.supports.push(this);
}

/**
 * Sets the position of the support as appropriate based on facing of the
 * parent piece. Takes the data and the piece as an argument.
 *
 * @param data: the data object for the support
 * @param piece: the parent piece
 */
Support.prototype.setPosition = function(data, piece){

    // The y will always be the same regardless of scale.
    this.mesh.position.y = (this.height / 2) + GROUND_HEIGHT;

    switch(piece.facing){
        case "forward":
            this.mesh.position.x = piece.x + data.x;
            this.mesh.position.z = piece.z - data.z;
            break;
        case "back":
            this.mesh.position.x = piece.x - data.x;
            this.mesh.position.z = piece.z + data.z;
            break;
        case "left":
            this.mesh.position.x = piece.x - data.z;
            this.mesh.position.z = piece.z - data.x;
            break;
        case "right":
            this.mesh.position.x = piece.x + data.z;
            this.mesh.position.z = piece.z + data.x;
            break;
        default: throw "error, facing not one of the possible directions"
    }

};

/**
 * This function deletes the current support. It's called by piece as the piece
 * is deleted.
 */
Support.prototype.delete = function(){
    scene.remove(this.mesh);
    scene.remove(this.boundingBox);
};

/**
 * Toggles the bounding box the support.
 */
Support.prototype.toggleBox =  function(){
    this.boundingBox.visible = !this.boundingBox.visible;
};

/**
 * Toggles the bounding box the support.
 */
Support.prototype.toggleVisibility =  function(){
    this.mesh.visible = !this.mesh.visible;
    this.toggleBox();
};
