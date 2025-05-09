<?php


require_once __DIR__ . '/BaseDao.class.php';

class StudentsDao extends BaseDao {
    public function __construct(){
        parent::__construct('students');
    }
    

    public function getStudentByEmail($email){
        return $this->query_unique("SELECT * FROM students WHERE email = :email ", ['email' => $email]);
      }
    public function getCoursesByStudentId($studentId) {
    
        $query="SELECT c.id, c.title, c.description, c.courseCode
        FROM students AS s
        JOIN enrollments AS e ON e.student_id = s.id
        JOIN courses AS c ON e.course_id = c.id
        WHERE s.id = :id";

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':id', $studentId); 
        $stmt->execute();
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        return $courses;
                  
    }


    public function changePasswordStudent($id, $newPassword) {
        return $this->query("UPDATE students SET password = :password WHERE id = :id", ['id' => $id, 'password' => $newPassword]);
    }
    
    
    
    
}