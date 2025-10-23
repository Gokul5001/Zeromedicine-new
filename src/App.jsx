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

const App = () => {
  const scrollToAppointment = () => {
    document.querySelector("#book-appointment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 relative overflow-hidden">
        {/* Header and WhatsApp should always be visible */}
        <Header onBookAppointment={scrollToAppointment} />
        <FloatingWhatsApp />

        {/* Routes */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection onBookAppointment={scrollToAppointment} />
                <AppointmentForm />
                <HowItWorks />
                <WhyChooseUs />
                <Testimonials />
              </>
            }
          />

          {/* Services Pages */}
          <Route path="/pain-relief" element={<PainRelief scrollToAppointment={scrollToAppointment} />} />
          <Route path="/fitness-nutrition" element={<FitnessNutrition scrollToAppointment={scrollToAppointment}  />} />
          <Route path="/life-style-diseases" element={<LifestyleDiseases scrollToAppointment={scrollToAppointment}  />} />
          <Route path="/sexual-wellness" element={<SexualWellness scrollToAppointment={scrollToAppointment}  />} />
        </Routes>

        {/* Footer visible on all pages */}
        <Footer onBookAppointment={scrollToAppointment} />
      </div>
    </Router>
  );
};

export default App;
