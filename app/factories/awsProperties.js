yhUpload.factory('awsProperties', function($http){
  $.ajax({
  url: '../../amazon-info.json',
  async: false,
  dataType: 'json',
  success: function (response) {
    AWS.config.update({accessKeyId: response.accessKeyId, secretAccessKey: response.secretAccessKey});
  }
});

  var configAWS = function(awsInfo){
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
