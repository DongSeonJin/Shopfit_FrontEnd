import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/common/Header';
import Home from './pages/Home';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
