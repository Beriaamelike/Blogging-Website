import Post from "./components/post/Post";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { AuthProvider } from './pages/login/AuthContext';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Userdetails from "./pages/userdetails/Userdetails";

function App() {
  const currentUser = false;
  return (
    <AuthProvider>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/posts" element={<Homepage />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/userdetails" element={<Userdetails />} />
          <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
