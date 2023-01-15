import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home tab={0} />} />
        <Route path='/history' element={<Home tab={1} />} />
      </Routes>
    </Router>
  );
};

export default App;
