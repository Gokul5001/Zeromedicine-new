//   import React from "react";
//   import { lazy } from "react";

//   import Header from "./Components/Header";
//   import HeroSection from "./Components/HeroSection";
//   import HowItWorks from "./Components/HowItWorks";
//   import WhyChooseUs from "./Components/WhyChooseUs";
//   import Testimonials from "./Components/Testimonial";
//   import Footer from "./Components/Footer";
//   import FloatingWhatsApp from "./Components/FloatingWhatsApp";
//   import FounderReelSection from "./Components/FounderReelSection";
//   import BMICalculator from "./Components/BMICalculator";
//   import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
//   import OurServices from "./Components/OurServices";


//   // import PainRelief from "./Components/services/PainRelief";
//   // import FitnessNutrition from "./Components/services/FitnessNutrition";
//   // import LifestyleDiseases from "./Components/services/Lifestyle_diseases";
//   // import SexualWellness from "./Components/services/Sexual_wellness";

//   const PainRelief = lazy(() => import("./Components/services/PainRelief"));
// const FitnessNutrition = lazy(() => import("./Components/services/FitnessNutrition"));
// const LifestyleDiseases = lazy(() => import("./Components/services/Lifestyle_diseases"));
// const SexualWellness = lazy(() => import("./Components/services/Sexual_wellness"));


//   import ScrollToTop from "./Components/ScrollToTop";
//   // import PrivacyPolicy from "./Components/PrivacyPolicy";
//   // import TermsOfService from "./Components/TermsOfService";
//   // import CodeOfConduct from "./Components/CodeOfConduct";
//   // import FAQ from "./Components/FAQ";
//   const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
//   const FAQ = lazy(() => import("./Components/FAQ"));
//   const CodeOfConduct = lazy(() => import("./Components/CodeOfConduct"));
//   const TermsOfService = lazy(() => import("./Components/TermsOfService"));

//   import Appointment from "./Components/AppointmentForm"; 

//   import PatientsList from "./Components/PatientsList";

//   import PatientView from "./PatientView"
//   // import PatientsListnew from "./Components/PatientListpart2"

//   // import Login from './components/Login';
//   // Video Consultation Components
//   import PatientConsult from "./Components/PatientConsult";

//   import DoctorJoin from "./Components/DoctorJoin";

//   // import Payments from "../src/Components/Payments"
//   // import ViewSessions from "./Components/ViewSessions";

//   import ConcernForm from "./Components/ConcernForm"
//   // import SuperAdminLoginnew from "./Components/SuperAdminLoginnew"
//   // import SuperAdminDashboard from "./Components/SuperAdminDashboard"
//   import RescheduleRequestPage from "./Components/RescheduleRequest"

//   import RescheduleReview from "./Components/RescheduleConfirm"
//   import SalesLogin from "./Components/SalesLogin"
//   import CalendarPage from "./Components/CalendarPage";
//   import ClinicRegistration from "./Components/ClinicRequest"
//   import ClinicRegistrationDashboard from "./Components/ClinicRegistrationDashboard"
//   // import CalendarPageSuperAdmin from "./Components/Calendarsuperadmin";
//   import ClinicLogin from "./Components/ClinicLogin"
//   import ClinicRegister from "./Components/ClinicRegister"
//   import ClinicDashboard from "./Components/ClinicDashboard"
//   import ClinicRegistrationWithSignature from "./Components/ClinicRegistrationWithSignature"
//   import AddPatient from "./components/AddPatient";
//   import ClinicAppointments from "./components/ClinicAppointments";
//   import ClinicCalendarPage from "./Components/ClinicCalendarPage";
//   import TransferConfirm from "./Components/TransferConfirm"; // <-- new
//   import TransferConfirm_clinic from "./Components/TransferConfirmClinic"; // <-- new
//   import Clinics from "./Components/Clinics"; // <-- new
//   import OurClinics from "./Components/OurClinics"; // <-- new


// // import BackPain from "./Components/BackPain"
// // import NeckPain from "./Components/NeckPain"
// // import KneePain from "./Components/KneePain"
// // import ShoulderPain from "./Components/ShoulderPain"
// // import SportsInjury from "./Components/SportsInjury"
// // import ElbowPain from "./Components/ElbowPain"
// // import NeurologicalConditions from "./Components/NeurologicalConditions"

// const BackPain = lazy(() => import("./Components/BackPain"));
// const NeckPain = lazy(() => import("./Components/NeckPain"));
// const KneePain = lazy(() => import("./Components/KneePain"));
// const ShoulderPain = lazy(() => import("./Components/ShoulderPain"));
// const SportsInjury = lazy(() => import("./Components/SportsInjury"));
// const ElbowPain = lazy(() => import("./Components/ElbowPain"));
// const NeurologicalConditions = lazy(() => import("./Components/NeurologicalConditions"));


// import Blogs from "./Components/Blogs";
// import BlogDetail from "./Components/BlogDetail";
// import AdminAddBlog from "./Components/AdminAddBlog";
// import DoctorProfile from "./Components/DoctorProfile";
// import DeleteAccount from "./Components/DeleteAccount";
// import DoctorScroll from "./Components/DoctorScroll";
// import FacebookReel from "./Components/FacebookReel";
// import FCMTokenPage from "./Components/FCMTokenPage";
// import OplivaAppointments from "./Components/Opliva/OplivaAppointments";
// import OplivaPayments from "./Components/OplivaPayments";
// import OplivaSessions from "./Components/OplivaSessions";
// import Aboutus from "./Components/About_Zeromedixine";
// import { Suspense } from "react";

// /* ------------------------------------
//    Layout Wrapper (IMPORTANT)
// ------------------------------------ */
// function Layout({ children }) {
//   const location = useLocation();

//   // ❌ Routes where Header & Footer should NOT appear
//   const hideHeaderFooterRoutes = [
//     "/consult/",
//     "/doctor/join/"
//   ];

//   const shouldHideLayout = hideHeaderFooterRoutes.some((path) =>
//     location.pathname.startsWith(path)
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 relative overflow-hidden">
//       {!shouldHideLayout && <Header />}
//       {!shouldHideLayout && <FloatingWhatsApp />}

//       {children}

//       {!shouldHideLayout && <Footer />}
//     </div>
//   );
// }


//   const App = () => {
//     return (
//       <Router>
//         <ScrollToTop />
//         <Layout>
//           <Routes>
//             {/* 🏠 Home Page */}
//             <Route
//               path="/"
//               element={
//                 <>
//                   <HeroSection />
//                   <OurServices />
//                   <DoctorScroll />   {/* 👈 NEW SECTION */}

//                   <FounderReelSection />

//                   <HowItWorks />
//                   <WhyChooseUs />
//                   <BMICalculator />
//                   <OurClinics />
//                   <Testimonials />
//                 </>
//               }
//             />
//             {/* 🩺 Appointment Page */}
//             <Route path="/bmi_calculator" element={<BMICalculator />} />
//             <Route path="/about-us" element={<Aboutus />} />

//             <Route path="/book-appointment" element={<Appointment />} />

//             {/* <Route path="/pain-relief" element={<PainRelief />} />
//             <Route path="/fitness-nutrition" element={<FitnessNutrition />} />
//             <Route path="/life-style-diseases" element={<LifestyleDiseases />} />
//             <Route path="/sexual-wellness" element={<SexualWellness />} /> */}


// <Route
//   path="/pain-relief"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <PainRelief />
//     </Suspense>
//   }
// />

// <Route
//   path="/fitness-nutrition"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <FitnessNutrition />
//     </Suspense>
//   }
// />

// <Route
//   path="/life-style-diseases"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <LifestyleDiseases />
//     </Suspense>
//   }
// />

// <Route
//   path="/sexual-wellness"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <SexualWellness />
//     </Suspense>
//   }
// />


