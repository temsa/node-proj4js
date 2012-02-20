You can build a node variation of this library using build/build.js : the resulting package will be in build/node.

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
```javascript
var Proj4js = require("proj4js"),
    proj = new Proj4js.Proj("ESPG:2154");
     
console.log(Proj4js.transform(Proj4js.WGS84, proj, new Proj4js.Point([45,5])));
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
