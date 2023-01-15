import React from 'react';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home tab={0} />} />
        <Route path='/history' element={<Home tab={1} />} />
      </Routes>
  );
};

export default App;
