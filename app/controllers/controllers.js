'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('UploadController',['$scope', '$timeout', 'awsProperties', 'AwsFiles', function($scope, awsProperties, $timeout, AwsFiles) {
  $scope.sizeLimit      = 10585760; // 10MB in Bytes
  $scope.uploadProgress = 0;

  $scope.upload = function() {
    if($scope.file) {
      // Perform File Size Check First
      var fileSize = Math.round(parseInt($scope.file.size));
      if (fileSize > $scope.sizeLimit) {
        alert('Sorry, your attachment is too big. Maximum '   + Math.floor($scope.sizeLimit/1048576) + 'MB file attachment allowed','File Too Large');
        return false;
      }
    //  debugger;
      AwsFiles.uploadFile($scope.file)
        .on('httpUploadProgress',function(progress) {
        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
        $scope.$digest();
      });
    } 
    else {
    // No File Selected
     alert('Please select a file to upload');
    }
   };
}]);


controllers.controller('FilesController',['$scope', 'fileProperties', 'awsProperties', 'AwsFiles', function($scope, fileProperties, awsProperties, AwsFiles) {
  $scope.orderProp = "filename";
  $scope.filesArray = fileProperties.files();

  AwsFiles.listFiles().then(function (result){
   // $scope.$digest();
    $scope.filesArray = fileProperties.files();
    }, function (errors){    
  });

}]);

controllers.controller('FileDetailController',['$scope', '$routeParams', 'fileProperties', 'AwsFiles', 'awsProperties',
function($scope, $routeParams, fileProperties, AwsFiles, awsProperties) {

  $scope.id = $routeParams.fileId;
  $scope.files = fileProperties;
  $scope.file = $scope.files.getFile($scope.id);

  if (!$scope.file) {
    AwsFiles.listFiles().then(function (result){
     // $scope.$digest();
       $scope.file = $scope.files.getFile($scope.id);
       }, function (errors){
    });
  }

  $scope.editFilename = function($data, oldFilename) {
    AwsFiles.editFilename($scope.id, $data, oldFilename).then(function (result){
      $scope.file = $scope.files.getFile($scope.id);
     }, function (errors){
    });
  };

  $scope.deleteItem = function(filename){
    AwsFiles.removeFile(filename).then(function (result){
      window.location = "#/files";
     }, function (errors){
    });
  };

}]);



