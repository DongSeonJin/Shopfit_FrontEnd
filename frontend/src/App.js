import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
// import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TestPage from './TestPage';

const App = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/register" element={<RegisterPage />} />
    // </Routes>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<TestPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>

  );
};

export default App;