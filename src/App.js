import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';

import { Route, Routes } from 'react-router-dom';
import SignUp from './screens/SignUp';

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/createuser' element={<SignUp/>} />
    </Routes>
    </>
  );
}

export default App;
