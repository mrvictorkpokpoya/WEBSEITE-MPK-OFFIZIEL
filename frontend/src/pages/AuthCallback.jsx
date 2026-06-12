import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AuthCallback() {
  const nav = useNavigate();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;
    const hash = window.location.hash || "";
    const m = hash.match(/session_id=([^&]+)/);
    if (!m) { nav("/connexion"); return; }
    const session_id = m[1];
    axios.post(`${API}/auth/google/session`, { session_id })
      .then(() => {
        // clean hash and go to dashboard
        window.history.replaceState(null, "", window.location.pathname);
        nav("/espace-apprenant", { replace: true });
      })
      .catch(() => nav("/connexion"));
  }, [nav]);

  return <div className="min-h-screen grid place-items-center text-[#580505]">Authentification…</div>;
}
