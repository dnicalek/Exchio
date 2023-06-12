import React from 'react'
import './main.css'
import './forms.css'

export default function Predictions() {
  return (
    <div>
      <nav>
        <ul className="nav_links">
          <li className="logo">
            <header>
              <a href="/main">Exch.io</a>
            </header>
          </li>
          <li>
            <a href="/main">Strona główna</a>
          </li>
          <li>
            <a href="/kursy">Kursy</a>
          </li>
          <li>
            <a href="/prognozy">Analizy</a>
          </li>
          <li>
            <a className="cta" href="/formularz">Dodaj wpis</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" id="nav_username" aria-current="page"></a>
          </li>
          <li>
            <a href="/auth/logout">Wyloguj się</a>
          </li>
        </ul>
      </nav>
      <main>
        <div className="overlay" id="divOne">
          <div className="wrapper">
            <h2>Edytuj Wpis</h2>
            <a href="#" className="close">&times;</a>
            <div className="content">
              <div className="cont">
                <form id="edit__form" className="form">
                  <div className="form-control">
                    <label htmlFor="username">Tytuł</label>
                    <input type="text" placeholder="Podaj tytuł" id="title" name="title" required />
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <small>Error message</small>
                  </div>
                  <div className="form-control">
                    <label htmlFor="username">Wpis</label>
                    <textarea name="post" id="post" placeholder="Wpisz tekst" required></textarea>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                    <small>Error message</small>
                  </div>
                  <button id="sub" type="submit">Wyślij</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div id="entry-container">
          <div id="entry" className="entry-section"></div>
        </div>
      </main>
      <footer>
        <p>&copy; Dominik Nicałek</p>
      </footer>
    </div>
  )
}
