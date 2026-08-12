// CodeOfConduct.jsx
import React from "react";
import { Link } from "react-router-dom";

const BRAND = {
  primary: "#1e8fd3",
  text: "#4d4d4d",
};

export default function CodeOfConduct() {
  const handlePrint = () => window.print();

  return (
    <main className="min-h-screen py-25 px-6 md:px-12 lg:px-24 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: BRAND.text }}
          >
            Code of Conduct – Zeromedixine
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
          <p>
            At <strong>Zeromedixine</strong>, we believe healing thrives in an environment built on
            respect, honesty, and compassion. This Code of Conduct outlines how all users—
            patients, practitioners, and partners—should engage with one another through our
            platform.
          </p>

          <section>
            <h2>1. Respect and Professionalism</h2>
            <p>
              Everyone deserves to be treated with dignity. All communication—whether in person,
              through chat, or during therapy—must remain courteous, respectful, and free from
              harassment, discrimination, or abuse of any kind.
            </p>
          </section>

          <section>
            <h2>2. Honesty and Transparency</h2>
            <p>
              Users must provide accurate personal, medical, and contact information. Concealing or
              falsifying information about your health, identity, or payment may affect your therapy
              outcomes and violate our platform terms.
            </p>
          </section>

          <section>
            <h2>3. Confidentiality</h2>
            <p>
              Privacy is sacred. Therapists and nutritionists are bound to maintain professional
              confidentiality. Likewise, users are expected not to record, share, or disclose private
              sessions, documents, or communications without explicit consent.
            </p>
          </section>

          <section>
            <h2>4. Responsible Use of Services</h2>
            <p>
              Our platform is designed for wellness, rehabilitation, and pain management—not for
              emergency medical treatment. Users should seek immediate hospital care in case of
              urgent or life-threatening conditions. Zeromedixine’s specialists are here to support
              recovery and lifestyle improvement, not emergency diagnosis.
            </p>
          </section>

          <section>
            <h2>5. Respect for Time and Appointments</h2>
            <p>
              Please attend scheduled consultations punctually or cancel/reschedule at least 12
              hours in advance. Repeated no-shows or last-minute cancellations may result in
              suspension of services.
            </p>
          </section>

          <section>
            <h2>6. No Misuse or Exploitation</h2>
            <p>
              Users must not use Zeromedixine for unlawful, unethical, or promotional purposes. Any
              attempt to solicit, advertise, or exploit practitioners or clients through the platform
              will lead to termination of access.
            </p>
          </section>

          <section>
            <h2>7. Feedback and Continuous Growth</h2>
            <p>
              We welcome constructive feedback to help improve your experience. However, reviews or
              complaints must remain factual, respectful, and free from defamatory language.
            </p>
          </section>

          <section>
            <h2>8. Zero Tolerance Policy</h2>
            <p>
              Zeromedixine maintains a strict zero-tolerance policy for:
            </p>
            <ul>
              <li>Harassment, bullying, or inappropriate communication</li>
              <li>Discrimination based on gender, religion, caste, or background</li>
              <li>Threats or abusive behavior toward staff or practitioners</li>
            </ul>
            <p>
              Violations may result in suspension or permanent removal from the platform.
            </p>
          </section>

          <footer className="mt-8 text-sm text-gray-600">
            <p>
              By using Zeromedixine, you agree to uphold this Code of Conduct and contribute to a
              safe, respectful, and supportive wellness community.
            </p>
            <p className="mt-2">
              For concerns or violations, contact us at{" "}
              <a href="mailto:hello@zeromedixine.com">hello@zeromedixine.com</a>.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
