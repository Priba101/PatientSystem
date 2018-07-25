function SignUpController($scope, $http, $location,toastr){
    console.log("Hello from SignUp Controller");

    $scope.add_user = function(){
        $http.post('/signup', $scope.user).then(function(data){
          $scope.user = null;
          toastr.success("Registration suuccesful","You will be redirected to the login page!");
          $location.url('/log');
          $scope.users_list.push(data);
        });
}
      $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }

    $scope.login = function(credentials){
        $http.post('/login', credentials).then(function(response){
            localStorage.setItem('user',response.data.token)
            toastr.success('You are now logged in!', 'Enjoy your stay!');
            $location.url('/');
        }),function(error){
            console.log(error);
            toastr.error("Please enter valid credentials","Credentials are incorrect!");
        }
    }
    $scope.logout = function(){
        localStorage.clear();
        toastr.info("Logged out!", "See you next time");
    }
    $scope.edit_user=function(){
        $http.post('/updateUser',$scope.user).then(function(data){
            $scope.user=null;
            $location.urls('/');
            $scope.users_list.push(data);
        })
    }
}