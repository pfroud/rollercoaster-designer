#Roller Coaster Designer

Jonathan Bridge & Peter Froud  
CS 160 fall 2015   
[View project](https://classes.soe.ucsc.edu/cmps160/Spring15/projects/) - hosted by the UCSC Baskin School of Engineering. Click the thumbnail in third place, then click 'view project' at the top.

If you just want to look at the code, go to [`scripts/`](scripts).

##How to use

Our program lets the user design a roller coaster track from modular pieces. To change the pre-loaded track, use the circular X button at the bottom to remove a piece. The button with a red background deletes the entire track. Then, use the seven buttons at the top to add flat, sloped, or turn pieces. You can also use the shuffle button at the bottom to add a random sequence of curved track.

Press the play button at the bottom to start or stop the cart moving.

*System requirements:* web browser that supports WebGL. You can see if your broswer supports webGL by going to [https://get.webgl.org/](https://get.webgl.org/).

##Implementation

The coaster you see is a `Track` instance which holds an array of Pieces. Every piece holds information about it's position, rotation, and the mesh to display. The track also manages insertion and deletion of Pieces.


We had a hard time finding a good way to store the constants for mesh dimensions. We started with a giant JSON thing, but we wanted to reference the object while still creating it. For example, we wanted to do something like this:
```
{"down": [
	{
		"size": [{"y": "54.3057"}]
	},
	{
		"startOffset": [{"y": "down.size.y-11.88"}]
}]}
```
which JSON can't do. (This json example might be broken, I'm writing this long after we had the problem.) By using Javascript "classes", we can do this:
```
TrackConst.prototype.down = function () {
    var down = new TrackType();
    down.size = {
        y: 54.3057,
    };
    down.startOffset.y = down.size.y
```
which does work. That example from line 241 of [`scripts/constant.js`](scripts/constant.js).


We had to rush towards the end while implementing the animated Cart and learned that arctangent from Javascript's Math class doesn't behave as expected. After a lot of ugly coding, we did eventually manage to get something that has a semblance of working. But the implementation is gross.


###Classes

Not actually classes because JS is prototype-based This diagram shows, poorly, how the classes interact:

![Diagram of classes](images for readme/diagram.jpg?raw=true)

**Track:** a sequence of Pieces; the main class of the project.

-  Holds an array of Pieces plus Supports and start and end coordinates.
- Manages adding Pieces through`Track.insertPiece(piece)`, where piece is either a single Piece or an array of Peices.  Each Piece must be moved and rotated to lign up with the previous one.
- Also manages deleting Pieces.
- Location: [`scripts/Track.js`](scripts/Track.js)


**Piece:** one track segment.

- Knows its location, direction, dimensions, and how much pre- and post-correction must be made to make other Pieces fit.
- Location: [`scripts/Piece.js`](scripts/Piece.js)

**Support:** generates the support beams beneath a track piece.

- Only called by `Piece` class. Basically makes a cylinder and moves it around just so.
- Location: [`scripts/Support.js`](scripts/Support.js)


**TrackConst:** A single class that holds all the constant data.

- For each type of track, holds numbers the mesh's dimensions and how much pre- and post-correction must be made to make other Pieces fit.
- For turn pieces, defines where extra Supports go to make it not look stupid.
- For turn or not-flat pieces, defines how the Cart animates over it.
- Never accessed directly, only through global constant `TRACK_TYPES` which is an instance of `TrackType()`.
- Location: [`scripts/constant.js`](scripts/constant.js). You might be asking why some of our filenames are capitalized and some aren't. Because we're fundamentally bad people, that's why.

**TrackType:**  Inner class to `TrackConst`.  Should be called PieceType. Holds constants for each type of Piece.

- Each type of Piece (e.g. `FLAT_TO_UP`) gets a `TrackType` which holds constants for that type. Then the constants are access through `TRACK_TYPES.FLAT_TO_UP`, for example.
- Prevents code from being horrible, believe it or not.
- Only used to make global constant `TRACK_TYPES`, which only happens in the constructor for `TrackConst`.
- Location: [`scripts/constant.js`](scripts/constant.js)

**Gui:** how the user interface buttons access the other classes.

- Each button has its own object.
- Accessed only by the global variable `GUI`. (Probably should be constant)
- Location: [`gui/gui.js`](gui/gui.js)

### Other

Notable global variables:

- `TRACK`: instance of `Track()` and the track displayed on the screen. Declared in [`Track.js`](scripts/Track.js).
- `SCALE`: can change the size of pieces. Ultimately not needed, however we thought it’d be useful in early implementations. Declared in [`index.js`](scripts/index.js).
- `SPEED`: how fast the roller coaster moves across the track. Declared in [`Cart.js`](scripts/Cart.js).
- `PLAY`: boolean that tells the renderer whether or not to run the Cart animation.

Libraries used:

- three.js: the big one. This is the main framework of our project.
- jquery: dependency of three.js.
- dat.gui.js: helper GUI that we used when first implementing because it was easier than messing around with CSS every time we wanted to do something. No longer used, but kept in the library.
- OrbitControls.js: plugin for three.js that gives for a not-terrible camera.

Other files of note:

- [`index.html`](index.html): project entry point, where everything is put in.
- [`index.js`](scripts/index.js): the initializer for three.js. Sets up things like camera, controls, ground plane, skybox, lighting, and renderer.
- [`skybox.js`](scripts/skybox.js): makes the skybox around the track, using a shader from a library that comes with three.js. [Source.](http://blog.romanliutikov.com/post/58705840698/skybox-and-environment-map-in-three-js)
- [`Cart.js`](scripts/Cart.js): the frankenstein’s monster that controls the car. Could be cleaned up a bunch. It’s ugly because we were rushed.

##Novelties

We began by using 3D models from [Rollercoaster Pre-fab by Adam W](https://3dwarehouse.sketchup.com/collection.html?id=e0bf9bb1c154d8095c9ed170ce1aefed), but weren't really satisfied. We thought it would be better to have total control over the models.

We used [Autodesk Inventor](http://www.autodesk.com/products/inventor/overview) to model all our own track pieces. We had to jump through some hoops to get those models into the json format the three.js uses. From Inventor, we exported the model to a .dwg file, which we imported into a trial version of [SketchUp Pro](http://www.sketchup.com/). From Sketchup we exported an .obj file, which could be converted using [convert_obj_three.py](https://github.com/mrdoob/three.js/blob/master/utils/converters/obj/convert_obj_three.py) which is included in three.js.

You can access all of the original and intermediate files in [`track 3D models/`](track 3D models).

##Sample output

###Video

[video goes here]

###Screenshots

![Screenshot 1](images for readme/screenshot1.jpg?raw=true)

![Screenshot 2](images for readme/screenshot2.jpg?raw=true)

![Screenshot 3](images for readme/screenshot3.jpg?raw=true)

##Credits
Made with [three.js](http://threejs.org/). [Skybox source](http://www.braynzarsoft.net/vision/texturesamples/Above_The_Sea.jpg). [Favicon source](http://www.iconarchive.com/show/windows-8-icons-by-icons8/City-Roller-Coaster-icon.html).
