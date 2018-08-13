function DashboardController($scope, $rootScope, $http,toastr){
    console.log("Hello from Dashboard controller");
    refresh_emp();
    refresh_users();
    get_count();
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
        refresh_users();  
        toastr.success("2 user deleter!","User deleted!");
    });
}

  $scope.delete_book = function(_id){
    $http.delete('/deleteBook'+_id).then(function(data){
        toastr.success("1 booking deleted!","Booking deleted!");
        refresh_books();
    });
}
$scope.edit_user = function(user){
    $scope.user ={
        _id : user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        date:user.date,
        place:user.place,
        gender:user.gen,
        username:user.username,
        email:user.email,
        type:user.type
    };
}
$scope.edit_book = function(book){
    $scope.book ={
        _id : book._id,
        type:book.type,
        address:book.address,
        add:book.add
    };
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
$scope.update_book = function(){
    $http.put('/book/'+$scope.book._id, $scope.book).then(function(data){
      refresh_books();
      $scope.book = null;
      toastr.success("Booking record updated successfully!","Booking updated!");
    });
}
$scope.update_user = function(){
  $http.put('/user/'+$scope.user._id, $scope.user).then(function(data){
    refresh_users();
    $scope.user = null;
    toastr.success("User records updated successfully!","User updated!");
  });
}
$scope.complete_user = function(){
    $http.put('/user/'+$scope.user._id, $scope.user).then(function(data){
      refresh_users();
      $scope.user = null;
      toastr.success("User records updated successfully!","User updated!");
    });
  }
$scope.delete_emp = function(id){
    $http.delete('/deleteEmp'+id).then(function(data){
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
  $http.post('/addBook', $scope.book).then(function(data){
    $scope.book = null;
    $scope.books_list.push(data);
    toastr.success("1 new apoitment added!","Apointment added!");
        });
    }

function get_count(){
    $http.get("/count").then(function(res){
        $scope.users_count = res.data.users_count;
    }), function(data){
        alert(data.status);
    }
}
}