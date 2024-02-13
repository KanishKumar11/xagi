"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCardText } from "react-icons/bs";

const NewsMentions = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getNews = async (idea) => {
      const baseURL = "https://kagi.com/api/v0/enrich/news?q=app%20login";

      const headers = {
        Authorization:
          "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
        "Content-Type": "application/json",
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };

      try {
        console.log("testing");
        const response = axios.get(baseURL, { headers });
        setNews(response.data.data);
        console.log(response.data.data);
        // return response.data;
      } catch (error) {
        console.error("Error fetching summary:", error);
        throw error;
      }
    };
    getNews("A app that delivers vegetables to home direct from farm");
  });
  return (
    <div className="rounded-[50px] bg-white p-14">
      <div className="mb-4 flex items-center gap-3 text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4 ">
          <BsCardText />
        </div>
        <h2>News Mentions</h2>
      </div>
      <div>
        {news.map((data) => (
          <div key={data.url}>{data.title}</div>
        ))}
      </div>
    </div>
  );
};

export default NewsMentions;