//             {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
//             {/* <Route path="/terms_of_service" element={<TermsOfService />} /> */}
//             {/* <Route path="/code_of_conduct" element={<CodeOfConduct />} /> */}
//             <Route
//   path="/privacy-policy"
//   element={
//     <Suspense fallback={<div className="text-center py-10"></div>}>
//       <PrivacyPolicy />
//     </Suspense>
//   }
// />
//             <Route
//   path="/terms_of_service"
//   element={
//     <Suspense fallback={<div className="text-center py-10"></div>}>
//       <TermsOfService />
//     </Suspense>
//   }
// />
//             <Route
//   path="/code_of_conduct"
//   element={
//     <Suspense fallback={<div className="text-center py-10"></div>}>
//       <CodeOfConduct />
//     </Suspense>
//   }
// />
//             <Route
//   path="/faq"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading FAQ...</div>}>
//       <FAQ />
//     </Suspense>
//   }
// />
//             <Route path="/patient/:id" element={<PatientView/>} />
//             {/* <Route path="/patients/admin/:username/:doctorId" element={<PatientsListnew />} />    */}
//             <Route path="/consult/:roomName" element={<PatientConsult />} />
//             <Route path="/doctor/join/:roomName" element={<DoctorJoin />} />
//             {/* <Route path="/admin/login" element={<Login />} /> */}
//             {/* <Route path="/payments/admin/:username/:doctorId" element={<Payments />} />
//             <Route path="/sessions/admin/:username/:doctorId" element={<ViewSessions />} /> */}
//             <Route path="/consent/:appointmentId" element={<ConcernForm />} />
//             {/* <Route path="/superadmin/login" element={<SuperAdminLoginnew />} /> */}
//             {/* <Route path="/patients/superadmin/:username/:doctorId" element={<PatientsListnew />} /> */}
//             {/* <Route path="/patients/superadmin/all/all" element={<SuperAdminDashboard />} /> */}
//             <Route path="/reschedule/request/:addSessionId/:index" element={<RescheduleRequestPage />} />
//             <Route path="/reschedule/review/:addSessionId/:index" element={<RescheduleReview />} />          
//             <Route path="/clinic_admin/login" element={<SalesLogin />} />
//             <Route path="/calendar/admin/:username/:doctorId" element={<CalendarPage />} />
//             {/* <Route path="/calendar_superadmin" element={<CalendarPageSuperAdmin />} /> */}
//             <Route path="/clinic_registration" element={<ClinicRegistration />} />
//             <Route
//   path="/admin/:username/:clinicAdminId"
//   element={<ClinicRegistrationDashboard />}
// />

//             <Route path="/clinic/login" element={<ClinicLogin />} />
//             <Route path="/clinic/register" element={<ClinicRegister />} />
//             <Route path="/clinic/dashboard/UzI1NiIsInR5cCI6Ikp7GR2-s85s" element={<ClinicDashboard />} />
//             <Route path="/clinic/onboard/:id" element={<ClinicRegistrationWithSignature />} />
//             <Route path="/clinic/patients/add" element={<AddPatient />} />
//             <Route path="/clinic/appointments/:clinicId" element={<ClinicAppointments />} />
//             <Route path="/clinic/calendar/:clinicId" element={<ClinicCalendarPage />} />
//             <Route path="/transfers/confirm/:id" element={<TransferConfirm />} />
//             <Route path="/transfers/confirm_clinic/:id" element={<TransferConfirm_clinic />} />
//             <Route path="/clinics" element={<Clinics />} />
//             <Route path="/clinics/:stateName" element={<Clinics />} />
//             <Route path="/clinics/:stateName/:districtName" element={<Clinics />} />
//             {/* <Route path="/pain-relief/back-pain" element={<BackPain />} />
//             <Route path="/pain-relief/neck-pain" element={<NeckPain  />} />
//             <Route path="/pain-relief/knee-pain" element={<KneePain  />} />
//             <Route path="/pain-relief/sports-injury" element={<SportsInjury />} />
//             <Route path="/pain-relief/elbow-pain" element={<ElbowPain  />} />
//             <Route path="/pain-relief/shoulder-pain" element={<ShoulderPain  />} />
//             <Route path="/pain-relief/neuro-conditions" element={<NeurologicalConditions  />} /> */}

// <Route
//   path="/pain-relief/back-pain"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <BackPain />
//     </Suspense>
//   }
// />

// <Route
//   path="/pain-relief/neck-pain"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <NeckPain />
//     </Suspense>
//   }
// />

// <Route
//   path="/pain-relief/knee-pain"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <KneePain />
//     </Suspense>
//   }
// />

// <Route
//   path="/pain-relief/sports-injury"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <SportsInjury />
//     </Suspense>
//   }
// />

// <Route
//   path="/pain-relief/elbow-pain"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <ElbowPain />
//     </Suspense>
//   }
// />

// <Route
//   path="/pain-relief/shoulder-pain"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <ShoulderPain />
//     </Suspense>
//   }
// />

// <Route
//   path="/pain-relief/neuro-conditions"
//   element={
//     <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
//       <NeurologicalConditions />
//     </Suspense>
//   }
// />
//             <Route path="/blogs" element={<Blogs />} />
//             <Route path="/blogs/:slug" element={<BlogDetail />} />
//             <Route path="/admin/blogs/add" element={<AdminAddBlog />} />
//             <Route path="/delete-account" element={<DeleteAccount />} />
//             <Route path="/facebook_reel" element={<FacebookReel  />} />
//             <Route path="/fcm-token" element={<FCMTokenPage />} />
//             <Route path="/:slug" element={<DoctorProfile />} />
//             <Route path="/admin/opliva-appointments" element={<OplivaAppointments />}
// />

// <Route
//  path="/admin/opliva-payments"
//  element={<OplivaPayments />}
// />
// <Route
//  path="/admin/opliva-sessions"
//  element={<OplivaSessions />}
// />
//           </Routes>
        
//           </Layout>
//       </Router>
//     );
//   };

//   export default App;





// ============================================================
//  App.jsx — Main Application Entry Point
//  Zeromedixine React App
// ============================================================

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// ─────────────────────────────────────────────
//  EAGERLY LOADED COMPONENTS
//  Only the critical shell — rendered on every page immediately.
//  Everything else is lazy-loaded below.
// ─────────────────────────────────────────────

// Global Layout Shell
import Header           from "./Components/Header";
const Footer = lazy(() => import("./Components/Footer"));
import FloatingWhatsApp from "./Components/FloatingWhatsApp";
import ScrollToTop      from "./Components/ScrollToTop";
import AIFloatingButton from "./Components/AIChat/AIFloatingButton";

// Above-the-fold Home Sections (must not flash on first paint)
import HeroSection from "./Components/HeroSection";

// ─────────────────────────────────────────────
//  LAZILY LOADED COMPONENTS
//  All remaining components are code-split for performance.
// ─────────────────────────────────────────────

// ── Below-the-fold Home Page Sections ──
const WhyChooseUs        = lazy(() => import("./Components/WhyChooseUs"));
const Testimonials       = lazy(() => import("./Components/Testimonial"));
const FounderReelSection = lazy(() => import("./Components/FounderReelSection"));
const BMICalculator      = lazy(() => import("./Components/BMICalculator"));
const OurClinics         = lazy(() => import("./Components/OurClinics"));

// ── General / Info Pages ──
const Appointment = lazy(() => import("./Components/AppointmentForm"));
const Aboutus     = lazy(() => import("./Components/About_Zeromedixine"));
const DeleteAccount = lazy(() => import("./Components/DeleteAccount"));
const FacebookReel  = lazy(() => import("./Components/FacebookReel"));
const FCMTokenPage  = lazy(() => import("./Components/FCMTokenPage"));

// ── Legal & Policy Pages ──
const PrivacyPolicy  = lazy(() => import("./Components/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./Components/TermsOfService"));
const CodeOfConduct  = lazy(() => import("./Components/CodeOfConduct"));
const FAQ            = lazy(() => import("./Components/FAQ"));

// ── Service Pages ──
// const PainRelief        = lazy(() => import("./Components/services/PainRelief"));
// const FitnessNutrition  = lazy(() => import("./Components/services/FitnessNutrition"));
// const LifestyleDiseases = lazy(() => import("./Components/services/Lifestyle_diseases"));
// const SexualWellness    = lazy(() => import("./Components/services/Sexual_wellness"));

// ── Pain-Relief Sub-Pages ──
const BackPain               = lazy(() => import("./Components/BackPain"));
const NeckPain               = lazy(() => import("./Components/NeckPain"));
const KneePain               = lazy(() => import("./Components/KneePain"));
const ShoulderPain           = lazy(() => import("./Components/ShoulderPain"));
const SportsInjury           = lazy(() => import("./Components/SportsInjury"));
const ElbowPain              = lazy(() => import("./Components/ElbowPain"));
const NeurologicalConditions = lazy(() => import("./Components/NeurologicalConditions"));

