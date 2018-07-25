function SubmitController($scope, $http, $location,toastr){
    console.log("Hello from Submit Controller");
    $scope.add_book = function(){
        $http.post('/appointment', $scope.book).then(function(data){
          $scope.book = null;
          toastr.success("Registration suuccesful","You will be redirected to the login page!");
          $location.url('/log');
          $scope.books_list.push(data);
        });
}}