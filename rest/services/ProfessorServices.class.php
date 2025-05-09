<?php

require_once 'BaseServices.class.php';
require_once __DIR__ . "/../dao//ProfessorsDao.class.php";

class ProfessorServices extends BaseServices {

    public function __construct()
    {
        parent::__construct(new ProfessorsDao);
    }

    function someCustomFunction()
    {
        return $this->dao->getUserByFirstNameAndLastName();
    }

    public function getProfessorByEmail($email){
        return $this->dao->getProfessorByEmail($email);
      }

    public function changePassword($id, $data) {
        $newPassword = $data['password'];
       /* $repeated = $data['repeatedPassword'];
        
        if ($newPassword === $repeated) {
            return $this->dao->changePassword($id, $newPassword);
        } else {
            return Flight::json(['error' => true, 'message' => "Passwords do not match"]);
        }*/
        return $this->dao->changePassword($id, $newPassword);
    }

}




?>