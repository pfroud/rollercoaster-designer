/**
 * Author: Jonathan Bridge
 * This is the module for dat.gui. It essentially acts as an interface
 * so that the Dat.gui element can be modified dynamically
 */
 
// ====================================================================
// GLOBALS for gui ====================================================
// ====================================================================

// TODO: clean up 
/*
 * Bars is the number of bars for the drop down menu. It can be defined
 * in other files and won't be overwritten here.
 */ 
if (typeof BARS == 'undefined') {
    var BARS = 3;
}

/**
 * Params is the parameters for the GUI, this initializes it if it's 
 * not put in any other file in our project
 * 
 * Typ
 */
if (typeof PARAMS == 'undefined') {
    var PARAMS = [];
}

/**
 * GUI is the master reference to our GUI, in the future we might make 
 * more GUIS, in which case this will be refactored. At this point this
 * is just a Demo of what we can do with this.
 * 
 * Here the variable is declared. Later it will be initialized with the
 * operation new DAT.GUI
 */
//var gui = new dat.GUI();

// ====================================================================
// GuiMenu class for gui ===========================================
// ====================================================================

/**
 * I've decided that we need a whole class to define GUI objects, that
 * way we can modify individual modules rather than a whole bunch of 
 * code. It should make everything cleaner.
 *
 * @property params
 * An array of parameter strings
 *
 * @property values
 * An array of values for the parameters, should be protected
 *
 * @property bars
 * An array of refrences to all the bars in the GUI
 *
 * @property folders
 * An array of refereneces to the folders in the GUI
 *
 * @property visible
 * false if the menu isn't visible. True if it is
 *
 * @property ref
 * a reference to the dat.gui menu. Completely unneccessary, but
 */
function GuiMenu() {
    this.params = [];
    this.values = [];
    this.bars = [];
    this.folders = [];
    this.visible = false;
    this.ref = gui;
}


GuiMenu.clear = function(){
    while(this.bars.length > 0){
        this.bars[0].remove();
    }

    for(var i = 0; i < this.folders.length; i++){
        while(this.folders[i].length > 0){
            this.folders[i].remove();
        }
    }

    this.params = [];

};


GuiMenu.prototype.addSlider = function(value, min, max, step){
    var slider = new Bar();
    slider.value = value;
    slider.min = min;
    slider.max = max;
    slider.step = step;


};



// ====================================================================
// BAR class for gui ==================================================
// ====================================================================

/**
 * This is a custom class for GUI elements, it is a generic element of
 * the GUI. 
 *  
 * @property value
 * This is the value of the Gui element. It is typeless and
 * can be modified to suit your needs
 * 
 * @property finishChange
 * This is the value of the onFinishChange function, it is designed to
 * be overloaded with a function
 * 
 * @property [min] [max] [step]
 * These are the parameters for a slider element, they are only
 * required to be defined if the GUI element is a slider.
 *
 * @property name
 * The name displayed by the
 *
 * @property type
 * A weak ENUM of the types of
 *
 */
function Bar() {
    this.value =  null;
    this.finishChange = null;
    this.min =  null;
    this.max =  null;
    this.step = null;
    this.name = "";
    this.type = "";
 }
 
// Adds the Bar to the gui, takes the menu it adds it to as an argument
Bar.prototype.add = function (guiMenu) {
    // TODO

    if (!guiMenu.visible){
        // TODO: error handling and stuff
    }


};
 

// EXAMPLE FUNCTION! ==================================================

// adds a slider to the GUI tab
Bar.prototype.addSlider = function(name, min, max, step) {
    // reference to add
    var ele = new Bar();
    
    ele.min = min;
    ele.max = max;
    ele.step = step;
    ele.value = min;

};
// ====================================================================

// ====================================================================
// Initialization =====================================================
// ====================================================================




// ====================================================================
// TEST CODE ==========================================================
// ====================================================================

