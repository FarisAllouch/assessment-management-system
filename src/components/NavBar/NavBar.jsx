import React from 'react';
import { Button } from '@mui/joy';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';



const NavBar = () => {
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    const [user, setUser] = useState([]);

    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // const studentIdFromLocalStorage = localStorage.getItem("userId");
        if (role == "professor" && userId) {
            axios.get(`${API_BASE_URL}/professors/${userId}`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(error => {
                    console.error('Error fetching student courses:', error);
                });
        }
        else if (role == "admin") {
            axios.get(`${API_BASE_URL}/professors/${userId}`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(error => {
                    console.error('Error fetching student courses:', error);
                });
        }
        else if (role == "student") {
            axios.get(`${API_BASE_URL}/students/${userId}`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(error => {
                    console.error('Error fetching student courses:', error);
                });
        }




    }, []);



    return (
        <div className="navbar">

            {role === 'admin' && (
                <>
                    <Link to='/courses'><Button sx={{ width: '100%' }} variant='solid' color='primary'>Courses</Button></Link>
                    <Link to='/members'><Button sx={{ width: '100%' }} variant='solid' color='primary'>Members</Button></Link>
                    <Link to='/profile'><Button sx={{ width: '100%' }} variant='solid' color='primary'>My Profile</Button></Link>
                    <Link to='/about'><Button sx={{ width: '100%' }} variant='solid' color='primary'>About</Button></Link>
                </>
            )}

            {role === 'professor' && (
                <>
                   
                    <Link to='/coursesProfessor'><Button sx={{ width: '100%' }} variant='solid' color='primary'>Courses</Button></Link>
                    <Link to='/profile'><Button sx={{ width: '100%' }} variant='solid' color='primary'>My Profile</Button></Link>
                    <Link to='/about'><Button sx={{ width: '100%' }} variant='solid' color='primary'>About</Button></Link>
                </>
            )}

            {role === 'student' && (
                <>
                    <Link to='/coursesStudent'><Button sx={{ width: '100%' }} variant='solid' color='primary'>My Courses</Button></Link>
                    <Link to='/profile'><Button sx={{ width: '100%' }} variant='solid' color='primary'>My Profile</Button></Link>
                    <Link to='/about'><Button sx={{ width: '100%' }} variant='solid' color='primary'>About</Button></Link>
                </>


            )}

            <div className='user-info'>
                <i className="fa-light fa-user"></i>
                <div className='user-name'>{user.firstName + " " + user.lastName}</div>
                <Button sx={{ width: '100%', marginTop: '20px' }} variant='solid' color='primary' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default NavBar;