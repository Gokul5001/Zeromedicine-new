import React from "react";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import AppointmentForm from "./Components/AppointmentForm";
import HowItWorks from "./Components/HowItWorks";
import WhyChooseUs from "./Components/WhyChooseUs";
import Testimonials from "./Components/Testimonial";
import Footer from "./Components/Footer";
import FloatingWhatsApp from "./Components/FloatingWhatsApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PainRelief from "./Components/services/PainRelief";
import FitnessNutrition from "./Components/services/FitnessNutrition";
import LifestyleDiseases from "./Components/services/Lifestyle_diseases";
import SexualWellness from "./Components/services/Sexual_wellness";
import ScrollToTop from "./Components/ScrollToTop"; // ✅ new import
import BMICalculator from "./Components/BMICalculator";


const App = () => {
  const scrollToAppointment = () => {
    document.querySelector("#book-appointment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <ScrollToTop /> {/* ✅ ensures page starts from top when route changes */}

      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 relative overflow-hidden">
        <Header onBookAppointment={scrollToAppointment} />
        <FloatingWhatsApp />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection onBookAppointment={scrollToAppointment} />
                <AppointmentForm />
                <HowItWorks />
                <WhyChooseUs />
                <BMICalculator /> {/* ✅ New Section */}
                <Testimonials />

              </>
            }
          />
          <Route path="/pain-relief" element={<PainRelief scrollToAppointment={scrollToAppointment} />} />
          <Route path="/fitness-nutrition" element={<FitnessNutrition scrollToAppointment={scrollToAppointment} />} />
          <Route path="/life-style-diseases" element={<LifestyleDiseases scrollToAppointment={scrollToAppointment} />} />
          <Route path="/sexual-wellness" element={<SexualWellness scrollToAppointment={scrollToAppointment} />} />
        </Routes>

        <Footer onBookAppointment={scrollToAppointment} />
      </div>
    </Router>
  );
};

export default App;
