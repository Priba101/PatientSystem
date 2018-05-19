var app = angular.module('PMS',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"views/home.html"
    })
    .when("/about",{
        templateUrl:"views/about.html"
    })
    .when("/blog",{
        templateUrl:"views/blog.html"
    })
    .when("/contact",{
        templateUrl:"views/contact.html"
    })
    .when("/log",{
        templateUrl:"views/log.html"
    })
    .when("/port",{
        templateUrl:"views/port.html"
    })
    .when("/services",{
        templateUrl:"views/services.html"
    })
    .when("/signup",{
        templateUrl:"views/signup.html"
    })
    .when("/item",{
        templateUrl:"views/item.html"
    })
    .when("/book",{
        templateUrl:"views/book.html"
    })
    .otherwise({redirectTo:'/'})
})

var app = angular.module('PMS', []);
app.controller('selectCtrl', function($scope) {
    $scope.docs = ["Cardiologists","Dermatologists","Hematologists","Neurologists","Ophthalmologists","Otolaryngologists","Physiatrists","Urologists"];
});