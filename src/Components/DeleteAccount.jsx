import React from "react";

const DeleteAccount = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 md:p-10">
        <h1 className="text-3xl font-bold text-[#1e8fd3] mb-6">
          Zeromedixine – Account Deletion Request
        </h1>

        <p className="text-gray-700 mb-4">
          Zeromedixine allows Patients, Doctors, and Clinics to request deletion
          of their account and associated personal data.
        </p>

        <p className="text-gray-700 mb-4">
          To request deletion of your Zeromedixine account, please email us at:
        </p>

        <p className="mb-4">
          📧{" "}
          <a
            href="mailto:support@zeromedixine.com"
            className="text-[#1e8fd3] font-medium hover:underline"
          >
            support@zeromedixine.com
          </a>
        </p>

        <p className="text-gray-700 mb-6">
          <span className="font-semibold">Email subject:</span> Account Deletion
          Request
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Please include the following details:
        </h2>

        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Registered username, email address, or phone number</li>
          <li>User role (Patient / Doctor / Clinic)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Data deleted
        </h2>
        <p className="text-gray-700 mb-6">
          Upon verification, we will delete your account profile, login
          credentials (username and password), and personal identifiers
          associated with your Zeromedixine account.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Data retention
        </h2>
        <p className="text-gray-700">
          Certain medical or transactional records may be retained for a limited
          period if required by applicable healthcare or legal regulations. Such
          data will be securely stored and permanently deleted once the retention
          period expires.
        </p>

        <div className="mt-8 border-t pt-4 text-sm text-gray-500">
          If you have any questions, please contact our support team.
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
