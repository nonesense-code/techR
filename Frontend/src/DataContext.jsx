// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import App from "./App";
// const DataContext = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   useEffect(() => {
//     setLoading(true);
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/product/api");
//         if (Array.isArray(response.data)) {
//           setData(response.data);
//           console.log("Done");
//           setLoading(false);
//           setError(false);
//         } else {
//           console.log("Data not in the correct format", response.data);
//           setLoading(false);
//           setError(true, error);
//         }
//       } catch (error) {
//         setLoading(false);
//         console.log(response.data);
//         console.log("Error occured", error);
//         setError(true, error);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <>
//       (
//       {data.map((item, index) => (
//         <div key={index}>{item}</div>
//       ))}
//       )
//     </>
//   );
// };

// export default DataContext;
