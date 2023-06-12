import React from 'react'
import './forms.css'
import './main.css'

export default function Forms() {
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
        <div className="container-form">
          <div className="header-form">
            <h2>Dodaj wpis</h2>
          </div>
          <form id="form" className="form" action="/user/addPost" method="POST">
            <div id="hidden-form" className="form-control">
              <input type="text" id="user_id" name="user_id" required />
              <input type="text" id="username" name="username" required />
            </div>
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
            <button id="sub">Wyślij</button>
          </form>
        </div>
      </main>
      <footer>
        <p>&copy; Dominik Nicałek</p>
      </footer>
    </div>
  )
}
