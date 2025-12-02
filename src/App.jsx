import { useEffect } from "react";
import "./parallax.css";

export default function App() {

  useEffect(() => {
    const img = document.getElementById("parallax-img");

    const onScroll = () => {
      const scrolled = window.scrollY;
      img.style.transform =
        `translateX(-50%) translateY(${scrolled * 0.25}px)`;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HERO */}
      <header className="hero">
        <img src={`${import.meta.env.BASE_URL}hero.jpg`} className="hero-img" />
        
        <div className="overlay">
          <h1 className="title">Matterhorn 2026</h1>
          <p className="subtitle">Mein persönliches Gipfelprojekt</p>
        </div>
      </header>

      {/* CONTENT */}
      <main className="content">

        <section className="fade">
          <h2>Warum ich das mache</h2>
          <p>
            Das Matterhorn ist für mich nicht einfach ein Berg –
            es ist ein lang gehegter Traum. 2026 stelle ich mich
            dieser Herausforderung: Höhe, Technik, Ausdauer und
            mentale Stärke.
          </p>
        </section>

        <section className="fade">
          <h2>Das Projekt</h2>

          <ul className="project-list">
            <li><span className="icon">🏔️</span><b>Berg:</b> Matterhorn (4'478 m)</li>
            <li><span className="icon">📍</span><b>Route:</b> Hörnligrat</li>
            <li><span className="icon">🕒</span><b>Zeit:</b> Sommer 2026</li>
            <li><span className="icon">🧗</span><b>Art:</b> Geführte Besteigung</li>
          </ul>
        </section>

        <section className="fade">
          <h2>Kosten</h2>
          <table>
            <tbody>
              <tr><td>Bergführer</td><td>CHF 1’500</td></tr>
              <tr><td>Hütten / Logistik</td><td>CHF 500</td></tr>
              <tr><td>Material</td><td>CHF 300</td></tr>
              <tr><td><b>Total</b></td><td><b>CHF 2’300</b></td></tr>
            </tbody>
          </table>
        </section>

        <section className="fade">
          <h2>Statt Geschenke → Spende</h2>
          <p>Unterstütze meinen Traum:</p>

          <div className="twint-box">
            <div className="pay-lines">
              <p className="pay-line"><b>TWINT</b> 📲 078 623 04 01</p>
              <p className="pay-line"><b>IBAN</b> CH37 0878 1000 1630 0050 0</p>
            </div>
            <img src={`${import.meta.env.BASE_URL}QR.png`} className="qr-img" />
          </div>
        </section>

        <section className="fade">
          <h2>Was passiert mit Restgeld?</h2>
          <p>
            Der Restbetrag wird an den Schweizer Alpen-Club (SAC)
            gespendet.
          </p>
        </section>

        <footer>
          Roman · Matterhorn Projekt 2026
        </footer>

      </main>
    </>
  );
}
