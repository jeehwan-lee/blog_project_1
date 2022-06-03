import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
