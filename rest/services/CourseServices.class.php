<?php

require_once 'BaseServices.class.php';
require_once __DIR__ . "/../dao/CoursesDao.class.php";

class CourseServices extends BaseServices {

    public function __construct()
    {
        parent::__construct(new CoursesDao);
    }

    function someCustomFunction()
    {
        return $this->dao->getUserByFirstNameAndLastName();
    }


    public function getCoursesFromProfessor($id) {
        return $this->dao->getCoursesFromProfessor($id);
    }

    public function getStudents($id) {
        return $this->dao->getStudents($id);
    }

    public function getAssignments($id) {
        return $this->dao->getAssignments($id);
    }
    
    public function getAssignmentsWithGrades($courseId, $studentId) {
        return $this->dao->getAssignmentsWithGrades($courseId, $studentId);
    }


}




?>