// ── Patient Pages ──
const PatientView  = lazy(() => import("./PatientView"));
const PatientsList = lazy(() => import("./Components/PatientsList"));

// ── Video Consultation ──
const PatientConsult = lazy(() => import("./Components/PatientConsult"));
const DoctorJoin     = lazy(() => import("./Components/DoctorJoin"));

// ── Consent / Concern ──
const ConcernForm = lazy(() => import("./Components/ConcernForm"));

// ── Reschedule ──
const RescheduleRequestPage = lazy(() => import("./Components/RescheduleRequest"));
const RescheduleReview      = lazy(() => import("./Components/RescheduleConfirm"));

// ── Admin & Sales ──
const SalesLogin                  = lazy(() => import("./Components/SalesLogin"));
const CalendarPage                = lazy(() => import("./Components/CalendarPage"));
// const ClinicRegistrationDashboard = lazy(() => import("./Components/ClinicRegistrationDashboard"));
const AdminAddBlog                = lazy(() => import("./Components/AdminAddBlog"));

// ── Opliva Admin ──
const OplivaAppointments = lazy(() => import("./Components/Opliva/OplivaAppointments"));
const OplivaPayments     = lazy(() => import("./Components/OplivaPayments"));
const OplivaSessions     = lazy(() => import("./Components/OplivaSessions"));

// ── Clinic Management ──
const ClinicRegistration              = lazy(() => import("./Components/ClinicRequest"));
const ClinicLogin                     = lazy(() => import("./Components/ClinicLogin"));
const ClinicRegister                  = lazy(() => import("./Components/ClinicRegister"));
const ClinicDashboard                 = lazy(() => import("./Components/ClinicDashboard"));
// const ClinicRegistrationWithSignature = lazy(() => import("./Components/ClinicRegistrationWithSignature"));
const ClinicCalendarPage              = lazy(() => import("./Components/ClinicCalendarPage"));
const AddPatient                      = lazy(() => import("./components/AddPatient"));
const ClinicAppointments              = lazy(() => import("./components/ClinicAppointments"));





// ── Transfer Confirmations ──
const TransferConfirm        = lazy(() => import("./Components/TransferConfirm"));
const TransferConfirm_clinic = lazy(() => import("./Components/TransferConfirmClinic"));
// const FirebaseOtpTester = lazy(() => import("./Components/FirebaseOtpTester"));


// ── Clinics Directory ──
const Clinics = lazy(() => import("./Components/Clinics"));

// ── Blogs ──
const Blogs      = lazy(() => import("./Components/Blogs"));
const BlogDetail = lazy(() => import("./Components/BlogDetail"));

// ── Dynamic Doctor Profile (catch-all slug) ──
import DoctorProfile from "./Components/DoctorProfile";


const Sciatica = lazy(() => import("./Components/Sciatica"));

const PosturalBackPain = lazy(() => import("./Components/PosturalBackPain"));
const LumbarSpondylosis = lazy(() => import("./Components/LumbarSpondylosis"));
const DiscHerniation = lazy(() => import("./Components/DiscHerniation"));
const MechanicalBackPain = lazy(() => import("./Components/MechanicalBackPain"));
const PregnancyBackPain = lazy(() => import("./Components/PregnancyBackPain"));
const LumbarCanalStenosis = lazy(() => import("./Components/LumbarCanalStenosis"));
const Scoliosis = lazy(() => import("./Components/Scoliosis"));
const PiriformisSyndrome = lazy(() => import("./Components/PiriformisSyndrome"));
// const WhatsAppBulkDashboard = lazy(() => import("./Components/WhatsAppBulkDashboard"));
// const AdminDoctors = lazy(() => import("./Components/AdminDoctors"));

const KneeOsteoarthritis        = lazy(() => import("./Components/KneeOsteoarthritis"));
const RunnersKnee               = lazy(() => import("./Components/RunnersKnee"));
const ACLPCLInjuries            = lazy(() => import("./Components/ACLPCLInjuries"));
const MeniscusTear              = lazy(() => import("./Components/MeniscusTear"));
const PatellarTendonitis        = lazy(() => import("./Components/PatellarTendonitis"));
const ChondromalaciaPatella     = lazy(() => import("./Components/ChondromalaciaPatella"));
const ITBandSyndrome            = lazy(() => import("./Components/ITBandSyndrome"));
const KneeBursitis              = lazy(() => import("./Components/KneeBursitis"));
const PostKneeReplacementRehab  = lazy(() => import("./Components/PostKneeReplacementRehab"));


const TennisElbow        = lazy(() => import("./Components/TennisElbow"));
const RadialTunnelSyndrome = lazy(() => import("./Components/RadialTunnelSyndrome"));
const CubitalTunnelSyndrome = lazy(() => import("./Components/CubitalTunnelSyndrome"));
const GolfersElbow = lazy(() => import("./Components/GolfersElbow"));
const OlecranonBursitis = lazy(() => import("./Components/OlecranonBursitis"));
const ElbowLigamentInjuries = lazy(() => import("./Components/ElbowLigamentInjuries"));
const PosteriorElbowImpingement = lazy(() => import("./Components/PosteriorElbowImpingement"));
const ElbowInstability = lazy(() => import("./Components/ElbowInstability"));
const PostFractureElbowRehab = lazy(() => import("./Components/PostFractureElbowRehab"));



// import PatientsListnew from "./Components/PatientListpart2";
// import Login from './components/Login';
// import Payments from "../src/Components/Payments";
// import ViewSessions from "./Components/ViewSessions";
// import SuperAdminLoginnew from "./Components/SuperAdminLoginnew";
// import SuperAdminDashboard from "./Components/SuperAdminDashboard";
// import CalendarPageSuperAdmin from "./Components/Calendarsuperadmin";





const PatientLogin       = lazy(() => import("./Components/PatientLogin"));
const MyBookings = lazy(() => import("./Components/MyBookings"));
const DoctorAppointments = lazy(() => import("./Components/DoctorAppointments"));

import Doctors from "./Components/Doctors";

const ClinicBooking = lazy(() => import("./Components/ClinicBooking"));
import DoctorProfilenew from "./Components/DoctorProfilesnew";


const CervicalSpondylosis      = lazy(() => import("./Components/CervicalSpondylosis"));
const CervicalDiscProlapse = lazy(() => import("./Components/CervicalDiscProlapse"));
const CervicalRadiculopathy = lazy(() => import("./Components/CervicalRadiculopathy"));
const CervicogenicHeadache  = lazy(() => import("./Components/CervicogenicHeadache"));
const MechanicalNeckPain    = lazy(() => import("./Components/MechanicalNeckPain"));
const PosturalNeckPain      = lazy(() => import("./Components/PosturalNeckPain"));
const TextNeckSyndrome      = lazy(() => import("./Components/TextNeckSyndrome"));
const UpperCrossSyndrome    = lazy(() => import("./Components/UpperCrossSyndrome"));
const WhiplashInjuries      = lazy(() => import("./Components/WhiplashInjuries"));

const FrozenShoulder            = lazy(() => import("./Components/FrozenShoulder"));
const RotatorCuffTear           = lazy(() => import("./Components/RotatorCuffTear"));
const RotatorCuffTendinopathy   = lazy(() => import("./Components/RotatorCuffTendinopathy"));
const ShoulderImpingement       = lazy(() => import("./Components/ShoulderImpingement"));
const ShoulderInstability       = lazy(() => import("./Components/ShoulderInstability"));
const LabralSLAPInjuries        = lazy(() => import("./Components/LabralSLAPInjuries"));
const ShoulderBursitis          = lazy(() => import("./Components/ShoulderBursitis"));
const ACJointDisorders          = lazy(() => import("./Components/ACJointDisorders"));
const PostFractureRehabilitation = lazy(() => import("./Components/PostFractureRehabilitation"));
const RecoveryPlanViewPage = lazy(() => import("./Components/RecoveryPlan/RecoveryPlanViewPage"));
const PhysioReviewPage = lazy(() => import("./Components/RecoveryPlan/PhysioReviewPage"));
import ConsentForm from "./Components/ConsentForm";
const PainChatWidget  = lazy(() => import("./Components/PainChatAssistant"));


// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

/** Reusable loading fallback */
const PageLoader = ({ label = "" }) => (
  <div className="text-center py-10">{label}</div>
);

