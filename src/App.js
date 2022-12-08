import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/index';
import Navbar from './components/Navbar'
import Login from './pages/login';
import { UserAuthContextProvider } from './context/auth';
import { UserDataContextProvider } from './context/data';
import StudentMain from './pages/student/index';
import CompanyMain from './pages/company/index';
import Company from './pages/company/SpecificCompany'
import DriveMain from './pages/drives';
import { useEffect, useState } from 'react';
import moment from 'moment';
import IndividualDrives from './pages/drives/SpecificDrive';
import StudentProfile from './pages/student/SpecificStudent';

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (message.length != 0) {
      setTimeout(() => {
        setMessage('')
      }, 4000);
    }
  }, [message]);

  const getDate = (format) => {
		const dateObj = new Date();
		if (format === undefined) {
			return `Today, ${moment(dateObj).format("DD MMM YYYY")}`
		} else if (format === "normal") {
			return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
		}
	}

  return (
    <>
      <BrowserRouter>
        <UserAuthContextProvider>
          <UserDataContextProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home getDate={getDate} setMessage={setMessage} />} />
              <Route path='/login' element={<Login getDate={getDate} setMessage={setMessage} />} />
              <Route path='/student' element={<StudentMain getDate={getDate} setMessage={setMessage} />} />
              <Route path='/student/:student' element={<StudentProfile getDate={getDate} setMessage={setMessage} />} />
              <Route path='/company' element={<CompanyMain getDate={getDate} setMessage={setMessage} />} />
              <Route path='/company/:company' element={<Company getDate={getDate} setMessage={setMessage} />} />
              <Route path='/drive' element={<DriveMain getDate={getDate} setMessage={setMessage} />} />
              <Route path='/drive/:drive' element={<IndividualDrives getDate={getDate} setMessage={setMessage} />} />
            </Routes>
          </UserDataContextProvider>
        </UserAuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
