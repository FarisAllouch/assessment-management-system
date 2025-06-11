<?php
    use PHPUnit\Framework\TestCase;
    require_once __DIR__ . '/../rest/dao/CoursesDao.class.php';

    class CourseTest extends TestCase {
        public function testGetCoursesFromProfessor() {
            $courseDao = new CoursesDao();
            $courses = $courseDao->getCoursesFromProfessor(11);
            $this->assertNotEmpty($courses);
        }

        public function testGetStudents() {
            $courseDao = new CoursesDao();
            $students = $courseDao->getStudents(1);
            $this->assertNotEmpty($students);
        }

        public function testGetAssignments() {
            $courseDao = new CoursesDao();
            $assignments = $courseDao->getAssignments(1);
            $this->assertNotEmpty($assignments);
        }

        public function testGetAssignmentsWithGrades() {
            $courseDao = new CoursesDao();
            $assignments = $courseDao->getAssignmentsWithGrades(1, 13);
            $this->assertNotEmpty($assignments);
        }
    }
?>