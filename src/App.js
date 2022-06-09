import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './routes/Detail';
import Home from './routes/Home';
import Post from './routes/Post';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="blog/:id" element={<Detail/>} />
          <Route path="post" element={<Post/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
