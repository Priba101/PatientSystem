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

    $scope.login = function(credentials){
        $http.post('/login', credentials).then(function(response){
            localStorage.setItem('user',response.data.token)
            localStorage.setItem('type',response.data.type)
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
    $scope.q_and_a=function(){
        $http.post('/qa',$scope.q).then(function(data){
            $scope.q=null;
            $scope.q_list.push(data);
            toastr.success("We will get back at you in 24h!","Question sent!")
        })
    }
}