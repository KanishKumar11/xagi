"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BsCardText } from "react-icons/bs";
import { fetchNews } from "@/components/sections/fetchData";

const NewsMentions = ({ name }) => {
  const [newsData, setNewsData] = React.useState([]);
  const [loading, setLoading] = useState(!name);

  useEffect(() => {
    const fetchNewsData = async () => {
      if (name) {
        setLoading(true);
        try {
          const result = await fetchNews(name);
          setNewsData(result);
          setLoading(false);
          console.log(result);
        } catch (error) {
          console.error("Error fetching news:", error);
          setLoading(false);
        }
      }
    };

    fetchNewsData();
  }, [name]);

  return (
    <div className="rounded-[50px] bg-white p-14">
      <div className="mb-4 flex items-center gap-3 text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4">
          <BsCardText />
        </div>
        <h2>News Mentions</h2>
      </div>
      {name ? (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-5">
              {newsData.length > 0 ? (
                newsData.slice(0, 3).map((item, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p>{item.snippet}</p>
                  </div>
                ))
              ) : (
                <p>No results found!</p>
              )}
            </div>
          )}
        </>
      ) : (
        <p>Enter the website url to fetch news mentions</p>
      )}
    </div>
  );
};

export default NewsMentions;
