<?php


require_once __DIR__ . '/BaseDao.class.php';

class CoursesDao extends BaseDao {
    public function __construct(){
        parent::__construct('courses');
    }


    public function getCoursesFromProfessor($id) {
        return $this->query("SELECT * FROM courses  WHERE professor_id = :id", ["id" => $id]);
    }

    public function getStudents($id) {
        return $this->query("SELECT s.*, e.id AS 'enrollmentId' FROM courses c JOIN enrollments e ON e.course_id = c.id JOIN students s ON e.student_id = s.id WHERE c.id = :id", ["id" => $id]);
    }

    public function getAssignments($id) {
        return $this->query("SELECT a.title, a.weight, a.id FROM assignments a JOIN courses c ON a.course_id = c.id WHERE c.id = :id", ["id" => $id]);
    }

    public function getAssignmentsWithGrades($courseId, $studentId) {
        return $this->query("
            SELECT a.id, a.title AS assignmentTitle, g.grade AS grade
            FROM courses c
            JOIN assignments a ON c.id = a.course_id
            LEFT JOIN grades g ON a.id = g.assignment_id
            WHERE c.id = :courseId AND g.student_id = :studentId;
        ", ["courseId" => $courseId, "studentId" => $studentId]);
    }
    
}