import React, {useState} from 'react'
import { Routes, Route} from "react-router-dom"

import Header from './components/Header/Header'
import Schedule from './components/Schedule/Schedule'
import CreateGroup from './components/CreateGroup/CreateGroup'
import ListGroup from './components/ListGroup/ListGroup'

import ListChildren from './components/ListChildren/ListChildren'
import CreateChildren from './components/CreateChildren/CreateChildren'

function App() {
  const [inputValue, setInputValue] = useState("")
  return (
    <>
      <Header setInputValue={setInputValue} inputValue={inputValue}/>
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/group" element={<CreateGroup />} />
          <Route path="/children" element={<CreateChildren />} />
          <Route path="/list-group" element={<ListGroup />} />
          <Route path="/list-children" element={<ListChildren inputValue={inputValue}/>} />
        </Routes>
    </>
  );
}

export default App;
