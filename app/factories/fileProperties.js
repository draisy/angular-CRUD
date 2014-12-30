yhUpload.factory('fileProperties', function () {
  var fileDetails = [];

  return {
      deleteAll: function(){
        fileDetails = [];
      },
      editPath: function(id, newFilename){
        fileDetails[id].path = newFilename;
      },
      files: function () {
        return fileDetails;
      },
      addFile: function (id, path, filename, size, modified) {
        fileDetails.push({id:id, path:path, filename:filename, size:size, modified:modified})
      },
      getFile: function (id){
        return fileDetails[id];
      },
      deleteFile: function (id) {
        fileDetails.splice(id, 1);
      }
  };
});