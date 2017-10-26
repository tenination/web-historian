var path = require('path');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore')
// require more modules/folders here!
var helpers = require('./http-helpers.js');
var fs = require('fs');
exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET'  && req.url === '/') {
    fs.readFile('' + archive.paths.siteAssets + '/index.html', (err, data) => {
     if (err) {
      throw err};
    //helpers.serveAssets(res, data, () =>)
     // console.log(data);
    res.writeHead(200, helpers.headers);
    res.write(data);
    res.end();
    });
  } else if (req.method === 'GET' ){
    console.log('URLACHIEVED IS EQUAL TO........................................', archive.isUrlArchived(req.url, (bool) => {console.log(bool)}));
    fs.readFile('' + archive.paths.archivedSites + '/' + req.url, (err, data) => {
      if (err) { 
        throw err};
      res.writeHead(200, helpers.headers);
      res.end(data);
    });
    
  } else {
  console.log('---------------------------------------------------------------THE ERROR IS 201', archive.isUrlArchived(req.url, (boolean) => {boolean}));
  res.writeHead(201, helpers.headers);
  res.end(archive.paths.list);
}





};


//&& archive.isUrlArchived(req.url)
