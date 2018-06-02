function DashboardController($scope, $rootScope, $http){
    console.log("Hello from Dashboard controller");
    refresh_emp();
    refresh_users();
$scope.edit_emp = function(emp){
      $scope.emp ={
          _id : emp._id,
          emp_username : emp.emp_username,
          emp_salary : emp.emp_salary,
          emp_country : emp.emp_country,
          emp_email : emp.emp_email,
          emp_type : emp.emp_type
      };
  }

$scope.add_emp = function() {
    $http.post('/addEmp', $scope.emp).then(function(data) {
        $scope.emp = null;
        $scope.emplist.push(data);
        toastr.success('New employee added','Addition succesful!');
        refresh_emp();
    });
}
var get_report = function (){
      $http.get('/rest/v1/report', config).then(function(response){
        $scope.report = response.data;
      }),function(response){
        alert(response.status);
      }
};
var get_users = function (){
      $http.get('/rest/v1/users', config).then(function(response){
        $scope.users = response.data;
      }),function(response){
        alert(response.status);
      }
      init();
    };


$scope.delete_user = function(id){
      $http.delete('/rest/v1/user/delete/'+id, config).then(function(response){
        get_users();
      }, function(error){
        console.log(error);
      });
    }
$scope.edit_user = function(user){
      $http.put('/rest/v1/user/edit', user,config).then(function(response){
        get_users();
      }, function(error){
        console.log(error);
      });
    }
$scope.add_user = function(){
      $http.post('/rest/v1/user', $scope.user, config).then(function(response){
        $scope.user = null;
        get_users();
      }, function(error){
        console.log(error);
      });
}
$scope.update_emp = function(){
    $http.put('/emp/'+$scope.emp._id, $scope.emp).then(function(data){
      refresh_emp();
      toastr.info('Employee updated',"! employee record updated!");
      $scope.emp = null;
    });
}

$scope.delete_emp = function(emp_id, emp_username){
      $http.delete('/emp/'+ emp_id).then(function(data){
          refresh_emp();
          toastr.success(emp_name + ' deleted','1 employe deleted!');
      });
  }

function refresh_emp(){
    $http.get('/getEmp').then(function(res){
        $scope.emp_list = res.data;
    }),
    function(res){
        alert(res.status);
    }
}
function refresh_users(){
  $http.get('/getUser').then(function(res){
      $scope.users_list = res.data;
  }),
  function(res){
      alert(res.status);
  }
};}