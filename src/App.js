import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authService } from './fbase';
import './App.css';
import Detail from './routes/Detail';
import Home from './routes/Home';
import Post from './routes/Post';
import { useEffect, useState } from 'react';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Header from './components/Header';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="blog/:id" element={<Detail/>} />
          <Route path="post" element={<Post/>} />
          <Route path="login" element={<Login/>} />
          <Route path="profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
