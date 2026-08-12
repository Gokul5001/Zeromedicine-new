// import React, { useState } from "react";

// const BMICalculator = () => {
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [bmi, setBmi] = useState(null);
//   const [category, setCategory] = useState("");
//   const [needleAngle, setNeedleAngle] = useState(-90); // Needle start angle

//   const calculateBMI = () => {
//     const h = parseFloat(height);
//     const w = parseFloat(weight);
//     if (h > 0 && w > 0) {
//       const heightInMeters = h / 100;
//       const bmiValue = (w / (heightInMeters * heightInMeters));
//       const rounded = Number(bmiValue.toFixed(1));
//       setBmi(rounded);

//       if (rounded < 18.5) setCategory("Underweight 😕");
//       else if (rounded < 24.9) setCategory("Normal 😊");
//       else if (rounded < 29.9) setCategory("Overweight 😐");
//       else setCategory("Obese 😟");

//       // Convert BMI (0–40) to needle angle (-90° to +90°)
//       const normalized = Math.min(rounded / 40, 1);
//       const newAngle = -90 + normalized * 180;
//       setNeedleAngle(newAngle);
//     }
//   };

//   return (
//     <section
//       id="bmi"
//       className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 py-10"
//     >
//       {/* Card: use responsive width classes; don't use invalid Tailwind utilities */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md text-center">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
//           BMI{" "}
//           <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
//             Calculator
//           </span>
//         </h2>

//         <p className="text-gray-500 mb-6">
//           Check your Body Mass Index and visualize it on the speedometer gauge.
//         </p>

//         {/* Inputs: responsive grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 w-full">
//           <input
//             type="number"
//             placeholder="Height (cm)"
//             value={height}
//             onChange={(e) => setHeight(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="number"
//             placeholder="Weight (kg)"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <input
//             type="number"
//             placeholder="Age (years)"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//           <select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {/* Button */}
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={calculateBMI}
//             className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
//           >
//             Calculate BMI
//           </button>
//         </div>

//         {/* Gauge Section: responsive wrapper */}
//         <div className="mt-4 flex flex-col items-center">
//           <div className="w-full max-w-xs">
//             {/* SVG is responsive because of viewBox; container controls max width */}
//             <svg viewBox="0 0 200 100" className="w-full h-auto">
//               <defs>
//                 <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#00bcd4" />
//                   <stop offset="40%" stopColor="#4caf50" />
//                   <stop offset="70%" stopColor="#ffeb3b" />
//                   <stop offset="85%" stopColor="#ff9800" />
//                   <stop offset="100%" stopColor="#f44336" />
//                 </linearGradient>
//               </defs>

//               {/* Arc */}
//               <path
//                 d="M10 100 A90 90 0 0 1 190 100"
//                 fill="none"
//                 stroke="url(#bmiGradient)"
//                 strokeWidth="12"
//                 strokeLinecap="round"
//               />

//               {/* Needle */}
//               <line
//                 x1="100"
//                 y1="100"
//                 x2="100"
//                 y2="20"
//                 stroke="#333"
//                 strokeWidth="4"
//                 strokeLinecap="round"
//                 transform={`rotate(${needleAngle} 100 100)`}
//                 style={{ transition: "transform 0.9s ease-in-out" }}
//               />

//               {/* Needle base */}
//               <circle cx="100" cy="100" r="6" fill="#333" />
//             </svg>
//           </div>

//           {bmi !== null && (
//             <div className="mt-4 text-center">
//               <p className="text-xl font-semibold text-gray-800">
//                 Your BMI: <span className="text-blue-600">{bmi}</span>
//               </p>
//               <p className="text-lg mt-2 text-green-600">{category}</p>

//               {(age || gender) && (
//                 <p className="text-gray-500 mt-2 text-sm">
//                   {age ? <>Age: <span className="font-medium">{age}</span></> : null}
//                   {age && gender ? " | " : null}
//                   {gender ? <>Gender: <span className="capitalize font-medium">{gender}</span></> : null}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BMICalculator;
import React, { useState } from "react";
import { motion } from "framer-motion";

const BRAND = {
  primary: "#1e8fd3",
  secondary: "#40d3b6",
  text: "#4d4d4d",
};

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [needleAngle, setNeedleAngle] = useState(-90);
  const [error, setError] = useState("");

  const calcCategory = (val) => {
    if (val < 18.5) return "Underweight 😕";
    if (val < 24.9) return "Normal 😊";
    if (val < 29.9) return "Overweight 😐";
    return "Obese 😟";
  };

  const calculateBMI = () => {
    setError("");
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setError("Please enter valid height and weight.");
      return;
    }

    const m = h / 100;
    const value = w / (m * m);
    const rounded = Number(value.toFixed(1));
    setBmi(rounded);
    setCategory(calcCategory(rounded));

    // Map BMI 0..40 to -90..+90
    const normalized = Math.min(rounded / 40, 1);
    const newAngle = -90 + normalized * 180;
    setNeedleAngle(newAngle);
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setGender("");
    setBmi(null);
    setCategory("");
    setNeedleAngle(-90);
    setError("");
  };

  return (
    <section
      id="bmi"
      className="py-20 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50"
      aria-labelledby="bmi-heading"
    >
      {/* subtle background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-16 -left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-16 -right-10 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 text-center"
        >
          <h2 id="bmi-heading" className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            BMI{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Calculator
            </span>
          </h2>
          <p className="text-gray-600 mb-6">Enter height (cm) and weight (kg) to check your BMI and see a visual gauge.</p>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <label className="sr-only" htmlFor="height">Height (cm)</label>
            <input
              id="height"
              type="number"
              inputMode="decimal"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <label className="sr-only" htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              inputMode="decimal"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="number"
              placeholder="Age (optional)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Gender"
            >
              <option value="">Gender (optional)</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex gap-3 mb-6">
            <button
              onClick={calculateBMI}
              className="flex-1 py-3 rounded-full text-white font-medium shadow-md"
              style={{ background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})` }}
            >
              Calculate
            </button>
            <button
              onClick={reset}
              className="px-4 py-3 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>

          {/* Gauge */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs">
              <svg viewBox="0 0 200 100" className="w-full h-auto">
                <defs>
                  <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00bcd4" />
                    <stop offset="40%" stopColor="#4caf50" />
                    <stop offset="70%" stopColor="#ffeb3b" />
                    <stop offset="85%" stopColor="#ff9800" />
                    <stop offset="100%" stopColor="#f44336" />
                  </linearGradient>
                </defs>

                <path
                  d="M10 100 A90 90 0 0 1 190 100"
                  fill="none"
                  stroke="url(#bmiGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="20"
                  stroke="#333"
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${needleAngle} 100 100)`}
                  style={{ transition: "transform 0.9s ease-in-out" }}
                />

                <circle cx="100" cy="100" r="6" fill="#333" />
              </svg>
            </div>

            {/* Result */}
            {bmi !== null ? (
              <div className="mt-4 text-center">
                <p className="text-xl font-semibold text-gray-900">Your BMI: <span className="text-blue-600">{bmi}</span></p>
                <p className="text-lg mt-1 text-green-600">{category}</p>
                {(age || gender) && (
                  <p className="text-gray-500 mt-2 text-sm">
                    {age ? <>Age: <span className="font-medium">{age}</span></> : null}
                    {age && gender ? " | " : null}
                    {gender ? <>Gender: <span className="capitalize font-medium">{gender}</span></> : null}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">
                  Note: BMI is a screening tool. For clinical advice, book a professional consultation.
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-4">No result yet — enter values and press Calculate.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
