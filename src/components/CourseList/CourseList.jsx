import './courselist.css'
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
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/joy/Autocomplete';
import { API_BASE_URL } from '../../config';

export default function CourseList(props) {
    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [teachers, setTeachers] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState(null)
    const [openAddStudent, setOpenAddStudent] = useState(false)
    const [enrolledStudents, setEnrolledStudents] = useState([])
    const [courseData, setCourseData] = useState({
        title: '',
        courseCode: '',
        description: '',
        ects: '',
        professor_id: ''
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
            console.log(res.data)
        })
    }, [open])


    const handleEditCourse = () => {
        axios.put(`${API_BASE_URL}/courses/${courseData.id}`, courseData).then(res => {
            setCourses(courses.map(course => course.id === res.data.id ? res.data : course))
        })
        window.location.reload()
    }

    const handleDeleteCourse = () => {
        axios.delete(`${API_BASE_URL}/courses/${courseData.id}`).then(res => {
            setCourses(courses.filter(course => course.id !== res.data.id))
        })
        window.location.reload()
    }

    const handleEnrollment = () => {
        axios.post(`${API_BASE_URL}/enrollments`, {
            student_id: selectedStudentId,
            course_id: courseData.id
        }).then(res => {
            console.log(res.data)
            setOpenAddStudent(false)
        })
    }

    const handleRemoveStudent = (studentId) => {
        axios.delete(`${API_BASE_URL}/enrollments/${studentId}`).then(res => {
            setOpen(false)
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
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog sx={{overflow: 'scroll'}}>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogContent>Fill in the information of the Course.</DialogContent>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                                handleEditCourse()
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Course Name</FormLabel>
                                    <Input value={courseData.title} onChange={(e) => setCourseData({...courseData, title: e.target.value})} required />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Course Code</FormLabel>
                                    <Input value={courseData.courseCode} onChange={(e) => setCourseData({...courseData, courseCode: e.target.value})} required />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Input value={courseData.description} onChange={(e) => setCourseData({...courseData, description: e.target.value})} required />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>ECTS</FormLabel>
                                    <Input value={courseData.ects} onChange={(e) => setCourseData({...courseData, ects: e.target.value})} type="number" required />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Teacher</FormLabel>
                                    <Select onChange={(e, v) => setCourseData({...courseData, professor_id: v})} defaultValue={courseData.professor_id}>
                                        {
                                            teachers.map(teacher => {
                                                return (
                                                    <Option key={teacher.id} value={teacher.id}>{teacher.firstName} {teacher.lastName}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <p style={{fontWeight: 600}}>Students</p>
                                <Button onClick={() => setOpenAddStudent(true)} startDecorator={<AddIcon />} variant='outlined' color='primary'>Add Student</Button>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            enrolledStudents.map((student, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{student.firstName}</td>
                                                        <td>{student.lastName}</td>
                                                        <td><Button onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleRemoveStudent(student.enrollmentId)
                                                    }} startDecorator={<PersonRemoveIcon />} variant='outlined' color='danger'></Button></td>
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    </Table>
                                <Button type="submit">Save Changes</Button>
                                <Button onClick={() => handleDeleteCourse()} color='danger'>Delete Course</Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
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
            </div>
        </>
    )
}