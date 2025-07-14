// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Events from './components/Events';
import UserDetail from "./components/UserDetail";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import Directory from './components/Directory';
import NewUser from './components/NewUser';
import JobPost from './components/JobPost';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";

function App() {
  useEffect(() => {
    localStorage.clear(); // clears token/role on every reload
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/user-detail/:id" element={<UserDetail />}/>
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/delete-user/:id" element={<DeleteUser />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/post-job" element={<JobPost />} />
      </Routes>
    </Router>
  );
}

export default App;
