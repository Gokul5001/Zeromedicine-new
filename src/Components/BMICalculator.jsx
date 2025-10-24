import React, { useState, useEffect } from "react";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [needleAngle, setNeedleAngle] = useState(-90); // Needle start angle

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) setCategory("Underweight 😕");
      else if (bmiValue < 24.9) setCategory("Normal 😊");
      else if (bmiValue < 29.9) setCategory("Overweight 😐");
      else setCategory("Obese 😟");

      // Convert BMI (0–40) to needle angle (-90° to +90°)
      const normalized = Math.min(bmiValue / 40, 1);
      const newAngle = -90 + normalized * 180;
      setNeedleAngle(newAngle);
    }
  };

  return (
    <section id="bmi" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
      <h2 className="text-3xl md:text-4xl mb-9 text-gray-800">
        BMI <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">Calculator</span>
      </h2>
        <p className="text-gray-500 mb-8">
          Check your Body Mass Index and visualize it on the speedometer gauge.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-52 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-52 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
        >
          Calculate BMI
        </button>

        {/* Gauge Section */}
        <div className="mt-10 relative flex flex-col items-center">
          <div className="relative w-64 h-32">
            {/* Gauge background */}
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Gradient Arc */}
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
                strokeWidth="15"
                strokeLinecap="round"
              />

              {/* Needle */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="20"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${needleAngle} 100 100)`}
                style={{ transition: "transform 1s ease-in-out" }}
              />

              {/* Needle base */}
              <circle cx="100" cy="100" r="6" fill="#333" />
            </svg>
          </div>

          {bmi && (
            <div className="mt-6 text-center">
              <p className="text-xl font-semibold text-gray-800">
                Your BMI: <span className="text-blue-600">{bmi}</span>
              </p>
              <p className="text-lg mt-2 text-green-600">{category}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
