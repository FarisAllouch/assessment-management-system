<?php


require_once __DIR__ . '/BaseDao.class.php';

class AssignmentsDao extends BaseDao {
    public function __construct(){
        parent::__construct('assignments');
    }


   /* public function getStudentWithAssignment($id) {
        return $this->query("SELECT a.title, a.weight, a.id FROM assignments a JOIN courses c ON a.course_id = c.id WHERE c.id = :id", ["id" => $id]);
    }*/

    public function getAssignmentGrades($courseId, $assignmentId) {
        return $this->query("SELECT g.id as gradeId, a.id as assignmentId, s.id as studentId, s.firstName, s.lastName, g.grade FROM students s JOIN enrollments e ON s.id=e.student_id JOIN courses c ON e.course_id = c.id JOIN assignments a ON c.id = a.course_id LEFT JOIN grades g ON a.id = g.assignment_id AND s.id = g.student_id WHERE e.course_id = :id AND a.id = :id2", ["id" => $courseId, "id2" => $assignmentId]);
    }


    public function getAssignmentGradesForStudent($courseId, $assignmentId, $studentId) {
        return $this->query("SELECT g.id as gradeId, a.id as assignmentId, s.id as studentId, s.firstName, s.lastName, g.grade FROM students s JOIN enrollments e ON s.id=e.student_id JOIN courses c ON e.course_id = c.id JOIN assignments a ON c.id = a.course_id LEFT JOIN grades g ON a.id = g.assignment_id AND s.id = g.student_id WHERE e.course_id = :id AND a.id = :id2 AND s.id=:id3", ["id" => $courseId, "id2" => $assignmentId, "id3"=>$studentId]);
    }
    public function getAssignmentsGradesForStudent($courseId, $studentId) {
    return $this -> query("SELECT a.title as assignmentTitle, g.grade
            FROM assignments a
            LEFT JOIN grades g ON a.id = g.assignment_id
            WHERE a.course_id = :courseId
            AND g.student_id = :studentId", ["courseId" => $courseId, "studentId" => $studentId]);
    }
    
    
}