yhUpload.factory("AwsFiles", ['awsProperties', 'fileProperties', '$q', function(awsProperties, fileProperties, $q){
  var _aws = awsProperties;
  var _files = fileProperties
  var _uploadFile = function(file){
    var uniqueFileName = _aws.prefix() + file.name;
    var params = { 
               Key: uniqueFileName,
               ContentType: file.type,
               Body: file,
               ServerSideEncryption: 'AES256',
               ACL: "public-read"
             };

    return _aws.bucket().putObject(params, function(err, data) {
      if(err) {
        alert(err.message,err.code);
        return false;
      }
      else {
        // Upload Successfully Finished
        window.location = "#/files"
      }
    })       
  };

  var _listFiles = function(){
    var deferred = $q.defer();

    var params = { Prefix: _aws.prefix() };
    _aws.bucket().listObjects(params, function(err, data) {
      if(err) {
        alert(err.message,err.code);
        deferred.reject('errors');
        return false;
      }
      if (data) {
        //$scope.$apply(function(){
          _processFiles(data);
          deferred.resolve('success');
       // });
      }
    });
    return deferred.promise;
  };

  var _editFilename = function(id, newName, oldName){
    var deferred = $q.defer();
     var params = {
        Key: _aws.prefix() + newName,
        ACL: "public-read" ,
        CopySource: encodeURI( _aws.bucketName() + "/" + _aws.prefix() + oldName),
        MetadataDirective: 'REPLACE'
      };

    _aws.bucket().copyObject(params, function(err, data) {
      if(err) {
        alert(err.message,err.code);
        return false;
        deferred.reject('error');
      }
      if (data) {
        var newFilename = _aws.path() + _aws.prefix() + newName;
        _files.editPath(id, newFilename);
      //  $scope.$digest();
        alert("edited successfully") 
        _removeFile(oldName);
        deferred.resolve('success');  
      }      
    });   
    return deferred.promise;
  };

  var _processFiles = function(data){
    _files.deleteAll();
    var files = data.Contents

    for( var i = 0; i < files.length; i ++){ 
      var path = _aws.path() + files[i].Key;
      var filename = files[i].Key.replace(data.Prefix, "");
      var size = _getSize(files[i]);
      var modifiedDate = _getModifiedDate(files[i]); 
      _files.addFile(i, path, filename, size, modifiedDate);
    };
  };

  var _getModifiedDate = function(item){
    var year = item.LastModified.getFullYear().toString();
    var month = (item.LastModified.getMonth()+ 1).toString();
    var date = item.LastModified.getDate().toString();

    return month + "/" + date + "/" + year;
  };

  var _getSize = function(item){
      return Math.round(item.Size/1024);
  };

  var _removeFile = function(filename){
    var deferred = $q.defer();
    var params = {
      Key: _aws.prefix() + filename
    };
    _aws.bucket().deleteObject(params, function(err, data){
      if (err){
        alert(err.message,err.code);
        deferred.reject('error');
        return false;
      }
      if (data){
        deferred.resolve('success');
      }
    });
    return deferred.promise;
  };

  return {
    uploadFile: _uploadFile,
    listFiles: _listFiles,
    editFilename: _editFilename,
    removeFile: _removeFile
  }
  
}]);


