function LoginController($scope, $http, $location){
    console.log("Hello from Login Controller");

    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }

    $scope.login = function(credentials){
        $http.post('/log', credentials).then(function(response){
            localStorage.setItem('user',response.data.token)
            //toastr.success('You are now logged in!', 'Enjoy your stay!');
            $location.url('/');
        }),function(error){
            console.log(error);
        }
    }
    $scope.logout = function(){
        localStorage.clear();
        //toastr.info("Logged out!", "See you next time");
    }
}