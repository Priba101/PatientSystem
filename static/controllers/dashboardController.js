function DashboardController($scope, $rootScope, $http,toastr){
    console.log("Hello from Dashboard controller");

    var config = {headers:  {
        'Authorization': 'Basic TmljayBDZXJtaW5hcmE6cGFzc3dvcmQ=',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('jwt')
        }
      };
    
    refresh_help();
    refresh_emp();
    refresh_users();
    get_count();
    refresh_books();
    get_me();
    refresh_question();
    refresh_feedback();
    get_feedback_count();
    get_book_current_user();
    refresh_help();
    get_message_current_user();
    refresh_doctor();
    get_current_doctor_book();
    refresh_patients();
    refresh_tasks();
    refresh_email();
    get_current_user_help();
    get_email_count();
    get_current_user_messenger();
    refresh_messenger();

    $scope.logout = function(){
        localStorage.clear();
        toastr.info("See you next time","Logged out!");
    }
    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }
$scope.edit_emp = function(emp){
      $scope.emp ={
          _id : emp._id,
          username : emp.username,
          salary : emp.salary,
          country : emp.country,
          type : emp.type,
          spec : emp.spec
      };
}
$scope.edit_status=function(book){
    $scope.book={
        _id:book._id,
        status:book.status
    }
}
$scope.add_emp = function() {
    $http.post('/addEmp', $scope.emp).then(function(data) {
        $scope.emp = null;
        $scope.emp_list.push(data);
        refresh_emp();
        toastr.success("1 new employee added!","Employee added!");

    });
}
var get_doctors = function(){
    $http.get('/getDoctor',config).then(function(response){
        $scope.doctors=response.data;
    }),function(response){
        alert(response.status);
    }
    init();
}
var get_users = function (){
      $http.get('/getUser', config).then(function(response){
        $scope.users = response.data;
      }),function(response){
        alert(response.status);
      }
      init();
};
var get_tasks = function (){
    $http.get('/getTask', config).then(function(response){
      $scope.todo = response.data;
    }),function(response){
      alert(response.status);
    }
    init();
};
$scope.delete_user = function(_id){ 
    $http.delete('/deleteUser/'+_id).then(function(data){
        refresh_users();  
        toastr.success("1 user deleted!","User deleted!");
    });
}
$scope.delete_feedback = function(_id){ 
    $http.delete('/deleteFeedback/'+_id).then(function(data){
        refresh_feedback();  
        toastr.success("1 feedback deleted!","Feedback deleted!");
    });
}
$scope.decline_book = function(_id){
    $http.delete('/deleteBook/'+_id).then(function(data){
        toastr.success("1 booking declined!","Booking deleted!");
        refresh_books();
    });
}