/**
 * LazyRoute — wraps a single lazy page component in <Suspense>.
 * Use on individual <Route element={...}> props.
 *
 * @example <Route path="/about-us" element={<LazyRoute component={Aboutus} />} />
 */
const LazyRoute = ({ component: Component, label }) => (
  <Suspense fallback={<PageLoader label={label} />}>
    <Component />
  </Suspense>
);

/**
 * LazySection — wraps multiple lazy children in one shared <Suspense> boundary.
 * Use for below-the-fold home page sections rendered together.
 *
 * @example
 * <LazySection>
 *   <OurServices />
 *   <Testimonials />
 * </LazySection>
 */
const LazySection = ({ children, label }) => (
  <Suspense fallback={<PageLoader label={label} />}>
    {children}
  </Suspense>
);


// ─────────────────────────────────────────────
//  LAYOUT WRAPPER
//  Conditionally renders Header / Footer / FloatingWhatsApp
//  based on the current route.
// ─────────────────────────────────────────────

/**
 * Routes starting with these prefixes will NOT render the global
 * Header, Footer, or FloatingWhatsApp (e.g. full-screen video consult).
 */
const HIDE_LAYOUT_PREFIXES = ["/consult/", "/doctor/join/", "/doctor/appointments"];

function Layout({ children }) {
  const { pathname } = useLocation();

  const shouldHideLayout = HIDE_LAYOUT_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 relative overflow-hidden">
      {!shouldHideLayout && <Header />}
      {!shouldHideLayout && <FloatingWhatsApp />}
      {!shouldHideLayout && <PainChatWidget  />}


      {children}

      {!shouldHideLayout && (
  <Suspense fallback={null}>
    <Footer />
  </Suspense>
)}
    </div>
  );
}


// ─────────────────────────────────────────────
//  APP — ROOT COMPONENT
// ─────────────────────────────────────────────

const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <Layout>
        <Routes>

          {/* ══════════════════════════════════════
              HOME PAGE
          ══════════════════════════════════════ */}
          <Route
            path="/"
            element={
             <>
  {/* Above the fold */}
  <HeroSection />

  <section id="doctors-section">
          <Doctors />
        </section>

{/*   
  <LazySection>
    <FounderReelSection />
  </LazySection>

  <LazySection>
    <WhyChooseUs />
  </LazySection>

  <LazySection>
    <BMICalculator />
  </LazySection>

  <LazySection>
    <OurClinics />
  </LazySection>

  <LazySection>
    <Testimonials />
  </LazySection> */}
</>
            }
          />

          {/* ══════════════════════════════════════
              GENERAL / INFO PAGES
          ══════════════════════════════════════ */}
          <Route path="/about-us"         element={<LazyRoute component={Aboutus} />} />
          <Route path="/bmi_calculator"   element={<LazyRoute component={BMICalculator} />} />
          <Route path="/book-appointment" element={<LazyRoute component={Appointment} />} />
          <Route path="/delete-account"   element={<LazyRoute component={DeleteAccount} />} />
          <Route path="/facebook_reel"    element={<LazyRoute component={FacebookReel} />} />
          <Route path="/fcm-token"        element={<LazyRoute component={FCMTokenPage} />} />

          {/* ══════════════════════════════════════
              LEGAL & POLICY PAGES
          ══════════════════════════════════════ */}
          <Route path="/privacy-policy"   element={<LazyRoute component={PrivacyPolicy} />} />
          <Route path="/terms_of_service" element={<LazyRoute component={TermsOfService} />} />
          <Route path="/code_of_conduct"  element={<LazyRoute component={CodeOfConduct} />} />
          <Route path="/faq"              element={<LazyRoute component={FAQ} label="Loading FAQ..." />} />

          {/* ══════════════════════════════════════
              SERVICE PAGES
          ══════════════════════════════════════ */}
          {/* <Route path="/pain-relief"         element={<LazyRoute component={PainRelief} />} />
          <Route path="/fitness-nutrition"   element={<LazyRoute component={FitnessNutrition} />} />
          <Route path="/life-style-diseases" element={<LazyRoute component={LifestyleDiseases} />} />
          <Route path="/sexual-wellness"     element={<LazyRoute component={SexualWellness} />} /> */}
          <Route path="/patient/login"        element={<LazyRoute component={PatientLogin} />} />

          {/* ── Pain Relief Sub-Pages ── */}
          <Route path="/pain-relief/back-pain"        element={<LazyRoute component={BackPain} />} />
          <Route path="/pain-relief/neck-pain"        element={<LazyRoute component={NeckPain} />} />
          <Route path="/pain-relief/knee-pain"        element={<LazyRoute component={KneePain} />} />
          <Route path="/pain-relief/sports-injury"    element={<LazyRoute component={SportsInjury} />} />
          <Route path="/pain-relief/elbow-pain"       element={<LazyRoute component={ElbowPain} />} />
          <Route path="/pain-relief/shoulder-pain"    element={<LazyRoute component={ShoulderPain} />} />
          <Route path="/pain-relief/neuro-conditions" element={<LazyRoute component={NeurologicalConditions} />} />
          <Route path="/patient/bookings" element={<LazyRoute component={MyBookings} />} />

          <Route path="/knee-pain/osteoarthritis"            element={<LazyRoute component={KneeOsteoarthritis} />} />
  <Route path="/knee-pain/runners-knee"              element={<LazyRoute component={RunnersKnee} />} />
  <Route path="/knee-pain/acl-pcl-injuries"          element={<LazyRoute component={ACLPCLInjuries} />} />
  <Route path="/knee-pain/meniscus-tear"             element={<LazyRoute component={MeniscusTear} />} />
  <Route path="/knee-pain/patellar-tendonitis"       element={<LazyRoute component={PatellarTendonitis} />} />
  <Route path="/knee-pain/chondromalacia-patella"    element={<LazyRoute component={ChondromalaciaPatella} />} />
  <Route path="/knee-pain/it-band-syndrome"          element={<LazyRoute component={ITBandSyndrome} />} />
  <Route path="/knee-pain/knee-bursitis"             element={<LazyRoute component={KneeBursitis} />} />
  <Route path="/knee-pain/post-knee-replacement-rehab" element={<LazyRoute component={PostKneeReplacementRehab} />} />


  <Route path="/pain-relief/elbow-pain/tennis-elbow"             element={<LazyRoute component={TennisElbow} />} />
  <Route path="/pain-relief/elbow-pain/radial-tunnel-syndrome" element={<LazyRoute component={RadialTunnelSyndrome} />} />
  <Route path="/pain-relief/elbow-pain/cubital-tunnel-syndrome" element={<LazyRoute component={CubitalTunnelSyndrome} />} />
  <Route path="/pain-relief/elbow-pain/golfers-elbow" element={<LazyRoute component={GolfersElbow} />} />
  <Route path="/pain-relief/elbow-pain/olecranon-bursitis" element={<LazyRoute component={OlecranonBursitis} />} />
  <Route path="/pain-relief/elbow-pain/elbow-ligament-injuries" element={<LazyRoute component={ElbowLigamentInjuries} />} />
  <Route path="/pain-relief/elbow-pain/posterior-elbow-impingement" element={<LazyRoute component={PosteriorElbowImpingement} />} />
  <Route path="/pain-relief/elbow-pain/elbow-instability" element={<LazyRoute component={ElbowInstability} />} />
  <Route path="/pain-relief/elbow-pain/post-fracture-rehabilitation" element={<LazyRoute component={PostFractureElbowRehab} />} />
  <Route path="/recovery-plan/:assessmentId" element={<LazyRoute component={RecoveryPlanViewPage} />} />
  <Route path="/physio/recovery-plans" element={<LazyRoute component={PhysioReviewPage} />} />
{/* 
 <Route path="/patients/admin/:username/:doctorId" element={<PatientsListnew />} />
<Route path="/admin/login" element={<Login />} />
 <Route path="/payments/admin/:username/:doctorId" element={<Payments />} />
  <Route path="/sessions/admin/:username/:doctorId" element={<ViewSessions />} />
 <Route path="/superadmin/login" element={<SuperAdminLoginnew />} />
 <Route path="/patients/superadmin/:username/:doctorId" element={<PatientsListnew />} />
 <Route path="/patients/superadmin/all/all" element={<SuperAdminDashboard />} />
 <Route path="/calendar_superadmin" element={<CalendarPageSuperAdmin />} /> */}





  

          {/* ══════════════════════════════════════
              PATIENT PAGES
          ══════════════════════════════════════ */}
          <Route path="/patient/:id" element={<LazyRoute component={PatientView} />} />

          {/* ══════════════════════════════════════
              VIDEO CONSULTATION
          ══════════════════════════════════════ */}
          <Route path="/consult/:roomName"     element={<LazyRoute component={PatientConsult} />} />
          <Route path="/doctor/join/:roomName" element={<LazyRoute component={DoctorJoin} />} />

          {/* ══════════════════════════════════════
              CONSENT / CONCERN
          ══════════════════════════════════════ */}
          <Route path="/consent/:appointmentId" element={<LazyRoute component={ConcernForm} />} />
          {/* <Route path="/dev/otp-test" element={<LazyRoute component={FirebaseOtpTester} />} /> */}
          <Route path="/doctor/appointments" element={<LazyRoute component={DoctorAppointments} />} />

          {/* <Route path="/doctor/appointments" element={<DoctorAppointments />} /> */}

          {/* ══════════════════════════════════════
              RESCHEDULE
          ══════════════════════════════════════ */}
          <Route path="/reschedule/request/:addSessionId/:index" element={<LazyRoute component={RescheduleRequestPage} />} />
          <Route path="/reschedule/review/:addSessionId/:index"  element={<LazyRoute component={RescheduleReview} />} />

          {/* ══════════════════════════════════════
              ADMIN / SALES
          ══════════════════════════════════════ */}
          <Route path="/clinic_admin/login"                 element={<LazyRoute component={SalesLogin} />} />
          <Route path="/calendar/admin/:username/:doctorId" element={<LazyRoute component={CalendarPage} />} />
          {/* <Route path="/admin/:username/:clinicAdminId"     element={<LazyRoute component={ClinicRegistrationDashboard} />} /> */}
          <Route path="/admin/blogs/add"                    element={<LazyRoute component={AdminAddBlog} />} />



          {/* ══════════════════════════════════════
              CLINIC MANAGEMENT
          ══════════════════════════════════════ */}
          <Route path="/clinic_registration"                            element={<LazyRoute component={ClinicRegistration} />} />
          <Route path="/clinic/login"                                   element={<LazyRoute component={ClinicLogin} />} />
          <Route path="/clinic/register"                                element={<LazyRoute component={ClinicRegister} />} />
          <Route path="/clinic/dashboard/UzI1NiIsInR5cCI6Ikp7GR2-s85s" element={<LazyRoute component={ClinicDashboard} />} />
          {/* <Route path="/clinic/onboard/:id"                             element={<LazyRoute component={ClinicRegistrationWithSignature} />} /> */}
          <Route path="/clinic/patients/add"                            element={<LazyRoute component={AddPatient} />} />
          <Route path="/clinic/appointments/:clinicId"                  element={<LazyRoute component={ClinicAppointments} />} />
          <Route path="/clinic/calendar/:clinicId"                      element={<LazyRoute component={ClinicCalendarPage} />} />

          {/* ══════════════════════════════════════
              TRANSFER CONFIRMATIONS
          ══════════════════════════════════════ */}
          <Route path="/transfers/confirm/:id"        element={<LazyRoute component={TransferConfirm} />} />
          <Route path="/transfers/confirm_clinic/:id" element={<LazyRoute component={TransferConfirm_clinic} />} />

          {/* ══════════════════════════════════════
              CLINICS DIRECTORY
          ══════════════════════════════════════ */}
          <Route path="/clinics"                          element={<LazyRoute component={Clinics} />} />
          <Route path="/clinics/:stateName"               element={<LazyRoute component={Clinics} />} />
          <Route path="/clinics/:stateName/:districtName" element={<LazyRoute component={Clinics} />} />

          {/* ══════════════════════════════════════
              BLOGS
          ══════════════════════════════════════ */}
          <Route path="/blogs"       element={<LazyRoute component={Blogs} />} />
          <Route path="/blogs/:slug" element={<LazyRoute component={BlogDetail} />} />

          {/* ══════════════════════════════════════
              DYNAMIC DOCTOR PROFILE
              ⚠️  Keep this LAST — catches all unmatched slugs
          ══════════════════════════════════════ */}
