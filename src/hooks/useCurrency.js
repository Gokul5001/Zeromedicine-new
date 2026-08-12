  // // src/hooks/useCurrency.js
  // // Detects country via YOUR OWN backend proxy — never blocked by ad/tracking blockers.
  // // Fallback chain: /api/geo → cloudflare trace (plain text, never blocked) → INR default

  // import { useState, useEffect } from "react";

  // const CURRENCY_MAP = {
  //   IN: { code: "INR", symbol: "₹", rate: 1,     locale: "en-IN" },
  //   US: { code: "USD", symbol: "$", rate: 0.012, locale: "en-US" },
  // };

  // // Every country other than India shows USD
  // const USD = CURRENCY_MAP["US"];

  // const DEFAULT = USD; // non-IN countries → USD
  // const CACHE_KEY = "zm_user_country";

  // // ── 3-step detection chain ────────────────────────────────────────────────────

  // // Step 1: Your own backend proxy (reads CF-IPCountry / x-vercel-ip-country header)
  // // → Never blocked because it's your own domain. Add the route below to your Express app.
  // async function tryOwnBackend(BASE) {
  //   const res = await fetch(`${BASE}/api/geo`, { signal: AbortSignal.timeout(3000) });
  //   if (!res.ok) throw new Error("own backend geo failed");
  //   const data = await res.json();
  //   if (!data.country) throw new Error("no country in response");
  //   return data.country.toUpperCase();
  // }

  // // Step 2: Cloudflare's public trace endpoint — plain text, never flagged as a tracker
  // // Returns lines like: loc=IN
  // async function tryCloudflare() {
  //   const res = await fetch("https://cloudflare.com/cdn-cgi/trace", { signal: AbortSignal.timeout(3000) });
  //   if (!res.ok) throw new Error("CF trace failed");
  //   const text = await res.text();
  //   const match = text.match(/^loc=([A-Z]{2})$/m);
  //   if (!match) throw new Error("loc not found in CF trace");
  //   return match[1];
  // }

  // // ── Main hook ─────────────────────────────────────────────────────────────────
  // export function useCurrency() {
  //   const [currency, setCurrency]     = useState(DEFAULT);
  //   const [countryCode, setCountryCode] = useState("IN");
  //   const [loading, setLoading]       = useState(true);

  //   useEffect(() => {
  //     let cancelled = false;
  //     const BASE = import.meta.env.VITE_BACKEND_URL || "";

  //     async function detect() {
  //       // Serve from cache first
  //       const cached = sessionStorage.getItem(CACHE_KEY);
  //       if (cached) {
  //         const cc = cached.toUpperCase();
  //         if (!cancelled) {
  //           setCountryCode(cc);
  //           setCurrency(cc === "IN" ? CURRENCY_MAP["IN"] : USD);
  //           setLoading(false);
  //         }
  //         return;
  //       }

  //       let cc = null;

  //       // Step 1: own backend (best — uses request headers, zero external calls)
  //       try { cc = await tryOwnBackend(BASE); } catch (_) {}

  //       // Step 2: Cloudflare trace (fallback — never blocked by ad blockers)
  //       if (!cc) {
  //         try { cc = await tryCloudflare(); } catch (_) {}
  //       }

  //       // Step 3: silent fallback to IN
  //       if (!cc) cc = "IN";

  //       if (!cancelled) {
  //         sessionStorage.setItem(CACHE_KEY, cc);
  //         setCountryCode(cc);
  //         // India → INR, everywhere else → USD
  //         setCurrency(cc === "IN" ? CURRENCY_MAP["IN"] : USD);
  //         setLoading(false);
  //       }
  //     }

  //     detect();
  //     return () => { cancelled = true; };
  //   }, []);

  //   function formatFee(inrAmount) {
  //     if (!inrAmount && inrAmount !== 0) return "—";
  //     const converted = Math.round(Number(inrAmount) * currency.rate);
  //     try {
  //       return new Intl.NumberFormat(currency.locale, {
  //         style: "currency",
  //         currency: currency.code,
  //         maximumFractionDigits: 0,
  //         minimumFractionDigits: 0,
  //       }).format(converted);
  //     } catch {
  //       return `${currency.symbol}${converted}`;
  //     }
  //   }

  //   return { currency, countryCode, loading, formatFee };
  // }

  // src/hooks/useCurrency.js
  // Detects country via YOUR OWN backend proxy, then Cloudflare trace fallback.
  // Returns: currency, countryCode, loading, formatFee, formatPackagePrice

  import { useState, useEffect } from "react";

  // ── Currency definitions ───────────────────────────────────────────────────────
  // rate: multiplier applied to INR values by formatFee()
  // For USD: rate=1 because single_session_price_usd is ALREADY stored in USD,
  //          not converted from INR. So formatFee just formats the number as $.
  // For INR: rate=1 (no conversion needed).
  const CURRENCY_MAP = {
    IN: { code: "INR", symbol: "₹", rate: 1, locale: "en-IN" },
    US: { code: "USD", symbol: "$", rate: 1, locale: "en-US" },
  };

  const USD     = CURRENCY_MAP["US"];
  const DEFAULT = CURRENCY_MAP["IN"];  // was: CURRENCY_MAP["US"]
  const CACHE_KEY = "zm_user_country";

  // ── Detection helpers ─────────────────────────────────────────────────────────

  async function tryOwnBackend(BASE) {
    const res = await fetch(`${BASE}/api/geo`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error("own backend geo failed");
    const data = await res.json();
    if (!data.country) throw new Error("no country in response");
    return data.country.toUpperCase();
  }

  async function tryCloudflare() {
    const res = await fetch("https://cloudflare.com/cdn-cgi/trace", {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error("CF trace failed");
    const text  = await res.text();
    const match = text.match(/^loc=([A-Z]{2})$/m);
    if (!match) throw new Error("loc not found in CF trace");
    return match[1];
  }

  // ── Main hook ─────────────────────────────────────────────────────────────────
  export function useCurrency() {
    const [currency,    setCurrency]    = useState(DEFAULT);
    const [countryCode, setCountryCode] = useState("IN");
    const [loading,     setLoading]     = useState(true);

    // useEffect(() => {
    //   let cancelled = false;
    //   const BASE = import.meta.env.VITE_BACKEND_URL || "";

    //   async function detect() {
    //     // Serve from session cache first (avoids repeated geo calls on navigation)
    //     const cached = sessionStorage.getItem(CACHE_KEY);
    //     if (cached) {
    //       const cc = cached.toUpperCase();
    //       if (!cancelled) {
    //         setCountryCode(cc);
    //         setCurrency(CURRENCY_MAP[cc] || USD);
    //         setLoading(false);
    //       }
    //       return;
    //     }

    //     let cc = null;

    //     // Step 1: own backend (reads CF-IPCountry / x-vercel-ip-country header)
    //     try { cc = await tryOwnBackend(BASE); } catch (_) {}

    //     // Step 2: Cloudflare trace (never blocked by ad blockers)
    //     if (!cc) {
    //       try { cc = await tryCloudflare(); } catch (_) {}
    //     }

    //     // Step 3: silent fallback to IN
    //     if (!cc) cc = "IN";

    //     if (!cancelled) {
    //       sessionStorage.setItem(CACHE_KEY, cc);
    //       setCountryCode(cc);
    //       setCurrency(CURRENCY_MAP[cc] || USD);
    //       setLoading(false);
    //     }
    //   }

    //   detect();
    //   return () => { cancelled = true; };
    // }, []);


    useEffect(() => {
      let cancelled = false;
      const BASE = import.meta.env.VITE_BACKEND_URL || "";
    
      async function detect() {
        if (cancelled) return;
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const cc = cached.toUpperCase();
          if (!cancelled) {
            setCountryCode(cc);
            setCurrency(CURRENCY_MAP[cc] || USD);
            setLoading(false);
          }
          return;
        }
    
        let cc = null;
        try { cc = await tryOwnBackend(BASE); } catch (_) {}
        if (!cc) {
          try { cc = await tryCloudflare(); } catch (_) {}
        }
        if (!cc) cc = "IN";
    
        if (!cancelled) {
          sessionStorage.setItem(CACHE_KEY, cc);
          setCountryCode(cc);
          setCurrency(CURRENCY_MAP[cc] || USD);
          setLoading(false);
        }
      }
    
      // Wait for the full page load event, THEN idle, THEN a short delay.
      // This guarantees hero image / doctors-list requests get the connection
      // pool to srv1090011.hstgr.cloud before /api/geo competes for it.
      let timerId, idleId;
      function runAfterLoad() {
        if ('requestIdleCallback' in window) {
          idleId = requestIdleCallback(() => {
            timerId = setTimeout(detect, 800);
          }, { timeout: 3000 });
        } else {
          timerId = setTimeout(detect, 1500);
        }
      }
    
      if (document.readyState === "complete") {
        runAfterLoad();
      } else {
        window.addEventListener("load", runAfterLoad, { once: true });
      }
    
      return () => {
        cancelled = true;
        window.removeEventListener("load", runAfterLoad);
        if (idleId && 'cancelIdleCallback' in window) cancelIdleCallback(idleId);
        if (timerId) clearTimeout(timerId);
      };
    }, []);

    // ── formatFee ────────────────────────────────────────────────────────────────
    // Formats a fee that is ALREADY in the target currency.
    // For INR users  → amount is in INR  (single_session_price)
    // For non-IN users → amount is in USD (single_session_price_usd)
    // rate=1 for both, so this just formats with the correct symbol/locale.
    function formatFee(amount) {
      if (amount === null || amount === undefined || amount === "") return "—";
      const num = Number(amount);
      if (isNaN(num)) return "—";
      const converted = Math.round(num * currency.rate);
      try {
        return new Intl.NumberFormat(currency.locale, {
          style:                 "currency",
          currency:              currency.code,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(converted);
      } catch {
        return `${currency.symbol}${converted}`;
      }
    }

    // ── formatPackagePrice ────────────────────────────────────────────────────────
    // Formats a package per-session price.
    // `amount` is ALREADY in the target currency (INR for IN users, USD for others).
    // `curr` defaults to the detected currency but can be overridden.
    function formatPackagePrice(amount, curr) {
      if (amount === null || amount === undefined || amount === "") return "—";
      const num = Number(amount);
      if (isNaN(num)) return "—";
      const c = curr || currency;
      try {
        return new Intl.NumberFormat(c.locale, {
          style:                 "currency",
          currency:              c.code,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(Math.round(num));
      } catch {
        return `${c.symbol}${Math.round(num)}`;
      }
    }

    return { currency, countryCode, loading, formatFee, formatPackagePrice };
  }