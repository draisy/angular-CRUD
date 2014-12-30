'use strict';
var listCtrl = angular.module('listCtrl', []);

listCtrl.controller('ListFilesController',['$scope', 'fileProperties', 'awsProperties', 'AwsFiles', function($scope, fileProperties, awsProperties, AwsFiles) {
  $scope.orderProp = "filename";
  $scope.filesArray = fileProperties.files();

  AwsFiles.listFiles().then(function (result){
   // $scope.$digest();
    $scope.filesArray = fileProperties.files();
    }, function (errors){    
  });

}]);