var path = require('path');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore')
// require more modules/folders here!
var helpers = require('./http-helpers.js');
var fs = require('fs');
var qs = require('qs');
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
      archive.isUrlArchived(req.url, (bool) => {
      console.log('BOOL is equal to', bool);
      console.log('REQUIRE.URL IS equal to', req.url, archive.paths.archivedSites);
      if (bool) {
        fs.readFile('' + archive.paths.archivedSites + '/' + req.url, (err, data) => {
        if (err) { 
        throw err};
        res.writeHead(200, helpers.headers);
        res.end(data);
      });

    } else {
      fs.readFile('' + archive.paths.siteAssets + '/loading.html', (err, data) => {
     if (err) {
      throw err};
    //helpers.serveAssets(res, data, () =>)
     // console.log(data);
    res.writeHead(404, helpers.headers);
    res.write(data);
    res.end();
    });
      
      //  res.writeHead(404, helpers.headers);
      //  res.end();
      }
    });
    console.log('URLACHIEVED IS EQUAL TO........................................', archive.isUrlArchived(req.url, (bool) => {console.log(bool)}));
    
  } else if (req.method === 'POST') {
    
    var collectData = function (request, callback) {
    var data = '';
    request.on('data', function(chunk){
      console.log('chunk', chunk);
      data += chunk;
    });
    request.on('end', function(){
      console.log(data, 'asdfl;kaaaafkasjdf;aksaksdjflkasdjflaskdjfalskdjf;lasdjkflsakjdflkasdjflkjsdflkjsdlfksjadlfkjsdfdata');
      callback(data.substring(4) + '\n', () => {});
    res.writeHead(302, helpers.headers);
    res.end();
    });
    };
    collectData(req, archive.addUrlToList);
    console.log('POST METHOD HAS BEEN CALLED');
    //archive.addUrlToList(req.url, () => {
    //  console.log('INSIDE POST, REQ.URL IS', req);
    //});
  }
  
  
  
   else {
  console.log('---------------------------------------------------------------THE ERROR IS 201', archive.isUrlArchived(req.url, (boolean) => {boolean}));
  res.writeHead(201, helpers.headers);
  res.end(archive.paths.list);
}





};


//&& archive.isUrlArchived(req.url)
