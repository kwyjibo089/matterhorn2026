import { useEffect } from "react";

export default function InstagramWidget({ provider = "elfsight", elfsightId = "389467e8-b2c0-43f4-bab2-ee6390b1ffd8", widgetHtml = null }) {
  useEffect(() => {
    if (provider === "elfsight") {
      if (!document.querySelector('script[src="https://apps.elfsight.com/p/platform.js"]')) {
        const s = document.createElement("script");
        s.src = "https://apps.elfsight.com/p/platform.js";
        s.async = true;
        document.body.appendChild(s);
      }
    } else if (widgetHtml) {
      const root = document.getElementById("instagram-widget-root");
      if (root) root.innerHTML = widgetHtml;
    }
  }, [provider, elfsightId, widgetHtml]);

  return (
    <section className="fade">
      <div id="instagram-widget-root">
        {provider === "elfsight" ? (
          <div className={`elfsight-app-${elfsightId}`} />
        ) : widgetHtml ? (
          <div dangerouslySetInnerHTML={{ __html: widgetHtml }} />
        ) : (
          <p>Replace the provider ID or pass `widgetHtml`.</p>
        )}
      </div>
    </section>
  );
}