<Route path="/back-pain/sciatica" element={<LazyRoute component={Sciatica} />} />
<Route path="/back-pain/postural-back-pain" element={<LazyRoute component={PosturalBackPain} />} />
<Route path="/back-pain/lumbar-spondylosis" element={<LazyRoute component={LumbarSpondylosis} />} />
<Route path="/back-pain/disc-herniation" element={<LazyRoute component={DiscHerniation} />} />

<Route path="/back-pain/mechanical-back-pain" element={<LazyRoute component={MechanicalBackPain} />} />
<Route path="/back-pain/pregnancy-back-pain" element={<LazyRoute component={PregnancyBackPain} />} />
<Route path="/back-pain/lumbar-canal-stenosis" element={<LazyRoute component={LumbarCanalStenosis} />} />
<Route path="/back-pain/scoliosis" element={<LazyRoute component={Scoliosis} />} />
<Route path="/back-pain/piriformis-syndrome" element={<PiriformisSyndrome />} />

<Route path="/neck-pain/cervical-spondylosis"  element={<LazyRoute component={CervicalSpondylosis} />} />
<Route path="/neck-pain/cervical-disc-prolapse"  element={<LazyRoute component={CervicalDiscProlapse} />} />
<Route path="/neck-pain/cervical-radiculopathy"  element={<LazyRoute component={CervicalRadiculopathy} />} />
<Route path="/neck-pain/cervicogenic-headache"   element={<LazyRoute component={CervicogenicHeadache} />} />
<Route path="/neck-pain/mechanical-neck-pain"    element={<LazyRoute component={MechanicalNeckPain} />} />
<Route path="/neck-pain/postural-neck-pain"      element={<LazyRoute component={PosturalNeckPain} />} />
<Route path="/neck-pain/text-neck-syndrome"      element={<LazyRoute component={TextNeckSyndrome} />} />
<Route path="/neck-pain/upper-cross-syndrome"    element={<LazyRoute component={UpperCrossSyndrome} />} />
<Route path="/neck-pain/whiplash-injuries"       element={<LazyRoute component={WhiplashInjuries} />} />

<Route path="/shoulder-pain/frozen-shoulder"               element={<LazyRoute component={FrozenShoulder} />} />
<Route path="/shoulder-pain/rotator-cuff-tear"              element={<LazyRoute component={RotatorCuffTear} />} />
<Route path="/shoulder-pain/rotator-cuff-tendinopathy"       element={<LazyRoute component={RotatorCuffTendinopathy} />} />
<Route path="/shoulder-pain/shoulder-impingement"            element={<LazyRoute component={ShoulderImpingement} />} />
<Route path="/shoulder-pain/shoulder-instability"            element={<LazyRoute component={ShoulderInstability} />} />
<Route path="/shoulder-pain/labral-slap-injuries"            element={<LazyRoute component={LabralSLAPInjuries} />} />
<Route path="/shoulder-pain/shoulder-bursitis"                element={<LazyRoute component={ShoulderBursitis} />} />
<Route path="/shoulder-pain/ac-joint-disorders"               element={<LazyRoute component={ACJointDisorders} />} />
<Route path="/shoulder-pain/post-fracture-rehabilitation"     element={<LazyRoute component={PostFractureRehabilitation} />} />


<Route path="/clinic/book/:clinicId" element={<LazyRoute component={ClinicBooking} />} />

<Route path="/consent/appointment/:physioAppointmentId" element={<ConsentForm />} />


  {/* Opliva Admin */}
{/*   
  <Route path="/admin/opliva-appointments" element={<OplivaAppointments />} />
  <Route path="/admin/opliva-payments"     element={<OplivaPayments />} />
  <Route path="/admin/opliva-sessions"     element={<OplivaSessions />} />

  <Route path="/admin/whatsapp-bulk"     element={<WhatsAppBulkDashboard />} />
  <Route path="/admin/doctors"     element={<AdminDoctors />} /> */}

  {/* <Route path="/:slug" element={<LazyRoute component={DoctorProfile} />} /> */}
  <Route path="/:slug"     element={<DoctorProfilenew />} />


        </Routes>
      </Layout>
    </Router>
  );
};

export default App;


// ============================================================
//  COMMENTED-OUT / ARCHIVED CODE
//  Kept for reference — safe to delete when no longer needed.
// ============================================================

