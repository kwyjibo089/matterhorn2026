import { useEffect } from "react";
import "./InstagramWidget.css";

export default function InstagramWidget({ feedName = "matterhorn2026" }) {
  useEffect(() => {
    // Load Juicer embed script
    const scriptUrl = `https://www.juicer.io/embed/${feedName}/embed-code.js`;
    
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [feedName]);

  return (
    <section className="fade instagram-widget-wrapper">
      <div className="party-card instagram-widget-container">
        <ul className="juicer-feed" data-feed-id={feedName}></ul>
        <h3>Folgt mir für Updates auf Instagram</h3>
      </div>
    </section>
  );
}
