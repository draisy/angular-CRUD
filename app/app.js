'use strict';

var yhUpload = angular.module('yhUpload', [
    'controllers',
    'directives',
    'ngRoute',
    'xeditable',
    'dcbImgFallback'
]); 

yhUpload.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/upload', {
        templateUrl: 'partials/upload.html',
        controller: 'UploadController'
      }).
      when('/files', {
        templateUrl: 'partials/files.html',
        controller: 'ListFilesController'
      }).
      when('/file/:fileId', {
        templateUrl: 'partials/file-detail.html',
        controller: 'FileDetailController'
      })
  }]);

yhUpload.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme
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



