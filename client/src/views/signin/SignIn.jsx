import React from 'react'
import './signIn.css'
import { FaLock, FaEnvelope } from 'react-icons/fa';


export default function SignIn() {

  return (
    <div className="wrapper">
        <header>Exch.io</header>
        <form action="/auth/login" className="form" id="login" method="POST">
            <div className="field email">
                <div className="input-area">
                    <input type="email" 
                    id="email" 
                    name="email" 
                    className="form__input" 
                    placeholder="Email" required />
                    <i className='icon'><FaEnvelope style={{marginTop: 5}} color='grey'/></i>
                    <i className="error error-icon fas fa-exclamation-circle"></i>
                </div>
            </div>
            <div className="field pass">
                <div className="input-area" >
                    <input id="password" 
                    type="password" 
                    className="form__input form-control" 
                    name="password"
                    placeholder="Hasło" required />
                   <i className='icon'><FaLock style={{marginTop: 5}} color='grey'/></i>
                    <i className="error error-icon fas fa-exclamation-circle"></i>
                </div>
                <div className="error error-txt">Email lub hasło są niepoprawne</div>
            </div>

            <input type="submit" value="Login" />
        </form>
        <div 
        className="sign-txt"
        >Nie jesteś jeszcze zarejestrowany? 
        <a href='/registration'>Zarejestruj się teraz</a></div>
    </div>
  )
}
