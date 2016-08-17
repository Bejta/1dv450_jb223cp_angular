/**
 * Created by Bejta on 16/08/2016.
 */

/**
 This is responsible of the calls to the API
 Should have all the CRUD stuff
 */
angular
    .module("myApp")
    .factory('ResourceService', ResourceService); // register the recipe for the service

// We inject the http (for AJAX-handling) and the API
ResourceService.$inject = ['$http', 'API'];

function ResourceService($http, API) {

    // Returns the Service - Get the collectionName as parameter
    return function (collectionName) {

        // Creates a intern Resource-object that is filled with data (depending on what the server gets us)
        var Resource = function(data) {
            // Configuerar objectet enligt den data som kommer in - Allt är json
            angular.extend(this, data);
        }

        // Get all pubs from the API
        Resource.getCollection = function() {

            // Ordinary http-call
            var req = {
                method: 'GET',
                url: API.url +collectionName, // this is the entry point in my example
                headers: {
                    'Accept': API.format,
                    'akey': API.key
                },
                params: {
                    'limit' : API.limit,
                    'akey': API.key
                }
            };
            // This returns a promise which will be fullfilled when the response is back
            return $http(req).then(function(response) {
                var result = [];
                // Building up an array with resource objects that will be returned
                angular.forEach(response.data, function(value, key) {
                    result[key] = new Resource(value);
                });
                // This is return when we get data
                return result;
            });
        };



        Resource.getSingle = function(resourceInfo) {

            var url;
            console.log(resourceInfo);
            // OK this is maybe a clumpsy way to do this and shows a problem with REST and HATEOAS
            // are we using the url provided by the call- The HATEOAS way
            /*if(resourceInfo.hasOwnProperty('url')) {
                url = resourceInfo.url;
            }*/
            //else
            if(resourceInfo.hasOwnProperty('instanceName') && resourceInfo.hasOwnProperty('id')) { // or we using a fall back (item => is an id)
                url = API.url +resourceInfo.instanceName +"/" +resourceInfo.id
            }
            else {
                return false;
            }

            var req = {
                method: 'GET',
                url: url,
                headers: {
                    'Accept': API.format,
                    'akey': API.key
                },
                params: {
                    'limit': '500',
                     'akey': API.key
                }
            };
            // return the promise
            return $http(req).success(function(response) {
                // This eluvated as resolve/reject depending on the status code.
                return response;
            });
        };

        Resource.save = function(collectionName, data) {
            var req = {
                method: 'POST',
                url: API.url +collectionName, // this is the entry point in my example
                headers: {
                    'Accept': API.format,
                    'X-APIKEY': API.key,
                    'Authorization' : "hbhj6765g76g77rt7g9g6r56dvv"
                },
                params: {
                    'limit': '500'
                },
                data : data
            };
            return $http(req).then(function(response){
                return new Resource(response.data);
            });
        };

        return Resource;
    }

};
