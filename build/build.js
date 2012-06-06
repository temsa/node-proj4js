#!/usr/bin/env node

var fs= require('fs'),
	async = require('async'),
	_ = require('underscore'),
	util = require('mkdirp');


function write (filename, content) {
	fs.writeFile(filename, content, function onWrite(err) {
		if (err) throw err;
		console.log(filename+' saved.');
	})
}
	
function requirify(filename, content) {
	content = "var Proj4js = require('../proj4js');\
" + content + "\
module.exports = Proj4js;";
	write(filename, content);
}

function nodify(filename, content) {
	content = content +"\n\
var alert = console.error;\n\
Proj4js.getScriptLocation = function(){return './'};\n\
Proj4js.loadScript = function(url, onload, onfail, check){onload(require(url));}\n\
module.exports = Proj4js;\n" ;
	write(filename, content);
}

var origin = __dirname+'/../lib/';
var subdirs = ['projCode', 'defs'];
var dirs = _(subdirs).map(function(dir){return origin+dir});
var destdir = __dirname + '/node/lib';
var destination = destdir +'/';

util.mkdirp(destdir, 0755, function(err){
	if(err) throw err;
	
	//create subdirs then manage their files
	var	destinations = _(subdirs).map(function(dir){return destination + dir});
//	console.log(destinations);
	
	async.map( destinations,
	
		 function(dest, callback){return util.mkdirp(dest, 0755, callback)},
		 
		 function() { async.map( dirs, fs.readdir, treatFiles)	});
	

	//main file
	fs.readFile (__dirname + '/../lib/proj4js.js', function nodifyMainFile(err, content) {
		if (err) throw err;
		nodify(__dirname + '/node/lib/proj4js.js', content);
	});

	//package definition
	fs.readFile (__dirname + '/package.json', function copyPackageJson(err, content) {
		if (err) throw err;
		write(__dirname + '/node/package.json', content);
	});
})

function treatFiles(err, results/*array (sized like subdir) of array of filenames for a dir*/){
	if(err) throw err;
//	console.log(results);

	// prefix .js files by dirname and remove other files from the list
	var diredFiles = _(dirs).chain()
		.zip(results)
		.map(function(dirAndFiles){
			var dir = dirAndFiles[0],
				files = _(dirAndFiles[1]).select(function(filename){return filename.search(/\.js$/) !== -1});
					
			return _(files).map(function setFileName(file){return dir+'/'+file});
	}).value();

//	console.log(diredFiles);	

	// filter & flatten
	var jsfiles = _(diredFiles).flatten();	
	
	//console.log(jsfiles);
	async.forEach(jsfiles, function openFiles(filename, callback) {
		fs.readFile(filename, function prepareFile(err, content){			
			var destinationFile = filename.replace(origin, destination);
				console.log(destinationFile);
			requirify( destinationFile, content);
		});
	}, function onError(err){
		console.error("An error happend while saving files :", err);
	});
}
