import { useEffect } from "react";

export const usePageMeta = ({ title, bodyClass, styleId, styles }) => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousBodyClass = document.body.className;

    document.title = title || "Kesher";
    document.body.className = bodyClass || "bg-background text-on-background";

    if (styleId) {
      let styleEl = document.getElementById(styleId);
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = styles || "";
    }

    return () => {
      document.title = previousTitle;
      document.body.className = previousBodyClass;
      if (styleId) {
        const current = document.getElementById(styleId);
        if (current) current.remove();
      }
    };
  }, [title, bodyClass, styleId, styles]);
};
