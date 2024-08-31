import React, { useEffect, useState } from "react";
import Navbar from "./HomePage/Navbar";
import axios from "axios";
function Filter() {
  const [deviceType, setDeviceType] = useState("");

  const backendURL = "https://tech-r.vercel.app/product/api";
//   const backendURL = "http://192.168.254.3:5000/product/api";
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendURL}`);
        response.data.map((item, index) => console.log(item.processor));
        if (Array.isArray(response.data)) {
        } else {
          console.error("Data is not in the expected format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [backendURL]);

  const handleDeviceChange = (e) => {
    setDeviceType(e.target.value);
  };

  const getOptions = (type) => {
    const options = {
      phone: {
        processor: ["Snapdragon", "Exynos", "Mediatek"],
        ram: ["4GB", "6GB", "8GB"],
        graphics: ["Adreno", "Mali"],
        battery: ["3000mAh", "4000mAh", "5000mAh"],
        price: ["$200", "$400", "$600"],
      },
      laptop: {
        processor: ["Intel i5", "Intel i7", "AMD Ryzen 5", "AMD Ryzen 7"],
        ram: ["8GB", "16GB", "32GB"],
        graphics: ["NVIDIA GTX", "NVIDIA RTX", "AMD Radeon"],
        battery: ["50Wh", "60Wh", "75Wh"],
        price: ["$800", "$1200", "$1600"],
      },
      tablet: {
        processor: ["Apple A12", "Snapdragon", "Exynos"],
        ram: ["4GB", "6GB", "8GB"],
        graphics: ["Apple GPU", "Adreno", "Mali"],
        battery: ["4000mAh", "6000mAh", "8000mAh"],
        price: ["$300", "$500", "$700"],
      },
    };

    return options[type] || {};
  };

  const currentOptions = getOptions(deviceType);

  return (
    <>
      <Navbar />
      <div className="h-screen w-auto flex items-start justify-evenly">
        <div className="p-4 text-black h-auto w-auto flex items-center flex-col justify-center">
          <h1 className="text-4xl">Search your needs!</h1>
          <div className="mt-12 border-2 border-black rounded-xl w-full mx-auto p-4 items-center justify-center">
            <table className="w-full border-separate border-spacing-4">
              <tbody>
                <tr>
                  <td className="font-semibold">Device Type:</td>
                  <td>
                    <select
                      name="type"
                      className="outline-none w-full text-center rounded-lg bg-zinc-500 text-white px-2 py-1 placeholder:text-zinc-300/80 placeholder:font-semibold"
                      onChange={handleDeviceChange}
                    >
                      <option value="">Select Device</option>
                      <option value="phone">Phone</option>
                      <option value="laptop">Laptop</option>
                      <option value="tablet">Tablet</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Processor:</td>
                  <td>
                    <select
                      name="processor"
                      className="outline-none w-full text-center rounded-lg bg-zinc-500 text-white px-2 py-1 placeholder:text-zinc-300/80 placeholder:font-semibold"
                      disabled={!deviceType}
                    >
                      <option value="">Select Processor</option>
                      {currentOptions.processor?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">RAM:</td>
                  <td>
                    <select
                      name="ram"
                      className="outline-none w-full text-center rounded-lg bg-zinc-500 text-white px-2 py-1 placeholder:text-zinc-300/80 placeholder:font-semibold"
                      disabled={!deviceType}
                    >
                      <option value="">Select RAM</option>
                      {currentOptions.ram?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Graphics:</td>
                  <td>
                    <select
                      name="graphics"
                      className="outline-none w-full text-center rounded-lg bg-zinc-500 text-white px-2 py-1 placeholder:text-zinc-300/80 placeholder:font-semibold"
                      disabled={!deviceType}
                    >
                      <option value="">Select Graphics</option>
                      {currentOptions.graphics?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Battery:</td>
                  <td>
                    <select
                      name="battery"
                      className="outline-none w-full text-center rounded-lg bg-zinc-500 text-white px-2 py-1 placeholder:text-zinc-300/80 placeholder:font-semibold"
                      disabled={!deviceType}
                    >
                      <option value="">Select Battery</option>
                      {currentOptions.battery?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Price:</td>
                  <td>
                    <select
                      name="price"
                      className="outline-none w-full text-center rounded-lg bg-zinc-500 text-white px-2 py-1 placeholder:text-zinc-300/80 placeholder:font-semibold"
                      disabled={!deviceType}
                    >
                      <option value="">Select Price</option>
                      {currentOptions.price?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-2 items-center justify-center mt-4">
              <input
                type="submit"
                value="Find"
                className="bg-sky-600 p-2 rounded-xl font-semibold text-lg outline-none"
              />
              <input
                type="reset"
                value="Clear"
                className="bg-red-700 p-2 rounded-xl font-semibold text-lg outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
