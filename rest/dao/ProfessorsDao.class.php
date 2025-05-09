<?php


require_once __DIR__ . '/BaseDao.class.php';

class ProfessorsDao extends BaseDao {
    public function __construct(){
        parent::__construct('professors');
    }

    public function getProfessorByEmail($email){
        return $this->query_unique("SELECT * FROM professors WHERE email = :email ", ['email' => $email]);
      }

      public function changePassword($id, $newPassword) {
        return $this->query("UPDATE professors SET password = :password WHERE id = :id", ['id' => $id, 'password' => $newPassword]);
    }

      public function enableUserTOTP($email){
        return $this->query("UPDATE user set has2FA=1, has2FAemail=0, has2FAsms=0 WHERE email = :email ", ['email' => $email]);
      }
    
}