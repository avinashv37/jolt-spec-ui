import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputJson, setInputJson] = useState("");
  const [specJson, setSpecJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");

  const handleTransform = async () => {
    setError("");
    setOutputJson("");

     // Validate Input JSON
     try {
      JSON.parse(inputJson);
    } catch (err) {
      setInputError("Invalid Input JSON");
      return;
    }

     // Clear validation errors
    setInputError("");

    try {
      const response = await axios.post("/transform", {
        input: inputJson,
        spec: specJson,
      });
      setOutputJson(JSON.stringify(response.data, null, 2));
    } catch (err) {
      setError(err.response?.data || "An error occurred while transforming.");
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Jolt Transformation</h1>

      {/* Input JSON Text Area */}
      <div className="grid grid-cols-3 gap-4">
        <div className="...">
          <label htmlFor="inputJson" className="block font-medium mb-2">
            Input JSON:
          </label>
          <textarea
            id="inputJson"
            rows="12"
            className={`w-full p-2 border ${
              inputError ? "border-red-500" : "border-gray-300"
            } rounded font-mono text-sm`}      
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder="Enter input JSON here"
          />
          {inputError && <p className="text-red-500 text-sm mt-1">{inputError}</p>}
        </div>

        {/* Spec JSON Text Area */}
        <div className="...">
          <label htmlFor="specJson" className="block font-medium mb-2">
            Spec JSON:
          </label>
          <textarea
            id="specJson"
            rows="12"
            className="w-full p-2 border border-gray-300 rounded font-mono text-sm"
            value={specJson}
            onChange={(e) => setSpecJson(e.target.value)}
            placeholder="Enter spec JSON here"
          />
        </div>

         {/* Output JSON */}
      {outputJson && (
        <div className="...">
          <h3 className="text-lg font-semibold">Transformed Output:</h3>
          <pre className="bg-gray-100 p-4 rounded mt-2 overflow-x-auto font-mono text-sm">
            {outputJson}
          </pre>
        </div>
      )}
         {/* Transform Button */}
         <div class="col-span-3 grid grid-cols-subgrid gap-4">
          <button
            type="button"
            onClick={handleTransform}
            className="col-start-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          > Transform  </button>
        </div>

      </div>


      {/* Error Message */}
      {error && (
        <div className="mt-6 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default App;