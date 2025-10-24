import React, { useState } from "react";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) setCategory("Underweight 😕");
      else if (bmiValue < 24.9) setCategory("Normal 😊");
      else if (bmiValue < 29.9) setCategory("Overweight 😐");
      else setCategory("Obese 😟");
    }
  };

  return (
    <section id="bmi" className="py-20 px-6 bg-gradient-to-br from-green-50 via-white to-blue-50 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-800">
          Check Your <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">BMI</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Know your Body Mass Index (BMI) and understand where you stand in your health journey.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-60 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-60 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={calculateBMI}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            Calculate
          </button>
        </div>

        {bmi && (
          <div className="mt-6 p-6 bg-white shadow-lg rounded-lg inline-block">
            <p className="text-xl font-semibold text-gray-800">Your BMI: {bmi}</p>
            <p className="text-lg text-green-600 mt-2">{category}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BMICalculator;
