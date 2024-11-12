import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import GKGSQuizBot from './components/GKGSQuizBot';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './components/HomePage';
import { auth } from './services/firebase';

function App() {
  const [user, setUser] = React.useState(null);

  // Monitor user authentication status
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default Home page accessible without login */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} /> {/* Alias for Home page */}
        
        {/* Login page */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        
        {/* Quiz and Admin pages only for authenticated users */}
        <Route path="/quiz" element={user ? <GKGSQuizBot /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user ? <AdminDashboard /> : <Navigate to="/login" />} />
        
        {/* Redirect old admin-dashboard route to /admin */}
        <Route path="/admin-dashboard" element={<Navigate to="/admin" />} />
        
        {/* Optional Dashboard route */}
        <Route path="/dashboard" element={user ? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
