import React from "react";
import "@/App.css";
import "@/i18n";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";

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
import Privacy from "@/pages/Privacy";
import DataPolicy from "@/pages/DataPolicy";
import History from "@/pages/History";
import Investment from "@/pages/Investment";
import Terms from "@/pages/Terms";
import Alumni from "@/pages/Alumni";
import Downloads from "@/pages/Downloads";
import Blog from "@/pages/Blog";
import BlogInfos from "@/pages/BlogInfos";
import ConcoursPromotions from "@/pages/ConcoursPromotions";
import OffresStages from "@/pages/OffresStages";
import OffresEmplois from "@/pages/OffresEmplois";
import GiftCards from "@/pages/GiftCards";
import LanguageEnglish from "@/pages/LanguageEnglish";
import LanguageFrench from "@/pages/LanguageFrench";
import LanguageChinese from "@/pages/LanguageChinese";
import MpkClubs from "@/pages/MpkClubs";
import Cart from "@/pages/Cart";

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
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/a-propos" element={<Layout><About /></Layout>} />
      <Route path="/team" element={<Layout><Team /></Layout>} />
      <Route path="/campus" element={<Layout><Campuses /></Layout>} />
      <Route path="/departements/training-plus" element={<Layout><TrainingPlus /></Layout>} />
      <Route path="/langues/anglais" element={<Layout><LanguageEnglish /></Layout>} />
      <Route path="/langues/francais" element={<Layout><LanguageFrench /></Layout>} />
      <Route path="/langues/chinois" element={<Layout><LanguageChinese /></Layout>} />
      <Route path="/clubs" element={<Layout><MpkClubs /></Layout>} />
      <Route path="/panier" element={<Layout><Cart /></Layout>} />
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
      <Route path="/confidentialite" element={<Layout><Privacy /></Layout>} />
      <Route path="/traitement-donnees" element={<Layout><DataPolicy /></Layout>} />
      <Route path="/notre-histoire" element={<Layout><History /></Layout>} />
      <Route path="/appel-a-investissement" element={<Layout><Investment /></Layout>} />
      <Route path="/conditions-utilisation" element={<Layout><Terms /></Layout>} />
      <Route path="/alumnis" element={<Layout><Alumni /></Layout>} />
      <Route path="/telechargements" element={<Layout><Downloads /></Layout>} />
      <Route path="/blog" element={<Layout><Blog /></Layout>} />
      <Route path="/blog-infos" element={<Layout><BlogInfos /></Layout>} />
      <Route path="/concours-promotions" element={<Layout><ConcoursPromotions /></Layout>} />
      <Route path="/travailler-mpk/stages" element={<Layout><OffresStages /></Layout>} />
      <Route path="/travailler-mpk/emplois" element={<Layout><OffresEmplois /></Layout>} />
      <Route path="/cartes-cadeaux" element={<Layout><GiftCards /></Layout>} />
      <Route path="/connexion" element={<Layout><Login /></Layout>} />
      <Route path="/inscription" element={<Layout><Register /></Layout>} />
      <Route path="/espace-apprenant" element={<Protected><Layout><Dashboard /></Layout></Protected>} />
      <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </>
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
