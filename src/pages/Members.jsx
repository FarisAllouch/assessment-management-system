import NavBar from "../components/NavBar/NavBar"
import '../styles/members.css'
import { Table, Button } from "@mui/joy"
import AddIcon from '@mui/icons-material/Add';
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
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { API_BASE_URL } from '../config';


export default function Members() {
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [newMemberData, setNewMemberData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        isAdmin:'0',
       
    })

    useEffect(() => {
        axios.get(`${API_BASE_URL}/students`).then(res => {
            setStudents(res.data)
        })

        axios.get(`${API_BASE_URL}/professors`).then(res => {
            setTeachers(res.data)
        })
    }, [])


    const handleAddMember = () => {
        if(newMemberData.role === 'student') {
            axios.post(`${API_BASE_URL}/students`, {
                firstName: newMemberData.firstName,
                lastName: newMemberData.lastName,
                email: newMemberData.email,
                password: newMemberData.password
            }).then(res => {
                setStudents([...students, res.data])
            })
        } else if(newMemberData.role === 'teacher') {
            axios.post(`${API_BASE_URL}/professors`, {
                firstName: newMemberData.firstName,
                lastName: newMemberData.lastName,
                email: newMemberData.email,
                password: newMemberData.password
            }).then(res => {
                setTeachers([...teachers, res.data])
            })
        } else if(newMemberData.role === 'admin') {
            axios.post(`${API_BASE_URL}/professors`, {
                firstName: newMemberData.firstName,
                lastName: newMemberData.lastName,
                email: newMemberData.email,
                password: newMemberData.password,
                isAdmin:"1"
            }).then(res => {
                setTeachers([...teachers, res.data])
            })
        }
    }

    const handleDeleteMember = (id, role) => {
        if(role === 'student') {
            axios.delete(`${API_BASE_URL}/students/${id}`).then(res => {
                setStudents(students.filter(student => student.id !== id))
                window.alert(`Successsfuly deleted ${student.firstName}`)
            })
        } else {
            axios.delete(`${API_BASE_URL}/professors/${id}`).then(res => {
                setTeachers(teachers.filter(teacher => teacher.id !== id))
                
            })
        }
    }

    const handleEditMember = () => {
        if(newMemberData.role === 'student') {
            axios.put(`${API_BASE_URL}/students/${newMemberData.id}`, {
                firstName: newMemberData.firstName,
                lastName: newMemberData.lastName,
                email: newMemberData.email,
                password: newMemberData.password
            }).then(res => {
                setStudents(students.map(student => {
                    if(student.id === newMemberData.id) {
                        return res.data[0]
                    } else {
                        return student
                    }
                }))
            })
        } else {
            axios.put(`${API_BASE_URL}/professors/${newMemberData.id}`, {
                firstName: newMemberData.firstName,
                lastName: newMemberData.lastName,
                email: newMemberData.email,
                password: newMemberData.password
            }).then(res => {
                setTeachers(teachers.map(teacher => {
                    if(teacher.id === newMemberData.id) {
                        return res.data[0]
                    } else {
                        return teacher
                    }
                }))
            })
        }
    }

    return (
        <div className="main">
            <NavBar />
            <div className="members-section">
                <Button onClick={() => setOpen(true)} sx={{marginBottom: '5px'}} startDecorator={<AddIcon />} variant='solid' color='primary'>Add Member</Button>
                <Table className='table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(student => {
                                return (
                                    <tr onClick={() => {
                                            setOpenEdit(true)
                                            setNewMemberData({
                                                firstName: student.firstName,
                                                lastName: student.lastName,
                                                email: student.email,
                                                password: student.password,
                                                role: 'student',
                                                id: student.id
                                            })
                                        }} key={student.id}>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.email}</td>
                                        <td>Student</td>
                                        <td><Button onClick={(e) => {
                                            e.stopPropagation()
                                            handleDeleteMember(student.id, 'student')
                                        }} startDecorator={<DeleteIcon />} variant='outlined' color='danger'>Delete Member</Button></td>
                                    </tr>
                                )
                            })
                        }
                        {
                            teachers.map(teacher => {
                                return (
                                    <tr onClick={() => {
                                            setOpenEdit(true)
                                            setNewMemberData({
                                                firstName: teacher.firstName,
                                                lastName: teacher.lastName,
                                                email: teacher.email,
                                                password: teacher.password,
                                                role: 'teacher',
                                                id: teacher.id
                                            })
                                    }} key={teacher.id}>
                                        <td>{teacher.firstName}</td>
                                        <td>{teacher.lastName}</td>
                                        <td>{teacher.email}</td>
                                        <td>Teacher</td>
                                        <td><Button onClick={(e) => {
                                            e.stopPropagation()
                                            handleDeleteMember(teacher.id, 'teacher')
                                        }} startDecorator={<DeleteIcon />} variant='outlined' color='danger'>Delete Member</Button></td>
                                    </tr>
                                )
                            })   
                        }
                    </tbody>
                </Table>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                <DialogTitle>Add a new Member</DialogTitle>
                <DialogContent>Fill in the information of the Member.</DialogContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setOpen(false);
                        handleAddMember();
                    }}
                >
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input onChange={(e) => setNewMemberData({...newMemberData, firstName: e.target.value})} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input onChange={(e) => setNewMemberData({...newMemberData, lastName: e.target.value})}  required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input onChange={(e) => setNewMemberData({...newMemberData, email: e.target.value})}  type="email" required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input onChange={(e) => setNewMemberData({...newMemberData, password: e.target.value})}  type="password" required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Select onChange={(e, v) => setNewMemberData({...newMemberData, role: v})}>
                                <Option value="teacher">Teacher</Option>
                                <Option value="student">Student</Option>
                                <Option value="admin">Admin</Option>
                            </Select>
                        </FormControl>
                        <Button type="submit">Create</Button>
                    </Stack>
                </form>
                </ModalDialog>
            </Modal>
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <ModalDialog>
                <DialogTitle>Edit Member Information</DialogTitle>
                <DialogContent>Fill in the information of the Member.</DialogContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setOpenEdit(false);
                        handleEditMember();
                    }}
                >
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input value={newMemberData.firstName} onChange={(e) => setNewMemberData({...newMemberData, firstName: e.target.value})} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input value={newMemberData.lastName} onChange={(e) => setNewMemberData({...newMemberData, lastName: e.target.value})}  required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input value={newMemberData.email} onChange={(e) => setNewMemberData({...newMemberData, email: e.target.value})}  type="email" required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input onChange={(e) => setNewMemberData({...newMemberData, password: e.target.value})}  type="password" required />
                        </FormControl>
                        <Button type="submit">Save Changes</Button>
                    </Stack>
                </form>
                </ModalDialog>
            </Modal>
        </div>
    )
}