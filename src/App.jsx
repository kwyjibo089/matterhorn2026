import { useEffect, useState } from "react";
import "./parallax.css";
import InstagramWidget from "./components/InstagramWidget";

export default function App() {

  useEffect(() => {
    const img = document.getElementById("parallax-img");
    if (!img) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      img.style.transform =
        `translateX(-50%) translateY(${scrolled * 0.25}px)`;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = import.meta.env.BASE_URL;

  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => {
    try {
      return localStorage.getItem('analytics_optout') !== '1';
    } catch (e) {
      return true;
    }
  });

  const openModal = (src) => {
    setModalSrc(src);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setModalSrc("");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && showModal) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  // Fire a Plausible pageview if the script was loaded
  useEffect(() => {
    try {
      if (!analyticsEnabled) return;
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('pageview');
      }
    } catch (e) {
      // silent
    }
  }, []);

  // Load Plausible dynamically (used when user enables analytics at runtime)
  const loadPlausible = () => {
    try {
      if (typeof document === 'undefined') return;
      var domain = document.querySelector('meta[name="plausible-domain"]')?.content || '';
      if (!domain) return;
      var host = location.hostname;
      if (host === 'localhost' || host === '127.0.0.1') return;
      // Avoid double-insert
      if (document.querySelector('script[data-domain][src*="plausible.io/js/plausible.js"]')) return;
      var s = document.createElement('script');
      s.setAttribute('defer','');
      s.setAttribute('async','');
      s.setAttribute('data-domain', domain);
      s.src = 'https://plausible.io/js/plausible.js';
      document.head.appendChild(s);
    } catch (e) { /* silent */ }
  };

  const toggleAnalytics = () => {
    try {
      const enable = !analyticsEnabled;
      setAnalyticsEnabled(enable);
      localStorage.setItem('analytics_optout', enable ? '0' : '1');
      if (enable) {
        // Load script and fire pageview when ready
        loadPlausible();
        setTimeout(() => { try { if (window.plausible) window.plausible('pageview'); } catch(e){} }, 600);
      } else {
        // Disable future calls: replace plausible with noop
        try { window.plausible = function(){}; } catch(e){}
      }
    } catch (e) {}
  };

  return (
    <>
      {/* HERO */}
      <header className="hero">
        <img
          src={`${base}hero.jpg`}
          id="parallax-img"
          className="hero-img"
          alt="Matterhorn Hero"
        />

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

            <img
              src={`${base}QR.png`}
              className="qr-img"
              alt="TWINT QR Code"
              role="button"
              aria-label="Enlarge QR code"
              onClick={() => openModal(`${base}QR.png`)}
            />
          </div>
        </section>

        <section className="fade">
          <h2>Geburtstagsfeier</h2>

          <div className="party-card">
            <div className="party-date">
              <div className="party-day">6</div>
              <div className="party-month">Feb 2026</div>
              <div className="party-time">18:00</div>
            </div>

            <div className="party-info">
              <p className="party-venue"><strong>Alte Schule</strong><br/>Alte Landstrasse 26, 8810 Horgen</p>
              <p className="party-text">Ich freue mich!</p>

              <div className="party-actions">
                <a
                  className="btn btn-primary"
                  href="https://www.google.com/maps/search/?api=1&query=Alte+Schule+Alte+Landstrasse+26+8810+Horgen"
                  target="_blank"
                  rel="noopener noreferrer"
                >Anfahrt (Google Maps)
                </a>
              </div>
            </div>
          </div>
        </section>

        <InstagramWidget elfsightId="389467e8-b2c0-43f4-bab2-ee6390b1ffd8" />      

        <footer>
          Roman · Matterhorn Projekt 2026
          <div className="analytics-toggle">
            <label>
              <input type="checkbox" checked={analyticsEnabled} onChange={toggleAnalytics} />{' '}
              Analytics {analyticsEnabled ? 'on' : 'off'}
            </label>
          </div>
        </footer>

      </main>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
            <img src={modalSrc} className="modal-img" alt="Enlarged QR code" />
          </div>
        </div>
      )}
    </>
  );
}
