/**
 * Created by Bejta on 15/08/2016.
 */

// register the controller to the module
angular
    .module("myApp")
    .controller("PubListController", PubListController); // registrera med namn, funktion

// inject the service
PubListController.$inject = ['PubService'];

function PubListController(pubService) {
    var vm = this;

    pubService.get().then(function(data) {
        console.log(data);
        vm.pubsList = data;
    });
}

