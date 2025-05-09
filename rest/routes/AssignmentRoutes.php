<?php


Flight::route('GET /api/assignments', function () {
    
    Flight::json(Flight::assignmentServices()->get_all());
});


Flight::route('GET /api/assignments/@id', function ($id) {
    Flight::json(Flight::assignmentServices()->getById($id));
});

Flight::route('GET /api/assignmentGrades/@courseId/@assingmentId', function ($courseId, $assignmentId) {
    Flight::json(Flight::assignmentServices()->getAssignmetnGradesService($courseId, $assignmentId));
});

Flight::route('GET /api/assignmentGrades/@courseId/@assingmentId/@studentId', function ($courseId, $assignmentId, $studentId) {
    Flight::json(Flight::assignmentServices()->getGradesForStudentAssignment($courseId, $assignmentId,$studentId));
});

Flight::route('GET /api/course/{courseId}/assignmentGrades/{studentId}', function ($courseId, $studentId) {
    Flight::json(Flight::assignmentServices()->getGradesForStudentAssignment($courseId ,$studentId));
});



Flight::route('POST /api/assignments', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::assignmentServices()->add($data));
});


Flight::route('PUT /api/assignments/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::assignmentServices()->update($id, $data);
    Flight::json(Flight::assignmentServices()->getById($id));
});


Flight::route('DELETE /api/assignments/@id', function ($id) {
    Flight::assignmentServices()->delete($id);
});




?>