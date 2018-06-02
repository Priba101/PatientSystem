function SignUpController($scope, $http, toastr, $location){
    console.log("Hello from SignUp Controller");

    $scope.add_user = function(){
        $http.post('/signup', $scope.user).then(function(data){
          $scope.user = null;
          toastr.success("Registration suuccesful","You will be redirected to the login page!");
          $location.url('/log');
          $scope.users_list.push(data);
        });
      }
}