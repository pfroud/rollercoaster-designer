## Track 3D models

### Workflow
**Autodesk Inventor Professional 2015**
Make the model, export `.dwg`.

**Sketchup Pro 2015**
Import `.dwg`, rotate and/or mirror if needed, export `.obj`.

**`convert_obj_three.py`**
Convert `.obj` to `.json`.

JSON file used by three.js.

### Notes

Autodesk Inventor is thousands of dollars, but [free for students](http://www.autodesk.com/education/home). Any version will work. Inventor part files are .ipt.

SketchUp Pro has a [30-day trial](http://www.sketchup.com/products/sketchup-pro). You need the Pro version to export to obj.

`convert_obj_three.py` is included in the three.js download in `utils/converters/obj`. You can also get it from [mrdoob's github](https://github.com/mrdoob/three.js/blob/master/utils/converters/obj/convert_obj_three.py). You need python 2.x, not python 3.x.