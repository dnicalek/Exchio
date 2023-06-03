import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignIn from './views/signin';
import SignUp from './views/signup';


function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route
        path='/login'
        element={<SignIn />}
        />
        <Route
        path='/registration'
        element={<SignUp />}
        />
    </Routes>
  </BrowserRouter>
  );
}

export default App
