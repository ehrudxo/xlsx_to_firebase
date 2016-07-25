var fs = require('fs');
var XLSX = require('xlsx');

module.exports = {
  save : function(obj, callback) {
    var filename = obj["files"][0].name;
    var filedir =  __dirname + "/../public/uploaded/files/" ;
    var workbook = XLSX.readFile( filedir + filename);
    var ws = workbook.Sheets[workbook.SheetNames[0]];

    fs.writeFile(filedir + filename+".json", JSON.stringify(XLSX.utils.sheet_to_json(ws)), function(err) {
        if(err) {
          callback(err,undefined);
        }
        callback(undefined, obj);
    });

  }
}
