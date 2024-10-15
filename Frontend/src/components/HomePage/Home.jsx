import React from "react";
import Landing from "./Landing";

function Home() {
  const fetchData = async () => {
    const response = await axios
      .get("https://tech-r.vercel.app/sitemap.xml")
      .then((response) => {
        res.set("Content-Type", "application/xml");
        res.send(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sitemap:", error);
        res.status(500).send("Error fetching sitemap");
      });
  };
  fetchData();

  return (
    <div>
      <Landing />
    </div>
  );
}

export default Home;
