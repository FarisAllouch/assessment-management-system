<?php


Flight::route('GET /api/professors', function () {
    
    Flight::json(Flight::professorServices()->get_all());
});


Flight::route('GET /api/professors/@id', function ($id) {
    Flight::json(Flight::professorServices()->getById($id));
});


Flight::route('POST /api/professors', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::professorServices()->add($data));
});

Flight::route('POST /api/professors/changePassword/@id', function ($id) {
    $data = Flight::request()->data->getData();
    $newPassword = $data['password'];
    $repeated = $data['repeatedPassword'];

    if ($newPassword === $repeated) {
        Flight::json(Flight::professorServices()->changePassword($id, $data));
    } else {
        Flight::json(['error' => true, 'message' => "Passwords do not match"],400);
    }

   // Flight::json(Flight::professorServices()->changePassword($id, $data));
});


Flight::route('PUT /api/professors/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::professorServices()->update($id, $data);
    Flight::json(Flight::professorServices()->getById($id));
});


Flight::route('DELETE /api/professors/@id', function ($id) {
    Flight::professorServices()->delete($id);
});


?>