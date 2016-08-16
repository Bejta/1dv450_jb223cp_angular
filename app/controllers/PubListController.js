/**
 * Created by Bejta on 15/08/2016.
 */
// angular is a global namespace declared by angularJS
angular
    .module("myApp") // must match ng-app in HTML (this is the module - the same for whole application)
    .controller("PubListController", PubListController); // register our controller with name and "constructor" function


PubListController.$inject = ['PubService']; // inject the service to the Controller

function PubListController(PubService) {
    // Using controllerAs so $scope is in this (save a ref in variable)
    var vm = this;

    var thePubs = PubService.getAll();
    vm.pubsList = thePubs;
    //vm.pubsList=PubService.getAll();
}