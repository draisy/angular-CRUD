'use strict';

var directives = angular.module('directives', []);

directives.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
});

// directives.directive('dragDrop', ['$timeout', function($timeout){
//   $timeout(function(){
//     var dropZone = document.getElementById('drop-zone');
//     var uploadForm = document.getElementById('drop-upload');

//   return {
//     uploadForm.addEventListener('click', function(e) {
//           var uploadFiles = document.getElementById('js-upload-files').files;
//           e.preventDefault()

//           startUpload(uploadFiles)
//       });

//       dropZone.ondrop = function(e) {
//           e.preventDefault();
//           this.className = 'upload-drop-zone';

//           startUpload(e.dataTransfer.files)
//       }

//       dropZone.ondragover = function() {
//           this.className = 'upload-drop-zone drop';
//           return false;
//       }

//       dropZone.ondragleave = function() {
//           this.className = 'upload-drop-zone';
//           return false;
//       }
//     };
//   });
// }]);



//        