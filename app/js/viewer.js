angular.module('viewer', ['ngRoute', 'ngAnimate', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/:message', {
        templateUrl: 'feed.html',
        controller: 'AppCtrl'
      }).
      when('/post/:Id', {
        templateUrl: 'post.html',
        controller: 'PostCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}])

.controller('PostCtrl', ['$http','$scope', '$routeParams', '$sce', function($http, $scope, $routeParams, $sce) {
    $http.get('../../data/posts.json').success(function(data){
		$scope.post = data[$routeParams.Id];		
	
	});

}])

.controller('AppCtrl', ['$http','$scope', '$routeParams', '$sce', function($http, $scope, $routeParams, $sce) {
  var self = this;
  self.message2 = "</b>The app routing is working!</b>";
  self.message1 = $routeParams.message;
  self.message = self.message2 + self.message1;

  switch($routeParams.message)
  {
  	case "projects":
  		  $http.get('../../data/prj.json').success(function(data){
			$scope.posts = data;
			
		});
  		break;

  	case "about":
  		  $http.get('../../data/abt.json').success(function(data){
			$scope.posts = data;
			
		});
  		break;

  	case "contact":
  		  $http.get('../../data/cnt.json').success(function(data){	 
			$scope.posts = data;
			$scope.posts[0].content= $sce.trustAsHtml(data[0].content);
			
		});
  		break;

	default:
  		  $http.get('../../data/posts.json').success(function(data){
			$scope.posts = data;
			//exceptions
			$scope.posts[1].content= $sce.trustAsHtml(data[1].content);
			
		});
		break; 		

  }


}]);

