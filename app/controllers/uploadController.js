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