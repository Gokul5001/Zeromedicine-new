import React from "react";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import AppointmentForm from "./Components/AppointmentForm";
import HowItWorks from "./Components/HowItWorks";
import WhyChooseUs from "./Components/WhyChooseUs";
import Testimonials from "./Components/Testimonial";
import Footer from "./Components/Footer";
import FloatingWhatsApp from "./Components/FloatingWhatsApp";

const App = () => {
  const scrollToAppointment = () => {
    document.querySelector("#book-appointment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 font-sans relative overflow-hidden">
      <Header onBookAppointment={scrollToAppointment} />
      <HeroSection onBookAppointment={scrollToAppointment} />
      <AppointmentForm />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Footer onBookAppointment={scrollToAppointment} />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
