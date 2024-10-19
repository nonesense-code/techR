import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CircularLoader from "../CircularLoader";
import SideBar from "./SideBar";

const fetchtargetTablets = async (targetURL, navigate) => {
  try {
    const response = await axios.get(targetURL);
    if (typeof response.data === "object" && response.data !== null) {
      return response.data;
    } else {
      navigate("/tablet");
      return;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response);
    } else {
      console.error("Error during request setup:", error.message);
    }
    navigate("/tablet");
    return;
  }
};

function TabletBlog() {
  const navigate = useNavigate();
  const targettabletURL = import.meta.env.VITE_TARGETTABLET_URL;
  const { itname } = useParams();
  const targetURL = `${targettabletURL}/${itname}`;
  const { data: targettablets = [], isLoading: isLoadingTarget } = useQuery(
    ["targettablets", targetURL],
    () => fetchtargetTablets(targetURL, navigate),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const rows = [
    {
      ram: targettablets.ram1,
      storage: targettablets.storage1,
      price: targettablets.price1,
    },
    targettablets.ram2 && {
      ram: targettablets.ram2,
      storage: targettablets.storage2,
      price: targettablets.price2,
    },
    targettablets.ram3 && {
      ram: targettablets.ram3,
      storage: targettablets.storage3,
      price: targettablets.price3,
    },
  ]
    .filter(Boolean)
    .filter((row) => row.ram && row.storage && row.price);

  const InfoSection = ({ label, value }) => (
    <div className="flex gap-none w-full flex-col items-start border-[1px] md:border-2 overflow-hidden border-black/80 rounded-lg">
      <div className="flex items-start justify-start gap-1 px-2 py-1">
        <h2 className="sm:text-sm text-lg md:text-md lg:text-[16px] whitespace-nowrap font-extrabold text-black">
          {label}:
        </h2>
      </div>
      <div className="text-sm font-semibold tracking-tight leading-1 sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-100 px-2 py-1 rounded-md md:rounded-none text-[#002]">
        {value || "..."}
      </div>
    </div>
  );

  return (
    <HelmetProvider>
      <div className="flex items-center justify-center">
        <div className="flex items-start flex-col justify-center w-full max-w-screen-xl md:px-2">
          <div className="flex w-full">
            <Helmet>
              <title>
                {targettablets
                  ? `${
                      targettablets.name || "TechR"
                    } - Price, Specifications, and Launch Details`
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
                        targettablets.mostpopular === "true"
                          ? "text-red-600"
                          : "text-[#001]"
                      } font-semibold border-b-[3px] border-black/10`}
                    >
                      {targettablets.name || "..."}
                    </h1>
                    <div className="w-full h-auto py-4 flex flex-col gap-4">
                      <div className="flex items-center justify-center bg-white px-4 md:px-none">
                        {targettablets.image ? (
                          <img
                            src={targettablets.image}
                            alt={targettablets.name}
                            className="border-gradient w-auto max-h-72 md:h-96 md:w-auto lg:min-h-[430px] object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="border-gradient h-80 w-[300px] object-contain">
                            <CircularLoader />
                          </div>
                        )}
                      </div>
                      <div
                        className={`text-[10px] leading-1 tracking-tight font-semibold px-4 md:text-sm lg:text-lg text-justify ${
                          targettablets.blog
                            ? ""
                            : "flex items-center justify-center text-[50px]"
                        }`}
                      >
                        {targettablets.blog || "..."}
                      </div>
                      <div className="w-full px-4 h-auto overflow-hidden flex flex-col gap-4 mt-2 text-2xl text-[#002] items-start justify-end">
                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Dimension"
                            value={targettablets.dimension}
                          />
                          <InfoSection
                            label="Build"
                            value={targettablets.build}
                          />
                          <InfoSection
                            label="Weight"
                            value={targettablets.weight}
                          />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Type"
                            value={targettablets.dtype}
                          />
                          <InfoSection label="Size" value={targettablets.size} />

                          <InfoSection
                            label="Resolution"
                            value={targettablets.resolution}
                          />
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="MainCamera"
                            value={targettablets.maincamera}
                          />
                          <InfoSection
                            label="FrontCamera"
                            value={targettablets.frontcamera}
                          />
                          <InfoSection
                            label="Video"
                            value={targettablets.video}
                          />
                        </div>
                        <div className="w-full flex gap-4 justify-start py-2 flex-col rounded-lg">
                          <InfoSection label="OS" value={targettablets.os} />

                          <InfoSection
                            label="Processor"
                            value={targettablets.processor}
                          />
                          <InfoSection
                            label="Graphics"
                            value={targettablets.graphics}
                          />
                        </div>
                        {rows.length > 0 && (
                          <div className="w-full flex items-start gap-4 justify-start py-2 flex-col rounded-lg">
                            <div className="flex items-start flex-col gap-none w-full border-[1px] md:border-2 border-black/80 rounded-lg overflow-hidden">
                              <div className="flex items-center gap-none px-2 py-1">
                                <h2 className="text-lg sm:text-sm md:text-md lg:text-[16px] whitespace-nowrap font-extrabold">
                                  RAM:
                                </h2>
                              </div>
                              <div className="flex text-sm font-semibold tracking-tight leading-1 sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-100 px-2 py-1 rounded-md text-[#002]">
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
                            <div className="flex items-start flex-col gap-none w-full border-[1px] md:border-2 border-black/80 rounded-lg overflow-hidden">
                              <div className="flex items-center gap-none p-2 rounded-lg">
                                <h2 className="text-lg sm:text-sm md:text-md lg:text-[16px] whitespace-nowrap font-extrabold">
                                  Storage:
                                </h2>
                              </div>
                              <div className="flex text-sm font-semibold tracking-tight leading-1 sm:text-sm md:text-md lg:text-[16px] w-full bg-zinc-100 px-2 py-1 rounded-md text-[#002]">
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
                            value={targettablets.capacity}
                          />
                          <InfoSection
                            label="Charging"
                            value={targettablets.charging}
                          />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Wi-Fi"
                            value={targettablets.wifi}
                          />
                          <InfoSection
                            label="Bluetooth"
                            value={targettablets.bluetooth}
                          />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                          <InfoSection
                            label="Type-C"
                            value={targettablets.typec}
                          />
                          <InfoSection
                            label="Audio Jack"
                            value={targettablets.audiojack}
                          />
                        </div>
                      </div>
                    </div>
                    {rows.length > 0 && (
                      <div className="h-auto w-full p-8 text-[12px] md:text-[18px] lg:text-xl">
                        <div className="border-2 border-black overflow-hidden rounded-lg w-full flex flex-col">
                          <div className="w-full flex flex-wrap bg-black text-white">
                            <div className="flex-1 text-sm md:text-lg border-r-2 border-white px-2 py-1 text-center font-bold">
                              S.N
                            </div>
                            <div className="flex-1 text-sm md:text-lg border-r-2 border-white px-2 py-1 text-center font-bold">
                              OPTIONS
                            </div>
                            <div className="flex-1 text-sm md:text-lg px-2 py-1 text-center font-bold">
                              PRICE
                            </div>
                          </div>

                          {rows.map((row, index) => (
                            <div
                              key={index}
                              className={`w-full flex flex-wrap border-t-2 border-stone-600`}
                            >
                              <div className="flex-1 border-r-2 border-black p-1 text-center">
                                {index + 1}
                              </div>
                              <div className="flex-1 border-r-2 border-black p-1 text-center">
                                {row.ram}/{row.storage}
                              </div>
                              <div className="flex-1 p-1 text-center">
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
              <div className="text-justify px-4 flex flex-col items-start justify-center gap-12 mt-16 mb-8">
                {targettablets?.descriptions?.map((item, index) => (
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

export default TabletBlog;
