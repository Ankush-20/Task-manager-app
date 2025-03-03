// import { useState, useEffect } from "react";
// import Form from "./components/Form";
// import Prediction from "./components/Prediction";
// import ChartComponent from "./components/Chart";
// import "./styles.css";
// import dataset from "./data/dataset.json";

// const App = () => {
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState("");  // ✅ Fix: Ensures error message is properly handled
//   const [formData, setFormData] = useState(null);
//   const [predictedPrices, setPredictedPrices] = useState([]);

//   const actualPrices = dataset.map((data) => data.price);

//   const handlePrediction = (price, data) => {
//     setPrediction(price);
//     setFormData(data);
//     setPredictedPrices([...predictedPrices, price / 1000]);

//     // ✅ Scroll to top when predicting
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="App container">
//       <h2 className="title">🏡 Real Estate Price Prediction</h2>  
//       {error && <p className="alert alert-danger">{error}</p>}  {/* ✅ Fix: Show errors properly */}
//       <Form setPrediction={handlePrediction} setError={setError} />
//       <Prediction price={prediction} formData={formData} />
//       <ChartComponent actualPrices={actualPrices} predictedPrices={predictedPrices} />
//     </div>
//   );
// };

// export default App;



// import { useState, useEffect } from "react";
// import Form from "./components/Form";
// import Prediction from "./components/Prediction";
// import ChartComponent from "./components/Chart";
// import "./styles.css";
// import dataset from "./data/dataset.json";

// const App = () => {
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState(null);
//   const [predictedPrices, setPredictedPrices] = useState([]);

//   const actualPrices = dataset.map((data) => data.price);

//   const handlePrediction = (price, data) => {
//     console.log("✅ Received Form Data:", data);  // 🟢 Debugging: Log form data
//     setPrediction(price);
//     setFormData(data);  // ✅ Ensure formData is updated
//     setPredictedPrices([...predictedPrices, price / 1000]);

//     // ✅ Scroll to top when predicting
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="App container">
//       <h2 className="title">🏡 Real Estate Price Prediction</h2>  
//       <Form setPrediction={handlePrediction} setError={setError} />
//       <Prediction price={prediction} formData={formData} />  {/* ✅ Ensure formData is passed */}
//       <ChartComponent actualPrices={actualPrices} predictedPrices={predictedPrices} />
//     </div>
//   );
// };

// export default App;

import { useState } from "react";
import Form from "./components/Form";
import Prediction from "./components/Prediction";
import ChartComponent from "./components/Chart";
import "./styles/styles.css";
import dataset from "./data/dataset.json";

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [predictedPrices, setPredictedPrices] = useState([]);

  const actualPrices = dataset.map((data) => data.price);

  const handlePrediction = (price, data) => {
    setPrediction(price);
    setFormData(data);
    setPredictedPrices([...predictedPrices, price / 1000]);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <div className="container">
        <h2>🏘️ Real Estate Price Predictior</h2>  
        <Form setPrediction={handlePrediction} setError={setError} />
        <Prediction price={prediction} formData={formData} />
        <ChartComponent actualPrices={actualPrices} predictedPrices={predictedPrices} />
      </div>
    </div>
  );
};

export default App;
