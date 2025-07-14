// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Events from './components/Events';
import Directory from './components/Directory';
import NewUser from './components/NewUser';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  useEffect(() => {
    localStorage.clear(); // clears token/role on every reload
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Fix */}
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/directory" element={<Directory />} />
      </Routes>
    </Router>
  );
}

export default App;
