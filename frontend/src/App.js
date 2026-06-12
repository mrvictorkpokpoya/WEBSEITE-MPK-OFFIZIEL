import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Campuses from "@/pages/Campuses";
import TrainingPlus from "@/pages/TrainingPlus";
import ExamPrep from "@/pages/ExamPrep";
import TranslationPro from "@/pages/TranslationPro";
import ConsultingPro from "@/pages/ConsultingPro";
import TourismProgramm from "@/pages/TourismProgramm";
import ExtraServices from "@/pages/ExtraServices";
import OnlineCourses from "@/pages/OnlineCourses";
import Gallery from "@/pages/Gallery";
import Testimonials from "@/pages/Testimonials";
import News from "@/pages/News";
import Social from "@/pages/Social";
import Contact from "@/pages/Contact";
import Shop from "@/pages/Shop";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import AuthCallback from "@/pages/AuthCallback";
import PaymentSuccess from "@/pages/PaymentSuccess";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen grid place-items-center text-[#580505]">Chargement…</div>;
  if (!user) return <Navigate to="/connexion" replace />;
  return children;
}

function AppRouter() {
  const loc = useLocation();
  if (typeof window !== "undefined" && window.location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/a-propos" element={<Layout><About /></Layout>} />
      <Route path="/team" element={<Layout><Team /></Layout>} />
      <Route path="/campus" element={<Layout><Campuses /></Layout>} />
      <Route path="/departements/training-plus" element={<Layout><TrainingPlus /></Layout>} />
      <Route path="/departements/exam-prep" element={<Layout><ExamPrep /></Layout>} />
      <Route path="/departements/translation-pro" element={<Layout><TranslationPro /></Layout>} />
      <Route path="/departements/consulting-pro" element={<Layout><ConsultingPro /></Layout>} />
      <Route path="/departements/tourism" element={<Layout><TourismProgramm /></Layout>} />
      <Route path="/departements/extra-services" element={<Layout><ExtraServices /></Layout>} />
      <Route path="/cours-en-ligne" element={<Layout><OnlineCourses /></Layout>} />
      <Route path="/galerie" element={<Layout><Gallery /></Layout>} />
      <Route path="/temoignages" element={<Layout><Testimonials /></Layout>} />
      <Route path="/actualites" element={<Layout><News /></Layout>} />
      <Route path="/reseaux" element={<Layout><Social /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/boutique" element={<Layout><Shop /></Layout>} />
      <Route path="/payment/success" element={<Layout><PaymentSuccess /></Layout>} />
      <Route path="/connexion" element={<Layout><Login /></Layout>} />
      <Route path="/inscription" element={<Layout><Register /></Layout>} />
      <Route path="/espace-apprenant" element={<Protected><Layout><Dashboard /></Layout></Protected>} />
      <Route path="*" element={<Layout><Home /></Layout>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