// ── Eagerly-imported versions (now replaced by lazy imports above) ───────────
// import PainRelief from "./Components/services/PainRelief";
// import FitnessNutrition from "./Components/services/FitnessNutrition";
// import LifestyleDiseases from "./Components/services/Lifestyle_diseases";
// import SexualWellness from "./Components/services/Sexual_wellness";
// import PrivacyPolicy from "./Components/PrivacyPolicy";
// import TermsOfService from "./Components/TermsOfService";
// import CodeOfConduct from "./Components/CodeOfConduct";
// import FAQ from "./Components/FAQ";
// import BackPain from "./Components/BackPain";
// import NeckPain from "./Components/NeckPain";
// import KneePain from "./Components/KneePain";
// import ShoulderPain from "./Components/ShoulderPain";
// import SportsInjury from "./Components/SportsInjury";
// import ElbowPain from "./Components/ElbowPain";
// import NeurologicalConditions from "./Components/NeurologicalConditions";
// import WhyChooseUs from "./Components/WhyChooseUs";
// import Testimonials from "./Components/Testimonial";
// import FounderReelSection from "./Components/FounderReelSection";
// import BMICalculator from "./Components/BMICalculator";
// import OurServices from "./Components/OurServices";
// import DoctorScroll from "./Components/DoctorScroll";
// import OurClinics from "./Components/OurClinics";

// ── Unused / future components ───────────────────────────────────────────────
// import PatientsListnew from "./Components/PatientListpart2";
// import Login from './components/Login';
// import Payments from "../src/Components/Payments";
// import ViewSessions from "./Components/ViewSessions";
// import SuperAdminLoginnew from "./Components/SuperAdminLoginnew";
// import SuperAdminDashboard from "./Components/SuperAdminDashboard";
// import CalendarPageSuperAdmin from "./Components/Calendarsuperadmin";

// ── Commented-out Routes (preserved for reference) ───────────────────────────
// <Route path="/patients/admin/:username/:doctorId" element={<PatientsListnew />} />
// <Route path="/admin/login" element={<Login />} />
// <Route path="/payments/admin/:username/:doctorId" element={<Payments />} />
// <Route path="/sessions/admin/:username/:doctorId" element={<ViewSessions />} />
// <Route path="/superadmin/login" element={<SuperAdminLoginnew />} />
// <Route path="/patients/superadmin/:username/:doctorId" element={<PatientsListnew />} />
// <Route path="/patients/superadmin/all/all" element={<SuperAdminDashboard />} />
// <Route path="/calendar_superadmin" element={<CalendarPageSuperAdmin />} />


// import React, { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // ─── Eagerly loaded (needed immediately on every render) ───────────────────────
// import ScrollToTop from "./Components/ScrollToTop";

// // ─── Lazy loaded components ────────────────────────────────────────────────────

// // Layout
// const Header          = lazy(() => import("./Components/Header"));
// const Footer          = lazy(() => import("./Components/Footer"));
// const FloatingWhatsApp = lazy(() => import("./Components/FloatingWhatsApp"));

// // Home page sections
// const HeroSection        = lazy(() => import("./Components/HeroSection"));
// const HowItWorks         = lazy(() => import("./Components/HowItWorks"));
// const WhyChooseUs        = lazy(() => import("./Components/WhyChooseUs"));
// const Testimonials       = lazy(() => import("./Components/Testimonial"));
// const FounderReelSection = lazy(() => import("./Components/FounderReelSection"));
// const BMICalculator      = lazy(() => import("./Components/BMICalculator"));
// const OurServices        = lazy(() => import("./Components/OurServices"));
// const DoctorScroll       = lazy(() => import("./Components/DoctorScroll"));
// const OurClinics         = lazy(() => import("./Components/OurClinics"));

// // Pages
// const Appointment       = lazy(() => import("./Components/AppointmentForm"));
// const PrivacyPolicy     = lazy(() => import("./Components/PrivacyPolicy"));
// const TermsOfService    = lazy(() => import("./Components/TermsOfService"));
// const CodeOfConduct     = lazy(() => import("./Components/CodeOfConduct"));
// const FAQ               = lazy(() => import("./Components/FAQ"));
// const Aboutus           = lazy(() => import("./Components/About_Zeromedixine"));
// const DeleteAccount     = lazy(() => import("./Components/DeleteAccount"));

// // Services
// const PainRelief        = lazy(() => import("./Components/services/PainRelief"));
// const FitnessNutrition  = lazy(() => import("./Components/services/FitnessNutrition"));
// const LifestyleDiseases = lazy(() => import("./Components/services/Lifestyle_diseases"));
// const SexualWellness    = lazy(() => import("./Components/services/Sexual_wellness"));

// // Pain relief sub-pages
// const BackPain               = lazy(() => import("./Components/BackPain"));
// const NeckPain               = lazy(() => import("./Components/NeckPain"));
// const KneePain               = lazy(() => import("./Components/KneePain"));
// const ShoulderPain           = lazy(() => import("./Components/ShoulderPain"));
// const SportsInjury           = lazy(() => import("./Components/SportsInjury"));
// const ElbowPain              = lazy(() => import("./Components/ElbowPain"));
// const NeurologicalConditions = lazy(() => import("./Components/NeurologicalConditions"));

// // Patient / Admin
// const PatientView   = lazy(() => import("./PatientView"));
// const PatientsList  = lazy(() => import("./Components/PatientsList"));
// const Login         = lazy(() => import("./components/Login"));
// const AddPatient    = lazy(() => import("./components/AddPatient"));

// // Video Consultation
// const PatientConsult = lazy(() => import("./Components/PatientConsult"));
// const DoctorJoin     = lazy(() => import("./Components/DoctorJoin"));

// // Forms / Consent
// const ConcernForm = lazy(() => import("./Components/ConcernForm"));

// // Reschedule
// const RescheduleRequestPage = lazy(() => import("./Components/RescheduleRequest"));
// const RescheduleReview      = lazy(() => import("./Components/RescheduleConfirm"));

// // Sales / Calendar
// const SalesLogin   = lazy(() => import("./Components/SalesLogin"));
// const CalendarPage = lazy(() => import("./Components/CalendarPage"));

// // Clinic Registration & Dashboard
// const ClinicRegistration          = lazy(() => import("./Components/ClinicRequest"));
// const ClinicRegistrationDashboard = lazy(() => import("./Components/ClinicRegistrationDashboard"));
// const ClinicLogin                 = lazy(() => import("./Components/ClinicLogin"));
// const ClinicRegister              = lazy(() => import("./Components/ClinicRegister"));
// const ClinicDashboard             = lazy(() => import("./Components/ClinicDashboard"));
// const ClinicRegistrationWithSignature = lazy(() => import("./Components/ClinicRegistrationWithSignature"));
// const ClinicAppointments          = lazy(() => import("./components/ClinicAppointments"));
// const ClinicCalendarPage          = lazy(() => import("./Components/ClinicCalendarPage"));

// // Transfers & Clinics
// const TransferConfirm        = lazy(() => import("./Components/TransferConfirm"));
// const TransferConfirm_clinic = lazy(() => import("./Components/TransferConfirmClinic"));
// const Clinics                = lazy(() => import("./Components/Clinics"));

// // Blogs
// const Blogs        = lazy(() => import("./Components/Blogs"));
// const BlogDetail   = lazy(() => import("./Components/BlogDetail"));
// const AdminAddBlog = lazy(() => import("./Components/AdminAddBlog"));

// // Doctor
// const DoctorProfile = lazy(() => import("./Components/DoctorProfile"));

// // Misc
// const FacebookReel  = lazy(() => import("./Components/FacebookReel"));
// const FCMTokenPage  = lazy(() => import("./Components/FCMTokenPage"));

// // Opliva
// const OplivaAppointments = lazy(() => import("./Components/Opliva/OplivaAppointments"));
// const OplivaPayments     = lazy(() => import("./Components/OplivaPayments"));
// const OplivaSessions     = lazy(() => import("./Components/OplivaSessions"));

// // ─── Fallback ─────────────────────────────────────────────────────────────────
// const PageLoader = () => (
//   <div className="text-center py-10"></div>
// );

// // ─── Layout Wrapper ────────────────────────────────────────────────────────────
// function Layout({ children }) {
//   const location = useLocation();

