<?php


Flight::route('GET /api/students', function () {
    
    Flight::json(Flight::studentServices()->get_all());
});


Flight::route('GET /api/students/@id', function ($id) {
    Flight::json(Flight::studentServices()->getById($id));
});


  Flight::route('GET /api/studentcourses/@id', function($id){
    $courses = Flight::studentServices()->getCoursesByStudentId($id);
    Flight::json($courses);
});


Flight::route('POST /api/students', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::studentServices()->add($data));
});


Flight::route('PUT /api/students/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::studentServices()->update($id, $data);
    Flight::json(Flight::studentServices()->getById($id));
});


Flight::route('DELETE /api/students/@id', function ($id) {
    Flight::studentServices()->delete($id);
}); 

Flight::route('POST /api/students/changePassword/@id', function ($id) {
    $data = Flight::request()->data->getData();
    $newPassword = $data['password'];
    $repeated = $data['repeatedPassword'];

    if ($newPassword === $repeated) {
        Flight::json(Flight::studentServices()->changePasswordStudent($id, $data));
    } else {
        Flight::json(['error' => true, 'message' => "Passwords do not match"],400);
    }

   // Flight::json(Flight::professorServices()->changePassword($id, $data));
});


?>