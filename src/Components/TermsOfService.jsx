// TermsOfService.jsx
import React from "react";
import { Link } from "react-router-dom";

const BRAND = {
  primary: "#1e8fd3",
  text: "#4d4d4d",
};

export default function TermsOfService() {
  const handlePrint = () => window.print();

  return (
    <main className="min-h-screen py-25 px-6 md:px-12 lg:px-24 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold" style={{ color: BRAND.text }}>
            Terms of Service & Refund Policy Agreement
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Last updated: <strong>November 3, 2025</strong>
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white text-sm shadow-md hover:scale-[1.01] transition"
            >
              Print
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </header>

        <article className="prose prose-slate max-w-none">
          <section>
            <h2>1. Introduction</h2>
            <p>
              This Terms of Service & Refund Policy Agreement (“Agreement”) is entered into by and between
              Zeromedixine Health Technologies Private Limited, a company incorporated under the Companies Act,
              2013, having its registered office at [Insert Address], Kochi, Kerala, India (hereinafter referred to
              as “Company”, “we”, “our”, or “us”), and any individual or entity (hereinafter referred to as the
              “User”, “you”, or “your”) accessing or using the Company’s website, mobile application, or services
              (collectively referred to as the “Platform”).
            </p>
            <p>
              By using or accessing the Platform, you acknowledge that you have read, understood, and agreed to
              be legally bound by the terms of this Agreement. If you do not agree to these terms, you must refrain
              from using the Platform or any Services offered through it.
            </p>
          </section>

          <section>
            <h2>2. Definitions</h2>
            <p>
              <strong>Services:</strong> all health, wellness, and digital consultation offerings, including pain
              management, diabetic reversal, sexual wellness, fitness, and nutrition guidance provided through the
              Platform.
            </p>
            <p>
              <strong>Partner Clinics or Practitioners:</strong> third-party wellness centers, therapists, or
              healthcare professionals registered on the Zeromedixine platform.
            </p>
            <p>
              <strong>User Account:</strong> the registered profile created by an individual to access Zeromedixine’s
              Services.
            </p>
            <p>
              <strong>Consultation:</strong> any appointment, therapy, or wellness session scheduled through the
              Platform.
            </p>
          </section>

          <section>
            <h2>3. Nature of Services</h2>
            <p>
              The Company provides non-invasive, non-surgical, and non-pharmaceutical health and wellness solutions.
              Zeromedixine acts as a digital facilitator connecting Users with independent Partner Clinics,
              physiotherapists, nutritionists, yoga experts, and wellness professionals. The Company provides direct
              consultations and therapy sessions through certified physiotherapists, nutritionists, and pain
              management specialists.
            </p>
            <p>
              All such consultations and therapies are designed exclusively for purposes of wellness, physical
              rehabilitation, functional recovery, and lifestyle improvement. The Company’s services are
              non-surgical, non-pharmaceutical, and non-emergency in nature. While the therapies may support recovery
              from chronic conditions or functional limitations, they are not intended to replace treatment
              prescribed by a licensed physician or hospital-based medical care in cases of acute or critical illness.
            </p>
          </section>

          <section>
            <h2>4. User Eligibility and Account Obligations</h2>
            <ul>
              <li>Users must be 18 years or older and capable of entering into legally binding contracts under Indian law.</li>
              <li>Users agree to provide accurate, complete, and updated information while creating an account.</li>
              <li>Users are responsible for maintaining the confidentiality of their login credentials and all activities conducted through their account.</li>
              <li>The Company reserves the right to suspend or terminate accounts suspected of fraud, abuse, or policy violation.</li>
            </ul>
          </section>

          <section>
            <h2>5. Booking, Consultation, and Service Terms</h2>
            <ul>
              <li>Appointment slots and consultations are offered subject to availability of Partner Clinics or Practitioners.</li>
              <li>The Company shall not be responsible for any rescheduling, delay, or cancellation initiated by Partner Clinics or third parties.</li>
              <li>Users acknowledge that any treatment plans, therapies, or results are individual-specific and not guaranteed outcomes.</li>
              <li>The Company disclaims liability for any injury, reaction, or dissatisfaction arising from services rendered by Partner Clinics or Practitioners.</li>
            </ul>
          </section>

          <section>
            <h2>6. Payments and Billing</h2>
            <ul>
              <li>All payments for consultations, therapies, or wellness programs shall be made through secure online gateways integrated with the Platform.</li>
              <li>Prices displayed are in Indian Rupees (₹) and US $ of applicable taxes unless otherwise specified.</li>
              <li>The Company does not store or retain any financial details such as card numbers or UPI credentials.</li>
              <li>Upon successful payment, Users will receive a digital invoice or receipt via email or WhatsApp.</li>
            </ul>
          </section>

          <section>
            <h2>7. Refund & Cancellation Policy</h2>

            <h3>a. Refund Eligibility</h3>
            <p>Refunds are applicable only under the following circumstances:</p>
            <ul>
              <li>Duplicate payments or transaction errors due to technical issues.</li>
              <li>Service not rendered or appointment not fulfilled due to fault of the Platform or Partner Clinic.</li>
              <li>Cancellation requested within 24 hours of booking and before the session/consultation has commenced.</li>
            </ul>

            <h3>b. Refund Procedure</h3>
            <p>
              Users must send refund requests to <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a> with transaction details.
              Refunds, once approved, will be processed to the original payment method within 7–10 business days.
            </p>

            <h3>c. Non-Refundable Situations</h3>
            <ul>
              <li>Completed consultations, therapy sessions, or packages once availed.</li>
              <li>User dissatisfaction arising from personal expectations or subjective outcomes.</li>
              <li>No-shows or last-minute cancellations within 6 hours of scheduled time.</li>
            </ul>

            <h3>d. Rescheduling</h3>
            <p>
              Users may request rescheduling at least 12 hours prior to the booked slot. Acceptance of such requests shall
              be subject to Partner availability.
            </p>
          </section>

          <section>
            <h2>8. Intellectual Property Rights</h2>
            <p>
              All text, designs, software, trademarks, videos, graphics, and other content available on the Platform are the exclusive property of the Company.
              Users are granted a limited, non-transferable license to access and use the Platform solely for personal, non-commercial purposes.
              Any unauthorized reproduction, modification, or distribution of the content shall constitute a violation of copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2>9. Disclaimer of Liability</h2>
            <p>
              <strong>a. Transparency & Care</strong><br />
              Zeromedixine provides its services with the utmost care, accuracy, and commitment to your wellness. However, every individual’s body and health condition are unique, and results may vary from person to person.
            </p>
            <p>
              <strong>b. Service Nature</strong><br />
              All consultations and therapies offered through Zeromedixine are provided on a “best effort” basis — designed to support your healing, rehabilitation, and overall well-being. While our specialists are trained professionals, the Platform and its services are not substitutes for emergency medical care or hospital-based treatment.
            </p>
            <p>
              <strong>c. Limitation of Liability</strong><br />
              Zeromedixine and its professionals shall not be held responsible for any unexpected injury, side effect, or outcome that may arise due to factors beyond our control — such as pre-existing conditions, undisclosed medical history, or deviation from prescribed therapy plans.
            </p>
          </section>

          <section>
            <h2>10. Indemnity</h2>
            <p>
              The User agrees to indemnify and hold harmless the Company, its directors, employees, affiliates, and partners from any claims, damages, liabilities, or expenses arising out of:
            </p>
            <ul>
              <li>Misuse of the Platform;</li>
              <li>Breach of these Terms; or</li>
              <li>Violation of applicable laws or third-party rights.</li>
            </ul>
          </section>

          <section>
            <h2>11. Privacy and Data Protection</h2>
            <p>
              All personal data collected by the Company shall be processed in accordance with the Privacy Policy Agreement published on the Platform.
              By using the Services, the User consents to such data collection, processing, and transfer as detailed in the Privacy Policy.
            </p>
          </section>

          <section>
            <h2>12. Termination of Access</h2>
            <p>
              The Company reserves the right to suspend or terminate access to the Platform at any time, without notice, for violation of this Agreement or unlawful use of Services.
              Upon termination, all outstanding dues and obligations shall survive until settled.
            </p>
          </section>

          <section>
            <h2>13. Governing Law and Jurisdiction</h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts at Kochi, Kerala, India.
            </p>
          </section>

          <section>
            <h2>14. Amendments</h2>
            <p>
              The Company may revise, modify, or update this Agreement periodically. All such amendments shall become effective upon posting on the Platform with an updated “Last Updated” date.
              Continued use of the Platform shall constitute deemed acceptance of such changes.
            </p>
          </section>

          <section>
            <h2>15. Contact Information</h2>
            <p>
              For grievances, refund claims, or service-related issues, Users may contact:
            </p>
            <address>
              <strong>House of humans healthcare Private Limited</strong><br />
              📧 <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a><br />
              🌐 <a href="https://www.zeromedixine.com">www.zeromedixine.com</a><br />
              📍 Kochi, Kerala, India
            </address>
          </section>

          <footer className="mt-8 text-sm text-gray-600">
            <p>
              By using our Platform you agree to these Terms of Service & Refund Policy. Please reach out to <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a> if you have any questions.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
