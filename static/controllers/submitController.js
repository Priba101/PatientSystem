function SubmitController($scope, $http, $location){
    console.log("Hello from Submit Controller");
    $scope.add_book = function(){
        $http.post('/appointment', $scope.book).then(function(data){
          $scope.book = null;
          //toastr.success("Registration suuccesful","You will be redirected to the login page!");
          $location.url('/service');
          $scope.books_list.push(data);
        });
}}