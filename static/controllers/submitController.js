function SubmitController($scope, $http, $location,toastr){
    console.log("Hello from Submit Controller");
    $scope.add_book = function(){
        $http.post('/appointment', $scope.book).then(function(data){
          $scope.book = null;
          toastr.success("1 new appointment created!","Booking successful");
          $location.url('/home');
          $scope.books_list.push(data);
        });
}}