"use client";
import React, { useEffect, useState } from "react";
import { BsCardText } from "react-icons/bs";
import axios from "axios";
import { fetchNews } from "@/components/sections/fetchData";
import create from "zustand";
var res = [];
const NewsMentions = () => {
  const [newsData, setNewsData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  // useEffect(() => {
  const datafetch = async () => {
    res = await fetchNews();
    setNewsData(res);
    setLoading(false);
    console.log(res);
    // }, []);
  };
  datafetch();
  useEffect(() => {
    console.log(loading);
  }, [loading]);

  // }, [newsData]);

  return (
    <div className="rounded-[50px] bg-white p-14">
      <div className="mb-4 flex items-center gap-3 text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4">
          <BsCardText />
        </div>
        <h2>News Mentions</h2>
      </div>
      {loading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <div>
          {newsData.map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p>{item.snippet}</p>
              <p>Published: {new Date(item.published).toLocaleString()}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsMentions;
