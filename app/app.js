'use strict';

var yhUpload = angular.module('yhUpload', [
    'controllers',
    'directives',
    'ngRoute',
    'xeditable',
    'dcbImgFallback'
]); 

yhUpload.service('fileProperties', function () {
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


// yhUpload.factory('fileSizeCheck', function(fileSize){
//   var maxSize = = 10585760; // 10MB in Bytes
//   return {
//     if (fileSize > maxSize){
//       //error object
//     }
//     else{
//       //true object
//     }
//   }

// })    

yhUpload.factory('awsProperties', function($http){
 // var awsInfo = {accessKeyId:null, secretAccessKey:null};

  $.ajax({
  url: 'amazon-info.json',
  async: false,
  dataType: 'json',
  success: function (response) {
    // awsInfo.accessKeyId = response.accessKeyId;
    //  awsInfo.secretAccessKey = response.secretAccessKey;
    AWS.config.update({accessKeyId: response.accessKeyId, secretAccessKey: response.secretAccessKey});
  }
});

  var configAWS = function(awsInfo){
    console.log(awsInfo);
   // debugger;
    AWS.config.update({accessKeyId: awsInfo.accessKeyId, secretAccessKey: awsInfo.secretAccessKey});
  };

  var bucketName = 'yh.interview';
  var prefixName = 'draisysabel/';
  var path = 'http://' + bucketName + '.s3-external-1.amazonaws.com/';
  var bucket = new AWS.S3({ params: { Bucket: bucketName } });
  
  return{
    bucketName: function(){
      return bucketName
    },
    prefix: function(){
      return prefixName
    },
    bucket: function(){
      return bucket;
    },
    path: function(){
      return path;
    }
  };
});

yhUpload.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/upload', {
        templateUrl: 'partials/upload.html',
        controller: 'UploadController'
      }).
      when('/files', {
        templateUrl: 'partials/files.html',
        controller: 'FilesController'
      }).
      when('/file/:fileId', {
        templateUrl: 'partials/file-detail.html',
        controller: 'FileDetailController'
      })
  }]);

yhUpload.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme
});
