This is a library for node.js, build on the original Proj4JS sources made for thr the browser

## Use Node.JS port of Proj4JS ##
Without cloning this project you can use it directly using npm :
```
 npm install proj4js
```
In your JS :

```javascript
 var Proj4js = require("proj4js");
```

## Usage example##

### Synchronous mode

You should use either one of the provided projection which is stored in the "defs" subdirectory of the "lib" folder of the node Proj4JS project (have a look at your project node_modules folder), or an equivalent file in your own "defs" subdirectory relative to the directory containing the module requiring proj4js.

```javascript
var Proj4js = require("proj4js"),
    proj = new Proj4js.Proj("EPSG:4139");
     
console.log(Proj4js.transform(Proj4js.WGS84, proj, new Proj4js.Point([45,5])));
//returns
//{ x: 44.999611051259926,
//  y: 5.0013285897182325,
//  z: -117.26076901517808 }

```
### Asychonous mode

(Also works with local files, like synchronous mode)

```javascript
var Proj4js = require("proj4js"),
    proj = new Proj4js.Proj("EPSG:2192", function() {
        console.log(Proj4js.transform(Proj4js.WGS84, proj, new Proj4js.Point([45,5])));
})

//returns
//{ x: 6295336.596034983,
//  y: -1241636.8411306776,
//  z: -250.30824038013816 }

```

## Documentation ##

For more documentation on Proj4JS usage, please read the original proj4js documentation : http://trac.osgeo.org/proj4js/

## "build" node.js version ##
```
 git clone git://github.com/temsa/node-proj4js.git
 cd node-proj4js
 cd build
 npm install async underscore mkdirp
 node ./build.js
 cd node # here is the resulting package !
```
then you can use it with npm link (see documentation) or do a
```
 npm install
```