//   const hideHeaderFooterRoutes = ["/consult/", "/doctor/join/"];

//   const shouldHideLayout = hideHeaderFooterRoutes.some((path) =>
//     location.pathname.startsWith(path)
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 relative overflow-hidden">
//       {!shouldHideLayout && (
//         <Suspense fallback={null}>
//           <Header />
//         </Suspense>
//       )}

      
//       {!shouldHideLayout && (
//         <Suspense fallback={null}>
//           <FloatingWhatsApp />
//         </Suspense>
//       )}

//       {children}

//       {!shouldHideLayout && (
//         <Suspense fallback={null}>
//           <Footer />
//         </Suspense>
//       )}
//     </div>
//   );
// }

// // ─── App ───────────────────────────────────────────────────────────────────────
// const App = () => {
//   return (

//     <Router>
      
//       <ScrollToTop />
//       <Layout>
//         <Suspense fallback={<PageLoader />}>
//           <Routes>

           
//   {/* 🏠 Home Page */}
//   <Route
//           path="/"
//           element={
//             <>
//               <HeroSection />
//               <OurServices />
//               <DoctorScroll />
//               <FounderReelSection />
//               <HowItWorks />
//               <WhyChooseUs />
//               <BMICalculator />
//               <OurClinics />
//               <Testimonials />
//             </>
//           }
//         />
//             {/* General Pages */}
//             <Route path="/bmi_calculator"  element={<BMICalculator />} />
//             <Route path="/about-us"        element={<Aboutus />} />
//             <Route path="/book-appointment" element={<Appointment />} />
//             <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
//             <Route path="/terms_of_service" element={<TermsOfService />} />
//             <Route path="/code_of_conduct" element={<CodeOfConduct />} />
//             <Route path="/faq"             element={<FAQ />} />
//             <Route path="/delete-account"  element={<DeleteAccount />} />

//             {/* Services */}
//             <Route path="/pain-relief"        element={<PainRelief />} />
//             <Route path="/fitness-nutrition"  element={<FitnessNutrition />} />
//             <Route path="/life-style-diseases" element={<LifestyleDiseases />} />
//             <Route path="/sexual-wellness"    element={<SexualWellness />} />

//             {/* Pain Relief Sub-pages */}
//             <Route path="/pain-relief/back-pain"       element={<BackPain />} />
//             <Route path="/pain-relief/neck-pain"       element={<NeckPain />} />
//             <Route path="/pain-relief/knee-pain"       element={<KneePain />} />
//             <Route path="/pain-relief/sports-injury"   element={<SportsInjury />} />
//             <Route path="/pain-relief/elbow-pain"      element={<ElbowPain />} />
//             <Route path="/pain-relief/shoulder-pain"   element={<ShoulderPain />} />
//             <Route path="/pain-relief/neuro-conditions" element={<NeurologicalConditions />} />

//             {/* Patient / Admin */}
//             <Route path="/patient/:id"                        element={<PatientView />} />
//             <Route path="/admin/login"                        element={<Login />} />
//             <Route path="/consent/:appointmentId"             element={<ConcernForm />} />
//             <Route path="/reschedule/request/:addSessionId/:index" element={<RescheduleRequestPage />} />
//             <Route path="/reschedule/review/:addSessionId/:index"  element={<RescheduleReview />} />

//             {/* Video Consultation */}
//             <Route path="/consult/:roomName"      element={<PatientConsult />} />
//             <Route path="/doctor/join/:roomName"  element={<DoctorJoin />} />

//             {/* Sales / Calendar */}
//             <Route path="/clinic_admin/login"                   element={<SalesLogin />} />
//             <Route path="/calendar/admin/:username/:doctorId"   element={<CalendarPage />} />

//             {/* Clinic */}
//             <Route path="/clinic_registration"                              element={<ClinicRegistration />} />
//             <Route path="/admin/:username/:clinicAdminId"                   element={<ClinicRegistrationDashboard />} />
//             <Route path="/clinic/login"                                     element={<ClinicLogin />} />
//             <Route path="/clinic/register"                                  element={<ClinicRegister />} />
//             <Route path="/clinic/dashboard/UzI1NiIsInR5cCI6Ikp7GR2-s85s"  element={<ClinicDashboard />} />
//             <Route path="/clinic/onboard/:id"                               element={<ClinicRegistrationWithSignature />} />
//             <Route path="/clinic/patients/add"                              element={<AddPatient />} />
//             <Route path="/clinic/appointments/:clinicId"                    element={<ClinicAppointments />} />
//             <Route path="/clinic/calendar/:clinicId"                        element={<ClinicCalendarPage />} />

//             {/* Transfers */}
//             <Route path="/transfers/confirm/:id"        element={<TransferConfirm />} />
//             <Route path="/transfers/confirm_clinic/:id" element={<TransferConfirm_clinic />} />
//             {/* <Route path="/clinics"                      element={<Clinics />} /> */}
//             <Route path="/clinics/:stateName" element={<Clinics />} />
//             <Route path="/clinics/:stateName/:districtName" element={<Clinics />} />
//             {/* Blogs */}
//             <Route path="/blogs"            element={<Blogs />} />
//             <Route path="/blogs/:slug"      element={<BlogDetail />} />
//             <Route path="/admin/blogs/add"  element={<AdminAddBlog />} />

//             {/* Misc */}
//             <Route path="/facebook_reel" element={<FacebookReel />} />
//             <Route path="/fcm-token"     element={<FCMTokenPage />} />

//             {/* Opliva Admin */}
//             <Route path="/admin/opliva-appointments" element={<OplivaAppointments />} />
//             <Route path="/admin/opliva-payments"     element={<OplivaPayments />} />
//             <Route path="/admin/opliva-sessions"     element={<OplivaSessions />} />

//             {/* Dynamic Doctor Profile — keep last to avoid matching other routes */}
//             <Route path="/:slug" element={<DoctorProfile />} />

//           </Routes>
//         </Suspense>
//       </Layout>
//     </Router>
//   );
// };

// export default App;



// import React, { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// // ✅ Eager imports — Home page components (never lazy)
// import Header from "./Components/Header";
// import HeroSection from "./Components/HeroSection";
// import HowItWorks from "./Components/HowItWorks";
// import WhyChooseUs from "./Components/WhyChooseUs";
// import Testimonials from "./Components/Testimonial";
// import Footer from "./Components/Footer";
// import FloatingWhatsApp from "./Components/FloatingWhatsApp";
// import FounderReelSection from "./Components/FounderReelSection";
// import BMICalculator from "./Components/BMICalculator";
// import OurServices from "./Components/OurServices";
// import DoctorScroll from "./Components/DoctorScroll";
// import OurClinics from "./Components/OurClinics";

// // ✅ Utility — always eager
// import ScrollToTop from "./Components/ScrollToTop";

// // 🔁 Lazy — Services
// const PainRelief = lazy(() => import("./Components/services/PainRelief"));
// const FitnessNutrition = lazy(() => import("./Components/services/FitnessNutrition"));
// const LifestyleDiseases = lazy(() => import("./Components/services/Lifestyle_diseases"));
// const SexualWellness = lazy(() => import("./Components/services/Sexual_wellness"));

// // 🔁 Lazy — Legal / Info pages
// const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
// const FAQ = lazy(() => import("./Components/FAQ"));
// const CodeOfConduct = lazy(() => import("./Components/CodeOfConduct"));
// const TermsOfService = lazy(() => import("./Components/TermsOfService"));
// const Aboutus = lazy(() => import("./Components/About_Zeromedixine"));

// // 🔁 Lazy — Pain sub-pages
// const BackPain = lazy(() => import("./Components/BackPain"));
// const NeckPain = lazy(() => import("./Components/NeckPain"));
// const KneePain = lazy(() => import("./Components/KneePain"));
// const ShoulderPain = lazy(() => import("./Components/ShoulderPain"));
// const SportsInjury = lazy(() => import("./Components/SportsInjury"));
// const ElbowPain = lazy(() => import("./Components/ElbowPain"));
// const NeurologicalConditions = lazy(() => import("./Components/NeurologicalConditions"));

