import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './styles/App.css'
import Main from './components/Main'
import Edit from './components/Edit';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route path="/edit/:id" element={<Edit/>}></Route>
      </Routes>
    </Router>
  );
}

export default App
