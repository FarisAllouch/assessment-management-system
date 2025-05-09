import './courseListProfessor.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Button } from "@mui/joy"
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';;
import Table from '@mui/joy/Table';
import AddIcon from '@mui/icons-material/Add';;
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Autocomplete from '@mui/joy/Autocomplete';
import { API_BASE_URL } from '../../config';

export default function CourseListProfessor(props) {
    const [assignmetns, setAssignments] = useState([])
    const [assignmentGarde, setAssignmetnGarde] = useState([])
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [teachers, setTeachers] = useState([])
    const [open, setOpen] = useState(false)
    const [openAddStudent, setOpenAddStudent] = useState(false)
    const [openEditAssignmetn, setOpenEditAssignment] = useState(false)
    const [openGradeStudent, setOpenGradeStudent] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState(null)
    const [openAddAssignmetn, setOpenAddAssignment] = useState(false)
    const [enrolledStudents, setEnrolledStudents] = useState([])

    const [courseData, setCourseData] = useState({
        title: '',
        courseCode: '',
        description: '',
        ects: '',
        professor_id: '',
    })

    const [assignmentData, setAssignmetnData] = useState({
        title: '',
        weight: '',
        id: '',
    })

    const [gradeData, setGradeData] = useState({
        grade: '',
        id: '',
        assignmentId: '',
        studentId: '',
    })


    useEffect(() => {
        setCourses(props.courses)
        setTeachers(props.teachers)

        axios.get(`${API_BASE_URL}/students`).then(res => {
            setStudents(res.data)
        })
    }, [props.courses, props.teachers])

    useEffect(() => {
        axios.get(`${API_BASE_URL}/courses/${courseData.id}/students`).then(res => {
            setEnrolledStudents(res.data)

        })
    }, [open])

    useEffect(() => {
        axios.get(`${API_BASE_URL}/courses/${courseData.id}/assignments`).then(res => {
            setAssignments(res.data)
        })

    }, [open])


    useEffect(() => {
        axios.get(`${API_BASE_URL}/courses/${courseData.id}/students`).then(res => {
            setEnrolledStudents(res.data)
            console.log(res.data)
        })
    }, [openEditAssignmetn])


    useEffect(() => {
        if (openEditAssignmetn) {
            axios.get(`${API_BASE_URL}/assignmentGrades/${courseData.id}/${assignmentData.id}`).then(res => {
                setAssignmetnGarde(res.data)

            })
        }
    }, [open, courseData.id, assignmentData.id, openGradeStudent])

    const handleEnrollment = () => {
        axios.post(`${API_BASE_URL}/enrollments`, {
            student_id: selectedStudentId,
            course_id: courseData.id
        }).then(res => {
            console.log(res.data)
            setOpenAddStudent(false)
            setOpen(true)
        })
    }

    const handleRemoveStudent = (studentId) => {
        axios.delete(`${API_BASE_URL}/enrollments/${studentId}`).then(res => {
            setOpen(false)
            //(true)
        })
    }




    const handleGetGradeStudent = (studentId) => {
        axios.get(`${API_BASE_URL}/assignmentGrades/${courseData.id}/${assignmentData.id}/${studentId}`,).then(res => {
            console.log(`this is the grade data above ${res.data[0].grade}`)
            console.log(`this is the assignment id ${res.data[0].assignmentId}`)
            console.log(`this is the student id ${res.data[0].studentId}`)
            console.log(`this is the grade id ${res.data[0].gradeId}`)
            setGradeData({
                gradeId: res.data[0].gradeId,
                grade: res.data[0].grade,
                studentId: res.data[0].studentId,
                assignmentId: res.data[0].assignmentId,
            })
            setOpenGradeStudent(true)

        })

    }


    const handleGradeStudent = (studentId, assignmentId, gradeId) => {
        if (gradeData.gradeId === null) {
            axios.post(`${API_BASE_URL}/grades`, {
                grade: gradeData.grade,
                student_id: studentId,
                assignment_id: assignmentId,
            })
                .then(res => {
                    setOpenGradeStudent(false);
                    console.log(res.data);
                })
                .catch(error => {
                    console.error('Error creating grade:', error);
                });
        } else {
            axios.put(`${API_BASE_URL}/grades/${gradeId}`, {
                id: gradeId,
                grade: gradeData.grade,
                student_id: studentId,
                assignment_id: assignmentId,
            })
                .then(res => {
                    setOpenGradeStudent(false);
                    console.log(res.data);
                })
                .catch(error => {
                    console.error('Error updating grade:', error);
                });
        }

    }

    const handleEditAssignment = (id) => {
        axios.get(`${API_BASE_URL}/assignments/${id}`,).then(res => {
            console.log(res.data);
            const assignment = res.data;
            setAssignmetnData({
                id: assignment.id,
                title: assignment.title,
                weight: assignment.weight,
            })
            setOpenEditAssignment(true)

        })
    }

    const handleSubmitEditAssignment = () => {
        axios.put(`${API_BASE_URL}/assignments/${assignmentData.id}`, {
            title: assignmentData.title,
            weight: assignmentData.weight
        })
            .then(res => {
                console.log("Assignment updated successfully:", res.data);
                window.alert("Successfully updated")
                setOpenEditAssignment(false);
            })
    }



    const handleAddAssignment = () => {
        axios.post(`${API_BASE_URL}/assignments`, {
            course_id: courseData.id,
            title: assignmentData.title,
            weight: assignmentData.weight
        }).then(res => {
            console.log(res.data)
            setOpenAddAssignment(false)
        })
    }



    return (
        <>
            <div className="course-cards">
                {
                    courses.map(course => {

                        return (
                            <div onClick={() => {
                                setOpen(true)
                                setCourseData(course)
                            }} key={course.id} className="course-card" style={{ color: 'black' }}>

                                <span className='course-code'>{course.courseCode}</span>
                                <span className='course-code'>{course.ects} ECTS</span>
                                <p className='course-title'>{course.title}</p>
                            </div>
                        )
                    })
                }

                <Modal open={openAddStudent} onClose={() => setOpenAddStudent(false)}>
                    <ModalDialog>
                        <DialogTitle>Add Student</DialogTitle>
                        <DialogContent>Select a student</DialogContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                        >
                            <Stack spacing={2}>
                                <Autocomplete
                                    onChange={(e, v) => setSelectedStudentId(v.id)}
                                    placeholder="Students"
                                    options={students}
                                    sx={{ width: 300 }}
                                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                                />
                                <Button onClick={() => handleEnrollment()} type="submit">Add Student</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>

                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog sx={{ overflow: 'scroll' }}>
                        <Stack spacing={2}>
                            <FormControl>
                                <div className='courseDetailTitle'>
                                    <h2>{courseData.courseCode}</h2>
                                    <h2>{courseData.title}</h2>
                                </div>
                            </FormControl>

                            <Button onClick={() => setOpenAddStudent(true)} startDecorator={<AddIcon />} variant='outlined' color='primary'>Add Student</Button>
                            <Table sx={{ border: 1, borderRadius: '0%', padding:'10px' }}>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th style={{ textAlign: 'center'}}>Last Name</th>
                                        <th style={{ textAlign: 'end'}}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolledStudents.map((student, index) => (
                                        <tr key={index}>
                                            <td>{student.firstName}</td>
                                            <td style={{ textAlign: 'centerx'}}>{student.lastName}</td>
                                            <td style={{ textAlign: 'end'}}>
                                                <Button onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRemoveStudent(student.enrollmentId)
                                                }} startDecorator={<PersonRemoveIcon />} variant='outlined' color='danger'></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Button onClick={() => setOpenAddAssignment(true)} startDecorator={<AddIcon />} variant='outlined' color='primary'>Add Assignment</Button>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right" style={{ background: '#3598dc' }}>Title</TableCell>
                                            <TableCell align="right" style={{ textAlign: 'end', background: '#3598dc' }}>Weight</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assignmetns.map((assignment, index) => (
                                            <TableRow
                                                key={assignment.index}
                                                onClick={() => {
                                                    handleEditAssignment(assignment.id)
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <TableCell>{assignment.title}</TableCell>
                                                <TableCell align="right">{assignment.weight}%</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </ModalDialog>
                </Modal>


                <Modal open={openEditAssignmetn} onClose={() => setOpenEditAssignment(false)}>
                    <ModalDialog sx={{ overflow: 'scroll' }}>
                        <DialogTitle>Edit Assignment</DialogTitle>

                        <DialogContent>Fill in the information of the Assignmetn.</DialogContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                                handleSubmitEditAssignment();

                            }}
                        >
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel>Assignmetn Title</FormLabel>
                                    <Input value={assignmentData.title} onChange={(e) => setAssignmetnData({ ...assignmentData, title: e.target.value })} required />

                                </FormControl>
                                <FormControl>
                                    <FormLabel>Assignemnt Grade %</FormLabel>
                                    <Input value={assignmentData.weight} onChange={(e) => setAssignmetnData({ ...assignmentData, weight: e.target.value })} required />
                                </FormControl>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow >
                                                <TableCell align="right" style={{ background: '#3598dc' }}>First Name</TableCell>
                                                <TableCell align="right" style={{ textAlign: 'center', background: '#3598dc' }}>Last Name</TableCell>
                                                <TableCell align="right" style={{ textAlign: 'end', background: '#3598dc' }}>Grade</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {assignmentGarde.map((grade, index) => (
                                                <TableRow
                                                    onClick={() => {
                                                        console.log(grade.gradeId, grade.assignmentId, grade.studentId);
                                                        handleGetGradeStudent(grade.studentId);
                                                    }}
                                                    key={index}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <TableCell >{grade.firstName}</TableCell>
                                                    <TableCell align="center" >{grade.lastName}</TableCell>
                                                    <TableCell align="right" >{grade.grade}%</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Button type="submit">Save Changes</Button>
                                <Button color="danger" onClick={() => setOpenEditAssignment(false)}>Back</Button>

                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>


                <Modal open={openGradeStudent} onClose={() => setOpenGrade(false)}>
                    <ModalDialog sx={{ overflow: 'scroll' }}>
                        <DialogTitle> Student Grade</DialogTitle>

                        <DialogContent>Enter the grade!</DialogContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpenGradeStudent(false);
                                handleGradeStudent(gradeData.studentId, gradeData.assignmentId, gradeData.gradeId);


                            }}
                        >
                            <Stack spacing={4}>

                                <FormControl>
                                    <FormLabel>Assignemnt Grade </FormLabel>
                                    <Input defaultValue={gradeData.grade} onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })} required />
                                </FormControl>


                                <Button type="submit">Save Changes</Button>
                                <Button color="danger" onClick={() => setOpenGradeStudent(false)}>Back</Button>

                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>


                <Modal open={openAddAssignmetn} onClose={() => setOpenAddAssignment(false)}>
                    <ModalDialog>
                        <DialogTitle>Add Assignment</DialogTitle>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Assignemt Title</FormLabel>
                                    <Input onChange={(e) => setAssignmetnData({ ...assignmentData, title: e.target.value })} required />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Grade %</FormLabel>
                                    <Input onChange={(e) => setAssignmetnData({ ...assignmentData, weight: e.target.value })} type="number" required />
                                </FormControl>
                                <Button onClick={() => handleAddAssignment()} type="submit">Add Assignment</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </div>
        </>
    )
}