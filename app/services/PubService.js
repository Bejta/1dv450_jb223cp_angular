'use strict';

angular
    .module("myApp")
    .factory('PubService', PubService);

PubService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

// Here is the definition of the service
function PubService(resourceService, localStorage, LS, $q) {
    var Pub = resourceService('pubs');
    return {
        get:function() {
            // check if we have it in localstorage - Pretty clumpsy handling but just for example
            var items = localStorage.get(LS.pubsKey);

            // Define a promise...this will be used later
            var deferred = $q.defer();

            // If we dont have stuff in localstorage we get it from the API (should maybe have som timestamp for stale problems)
            if(!items) {

                // make the call to the api - Get all returns a promise and success will be called if $http succeed
                Pub.getCollection().then(function(data){


                    // set the data in LS
                    localStorage.set(LS.pubsKey, data);


                    // resolve the data to the caller - They have a promise and now we deliver the response
                    deferred.resolve(data);

                });

            }
            else {
                console.log("Getting all the pubs from the cache");
                // var deferred = $q.defer();
                deferred.resolve(items);
                //return deferred.promise;
            }

            // return the promise to the caller
            return deferred.promise;
        },

        // This gets an single pub
        getPub:function(id) {
            // get the specific pub in sessionStorage (we have save all in a bigg array)
            var items = LocalStorage.get(LS.pubsKey);
            var item = false;

            // check if we have the one with the id in web storage
            if(items) {
                items.forEach(function(obj, index){
                    if(obj.id.toString() === id) {
                        item = obj; // update item and return
                        return true;
                    }
                });
            }

            // Create a promise
            var deferred = $q.defer();
            // If we dont have stuff in localstorage we get it
            var promise;
            // We have the item and kan use the HATEOAS, namely the url in the item-object (the players direct url)
            if(item) {
                console.log(item);
                // make the call to the api with the item -> will use the url in the object
                promise = Pub.getSingle({'url' : item.ref.href});
            }
            else {
                // we trying to get a player but dont have the url - maybe bookmarked in a browser?
                // ignore HATEOAS...it may work if the api is persistant with the url /players/:id
                var obj = {'instanceName' : 'pubs', 'id' : id};
                promise = Pub.getSingle('pubs', obj);
            }
            // When the call has been made and everything is good (indepentet from how we call the API)
            promise.success(function(data){

                // set the single player in the LS (could have a lot more information than the representation in the list)
                var localStorageKey = LS.playersKey +"." +data.id
                LocalStorage.set(localStorageKey, data);

                // resolve the data to the caller
                deferred.resolve(data);

            }).catch(function(){
                // If something went wrong we have to reject the promise (the caller will catch an error)
                deferred.reject("Something went wrong with the call");
            });

            // return the promise to the caller (this is returned before we got data - async)
            return deferred.promise;
        }
    };
}
