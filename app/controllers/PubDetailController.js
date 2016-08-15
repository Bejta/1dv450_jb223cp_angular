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
    console.log("inside PubDetailController");

    // Set the ViewModel
    var vm = this;

    // Calling our service
    var thePub = pubService.getPub($routeParams.id);

    // Update the ViewModel
    vm.name = thePub.name;
    vm.description = thePub.description;
    vm.rating = thePub.rating;
}