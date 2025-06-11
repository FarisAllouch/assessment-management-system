<?php
    use PHPUnit\Framework\TestCase;
    require_once __DIR__ . '/../rest/dao/AssignmentsDao.class.php';

    class AssignmentTest extends TestCase {
        public function testGetAssignmentGrades() {
            $assignmentDao = new AssignmentsDao();
            $grades = $assignmentDao->getAssignmentGrades(1, 1);
            $this->assertNotEmpty($grades);
        }

        public function testGetAssignmentGradesForStudent() {
            $assignmentDao = new AssignmentsDao();
            $grades = $assignmentDao->getAssignmentGradesForStudent(1, 1, 13);
            $this->assertNotEmpty($grades);
        }
    }
?>