// // FAQ.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// const BRAND = {
//   primary: "#1e8fd3",
//   text: "#4d4d4d",
// };

// export default function FAQ() {
//   const handlePrint = () => window.print();

//   return (
//     <main className="min-h-screen py-25 px-6 md:px-12 lg:px-24 bg-white text-gray-800">
//       <div className="max-w-4xl mx-auto">
//         <header className="mb-8">
//           <h1
//             className="text-3xl md:text-4xl font-semibold"
//             style={{ color: BRAND.text }}
//           >
//             Asked Questions (FAQ)
//           </h1>
//           <p className="mt-2 text-sm text-gray-600">
//             Last updated: <strong>November 3, 2025</strong>
//           </p>

//           <div className="mt-4 flex gap-3">
//             <button
//               onClick={handlePrint}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white text-sm shadow-md hover:scale-[1.01] transition"
//             >
//               Print
//             </button>

//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
//             >
//               Back to Home
//             </Link>
//           </div>
//         </header>

//         <article className="prose prose-slate max-w-none">

//           {/* ABOUT */}
//           <section>
//             <h2>About Zeromedixine</h2>

//             <div className="mt-4 space-y-6">
//               <div>
//                 <h3>1. What is Zeromedixine?</h3>
//                 <p>
//                   Zeromedixine is a wellness and rehabilitation platform that connects you with qualified
//                   physiotherapists, nutritionists, and pain specialists — all working together to help you recover
//                   naturally, without depending on tablets or surgery.
//                 </p>
//               </div>

//               <div>
//                 <h3>2. What kind of conditions do you treat?</h3>
//                 <p>
//                   We focus on pain management, post-injury rehabilitation, diabetic reversal, fitness improvement,
//                   weight loss, and overall metabolic wellness. Our programs are personalized for your unique body
//                   type and condition.
//                 </p>
//               </div>

//               <div>
//                 <h3>3. Is Zeromedixine a hospital or clinic?</h3>
//                 <p>
//                   No. Zeromedixine is not a hospital or emergency care provider. We offer therapeutic and wellness
//                   consultations — online or at partnered centers — designed to support healing and prevention, not
//                   emergency diagnosis or treatment.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* CONSULTATIONS */}
//           <section className="mt-10">
//             <h2>Consultations & Appointments</h2>

//             <div className="mt-4 space-y-6">
//               <div>
//                 <h3>4. How can I book a session?</h3>
//                 <p>
//                   You can book directly through our website or partner centers. Once you fill out your details, our
//                   team connects you with the best specialist based on your condition and location.
//                 </p>
//               </div>

//               <div>
//                 <h3>5. Are consultations online or in-person?</h3>
//                 <p>
//                   Both options are available. You can choose an online consultation via video call or an in-person
//                   session at one of our verified Zeromedixine partner clinics or wellness centers.
//                 </p>
//               </div>

//               <div>
//                 <h3>6. Who are the professionals on Zeromedixine?</h3>
//                 <p>
//                   We work only with certified physiotherapists, nutritionists, fitness experts, and rehabilitation
//                   specialists with verified qualifications and experience.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* PAYMENTS */}
//           <section className="mt-10">
//             <h2>Payments & Refunds</h2>

//             <div className="mt-4 space-y-6">
//               <div>
//                 <h3>7. How do I pay for a session?</h3>
//                 <p>
//                   Payments can be made securely through our online platform or at the clinic. All major payment options
//                   are accepted, including UPI, credit/debit cards, and wallets.
//                 </p>
//               </div>

//               <div>
//                 <h3>8. What is your refund policy?</h3>
//                 <p>
//                   If you cancel a session at least 12 hours before your appointment, you are eligible for a full refund
//                   or rescheduling credit. Cancellations made after that window may not be refunded, as the slot is reserved
//                   for you. If a therapist cancels or is unavailable, you’ll receive a 100% refund or a free reschedule.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* PRIVACY */}
//           <section className="mt-10">
//             <h2>Privacy & Safety</h2>

