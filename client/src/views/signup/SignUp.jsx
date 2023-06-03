import React from 'react'
import './signUp.css'
import { FaExclamationCircle, FaEye } from 'react-icons/fa';


export default function SignUp() {
  return (
    <div className="container">
      <header>Zarejestruj się</header>
      <form className="form" id="form">
        <div className="field name-field">
            <div className="input-field">
              <input type="name" 
              name="name" 
              placeholder="Podaj nazwe" 
              className="name" required/>
            </div>
            <span className="error name-error">
              <i className="error-icon"><FaExclamationCircle style={{marginTop: 5}} color='grey'/></i>
              <p className="error-text">Podaj prawidłową nazwę</p>
            </span>
          </div>
        <div className="field email-field">
          <div className="input-field">
            <input name="email" 
            type="email" 
            placeholder="Podaj email" 
            className="email" required />
          </div>
          <span className="error email-error">
          <i className="error-icon"><FaExclamationCircle style={{marginTop: 5}} color='grey'/></i>
            <p className="error-text">Podaj prawidłowy email</p>
          </span>
        </div>
        <div className="field create-password">
          <div className="input-field">
            <input
              type="password"
              placeholder="Podaj hasło"
              className="password"
              name="password"
              required
            />
            <i className="show-hide"><FaEye/></i>
          </div>
          <span className="error password-error">
          <i className="error-icon"><FaExclamationCircle style={{marginTop: 5}} color='grey'/></i>
            <p className="error-text">
              Wpisz hasło o długości 8 znaków z cyframi, znakami, małą i dużą literą.
            </p>
          </span>
        </div>
        <div className="field confirm-password">
          <div className="input-field">
            <input
              type="password"
              placeholder="Potwierdź hasło"
              className="cPassword"
              name="passwordConfirm"
              required
            />
            <i className="show-hide"><FaEye/></i>
          </div>
          <span className="error cPassword-error">
          <i className="error-icon"><FaExclamationCircle style={{marginTop: 5}} color='grey'/></i>
            <p className="error-text">Hasła nie są jednakowe</p>
          </span>
        </div>
        <div className="input-field button">
          <input type="submit" value="Zarejestruj się" />
        </div>
      </form>
    </div>
  )
}
