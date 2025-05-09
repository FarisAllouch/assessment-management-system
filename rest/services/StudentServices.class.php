<?php

require_once 'BaseServices.class.php';
require_once __DIR__ . "/../dao/StudentsDao.class.php";

class StudentServices extends BaseServices {

    public function __construct()
    {
        parent::__construct(new StudentsDao);
    }

    function someCustomFunction()
    {
        return $this->dao->getUserByFirstNameAndLastName();
    }
    public function getStudentByEmail($email){
        return $this->dao->getStudentByEmail($email);
      }
      public function getCoursesByStudentId($studentId){
        return $this->dao->getCoursesByStudentId($studentId);
    }

    public function getById($id) {
        return $this->dao->getById($id);
    }

    public function changePasswordStudent($id, $data) {
        $newPassword = $data['password'];
       /* $repeated = $data['repeatedPassword'];
        
        if ($newPassword === $repeated) {
            return $this->dao->changePassword($id, $newPassword);
        } else {
            return Flight::json(['error' => true, 'message' => "Passwords do not match"]);
        }*/
        return $this->dao->changePasswordStudent($id, $newPassword);
    }

    


}




?>