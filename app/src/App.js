import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputJson, setInputJson] = useState("");
  const [specJson, setSpecJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState("");

  const handleTransform = async () => {
    setError("");
    setOutputJson("");

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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Jolt Transformation</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Input JSON:</strong>
        </label>
        <textarea
          rows="6"
          cols="50"
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          placeholder="Enter input JSON here"
          style={{ display: "block", marginTop: "5px", width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Spec JSON:</strong>
        </label>
        <textarea
          rows="6"
          cols="50"
          value={specJson}
          onChange={(e) => setSpecJson(e.target.value)}
          placeholder="Enter spec JSON here"
          style={{ display: "block", marginTop: "5px", width: "100%" }}
        />
      </div>
      <button
        onClick={handleTransform}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Transform
      </button>
      {outputJson && (
        <div style={{ marginTop: "20px" }}>
          <h3>Transformed Output:</h3>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              overflowX: "auto",
            }}
          >
            {outputJson}
          </pre>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default App;