//             <div className="mt-4 space-y-6">
//               <div>
//                 <h3>9. Is my data safe with Zeromedixine?</h3>
//                 <p>
//                   Absolutely. We maintain strict confidentiality and comply with all data protection laws. Your personal
//                   and health information is never shared without your explicit consent.
//                 </p>
//               </div>

//               <div>
//                 <h3>10. Are your consultations private?</h3>
//                 <p>
//                   Yes. All online consultations are conducted over secure, encrypted platforms, ensuring complete privacy
//                   between you and your therapist.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* THERAPY */}
//           <section className="mt-10">
//             <h2>Therapy & Results</h2>

//             <div className="mt-4 space-y-6">
//               <div>
//                 <h3>11. How soon will I see results?</h3>
//                 <p>
//                   Results vary depending on your condition, lifestyle, and consistency. Most clients notice visible
//                   improvement in 2–6 weeks when they follow the recommended plan.
//                 </p>
//               </div>

//               <div>
//                 <h3>12. Can Zeromedixine replace my doctor?</h3>
//                 <p>
//                   No. We complement, not replace, your physician’s care. Zeromedixine is focused on wellness,
//                   rehabilitation, and preventive health, not emergency medical treatment or diagnosis.
//                 </p>
//               </div>


//             <div>
//                 <h3>13. Who is the best physiotherapist in Bengaluru?</h3>
//                 <p>
//                   Zeromedixine offers access to certified, experienced physiotherapists in Bengaluru via online
//                   consultations and offline clinics across the city.
//                 </p>
//               </div>

//               <div>
//                 <h3>14. Is Zeromedixine available in my city?</h3>
//                 <p>
//                   Our services are available across India through online consultation, giving you access to expert care instantly.
//                 </p>
//               </div>

//               <div>
//                 <h3>15. What is advanced physiotherapy for chronic pain in India?</h3>
//                 <p>
//                   It is a non-surgical, evidence-based treatment approach that focuses on identifying and treating the
//                   root cause of pain using personalized rehab, movement therapy, and expert guidance.
//                 </p>

//               </div>

//               <div>
//                 <h3>16. Can I start treatment immediately in my city?</h3>
//                 <p>
//                 Yes, you can start your treatment immediately after booking an online consultation, no waiting required
//                 </p>
//                 </div>
//               </div>
//           </section>

//           {/* SUPPORT */}
      

            
//               <section className="mt-10">
//             <h2>Support & Contact</h2>

//             <div className="mt-4 space-y-6">
//               <div>
//                 <h3>17. How can I contact Zeromedixine support?</h3>
//                 <p>
//                   📩 Email: <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a><br />
//                   We usually respond within 24 hours on working days.
//                 </p>
//               </div>

//               <div>
//                 <h3>18. Can I give feedback or report an issue?</h3>
//                 <p>
//                   Yes! We encourage honest feedback. You can submit it through our website or email us at
//                   hello@zeromedixine.com.
//                 </p>
//               </div>
//             </div>
//           </section>

//           <footer className="mt-10 text-sm text-gray-600">
//             <p>
//               If you have other questions not listed here, please reach out and we’ll be happy to help.
//             </p>
//           </footer>

//         </article>
//       </div>
//     </main>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const BRAND = {
  primary: "#1e8fd3",
  text: "#4d4d4d",
};

