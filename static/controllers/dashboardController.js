function DashboardController($scope, $rootScope, $http){
    console.log("Hello from dashboard controller");
    /*var config = {headers:  {
      'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      'Accept': 'application/json;odata=verbose',
      "JWT" : localStorage.getItem('user')
      }
    };

    var init = function(){
      console.log($rootScope);
      get_report();
      get_bills();
      get_users();
    }*/
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
    };
    init();
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
    }}
    $scope.update_emp = function(){
      $http.put('/emp/'+$scope.emp._id, $scope.emp).then(function(data){
        refresh_emp();
        toastr.info('Employee updated');
        $scope.emp = null;
      });
    }

  $scope.delete_emp = function(emp_id, emp_username){
      $http.delete('/emp/'+ emp_id).then(function(data){
          refresh_emp();
          toastr.success(emp_name + ' deleted');
      });
  }