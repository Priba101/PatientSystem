function LoginController($scope, $http, $location,toastr){
    console.log("Hello from Login Controller");

    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }

    $scope.login = function(credentials){
        $http.post('/login', credentials).then(function(response){
            localStorage.setItem('user',response.data.token)
            toastr.success('Enjoy your stay!','You are now logged in!');
            $location.url('/');
        }),function(error){
            toastr.error("Please enter the correct credentials!","Credentials are wrong!");
            console.log(error);
            
        }
    }
    $scope.logout = function(){
        localStorage.clear();
        toastr.info("See you next time","Logged out!");
    }
}