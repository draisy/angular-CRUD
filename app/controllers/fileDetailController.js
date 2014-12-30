'use strict';
var detailCtrl = angular.module('detailCtrl', []);

detailCtrl.controller('FileDetailController',['$scope', '$routeParams', 'fileProperties', 'AwsFiles', 'awsProperties',
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