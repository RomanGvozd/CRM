import React from 'react';
import { Routes, Route} from "react-router-dom";

import Header from './components/Header/Header';
import Schedule from './components/Schedule/Schedule';
import CreateGroup from './components/CreateGroup/CreateGroup';
import ListGroup from './components/ListGroup/ListGroup';

import ListChildren from './components/ListChildren/ListChildren';
import CreateChildren from './components/CreateChildren/CreateChildren';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/group" element={<CreateGroup />} />
          <Route path="/children" element={<CreateChildren />} />
          <Route path="/list-group" element={<ListGroup />} />
          <Route path="/list-children" element={<ListChildren />} />
        </Routes>
    </>
  );
}

export default App;
