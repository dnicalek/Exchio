import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignIn from './views/signin';
import SignUp from './views/signup';
import Main from './views/main';
import Forms from './views/forms';
import Predictions from './views/predictions';

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route
        path='/login'
        element={<SignIn />}
        />
        <Route
        path='/registration'S
        element={<SignUp />}
        />
        <Route
        path='/main'
        element={<Main />}
        />
        <Route
        path='/forms'
        element={<Forms />}
        />
         <Route
        path='/predictions'
        element={<PredictionsS />}
        />
    </Routes>
  </BrowserRouter>
  );
}

export default App
