function DashboardController($scope, $rootScope, $http,toastr){
    console.log("Hello from Dashboard controller");
    refresh_emp();
    refresh_users();
    refresh_books();

$scope.edit_emp = function(emp){
      $scope.emp ={
          _id : emp._id,
          username : emp.username,
          salary : emp.salary,
          country : emp.country,
          email : emp.email,
          type : emp.type
      };
}
$scope.add_emp = function() {
    $http.post('/addEmp', $scope.emp).then(function(data) {
        $scope.emp = null;
        $scope.emp_list.push(data);
        toastr.success("1 new employee added!","Employee added!");
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
      $http.get('/getUser', config).then(function(response){
        $scope.users = response.data;
      }),function(response){
        alert(response.status);
      }
      init();
    };
/*$scope.delete_user = function(id){
      $http.delete('/rest/v1/user/delete/'+id, config).then(function(response){
        get_users();
      }, function(error){
        console.log(error);
      });
    }*/
$scope.delete_user = function(_id){
      $http.delete('/deleteUser'+_id).then(function(data){
          toastr.success("1 user deleter!","User deleted!");
          refresh_users();
      });
  }

$scope.edit_user = function(user){
      $http.put('/rest/v1/user/edit', user,config).then(function(response){
        get_users();
        toastr.success("User records updated successfully!","User updated!");
      }, function(error){
        toastr.error("User update failed!","Update failed!");
        console.log(error);
      });
    }
$scope.add_user = function(){
      $http.post('/signup', $scope.user).then(function(data){
        $scope.user = null;
        $scope.users_list.push(data);
        toastr.success("1 new user added!","User added!");
      });
}
$scope.update_emp = function(){
    $http.put('/emp/'+$scope.emp._id, $scope.emp).then(function(data){
      refresh_emp();
      $scope.emp = null;
      toastr.success("Employee records updated successfully!","Employee updated!");
    });
}

/*$scope.delete_emp = function(emp_username){
      $http.delete('/emp/'+ emp_username).then(function(data){
          refresh_emp();
          //toastr.success(emp_name + ' deleted','1 employe deleted!');
      });
  }*/
$scope.delete_emp = function(emp_id){
    $http.delete('/deleteEmp'+emp_id).then(function(data){
      refresh_emp();
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
};
function refresh_books(){
  $http.get('/getBook').then(function(res){
      $scope.books_list = res.data;
  }),
  function(res){
      alert(res.status);
  }
};
$scope.add_book = function(){
  $http.post('/appointment', $scope.book).then(function(data){
    $scope.book = null;
    $scope.books_list.push(data);
    toastr.success("1 new apoitment added!","Apointment added!");
  });
}
}