$scope.edit_user = function(user){
    $scope.user ={
        _id : user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        place:user.place,
        username:user.username,
        email:user.email,
        type:user.type,
        zip:user.zip,
        country:user.country,
        phone:user.phone
    };
}
$scope.edit_task=function(todo){
    $scope.todo={
        _id:todo._id,
        task:todo.task
    }
}
$scope.edit_book = function(book){
    $scope.book ={
        _id : book._id,
        type:book.type,
        add:book.add,
        issue:book.issue,
        records:book.records,
        reply:book.reply,
        date:book.date,
        time:book.time,
        doctor:book.doctor,
        user:book.user
    };
}
$scope.edit_booking=function(booking){
    $scope.booking={
        _id:booking._id,
        doctor:booking.doctor,
        date:booking.date,
        time:booking.time
    }
}
$scope.answer=function(q){
    $scope.q={
        _id:q._id,
        info:q.info,
        occured:q.occured,
        reply:q.reply
    }
}
$scope.edit_message_for_user=function(messenger){
    $scope.messenger={
        _id:messenger._id,
        username:messenger.username,
        message:messenger.message,
        reply:messenger.reply
    }
}
$scope.edit_email_question=function(question_email){
    $scope.question_email={
        _id:question_email._id,
        name:question_email.name,
        num:question_email.num,
        email:question_email.email,
        mess:question_email.mess,
        reply:question_email.reply
    }
}
$scope.add_user = function(){
      $http.post('/signup', $scope.user).then(function(data){
        $scope.user = null;
        $scope.users_list.push(data);
        toastr.success("1 new user added!","User added!");
      });
}
$scope.add_task=function(){
    $http.post('/addTask',$scope.todo).then(function(data){
        $scope.todo = null;
        $scope.todo_list.push(data);
        toastr.success("1 new task added!","Task added!");
    });
}
$scope.send_message_to_patient=function(){
    $http.post('/sendMessageToPatient',$scope.messenger).then(function(data){
        $scope.messenger = null;
        $scope.messenger_list.push(data);
        toastr.success("A question was sent to the patient!","Question sent!");
    });
}
$scope.update_emp = function(){
    $http.put('/emp/'+$scope.emp._id, $scope.emp).then(function(data){
      refresh_emp();
      $scope.emp = null;
      toastr.success("Employee records updated successfully!","Employee updated!");
    });
}
$scope.send_message_to_secretary=function(){
    $http.put('/sendMessageToSecretary/'+$scope.messenger._id, $scope.messenger).then(function(data){
        refresh_messenger();
        $scope.messenger = null;
        toastr.success("Reply sent successfully to the secretary!","Reply Sent!");
    });
}
$scope.update_book = function(){
    $http.put('/book/'+$scope.book._id, $scope.book).then(function(data){
      $scope.book = null;
      refresh_books();
      toastr.success("Booking record updated successfully!","Booking updated!");
    });
}
$scope.update_status=function(){
    $http.put('/updateStatus/'+$scope.book._id, $scope.book).then(function(data){
        $scope.book = null;
        refresh_books();
        toastr.success("Booking status updated successfully!","Status Updated!");
      });
}
$scope.update_book_time = function(){
    $http.put('/editBookTime/'+$scope.book._id, $scope.book).then(function(data){
      $scope.book = null;
      refresh_books();
      toastr.success("Booking record updated successfully!","Booking updated!");
    });
}
$scope.booking = function(){
    $http.put('/booking/'+$scope.book._id, $scope.book).then(function(data){
        $scope.book = null;
        refresh_books();
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
    $http.put('/users/'+$scope.user._id, $scope.user).then(function(data){
      refresh_users();
      $scope.user = null;
      toastr.success("User records updated successfully!","User updated!");
    });
}
$scope.delete_question = function(_id){
    $http.delete('/deleteQuestion/'+_id).then(function(data){
      refresh_question();
      toastr.success("Question delettion successfully!","Question deleted!");
    });
}
$scope.delete_patient_message=function(_id){
    $http.delete('/deletePatientMessage/'+_id).then(function(data){
        refresh_messenger();
        toastr.success("Patients message deleted successfully!","Message deleted!");
      });
}
$scope.delete_task = function(_id){
    $http.delete('/deleteTask/'+_id).then(function(data){
      refresh_tasks();
      toastr.success("Task deleted successfully!","Task deleted!");
    });
}
$scope.delete_emp = function(_id){
    $http.delete('/deleteEmp/'+_id).then(function(data){
      refresh_emp();
      toastr.success("Employee records deleted successfully!","Employee deleted!");
    });
}
$scope.delete_help = function(_id){
    $http.delete('/deleteHelp/'+_id).then(function(data){
      refresh_help();
      toastr.success("1 help question deleted successfully!","Help question deleted");
    });
}
$scope.delete_email_question=function(_id){
    $http.delete('/deleteEmailQuestion/'+_id).then(function(data){
    refresh_email();
    toastr.success("1 email question deleted successfully!","Email question deleted");
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
function refresh_messenger(){
    $http.get('/getMessageFromPatient').then(function(res){
        $scope.messenger_list = res.data;
    }),
    function(res){
        alert(res.status);
    }
}
function refresh_doctor(){
    $http.get('/getDoctor').then(function(res){
        $scope.doctor_list=res.data;
    }),
    function(ret){
        alert(res.satatus);
    }
};
function refresh_users(){
  $http.get('/getUser').then(function(res){
      $scope.users_list = res.data;
  }),
  function(res){
      alert(res.status);
  }
};
function refresh_tasks(){
    $http.get('/getTask').then(function(res){
        $scope.todo_list = res.data;
    }),
    function(res){
        alert(res.status);
    }
  };
function refresh_books(){
  //var user=localStorage.getItem('user');
  $http.get('/getBook').then(function(res){
      $scope.books_list = res.data;
  }),
  function(res){
      alert(res.status);
  }
};
$scope.add_book = function(){
  var user=localStorage.getItem('user');
  $http.post('/addBook/'+user,$scope.book).then(function(data){
    $scope.book = null;
    $scope.books_list.push(data);
    toastr.success("1 new apointment added!","Apointment added!");
    });
}
function get_count(){
    $http.get("/count").then(function(res){
        $scope.users_count = res.data.users_count;
    }), function(data){
        alert(data.status);
    }
}
function get_email_count(){
    $http.get("/countEmails").then(function(res){
        $scope.email_count = res.data.email_count;
    }), function(data){
        alert(data.status);
    }
}
function get_feedback_count(){
    $http.get("/countFeedback").then(function(res){
        $scope.feedback_count = res.data.feedback_count;
    }), function(data){
        alert(data.status);
    }
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
$scope.check_nurse=function(){
    if(localStorage.getItem('type')=="nurse"){
        return true;
    }
    return false;
}
$scope.check_secretary=function(){
    if(localStorage.getItem('type')=="secretary"){
        return true;
    }
    return false;
}
function get_me(){
    $http.get('/me', config).then(function(res){
        $scope.logged_in_user = res.data[0];
        }),function(res){
            alert(res.status);
    }
}
function get_book_current_user(){
    var user=localStorage.getItem('user');
    $http.get('/currentBookUser/'+user,config).then(function(res){
        $scope.book_list=res.data;
    }),function(res){
        alert(res.status);
    }
}
function get_message_current_user(){
    var user=localStorage.getItem('user');
    $http.get('/currentMessageUser/'+user,config).then(function(res){
        $scope.message_list=res.data;
    }),function(res){
        alert(res.status);
    }
}
function get_current_doctor_book(){
    var user=localStorage.getItem('user');
    $http.get('/currentDoctorBook/'+user,config).then(function(res){
        $scope.booking_list=res.data;
    }),function(res){
        alert(res.status);
    }
}
function get_current_user_help(){
    var user=localStorage.getItem('user');
    $http.get('/currentUserHelp/'+user,config).then(function(res){
        $scope.question_lists=res.data;
    }),function(res){
        alert(res.status);
    }
}
function get_current_user_messenger(){
    var user=localStorage.getItem('user');
    $http.get('/currentUserMessenger/'+user,config).then(function(res){
        $scope.messengers_list=res.data;
    }),function(res){
        alert(res.status);
    }
}
var get_question = function (){
    $http.get('/getQuestion', config).then(function(response){
        $scope.pitanje = response.data[0];
    }),function(response){
        alert(response.status);
    }
    init();
};
$scope.answer_question = function(question){
    $scope.question ={
        _id : question._id,
        mess:question.mess,
        reply:question.reply
    };
}
$scope.update_question = function(){
    $http.put('/question/'+$scope.question._id, $scope.question).then(function(data){
      refresh_question();
      $scope.question = null;
      toastr.success("Question answer sent successfully!","Question answered!");
    });
  }    
$scope.ques=function(){
    var user=localStorage.getItem('user');
    $http.post('/question/'+user,$scope.question).then(function(data){
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
$scope.edit_books = function(book){
    $scope.book={
        _id:book._id,
        add:book.add,
        reply:book.reply
    }
}
$scope.edit_help=function(q){
    $scope.q={
        _id:q._id,
        reply:q.reply
    }
}
$scope.update_books = function(){
    $http.put('/books/'+$scope.book._id, $scope.book).then(function(data){
      refresh_books();
      $scope.book = null;
      toastr.success("Booking record updated successfully!","Booking updated!");
    });
}
$scope.send_feedback=function(){
    $http.post('/feedbacking', $scope.feedback).then(function(data){
      $scope.feedback = null;
      $scope.feedbacks_list.push(data);
      toastr.success("Thank you for you feedback!","Feedback sent!");
    });
}
$scope.answer_help=function(){
    $http.put('/answerHelp/'+$scope.q._id,$scope.q).then(function(data){
        refresh_help();
        $scope.q=null;
        toastr.success("A reply to the user has been sent!","Answer sent!")
    })
}
$scope.answer_email_question=function(){
    $http.put('/answerEmailQuestion/'+$scope.question_email._id,$scope.question_email).then(function(data){
        $scope.question_email=null;
        refresh_email();
        toastr.success("A reply has been sent!","Answer sent!")
    })
}
$scope.send_help=function(){
    var user=localStorage.getItem('user');
    $http.post('/helpQuestion/'+user,$scope.q).then(function(data){
        $scope.q=null;
        $scope.q_list.push(data);
        toastr.success("Thank you for reporting the problem!","Problem report sent");
    })
}
function refresh_feedback(){
    $http.get('/getFeedback').then(function(res){
        $scope.feedbacks_list = res.data;
    }),
    function(res){
        alert(res.status);
    }
  };
  var get_feedback = function (){
    $http.get('/getFeedback', config).then(function(response){
      $scope.feedback = response.data;
    }),function(response){
      alert(response.status);
    }
    init();
};
var get_help = function (){
    $http.get('/getHelp', config).then(function(response){
      $scope.q = response.data;
    }),function(response){
      alert(response.status);
    }
    init();
};
function refresh_help(){
    $http.get('/getHelp').then(function(res){
        $scope.q_list = res.data;
    }),
    function(res){
        alert(res.status);
    }
};
function refresh_patients(){
    $http.get('/getPatients').then(function(res){
        $scope.patient_list = res.data;
    }),
    function(res){
        alert(res.status);
    }
};
function refresh_email(){
    $http.get('getEmailQuestions').then(function(res){
        $scope.email_list=res.data;
    }),
    function(res){
        alert(res.status);
    }
};
var get_doctors = function (){
    $http.get('/getDoctors', config).then(function(res){
        $scope.doctor = res.data;
        }),function(res){
            alert(res.status);
    }
};
$scope.get_schedule=function(book_doctor){
    $http.get('/schedule/'+book_doctor).then(function(res){
        $scope.schedule_list=res.data;
    }),function(res){
        alert(res.status);
    }
}
var get_patients = function (){
    $http.get('/getPatients', config).then(function(res){
        $scope.patient = res.data;
        }),function(res){
            alert(res.status);
    }
};  
$scope.email_question=function(){
    $http.post('/emailQuestion', $scope.question_email).then(function(response){
        toastr.success('We will get back at you via email in the next 24h!','Question sent!');
    }),function(error){
        console.log(error);
    }
}
$scope.send_email=function(question_email){
    $http.post('/sendEmail/', $scope.question_email).then(function(response){
        toastr.success('Answer to the questions sent via email!','Email sent!');
    }),function(error){
        console.log(error);
    }
}
var get_email_questions=function(){
    $http.get('getEmailQuestions',config).then(function(res){
        $scope.question_email=res.data;
    }),function(res){
        alert(res.status);
    }
};
}
