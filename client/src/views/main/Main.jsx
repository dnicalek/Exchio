import React from 'react'
import './main.css'

export default function Main() {
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
      <section>
        <h1>Witaj na exch.io</h1>
        <p className="lead">Poznaj aktualne kursy walut</p>
      </section>
      <main>
        <article className="about">
          <div className="container">
            <h2>O walutach</h2>
            <p className="abt_mny">Nazwa pieniądza obowiązującego w danym państwie. Nazwę tę stosuje się przede wszystkim w kontekście wymiany międzynarodowej. Waluta jest wtedy środkiem rozliczeniowym (czyli miernikiem wartości) oraz środkiem regulowania płatności (należności i zobowiązań) w transakcjach międzynarodowych. Skrótowe oznaczenie waluty (np. GBP), to ustandaryzowany, trzyliterowy kod przyjęty przez Międzynarodową Organizację Normalizacyjną (ISO). Dwie pierwsze litery oznaczają kraj, w którym dana waluta obowiązuje (np. GB – Great Britain), a trzecia to zazwyczaj inicjał danej waluty (P – Pound).</p>
          </div>
        </article>
        <article className="baner">
          <div className="image-bgr">
            <img src="zdjecia/forex.jpg" alt="" className="image-responsive" />
          </div>
          <script src="js/animated_banner.js"></script>
        </article>
        <article className="contact">
          <div className="container">
            <h2>Kontakt</h2>
            <p className="p_contact">W razie problemu skontaktuj się z nami:</p>
            <ul>
              <li>Telefon: 783 672 892</li>
              <li>E-mail: exchio@exch.com</li>
            </ul>
          </div>
        </article>
      </main>
      <footer>
        <p>&copy; Dominik Nicałek</p>
      </footer>
    </div>
  )
}
