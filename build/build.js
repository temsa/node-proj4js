#!/usr/bin/env node

var fs= require('fs'),
	async = require('async'),
	_ = require('underscore'),
	util = require('mkdirp');
	
function requirify(filename, content) {
	content = "var Proj4js = require('proj4js');\
" + content + "\
exports = Proj4js";

	fs.writeFile(filename, content, function onWrite(err) {
		if (err) throw err;
		console.log(filename+' saved.');
});
}

function nodify() {
}

var dirs = [__dirname+'/../lib/projCode', __dirname+'/../lib/defs'];
var destination = __dirname+'/node/lib';

util.mkdirp(destination, 0755, function(err){
	if(err) throw err;

	async.map(dirs, fs.readdir, treatFiles);
})

function treatFiles(err, results){
	if(err) throw err;
//	console.log(results);

	// prefix .js files by dirname and remove other files from the list
	var diredFiles = _(dirs).chain().zip(results).map(function(dirAndFiles){
		var dir = dirAndFiles[0], files = dirAndFiles[1];
		return _(files)
			.chain()
				.select(function(filename){return filename.search(/\.js$/) !== -1})
				.map(function setFileName(file){return dir+'/'+file})		
			.value();
	}).value();

	console.log(diredFiles);	

	// filter & flatten
	var jsfiles = _(diredFiles).flatten();	
	
	//console.log(jsfiles);
	async.forEach(jsfiles, function openFiles(filename, callback) {
			fs.readFile(filename, function prepareFile(err, content){
					var destinationFile = [destination, filename.replace(/^(.*\/)/,'')].join('/');
					console.log(destinationFile);
					requirify( destinationFile, content);
				});
		}, function onError(err){
			console.error("An error happend while saving files :", err);
		}
	);
}