// // 🔁 Lazy — Admin / Clinic / Patient pages
// const Appointment = lazy(() => import("./Components/AppointmentForm"));
// const PatientsList = lazy(() => import("./Components/PatientsList"));
// const PatientView = lazy(() => import("./PatientView"));
// const Login = lazy(() => import("./components/Login"));
// const PatientConsult = lazy(() => import("./Components/PatientConsult"));
// const DoctorJoin = lazy(() => import("./Components/DoctorJoin"));
// const ConcernForm = lazy(() => import("./Components/ConcernForm"));
// const RescheduleRequestPage = lazy(() => import("./Components/RescheduleRequest"));
// const RescheduleReview = lazy(() => import("./Components/RescheduleConfirm"));
// const SalesLogin = lazy(() => import("./Components/SalesLogin"));
// const CalendarPage = lazy(() => import("./Components/CalendarPage"));
// const ClinicRegistration = lazy(() => import("./Components/ClinicRequest"));
// const ClinicRegistrationDashboard = lazy(() => import("./Components/ClinicRegistrationDashboard"));
// const ClinicLogin = lazy(() => import("./Components/ClinicLogin"));
// const ClinicRegister = lazy(() => import("./Components/ClinicRegister"));
// const ClinicDashboard = lazy(() => import("./Components/ClinicDashboard"));
// const ClinicRegistrationWithSignature = lazy(() => import("./Components/ClinicRegistrationWithSignature"));
// const AddPatient = lazy(() => import("./components/AddPatient"));
// const ClinicAppointments = lazy(() => import("./components/ClinicAppointments"));
// const ClinicCalendarPage = lazy(() => import("./Components/ClinicCalendarPage"));
// const TransferConfirm = lazy(() => import("./Components/TransferConfirm"));
// const TransferConfirm_clinic = lazy(() => import("./Components/TransferConfirmClinic"));
// const Clinics = lazy(() => import("./Components/Clinics"));

// // 🔁 Lazy — Blog / Profile / Misc
// const Blogs = lazy(() => import("./Components/Blogs"));
// const BlogDetail = lazy(() => import("./Components/BlogDetail"));
// const AdminAddBlog = lazy(() => import("./Components/AdminAddBlog"));
// const DoctorProfile = lazy(() => import("./Components/DoctorProfile"));
// const DeleteAccount = lazy(() => import("./Components/DeleteAccount"));
// const FacebookReel = lazy(() => import("./Components/FacebookReel"));
// const FCMTokenPage = lazy(() => import("./Components/FCMTokenPage"));
// const OplivaAppointments = lazy(() => import("./Components/Opliva/OplivaAppointments"));
// const OplivaPayments = lazy(() => import("./Components/OplivaPayments"));
// const OplivaSessions = lazy(() => import("./Components/OplivaSessions"));

// /* ------------------------------------
//    Shared fallback
// ------------------------------------ */
// const PageLoader = () => <div className="text-center py-10">Loading...</div>;

// /* ------------------------------------
//    Layout Wrapper
// ------------------------------------ */
// function Layout({ children }) {
//   const location = useLocation();

//   const hideHeaderFooterRoutes = ["/consult/", "/doctor/join/"];

//   const shouldHideLayout = hideHeaderFooterRoutes.some((path) =>
//     location.pathname.startsWith(path)
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 relative overflow-hidden">
//       {!shouldHideLayout && <Header />}
//       {!shouldHideLayout && <FloatingWhatsApp />}
//       {children}
//       {!shouldHideLayout && <Footer />}
//     </div>
//   );
// }

// /* ------------------------------------
//    App
// ------------------------------------ */
// const App = () => {
//   return (
//     <Router>
//       <ScrollToTop />
//       <Layout>
//         <Suspense fallback={<PageLoader />}>
//           <Routes>
//             {/* 🏠 Home Page — all eager, no Suspense needed here */}
//             <Route
//               path="/"
//               element={
//                 <>
//                   <HeroSection />
//                   <OurServices />
//                   <DoctorScroll />
//                   <FounderReelSection />
//                   <HowItWorks />
//                   <WhyChooseUs />
//                   <BMICalculator />
//                   <OurClinics />
//                   <Testimonials />
//                 </>
//               }
//             />

//             {/* 🩺 General */}
//             <Route path="/bmi_calculator" element={<BMICalculator />} />
//             <Route path="/about-us" element={<Aboutus />} />
//             <Route path="/book-appointment" element={<Appointment />} />

//             {/* 💊 Services */}
//             <Route path="/pain-relief" element={<PainRelief />} />
//             <Route path="/fitness-nutrition" element={<FitnessNutrition />} />
//             <Route path="/life-style-diseases" element={<LifestyleDiseases />} />
//             <Route path="/sexual-wellness" element={<SexualWellness />} />

//             {/* 📄 Legal / Info */}
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/terms_of_service" element={<TermsOfService />} />
//             <Route path="/code_of_conduct" element={<CodeOfConduct />} />
//             <Route path="/faq" element={<FAQ />} />

//             {/* 🦴 Pain sub-pages */}
//             <Route path="/pain-relief/back-pain" element={<BackPain />} />
//             <Route path="/pain-relief/neck-pain" element={<NeckPain />} />
//             <Route path="/pain-relief/knee-pain" element={<KneePain />} />
//             <Route path="/pain-relief/sports-injury" element={<SportsInjury />} />
//             <Route path="/pain-relief/elbow-pain" element={<ElbowPain />} />
//             <Route path="/pain-relief/shoulder-pain" element={<ShoulderPain />} />
//             <Route path="/pain-relief/neuro-conditions" element={<NeurologicalConditions />} />

//             {/* 👤 Patient / Admin */}
//             <Route path="/patient/:id" element={<PatientView />} />
//             <Route path="/consult/:roomName" element={<PatientConsult />} />
//             <Route path="/doctor/join/:roomName" element={<DoctorJoin />} />
//             <Route path="/admin/login" element={<Login />} />
//             <Route path="/consent/:appointmentId" element={<ConcernForm />} />
//             <Route path="/reschedule/request/:addSessionId/:index" element={<RescheduleRequestPage />} />
//             <Route path="/reschedule/review/:addSessionId/:index" element={<RescheduleReview />} />

//             {/* 🏥 Clinic */}
//             <Route path="/clinic_admin/login" element={<SalesLogin />} />
//             <Route path="/calendar/admin/:username/:doctorId" element={<CalendarPage />} />
//             <Route path="/clinic_registration" element={<ClinicRegistration />} />
//             <Route path="/admin/:username/:clinicAdminId" element={<ClinicRegistrationDashboard />} />
//             <Route path="/clinic/login" element={<ClinicLogin />} />
//             <Route path="/clinic/register" element={<ClinicRegister />} />
//             <Route path="/clinic/dashboard/UzI1NiIsInR5cCI6Ikp7GR2-s85s" element={<ClinicDashboard />} />
//             <Route path="/clinic/onboard/:id" element={<ClinicRegistrationWithSignature />} />
//             <Route path="/clinic/patients/add" element={<AddPatient />} />
//             <Route path="/clinic/appointments/:clinicId" element={<ClinicAppointments />} />
//             <Route path="/clinic/calendar/:clinicId" element={<ClinicCalendarPage />} />
//             <Route path="/transfers/confirm/:id" element={<TransferConfirm />} />
//             <Route path="/transfers/confirm_clinic/:id" element={<TransferConfirm_clinic />} />
//                        <Route path="/clinics/:stateName" element={<Clinics />} />
//            <Route path="/clinics/:stateName/:districtName" element={<Clinics />} />
//             <Route path="/clinics" element={<Clinics />} />

//             {/* 📝 Blog */}
//             <Route path="/blogs" element={<Blogs />} />
//             <Route path="/blogs/:slug" element={<BlogDetail />} />
//             <Route path="/admin/blogs/add" element={<AdminAddBlog />} />

//             {/* 🔧 Misc */}
//             <Route path="/delete-account" element={<DeleteAccount />} />
//             <Route path="/facebook_reel" element={<FacebookReel />} />
//             <Route path="/fcm-token" element={<FCMTokenPage />} />

//             {/* 📊 Opliva Admin */}
//             <Route path="/admin/opliva-appointments" element={<OplivaAppointments />} />
//             <Route path="/admin/opliva-payments" element={<OplivaPayments />} />
//             <Route path="/admin/opliva-sessions" element={<OplivaSessions />} />

//             {/* 🩺 Doctor Profile — keep last (catch-all slug) */}
//             <Route path="/:slug" element={<DoctorProfile />} />
//           </Routes>
//         </Suspense>
//       </Layout>
//     </Router>
//   );
// };

// export default App;