import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import CircularLoader from "../CircularLoader";

const filterProducts = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function MoreOptions() {
  const flagshipURL = import.meta.env.VITE_FLAGSHIP_URL;
  const midrangeURL = import.meta.env.VITE_MIDRANGE_URL;
  const budgetURL = import.meta.env.VITE_BUDGET_URL;

  const { isLoading: loadingBudget, data: budget = [] } = useQuery(
    ["budget", budgetURL],
    () => filterProducts(budgetURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const { isLoading: loadingFlagship, data: flagship = [] } = useQuery(
    ["flagship", flagshipURL],
    () => filterProducts(flagshipURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const { isLoading: loadingMidrange, data: midrange = [] } = useQuery(
    ["midrange", midrangeURL],
    () => filterProducts(midrangeURL),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const isLoading = loadingBudget || loadingFlagship || loadingMidrange;

  const renderProductItems = (items) => {
    return items.slice(0, 4).map((item, index) => (
      <div
        key={index}
        className="w-40 md:w-52 h-auto bg-white flex flex-col items-center justify-start border border-gray-200 rounded-lg shadow-md p-2 transition-all hover:scale-105"
      >
        <Link
          to={`/${item.productType}/${item.name
            .toLowerCase()
            .split(" ")
            .join("")}`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="rounded-t-lg w-full h-32 object-contain object-top"
            loading="lazy"
          />
        </Link>
        <div className="w-full text-center mt-2">
          <h1 className="border-t border-gray-200 pt-2 text-sm md:text-base font-semibold">
            {item.name}
          </h1>
          <h1 className="bg-black text-white rounded-b-lg py-1">
            {item.price1}
          </h1>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-4 mt-2 p-4">
      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <CircularLoader />
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-lg border-b-2 border-black/50 md:text-xl font-bold text-center mb-10">
              Elevate Your Experience with More Choices!
            </h2>
            <div className="flex-1">
              <h1 className="text-2xl text-center font-bold mb-2">Flagship</h1>
              <p className="text-center text-sm md:text-base text-gray-600 mb-4">
                Experience the latest technology.
              </p>
              <div className="w-full pt-4 flex flex-wrap gap-4 items-center justify-center">
                {renderProductItems(flagship)}
              </div>
            </div>
            <div className="flex-1 mt-12">
              <h1 className="text-2xl text-center font-bold mb-2">Midrange</h1>
              <p className="text-center text-sm md:text-base text-gray-600 mb-4">
                Balance performance and price.
              </p>
              <div className="w-full pt-4 flex flex-wrap gap-4 items-center justify-center">
                {renderProductItems(midrange)}
              </div>
            </div>
            <div className="flex-1 mt-12">
              <h1 className="text-2xl text-center font-bold mb-2">Budget</h1>
              <p className="text-center text-sm md:text-base text-gray-600 mb-4">
                Affordable options for everyone.
              </p>
              <div className="w-full pt-4 flex flex-wrap gap-4 items-center justify-center">
                {renderProductItems(budget)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MoreOptions;
