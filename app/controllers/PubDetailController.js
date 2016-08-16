/**
 * Created by Bejta on 15/08/2016.
 */

// register the controller in the module (see ng-app in index.html)
angular
    .module("myApp")
    .controller("PubDetailController", PubDetailController);

// Dependency injections, routeParams give us the /:id
PubDetailController.$inject = ['$routeParams', 'PubService'];

function PubDetailController($routeParams, pubService) {
    // Set the ViewModel
    var vm = this;

    // Calling our service - we get an promise back whitch will be resolved/rejected when the async phase is ready
    var pubPromise = pubService.getPub($routeParams.id);
    pubPromise.then(function(data){
        // everything is good!
        // Update the ViewModel
        vm.name = data.name;
        vm.description = data.description;
        vm.rating=data.rating;
    }).catch(function(error){
        // Something went wrong!
        vm.message = error;
        console.log("Error: " +error);
    })
}