import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignIn from './views/signin';
import SignUp from './views/signup';
import Main from './views/main';
import { RequireAuth } from 'react-auth-kit';

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route
        path='/login'
        element={<SignIn />}
        />
        <Route
        path='/register'
        element={<SignUp />}
        />
        <Route
        path='/'
        element={
          <RequireAuth loginPath='/login'>
            <Main />
            </RequireAuth>
        }
        />

    </Routes>
  </BrowserRouter>
  );
}

export default App
