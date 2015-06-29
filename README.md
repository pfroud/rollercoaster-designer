#Roller Coaster Designer

Jonathan Bridge & Peter Froud  
CS 160 fall 2015   
[View project](https://classes.soe.ucsc.edu/cmps160/Spring15/projects/)

##How to use

Our program lets the user design a roller coaster track from modular pieces. To change the pre-loaded track, use the circular X button at the bottom to remove a piece. The button with a red background deletes the entire track. Then, use the seven buttons at the top to add flat, sloped, or turn pieces. You can also use the shuffle button at the bottom to add a random sequence of curved track.

Press the play button at the bottom to start or stop the cart moving.

*System requirements:* web browser that supports WebGL. You can see if your broswer supports webGL by going to [https://get.webgl.org/](https://get.webgl.org/).

##Implementation

###Classes

**Track:** the 'main' class of the project.

- Holds the pieces and all data about the track’s current position and direction.
- Pieces are inserted with `Track.insert(piece)`, where piece is a new `Piece()` object
- `deletePiece()` deletes the most recent piece and `deleteAll()` deletes all pieces
- Location: `scripts/Track.js`

**Piece:** a class used for generating individual track pieces.

- Only functions are to generate the supports and to scale the meshes.
- Location: `scripts/Piece.js`

**Support:** generates the support beams beneath a track piece.

- Only called by `Piece` class
- Location: `scripts/Support.js`

**TrackConst:** A single class that holds all the constant data.

- Location: `scripts/Constant.js`
- referenced through `TRACK_TYPES`

**TrackType:** Inner class to `TrackConst`.

- Only used in generating the constants since it was a good way to standardize what went in and keep code looking good.
- Only called by `TrackConst` as `TRACK_TYPES` is being built.
- Location: `scripts/Constant.js`

**Gui:** Class that the buttons used to access the other classes.

- Didn’t actually use the GUI, rather it was simply an interface to streamline other code.
- Location: `gui/gui.js`
- Only one instance existed, called GUI every button has a function in Gui class

### Other

Global variables:

- TRACK: the reference to the track object
- SCALE: a scalar for all pieces. Ultimately never actually used, however we thought it’d be useful in early implementations
- SPEED: how fast the roller coaster moves across the track
- PLAY: boolean that tells the renderer whether or not to start the animation.

Libraries used:

- three.js: the big one. This is the main framework of our project
- jquery: three.js requires it as a dependency
dat.gui.js: helper GUI that we used when first implementing because it was easier than messing around with CSS every time we wanted to do something. No longer used, but kept in the library
- OrbitControls.js: plugin for three.js that allows for a better camera

Other files of note:

- index.html: the “main” file of the project, where everything is put in
- index.js: the initializer for three.js. Sets up the whole page
- Skybox.js: makes the skybox around the track.
- Cart.js: the frankenstein’s monster that controls the car. Could be cleaned up a bunch. It’s ugly because we were rushed.

The coaster works by having a Track object which holds the pieces in an array. Every piece is an object that holds information about it, as well as a reference to the mesh it has in the world. Additionally the methods each had deletion and scaling.

We had a problem finding a good way to store all the constants in the program. Initially we just made a large object in brackets, using the JSON style, however we wanted it to reference itself so we instead implemented constants as its own class and then just generated a single instance as TRACK_TYPES.

Towards the end, we started rushing as we implemented the cart and found that JavaScript’s Math class didn’t behave the way we thought it would when calculating ArcTan. After a lot of ugly coding we did eventually manage to get something that has a semblance of working. But the implementation is gross.

[diagram goes here]

##Novelties

We began by using [Rollercoaster Pre-fab by Adam W](https://3dwarehouse.sketchup.com/collection.html?id=e0bf9bb1c154d8095c9ed170ce1aefed), but thought it would be better to have total control over the models.

We used [Autodesk Inventor](http://www.autodesk.com/products/inventor/overview) to model all our own track pieces. We had to jump through some hoops to get those models into the json format the three.js uses. From Inventor, we exported the model to a .dwg file, which we imported into a trial version of [SketchUp Pro](http://www.sketchup.com/). From Sketchup we exported an .obj file, which could be converted using [convert_obj_three.py](https://github.com/mrdoob/three.js/blob/master/utils/converters/obj/convert_obj_three.py), included in three.js.

You can access all of the original and intermediate files on our GitHub repository at [https://github.com/pfroud/160final](https://github.com/pfroud/160final).

##Sample output

###Video

[video goes here]

###Screenshots

[screenshots go here]

##Credits
Made with [three.js](http://threejs.org/). [Skybox source](http://www.braynzarsoft.net/vision/texturesamples/Above_The_Sea.jpg). [Favicon source](http://www.iconarchive.com/show/windows-8-icons-by-icons8/City-Roller-Coaster-icon.html).
