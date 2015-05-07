/**
 * Jonathan Bridge
 * jvbridge@ucsc.edu
 * 
 * Perter Froud
 * pfroud@ucsc.edu
 * 
 * This is the proposed structure for how roller coaster track will be
 * implemented in our project
 */
 
 // the track object
function Track() {
   /**
    * these are the x, y, and z coordinates of the track. The origin of
    * the points is the "south west" corner. It should use a world
    * coordinate
    */
   this.origin;
   
   // the number of units that the piece of track takes 
   this.dx;
   this.dy;
   
   // a string that specifies the type of track
   this.trackType;

   /** 
    * a string that specifies the orientation of the track, should be
    * "N", "E", "S", or "W"
    */
   this.facing
   
   
   this.key;
   

}


Track.prototype.setType = function (trackType) {

};

