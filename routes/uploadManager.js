var options = {
  tmpDir: __dirname + '/../public/uploaded/tmp',
  uploadDir: __dirname + '/../public/uploaded/files',
  uploadUrl: '/uploaded/files/',
  storage: {
    type: 'local'
  }
};

var uploader = require('blueimp-file-upload-expressjs')(options);
var jsonManager = require('./jsonManager');
module.exports = function(router) {
  router.get('/upload', function(req, res) {
    uploader.get(req, res, function(obj) {
        res.send(JSON.stringify(obj));
    });
  });
// Code Meister Keen '-'
  router.post('/upload', function(req, res) {
    uploader.post(req, res, function(obj) {
      jsonManager.save(obj, function(err,obj){
        if(!err)
          res.send(JSON.stringify(obj));
        else
          res.send("error가 발생했습니다.");
      });
    });
  });

  router.delete('/uploaded/files/:name', function(req, res) {
    uploader.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  return router;
};
