var Proj4js = require("./node/lib/proj4js");

var proj = new Proj4js.Proj("EPSG:21781");
console.log(Proj4js.transform(Proj4js.WGS84, proj, new Proj4js.Point([45,5])));
