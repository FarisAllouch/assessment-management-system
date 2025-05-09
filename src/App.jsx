import './App.css'
import Courses from './pages/Courses'
import CoursesProfessor from './pages/CoursesProfessor'
import Login from './pages/Login'
import Members from './pages/Members'
import Profile from './pages/Profile'
import CoursesStudent from './pages/CoursesStudent'
import About from './components/About/About' 

import { Route, Routes } from 'react-router-dom'

export default function App() {

  return (
    <div className='root'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/members' element={<Members />} />
        <Route path='/coursesProfessor' element={<CoursesProfessor />} />
        <Route path='/login' element={<Login />} />
        <Route path='/coursesStudent' element={<CoursesStudent />} />
        <Route path='/about' element={<About />} /> 
        <Route path="/*" element={<h1>Page Not Found</h1>}/>
      </Routes>
    </div>
  )
}
