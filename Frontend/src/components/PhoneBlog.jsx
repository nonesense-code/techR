import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CircularLoader from "../CircularLoader";
import SideBar from "./SideBar";

const fetchtargetPhones = async (targetURL, navigate) => {
  try {
    const response = await axios.get(targetURL);
    if (typeof response.data === "object" && response.data !== null) {
      return response.data;
    } else {
      navigate("/phone");
      return;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response);
    } else {
      console.error("Error during request setup:", error.message);
    }
    navigate("/phone");
    return;
  }
};

function PhoneBlog() {
  const navigate = useNavigate();
  const targetphoneURL = import.meta.env.VITE_TARGETPHONE_URL;
  const { itname } = useParams();
  const targetURL = `${targetphoneURL}/${itname}`;
  const { data: targetPhones = [], isLoading: isLoadingTarget } = useQuery(
    ["targetPhones", targetURL],
    () => fetchtargetPhones(targetURL, navigate),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const rows = [
    {
      ram: targetPhones.ram1,
      storage: targetPhones.storage1,
      price: targetPhones.price1,
    },
    targetPhones.ram2 && {
      ram: targetPhones.ram2,
      storage: targetPhones.storage2,
      price: targetPhones.price2,
    },
    targetPhones.ram3 && {
      ram: targetPhones.ram3,
      storage: targetPhones.storage3,
      price: targetPhones.price3,
    },
  ]
    .filter(Boolean)
    .filter((row) => row.ram && row.storage && row.price);

  const InfoSection = ({ label, value }) => (
    <div className="flex items-center gap-2 w-full">
      <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
        <h1 className="text-xs sm:text-sm md:text-md lg:text-[16px] whitespace-nowrap font-extrabold text-green-600">
          {label}:
        </h1>
      </div>
      <div className="text-xs sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
        {value || "..."}
      </div>
    </div>
  );

  return (
    <HelmetProvider>
      <div className="flex items-center justify-center">
        <div className="flex items-start flex-col justify-center w-full max-w-screen-xl px-4">
          <div className="flex w-full">
            <Helmet>
              <title>
                {targetPhones
                  ? `${targetPhones.name || "TechR"} - Specifications`
                  : "Loading..."}
              </title>
            </Helmet>
            <div className="w-full flex flex-col">
              <div className="flex w-full gap-2">
                <SideBar />
                <div className="flex w-full flex-col md:flex-row items-start justify-between">
                  <div className="w-full md:border-l-4 md:border-black/10 py-4">
                    <h1
                      className={`mt-4 md:pl-2 py-2 text-2xl md:text-3xl flex items-center justify-center lg:justify-start tracking-tighter ${
                        targetPhones.mostpopular === "true"
                          ? "text-red-600"
                          : "text-[#001]"
                      } font-semibold border-b-[3px] border-black/10`}
                    >
                      {targetPhones.name || "..."}
                    </h1>
                    <div className="w-full h-auto py-4 flex flex-col gap-4">
                      <div className="flex items-center justify-center bg-white">
                        {targetPhones.image ? (
                          <img
                            src={targetPhones.image}
                            alt={targetPhones.name}
                            className="border-gradient w-auto max-h-72 md:h-96 md:w-96 lg:max-w-[1200px] object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="border-gradient h-80 w-[300px] object-contain">
                            <CircularLoader />
                          </div>
                        )}
                      </div>
                      <div
                        className={`text-[10px] px-4 leading-1 md:text-sm lg:text-lg text-justify ${
                          targetPhones.blog
                            ? ""
                            : "flex items-center justify-center text-[50px]"
                        }`}
                      >
                        {targetPhones.blog || "..."}
                      </div>
                      <div className="w-full px-4 h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Dimension"
                            value={targetPhones.dimension}
                          />
                          <InfoSection
                            label="Build"
                            value={targetPhones.build}
                          />
                          <InfoSection
                            label="Weight"
                            value={targetPhones.weight}
                          />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Type"
                            value={targetPhones.dtype}
                          />
                          <InfoSection label="Size" value={targetPhones.size} />

                          <InfoSection
                            label="Resolution"
                            value={targetPhones.resolution}
                          />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="MainCamera"
                            value={targetPhones.maincamera}
                          />
                          <InfoSection
                            label="FrontCamera"
                            value={targetPhones.frontcamera}
                          />
                          <InfoSection
                            label="Video"
                            value={targetPhones.video}
                          />
                        </div>
                        <div className="w-full flex gap-4 justify-start py-2 flex-col rounded-lg">
                          <InfoSection label="OS" value={targetPhones.os} />

                          <InfoSection
                            label="Processor"
                            value={targetPhones.processor}
                          />
                          <InfoSection
                            label="Graphics"
                            value={targetPhones.graphics}
                          />
                        </div>
                        {rows.length > 0 && (
                          <div className="w-full flex items-start gap-4 justify-start py-2 flex-col rounded-lg">
                            <div className="flex items-center gap-2 w-full">
                              <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
                                <h1 className="text-xs sm:text-sm md:text-md lg:text-[16px] font-extrabold text-green-600">
                                  RAM:
                                </h1>
                              </div>
                              <div className="text-xs flex sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
                                {rows.map(
                                  (row, index) =>
                                    row && (
                                      <div key={index}>
                                        {row.ram + " "}
                                        {index < rows.length - 1 && ","}
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 w-full">
                              <div className="flex items-center gap-1 p-2 rounded-lg bg-green-100">
                                <h1 className="text-xs sm:text-sm md:text-md lg:text-[16px] font-extrabold text-green-600">
                                  Storage:
                                </h1>
                              </div>
                              <div className="text-xs flex sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-200 px-3 py-2 rounded-md text-black">
                                {rows.map(
                                  (row, index) =>
                                    row && (
                                      <div key={index}>
                                        {row.storage + " "}
                                        {index < rows.length - 1 && ","}
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Capacity"
                            value={targetPhones.capacity}
                          />
                          <InfoSection
                            label="Charging"
                            value={targetPhones.charging}
                          />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Wi-Fi"
                            value={targetPhones.wifi}
                          />
                          <InfoSection
                            label="Bluetooth"
                            value={targetPhones.bluetooth}
                          />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Type-C"
                            value={targetPhones.typec}
                          />
                          <InfoSection
                            label="Audio Jack"
                            value={targetPhones.audiojack}
                          />
                        </div>
                      </div>
                    </div>
                    {rows.length > 0 && (
                      <div className="h-auto w-full p-8 text-[12px] md:text-[18px] lg:text-xl">
                        <div className="border-4 border-black overflow-hidden rounded-lg w-full flex flex-col">
                          <div className="w-full flex flex-wrap bg-gray-200">
                            <div className="flex-1 border-r-4 border-black p-2 text-center font-bold">
                              S.N
                            </div>
                            <div className="flex-1 border-r-4 border-black p-2 text-center font-bold">
                              OPTIONS
                            </div>
                            <div className="flex-1 p-2 text-center font-bold">
                              PRICE
                            </div>
                          </div>

                          {rows.map((row, index) => (
                            <div
                              key={index}
                              className="w-full flex flex-wrap border-t-2 border-stone-600"
                            >
                              <div className="flex-1 border-r-4 border-black p-2 text-center">
                                {index + 1}
                              </div>
                              <div className="flex-1 border-r-4 border-black p-2 text-center">
                                {row.ram}/{row.storage}
                              </div>
                              <div className="flex-1 p-2 text-center">
                                {row.price}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-justify px-4 flex flex-col items-center justify-center gap-12 mt-16 mb-8">
                {targetPhones?.descriptions?.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    {item.heading && (
                      <h1 className="text-md md:text-lg lg:text-xl font-extrabold uppercase">
                        {item.heading}
                      </h1>
                    )}
                    {item.detail && (
                      <p className="text-[10px] leading-1 md:text-sm lg:text-lg">
                        {item.detail}
                      </p>
                    )}
                    {item.descriptionimage && (
                      <div className="w-full">
                        <img
                          src={item.descriptionimage}
                          alt={item.name}
                          className="h-auto max-h-[400px] md:h-auto object-center w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default PhoneBlog;
