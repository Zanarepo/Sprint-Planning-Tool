// src/utils/tracking.js
export const trackGA = (event, params) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
};

export const trackFB = (event, params) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
};
