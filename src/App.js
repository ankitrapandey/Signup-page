import logo from './logo.svg';
import './App.css';
import {  Link, Route, Routes } from 'react-router-dom'
import SignUp from './Component/SignUp';
import LoginPage from './Component/LoginPage';
import ForgetPassword from './Component/ForgetPassword';
function App() {
  return (
    <div>
       <ul style={{display:'flex', justifyContent:'space-evenly'}}>
      <li > <Link to='/loginpage'>LOGINPAGE</Link></li>
        <li> <Link to='/signpage'>SIGNUP</Link></li>
        <li><Link to='/forgetpassword'>ForgetPassword</Link></li>
        </ul>
  
        <Routes>
          <Route path='/loginpage' element={<LoginPage/>}/>
          <Route path='/signpage' element={<SignUp/>}/>
         <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        </Routes>
    </div>
  );
}

export default App;
