// PrivacyPolicy.jsx
import React from "react";
import { Link } from "react-router-dom";

const BRAND = {
  primary: "#1e8fd3",
  text: "#4d4d4d",
};

export default function PrivacyPolicy() {
  const handlePrint = () => window.print();

  return (
<main className="min-h-screen bg-white text-gray-800 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold" style={{ color: BRAND.text }}>
            Privacy Policy Agreement
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
            <p>
              This Privacy Policy Agreement (“Agreement”) is entered into by and between House of humans
              healthcare Private Limited, a company incorporated under the Companies Act, 2013, having its
              registered office at , Kochi, Kerala, India (“Company”, “we”, “our”, “us”), and any individual
              or entity (“User”, “you”, “your”) accessing or using our website www.zeromedixine.com, mobile
              application(s), or any related services, platforms, and communication channels (collectively,
              the “Platform” or “Services”).
            </p>

            <p>
              By accessing or using the Platform, you expressly consent to the terms of this Privacy Policy and
              authorize Zeromedixine to collect, use, store, and process your personal information in
              accordance with this Agreement. If you do not agree to the terms herein, you must refrain from
              using the Platform. This Agreement is compliant with the provisions of the Information Technology
              Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive
              Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023, as
              applicable in India.
            </p>
          </section>

          <section>
            <h2>2. Definitions</h2>
            <p>For the purpose of this Agreement:</p>
            <ol>
              <li>
                <strong>“Personal Data”</strong> means any data relating to an identified or identifiable natural
                person, including name, contact details, demographic data, and medical information voluntarily
                provided by the User.
              </li>
              <li>
                <strong>“Sensitive Personal Data”</strong> includes health records, biometric data, and any other
                information classified as sensitive under applicable law.
              </li>
              <li>
                <strong>“Processing”</strong> means any operation performed on personal data, including
                collection, storage, disclosure, transfer, or deletion.
              </li>
              <li>
                <strong>“Third Party”</strong> means any person or entity other than the User and the Company.
              </li>
            </ol>
          </section>

          <section>
            <h2>3. Information We Collect</h2>
            <p>The Company may collect and process the following categories of data:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, gender, date of birth, contact number, email address,
                and location details.
              </li>
              <li>
                <strong>Health Information:</strong> Details shared voluntarily during consultations, including
                symptoms, medical history, or lifestyle information relevant to wellness programs.
              </li>
              <li>
                <strong>Payment Information:</strong> Billing details and limited payment data processed via secure
                third-party gateways.
              </li>
              <li>
                <strong>Technical Data:</strong> Device information, IP address, browser type, cookies, and usage
                analytics.
              </li>
            </ul>
            <p>All such data is collected either directly from the User or through automated systems during the use
            of the Platform.</p>
          </section>

          <section>
            <h2>4. Purpose of Data Collection</h2>
            <p>The Company collects and processes User information for the following lawful purposes:</p>
            <ul>
              <li>To register and manage User accounts on the Platform;</li>
              <li>To enable appointment scheduling, therapy recommendations, and wellness consultations;</li>
              <li>To improve the quality, personalization, and security of the Services;</li>
              <li>To communicate with Users regarding bookings, updates, and relevant health information;</li>
              <li>To comply with legal obligations, prevent fraud, and ensure data security.</li>
            </ul>
            <p>The Company shall not sell, rent, or commercially exploit any User’s Personal Data.</p>
          </section>

          <section>
            <h2>5. Consent</h2>
            <p>
              By using the Platform, the User expressly grants consent to the Company for the collection, storage,
              and lawful processing of Personal Data as set out herein. Users may withdraw consent at any time by
              writing to <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a>, subject to the
              understanding that such withdrawal may limit the Company’s ability to provide certain Services.
            </p>
          </section>

          <section>
            <h2>6. Data Sharing and Disclosure</h2>
            <p>The Company may disclose User information only under the following circumstances:</p>
            <ul>
              <li>To Partner Clinics and Practitioners for the purpose of fulfilling service requests or appointments;</li>
              <li>To Payment Gateways and financial intermediaries for transaction processing;</li>
              <li>To Legal or Regulatory Authorities when disclosure is required by applicable law or judicial process;</li>
              <li>To Service Providers such as hosting, analytics, and IT support vendors, bound by confidentiality and data protection obligations.</li>
            </ul>
            <p>The Company shall not share or disclose Personal Data to any Third Party for advertising or marketing purposes without explicit consent.</p>
          </section>

          <section>
            <h2>7. Security Measures</h2>
            <p>The Company adopts industry-standard administrative, physical, and technical safeguards to protect User information, including:</p>
            <ul>
              <li>SSL encryption for data transmission;</li>
              <li>Secure servers and firewalls;</li>
              <li>Restricted access based on need-to-know principles;</li>
              <li>Regular system audits and monitoring.</li>
            </ul>
            <p>While the Company maintains high security standards, it shall not be held liable for breaches arising from circumstances beyond its reasonable control.</p>
          </section>

          <section>
            <h2>8. Data Retention</h2>
            <p>The Company shall retain User data only for as long as necessary to fulfill the purposes stated herein or as required by law. Upon written request from the User, and subject to applicable laws, the Company shall delete or anonymize such data within a reasonable period.</p>
          </section>

          <section>
            <h2>9. User Rights</h2>
            <p>Subject to applicable law, Users have the following rights with respect to their Personal Data:</p>
            <ul>
              <li><strong>Right to Access:</strong> To obtain a copy of the information held about them.</li>
              <li><strong>Right to Correction:</strong> To rectify inaccurate or incomplete data.</li>
              <li><strong>Right to Erasure:</strong> To request deletion of their data (“Right to be Forgotten”).</li>
              <li><strong>Right to Withdraw Consent:</strong> To revoke prior consent for data processing.</li>
            </ul>
            <p>All such requests may be sent to <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a> and shall be addressed within thirty (30) business days.</p>
          </section>

          <section>
            <h2>10. Cookies and Tracking Technologies</h2>
            <p>The Platform uses cookies and similar technologies to enhance User experience, analyze site performance, and personalize content. Users may disable cookies through their browser settings; however, certain functionalities of the Platform may become unavailable as a result.</p>
          </section>

          <section>
            <h2>11. Minor Users</h2>
            <p>The Platform is intended solely for individuals aged eighteen (18) years or above. The Company does not knowingly collect or process data from minors. Any such data inadvertently collected shall be deleted upon discovery.</p>
          </section>

          <section>
            <h2>12. Third-Party Links</h2>
            <p>The Platform may contain links to external websites or services. The Company does not control or endorse, and shall not be responsible for, the content or privacy practices of such Third Parties. Users are advised to review their respective privacy policies independently.</p>
          </section>

          <section>
            <h2>13. Amendments</h2>
            <p>The Company reserves the right to modify or update this Agreement from time to time to reflect changes in legal requirements or business operations. All amendments shall be effective upon posting on the Platform with a revised “Last Updated” date. Continued use of the Platform constitutes deemed acceptance of the revised Agreement.</p>
          </section>

          <section>
            <h2>14. Governing Law and Jurisdiction</h2>
            <p>This Agreement shall be governed by and construed in accordance with the laws of India. Any dispute arising hereunder shall be subject to the exclusive jurisdiction of the competent courts at Kochi, Kerala, India.</p>
          </section>

          <section>
            <h2>15. Contact Information</h2>
            <p>For any grievances, data access requests, or privacy-related concerns, please contact the Company’s Data Protection Officer (DPO):</p>
            <address>
              <strong>Data Protection Officer</strong><br />
              House of humans healthcare Private Limited<br />
              📧 <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a><br />
              🌐 <a href="https://www.zeromedixine.com">www.zeromedixine.com</a><br />
              📍 Kochi, Kerala, India
            </address>
          </section>

          <footer className="mt-8 text-sm text-gray-600">
            <p>
              By using our Platform you agree to this Privacy Policy. Please reach out to <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a> if you have any questions.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
