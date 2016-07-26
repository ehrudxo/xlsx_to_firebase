var databaseURL= "https://movie1-d86b0.firebaseio.com"
Dropzone.options.myDropzone = {
    init: function() {
        var self = this;
        // config 
        self.options.addRemoveLinks = true;
        self.options.dictRemoveFile = "삭제";

        // load already saved files
        getFiles(self);

        // bind events

        //New file added
        self.on("addedfile", function(file) {
            console.log('new file added ', file);
        });

        // Send file starts
        self.on("sending", function(file) {
            console.log('upload started', file);
            $('.meter').show();
        });

        // File upload Progress
        self.on("totaluploadprogress", function(progress) {
            console.log("progress ", progress);
            $('.roller').width(progress + '%');
        });

        self.on("queuecomplete", function(progress) {
            $('.meter').delay(999).slideUp(999);
        });
        self.on("success", function(filename, files) {
            firebaseCall(files, function(){
              location.reload();
            });
        });
        // On removing file
        self.on("removedfile", function(file) {
            console.log(file);
            $.ajax({
                url: '/uploaded/files/' + file.name,
                type: 'DELETE',
                success: function(result) {
                    console.log(result);
                }
            });
        });
    },
    acceptedFiles: ".xlsx",
    previewTemplate: document.getElementById("preview-template").innerHTML

};


function getFiles(self){
  $.get('/upload', function(data) {
      var files = JSON.parse(data).files;
      for (var i = 0; i < files.length; i++) {
          if (files[i].name.split(".").pop()=='xlsx') {
            var fname = files[i].name.split(".xlsx")[0];
            var mockFile = {
                name: files[i].name,
                size: files[i].size,
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                url: databaseURL + "/movies/"+ fname +"/.json"
            };
            self.options.addedfile.call(self, mockFile);
            // self.options.thumbnail.call(self, mockFile, files[i].url);
          }
      };

  });
}
function firebaseCall (fileJSON, callback ){

  firebase.auth().onAuthStateChanged(function(user) {
    var files = JSON.parse(fileJSON).files;
    if(user){
      for(var i=0;i<files.length;i++){
        var fileObj = files[i];
        var filename = fileObj.name.split(".")[0];
        $.ajax({
            url: fileObj.url+".json",
            type: 'GET',
            success: function(result) {
              // console.log(fileObj);
              firebase.database().ref("movies/"+encodeURIComponent(filename)).set({json:result},function(){
                callback();
              });
            }
        });

      };
    }else{
      location.href="/index"
    }
  });
}