export default function FAQ() {
  const handlePrint = () => window.print();

  return (
    <>
      {/* ✅ SEO Schema */}
      <Helmet>
        <script type="application/ld+json">
        {JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Zeromedixine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zeromedixine is a wellness and rehabilitation platform that connects you with qualified physiotherapists, nutritionists, and pain specialists — all working together to help you recover naturally, without depending on tablets or surgery."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of conditions do you treat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We focus on pain management, post-injury rehabilitation, diabetic reversal, fitness improvement, weight loss, and overall metabolic wellness. Our programs are personalized for your unique body type and condition."
      }
    },
    {
      "@type": "Question",
      "name": "Is Zeromedixine a hospital or clinic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Zeromedixine is not a hospital or emergency care provider. We offer therapeutic and wellness consultations — online or at partnered centers — designed to support healing and prevention, not emergency diagnosis or treatment."
      }
    },
    {
      "@type": "Question",
      "name": "How can I book a session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can book directly through our website or partner centers. Once you fill out your details, our team connects you with the best specialist based on your condition and location."
      }
    },
    {
      "@type": "Question",
      "name": "Are consultations online or in-person?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both options are available. You can choose an online consultation via video call or an in-person session at one of our verified Zeromedixine partner clinics or wellness centers."
      }
    },
    {
      "@type": "Question",
      "name": "Who are the professionals on Zeromedixine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work only with certified physiotherapists, nutritionists, fitness experts, and rehabilitation specialists with verified qualifications and experience."
      }
    },
    {
      "@type": "Question",
      "name": "How do I pay for a session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payments can be made securely through our online platform or at the clinic. All major payment options are accepted, including UPI, credit/debit cards, and wallets."
      }
    },
    {
      "@type": "Question",
      "name": "What is your refund policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you cancel a session at least 12 hours before your appointment, you are eligible for a full refund or rescheduling credit. Cancellations made after that window may not be refunded, as the slot is reserved for you. If a therapist cancels or is unavailable, you’ll receive a 100% refund or a free reschedule."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data safe with Zeromedixine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We maintain strict confidentiality and comply with all data protection laws. Your personal and health information is never shared without your explicit consent."
      }
    },
    {
      "@type": "Question",
      "name": "Are your consultations private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All online consultations are conducted over secure, encrypted platforms, ensuring complete privacy between you and your therapist."
      }
    },
    {
      "@type": "Question",
      "name": "How soon will I see results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Results vary depending on your condition, lifestyle, and consistency. Most clients notice visible improvement in 2–6 weeks when they follow the recommended plan."
      }
    },
    {
      "@type": "Question",
      "name": "Can Zeromedixine replace my doctor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. We complement, not replace, your physician’s care. Zeromedixine is focused on wellness, rehabilitation, and preventive health, not emergency medical treatment or diagnosis."
      }
    },
    {
      "@type": "Question",
      "name": "Who is the best physiotherapist in Bengaluru?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zeromedixine offers access to certified, experienced physiotherapists in Bengaluru via online consultations and offline clinics across the city."
      }
    },
    {
      "@type": "Question",
      "name": "Is Zeromedixine available in my city?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our services are available across India through online consultation, giving you access to expert care instantly."
      }
    },
    {
      "@type": "Question",
      "name": "What is advanced physiotherapy for chronic pain in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a non-surgical, evidence-based treatment approach that focuses on identifying and treating the root cause of pain using personalized rehab, movement therapy, and expert guidance."
      }
    },
    {
      "@type": "Question",
      "name": "Can I start treatment immediately in my city?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can start your treatment immediately after booking an online consultation, no waiting required"
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Zeromedixine support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Email us at hello@zeromedixine.com. We respond within 24 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Can I give feedback or report an issue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We encourage honest feedback. You can submit it through our website or email us at hello@zeromedixine.com."
      }
    }
  ]
})}
        </script>
      </Helmet>

      {/* ✅ UI */}
      <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1
              className="text-3xl md:text-4xl font-semibold"
              style={{ color: BRAND.text }}
            >
              Asked Questions (FAQ)
            </h1>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white text-sm shadow-md"
              >
                Print
              </button>

              <Link
                to="/"
                className="px-4 py-2 rounded-full border text-sm"
              >
                Back to Home
              </Link>
            </div>
          </header>

          {/* FAQ LIST */}
          <div className="space-y-8">

<div>
  <h3 className="font-semibold">1. What is Zeromedixine?</h3>
  <p>Zeromedixine is a wellness and rehabilitation platform that connects you with qualified physiotherapists, nutritionists, and pain specialists — all working together to help you recover naturally, without depending on tablets or surgery.</p>
</div>

<div>
  <h3 className="font-semibold">2. What kind of conditions do you treat?</h3>
  <p>We focus on pain management, post-injury rehabilitation, diabetic reversal, fitness improvement, weight loss, and overall metabolic wellness. Our programs are personalized for your unique body type and condition.</p>
