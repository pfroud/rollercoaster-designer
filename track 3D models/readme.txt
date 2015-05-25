WORKFLOW:
Modelled in Autodesk Inventor Professional 2015
export .dwg

Sketchup Pro 2015:
import .dwg
rotate and/or mirror if needed
export .obj

convert_obj_three.py:
.obj -> .js

.js file used by three.js.


Autodesk Inventor is thousands of dollars, but free for students:
http://www.autodesk.com/education/home
Any version will work.
Inventor part files are .ipt.

SketchUp Pro is free for a 30-day trial:
http://www.sketchup.com/products/sketchup-pro
You need the Pro version to export to obj.

convert_obj_three.py is included in the three.js download in utils/converters/obj.
You need python 2.x, not python 3.x.