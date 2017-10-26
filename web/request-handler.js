var path = require('path');
var archive = require('../helpers/archive-helpers');
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
  } else if (req.method === 'GET' && archive.isUrlArchived(req.url, () => {})){
    fs.readFile('' + archive.paths.archivedSites + '/' + req.url, (err, data) => {
      if (err) { 
        throw err};
      res.writeHead(200, helpers.headers);
      res.end(data);
    });
    
  } else {
  res.writeHead(201, helpers.headers);
  res.end(archive.paths.list);
}





};



