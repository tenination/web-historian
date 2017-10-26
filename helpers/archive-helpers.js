var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    //on.(data){console.log('no error')}
    if (callback) {
      return callback(data.toString().split('\n'));
    }   
   // callback(mes);
   else {
    return callback(data.toString().split('\n'));
   }
   
});
};


exports.isUrlInList = function(url, callback) {
   
  exports.readListOfUrls(function(urls) {
    return callback(urls.includes(url));  
  });
};

exports.addUrlToList = function(url, callback) {
  console.log('RUNNING ADD URL TO LIST ######################################################', url);
  
  callback(
    fs.writeFile(exports.paths.list, url, function(err) {
      console.log(url, 'Url in writeFile-----------------------------');
      if (err) { throw err;}
    })
  );
  
  
  
  
  
  
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (url[0] === '/'){
      url = url.slice(1);
    }
  console.log('URL AND FILES, respectively', url, files);
    return callback(!!files.includes(url));  
  });
};

exports.downloadUrls = function(urls) {
//console.log('**********************************URLS ARE', urls);
  urls.forEach(function (url) {request('http://' + url, function(error, response, body) {
  fs.writeFile(exports.paths.archivedSites + '/' + url, body, function(err) {
    if (err) throw err;
  });
    
  })});
};