</div>

<div>
  <h3 className="font-semibold">3. Is Zeromedixine a hospital or clinic?</h3>
  <p>No. Zeromedixine is not a hospital or emergency care provider. We offer therapeutic and wellness consultations — online or at partnered centers — designed to support healing and prevention, not emergency diagnosis or treatment.
</p>
</div>

<div>
  <h3 className="font-semibold">4. How can I book a session?</h3>
  <p>You can book directly through our website or partner centers. Once you fill out your details, our team connects you with the best specialist based on your condition and location.
</p>
</div>

<div>
  <h3 className="font-semibold">5. Are consultations online or in-person?</h3>
  <p>Both options are available. You can choose an online consultation via video call or an in-person session at one of our verified Zeromedixine partner clinics or wellness centers.</p>
</div>

<div>
  <h3 className="font-semibold">6. Who are the professionals on Zeromedixine?</h3>
  <p>We work only with certified physiotherapists, nutritionists, fitness experts, and rehabilitation specialists with verified qualifications and experience.
</p>
</div>

<div>
  <h3 className="font-semibold">7. How do I pay for a session?</h3>
  <p>Payments can be made securely through our online platform or at the clinic. All major payment options are accepted, including UPI, credit/debit cards, and wallets.</p>
</div>

<div>
  <h3 className="font-semibold">8. What is your refund policy?</h3>
  <p>If you cancel a session at least 12 hours before your appointment, you are eligible for a full refund or rescheduling credit. Cancellations made after that window may not be refunded, as the slot is reserved for you. If a therapist cancels or is unavailable, you’ll receive a 100% refund or a free reschedule.
</p>
</div>

<div>
  <h3 className="font-semibold">9. Is my data safe with Zeromedixine?</h3>
  <p>Absolutely. We maintain strict confidentiality and comply with all data protection laws. Your personal and health information is never shared without your explicit consent.</p>
</div>

<div>
  <h3 className="font-semibold">10. Are your consultations private?</h3>
  <p>Yes. All online consultations are conducted over secure, encrypted platforms, ensuring complete privacy between you and your therapist.</p>
</div>

<div>
  <h3 className="font-semibold">11. How soon will I see results?</h3>
  <p>Results vary depending on your condition, lifestyle, and consistency. Most clients notice visible improvement in 2–6 weeks when they follow the recommended plan.</p>
</div>

<div>
  <h3 className="font-semibold">12. Can Zeromedixine replace my doctor?</h3>
  <p>No. We complement, not replace, your physician’s care. Zeromedixine is focused on wellness, rehabilitation, and preventive health, not emergency medical treatment or diagnosis.</p>
</div>

<div>
  <h3 className="font-semibold">13. Who is the best physiotherapist in Bengaluru?</h3>
  <p>Zeromedixine offers access to certified, experienced physiotherapists in Bengaluru via online consultations and offline clinics across the city.</p>
</div>

<div>
  <h3 className="font-semibold">14. Is Zeromedixine available in my city?</h3>
  <p>Our services are available across India through online consultation, giving you access to expert care instantly.</p>
</div>

<div>
  <h3 className="font-semibold">15. What is advanced physiotherapy for chronic pain in India?</h3>
  <p>It is a non-surgical, evidence-based treatment approach that focuses on identifying and treating the root cause of pain using personalized rehab, movement therapy, and expert guidance.</p>
</div>

<div>
  <h3 className="font-semibold">16. Can I start treatment immediately in my city?</h3>
  <p>Yes, you can start your treatment immediately after booking an online consultation, no waiting required</p>
</div>

<div>
  <h3 className="font-semibold">17. How can I contact Zeromedixine support?</h3>
  <p>Email us at hello@zeromedixine.com. We respond within 24 hours.</p>
</div>

<div>
  <h3 className="font-semibold">18. Can I give feedback or report an issue?</h3>
  <p>Yes! We encourage honest feedback. You can submit it through our website or email us at hello@zeromedixine.com.
</p>
</div>

</div>
        </div>
      </main>
    </>
  );
}