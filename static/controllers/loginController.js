function LoginController($scope, $http, $location,toastr){
    console.log("Hello from Login Controller");
    refresh_question();

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
var get_question = function (){
    $http.get('/getQuestion', config).then(function(response){
        $scope.question = response.data;
    }),function(response){
        alert(response.status);
    }
    init();
  };
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
$scope.ques=function(){
    $http.post('/question',$scope.question).then(function(data){
        $scope.question=null;
        $scope.questions_list.push(data);
        toastr.success("We will get back at you in 24h!","Question sent!")
    })
}
function refresh_question(){
    $http.get('/getQuestion').then(function(res){
        $scope.questions_list = res.data;
    }),
    function(res){
        alert(res.status);
    }
}
}