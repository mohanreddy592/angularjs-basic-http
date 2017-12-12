myapp.service('MyService', function($http, $q){

    var name = "Ram";
    this.getName = function() {
      return name;  
    };
    this.setName = function(newName) {
        name = newName;        
    };

    this.getRepos = function() {        
        var url = 'https://jsonplaceholder.typicode.com/posts/1/comments';
        var response = $http.get(url);
        //console.log(response);
        return response;
    };

    this.getReposNames = function() {
        var defer = $q.defer();        
        var url = 'https://api.github.com/users/jintoppy/repos';
        var httpPromise = $http.get(url);
        httpPromise.then(function(res) {
        // this is array function to map data and filter for filtering purpose
            var result = res.data;
            var finalResult = result.filter(function(item) {
                    return item.name.startsWith('angular');
                }).map(function(item){
                    return item.name;
                });
            //console.log(result);
            defer.resolve(finalResult);
        })
        return defer.promise;
    };
});