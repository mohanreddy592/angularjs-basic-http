var myapp = angular.module('myapp', []);

myapp.component('app', {
    templateUrl: 'app-component.html',
    controller: 'MyAppCtrl'        
});

myapp.controller('MyAppCtrl', function(MyService, $filter){
    this.name = MyService.getName();
    this.posts = [];
    this.user_posts = new Array();
    this.text;
    this.repoNames = [];
    this.loadUserPosts = function(){
        this.posts.forEach(element => {
            this.user_posts.push(element);
        });
    }
    this.filterText = function() {
        this.user_posts = $filter('nameFilter')(this.posts, this.text);
    }
    var promise = MyService.getRepos();    
    promise.then(function(res){
        this.posts = res.data;    
        this.loadUserPosts();    
    }.bind(this), function(err) {
        console.log(err);
    });

    var repoNamesPromise = MyService.getReposNames();
    repoNamesPromise.then(function(res){
        //console.log(res);
        this.repoNames = res;
    }.bind(this), function(err){
        console.log(err);
    });

});

myapp.filter('nameFilter', function() {
    return function(names, inputName) {
        var tempArr = [];
        if(inputName === 'undefined' || inputName === ''){
            tempArr = names;            
        } else {            
            tempArr = names.filter(function(item){
                return item.name.indexOf(inputName) != -1
            })
        }
        //console.log(tempArr);
        return tempArr;
    }
});