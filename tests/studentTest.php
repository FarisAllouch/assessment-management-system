<?php
    use PHPUnit\Framework\TestCase;
    require_once __DIR__ . '/../rest/dao/StudentsDao.class.php';

    class StudentTest extends TestCase {
        public function testAddStudent() {
            $student = [
                "firstName" => "John",
                "lastName" => "Doe",
                "email" => "john@gmail.com",
                "password" => "1234",
            ];

            $studentDao = new StudentsDao();
            $student = $studentDao->add($student);
            $this->assertEquals('John', $studentDao->getStudentByEmail('john@gmail.com')['firstName']);
        }

        public function testGetCoursesByStudentId() {
            $studentDao = new StudentsDao();
            $courses = $studentDao->getCoursesByStudentId(13);
            $this->assertNotEmpty($courses);
        }

        public function testDeleteStudent() {
            $studentDao = new StudentsDao();
            $student = $studentDao->getStudentByEmail('john@gmail.com');
            $studentDao->delete($student['id']);
            $this->assertEmpty($studentDao->getStudentByEmail('john@gmail.com'));
        }
    }
?>