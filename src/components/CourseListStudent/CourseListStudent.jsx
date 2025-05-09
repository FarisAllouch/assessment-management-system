import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Table from '@mui/joy/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { API_BASE_URL } from '../../config';

export default function CourseListStudent(props) {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [assignmentsWithGrades, setAssignmentsWithGrades] = useState([]);

    useEffect(() => {
        const studentIdFromLocalStorage = localStorage.getItem("userId");

        if (studentIdFromLocalStorage) {
            axios.get(`${API_BASE_URL}/studentcourses/${studentIdFromLocalStorage}`)
                .then(res => {
                    setCourses(res.data);
                })
                .catch(error => {
                    console.error('Error fetching student courses:', error);
                });
        }
    }, []);

    const handleCourseClick = (courseId) => {
        const studentIdFromLocalStorage = localStorage.getItem("userId");

        setSelectedCourse(courseId);
        axios.get(`${API_BASE_URL}/courseAssignmentsGrades/${courseId}/${studentIdFromLocalStorage}`)
            .then(res => {
                setAssignmentsWithGrades(res.data);
                console.log(res.data)
            })
            .catch(error => {
                console.error('Error fetching assignments and grades for course:', error);
            });
    };

    return (
        <>
            <div className="course-list">
                <h2>My Courses</h2>
                <div className="course-cards">
                    {courses.map(course => (
                        <div key={course.id} onClick={() => handleCourseClick(course.id)} className="course-card" style={{ color: 'black' }}>
                            <span className='course-code'>{course.courseCode}</span>
                            <span className='course-code'>{course.ects} ECTS</span>
                            <p className='course-title'>{course.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Modal open={selectedCourse !== null} onClose={() => setSelectedCourse(null)}>
                <ModalDialog sx={{ overflow: 'scroll' }}>
                    <DialogTitle>{selectedCourse ? `Assignments and Grades for Course ${selectedCourse}` : 'Assignments and Grades'}</DialogTitle>
                    <DialogContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Assignment Title</TableCell>
                                        <TableCell>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assignmentsWithGrades.map(item => (
                                        <TableRow key={item.assignmentId}>
                                            <TableCell>{item.assignmentTitle}</TableCell>
                                            <TableCell>{item.grade}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </>
    );
}
