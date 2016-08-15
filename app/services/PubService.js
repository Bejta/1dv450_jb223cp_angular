'use strict';

angular
    .module("myApp")
    .factory('PubService', PubService);

function PubService($q, $http) {

    return {
        getAll:function() {
            return $http.get('https://rubyonrails-api-jb223cp.c9users.io/api/v1/pubs?akey=newtoken');
        },

        getPub: function(id){
            return $http.get('https://rubyonrails-api-jb223cp.c9users.io/api/v1/pubs/'+id+'?akey=newtoken');
        },

        getPubBySearch : function(criteria){
            return $http.get('https://rubyonrails-api-jb223cp.c9users.io/api/v1/pubs?akey=newtoken&search='+criteria+'');
        }
    };
}