<?php


Flight::route('GET /api/courses', function () {
    
    Flight::json(Flight::courseServices()->get_all());
});


Flight::route('GET /api/courses/@id', function ($id) {
    Flight::json(Flight::courseServices()->getById($id));
});

Flight::route('GET /api/courses/professor/@professor_id', function ($id) {
    Flight::json(Flight::courseServices()->getCoursesFromProfessor($id));
});

Flight::route('GET /api/courses/@id/students', function ($id) {
    Flight::json(Flight::courseServices()->getStudents($id));
});

Flight::route('GET /api/courses/@id/assignments', function ($id) {
    Flight::json(Flight::courseServices()->getAssignments($id));
});



Flight::route('POST /api/courses', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::courseServices()->add($data));
});


Flight::route('PUT /api/courses/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::courseServices()->update($id, $data);
    Flight::json(Flight::courseServices()->getById($id));
});


Flight::route('DELETE /api/courses/@id', function ($id) {
    Flight::courseServices()->delete($id);
});

Flight::route('GET /api/courseAssignmentsGrades/@courseId/@studentId', function($courseId, $studentId) {
    $assignmentsWithGrades = Flight::courseServices()->getAssignmentsWithGrades($courseId, $studentId);
    Flight::json($assignmentsWithGrades);
});




?>