function LoginController($scope, $http, $location,toastr){
    console.log("Hello from Login Controller");

    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }
    $scope.check_admin=function(){
        if(localStorage.getItem('type')=="admin"){
            return true;
        }
        return false;
    }
    $scope.check_patient=function(){
        if(localStorage.getItem('type')=="patient"){
            return true;
        }
        return false;
    }
    $scope.check_doctor=function(){
        if(localStorage.getItem('type')=="doctor"){
            return true;
        }
        return false;
    }
    $scope.check_staff=function(){
        if(localStorage.getItem('type')=="nurse"){
            return true;
        }else if(localStorage.getItem('type')=="secretary"){
            return true;
        }
        return false;
    }
$scope.login = function(credentials){
    $http.post('/login', credentials).then(function(response){
        localStorage.setItem('jwt',response.data.token)
        localStorage.setItem('type',response.data.type)
        localStorage.setItem('user',response.data.username)
        toastr.success('Enjoy your stay!','You are now logged in!');
        $location.url('/');
    }),function(error){
        toastr.error("Please enter the correct credentials!","Credentials are wrong!");           
    }
}
$scope.logout = function(){
    localStorage.clear();
    toastr.info("See you next time","Logged out!");
}
}