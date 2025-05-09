import NavBar from "../components/NavBar/NavBar";
import '../styles/profile.css';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Button } from "@mui/joy";
import Modal from '@mui/joy/Modal';
import axios from "axios";
import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { API_BASE_URL } from '../config';

export default function Profile() {
    const [newMemberData, setNewMemberData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        //password: '',
        role: ''
    });

   

   

    const [editMode, setEditMode] = useState(false);
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

  

    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    const [passwordData, setPasswordData] = useState({
       // id: userId,
        password: '',
        repeatedPassword: '',
    });

    useEffect(() => {
        if ((role === "professor" && userId) || role==="admin") {
            axios.get(`${API_BASE_URL}/professors/${userId}`)
                .then(res => {
                    setNewMemberData(res.data);
                })
                .catch(error => {
                    console.error('Error fetching professor data:', error);
                });
        } else if (role === "student") {
            axios.get(`${API_BASE_URL}/students/${userId}`)
                .then(res => {
                    setNewMemberData(res.data);
                })
                .catch(error => {
                    console.error('Error fetching student data:', error);
                });
        }
    }, [role, userId]);

    const handleEditMember = () => {
        if (window.confirm('Are you sure you want to update your information?')) {
            const endpoint = newMemberData.role === 'student'
                ? `${API_BASE_URL}/students/${newMemberData.id}`
                : `${API_BASE_URL}/professors/${newMemberData.id}`;

            axios.put(endpoint, {
                firstName: newMemberData.firstName,
                lastName: newMemberData.lastName,
                email: newMemberData.email,
                //password: newMemberData.password
            }).then(response => {
               
                window.location.reload();
            }).catch(error => {
                console.error('There was an error updating the member:', error);
            });
        }
    };

    const handleChangePasswrod = () => {
        if (window.confirm('Are you sure you want to update your password?')) {
            const endpoint = role === 'student'
                ? `${API_BASE_URL}/students/changePassword/${userId}`
                : `${API_BASE_URL}/professors/changePassword/${userId}`;
    
                axios.post(endpoint, {
                    password: passwordData.password,
                    repeatedPassword: passwordData.repeatedPassword,
                })
                .then(response => {
                    setErrorMessage('');
                    window.location.reload();
                })
                .catch(error => {
                    console.error('There was an error updating the password:', error);
                    if (error.response && error.response.data && error.response.data.message) {
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage('An unknown error occurred.');
                    }
                });
        }
        
    };

    const handleOpenChangePasswordModal = () => {
        setOpenChangePasswordModal(true);
    };

    const handleCloseChangePasswordModal = () => {
        setOpenChangePasswordModal(false);
    };

    

    return (
        <div className="main">
            <NavBar />
            <div className="profile-container">
                <div className="profile-info">
                    <div className="account-icon">
                        <VscAccount />
                    </div>
                    <div className="role-section">
                        <h3>{role.toLocaleUpperCase()}</h3>
                    </div>

                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                value={newMemberData.firstName}
                                onChange={(e) => setNewMemberData({ ...newMemberData, firstName: e.target.value })}
                                required
                                disabled={!editMode} // Disable input in view mode
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                value={newMemberData.lastName}
                                onChange={(e) => setNewMemberData({ ...newMemberData, lastName: e.target.value })}
                                required
                                disabled={!editMode} // Disable input in view mode
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                value={newMemberData.email}
                                onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
                                type="email"
                                required
                                disabled={!editMode} // Disable input in view mode
                            />
                        </FormControl>
                        {role === 'student' ? null : (
                            editMode ? (
                                <Button onClick={handleEditMember}>Save Changes</Button>
                            ) : (
                                <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                            )
                        )}
                        <Button onClick={handleOpenChangePasswordModal}>Change Password</Button>
                    </Stack>
                </div>
            </div>

            <Modal
                open={openChangePasswordModal}
                onClose={handleCloseChangePasswordModal}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '20px',
                    minWidth: '300px',
                }}>
                    <h2 style={{ color: "black" }}>Change Password</h2>
                    {errorMessage && (
                    <div style={{ color: 'red', marginTop: '10px' }}>
                        {errorMessage}
                    </div>
                )}
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                type="password"
                                value={passwordData.password}
                               // onChange={(e) => setPassword(e.target.value)}
                                onChange={(e) => setPasswordData({...passwordData, password: e.target.value })}
                                placeholder="Enter new password"
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Repeat New Password</FormLabel>
                            <Input
                                type="password"
                                value={passwordData.repeatedPassword}
                                //onChange={(e) => setRepeatedPassword(e.target.value)}
                                onChange={(e) => setPasswordData({ ...passwordData, repeatedPassword: e.target.value })}
                                placeholder="Enter new password"
                                required
                            />
                        </FormControl>
                        <Stack spacing={2} direction="row" justifyContent="flex-end">
                            <Button onClick={handleChangePasswrod}>Save Changes</Button>
                            <Button onClick={handleCloseChangePasswordModal}>Cancel</Button>
                        </Stack>
                    </Stack>


                </div>
            </Modal>
        </div>
    );
}
