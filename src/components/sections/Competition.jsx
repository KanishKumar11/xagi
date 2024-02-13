"use client";
import React, { useEffect } from "react";
import { FaIdeal } from "react-icons/fa6";
const kagiBaseUrl = "https://kagi.com/api/v0/fastgpt";

const Competition = () => {
  const fetchKagiData = async (idea) => {
    // Define the query
    const query = `Given an idea, give me a list of 6 of its potential competitors in perfect json response, including the following keys: (name, url and description). Answer only in json without any text. Do not include citations or sources. Your first idea is ${idea}`;

    // Prepare the data for the request
    const requestData = {
      query,
    };

    try {
      // Make a POST request to the Kagi API using the fetch function
      const response = await fetch(
        `${kagiBaseUrl}?query=${encodeURIComponent(query)}`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
            "Content-Type": "application/json", // Set content type for POST requests
          },
          // Include the data in the body for POST requests
          body: JSON.stringify(requestData),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from Kagi API: ${response.statusText}`
        );
      }

      // Parse the JSON response
      const responseData = await response.json();

      // Extract and format the data from the response
      return responseData;
    } catch (error) {
      console.error("Error fetching data from Kagi API:", error.message);
      return [];
    }
  };

  // Example usage:
  useEffect(() => {
    const fun = async () => {
      const ideaToQuery = "A app to find plumber at one click";
      await fetchKagiData(ideaToQuery).then((result) => {
        console.log(result);
      });
    };
    fun();
  }, []);

  return (
    <div className="rounded-[50px] bg-white p-14">
      <div className="mb-4 flex items-center gap-3  text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4 ">
          <FaIdeal />
        </div>
        <h2>Competition</h2>
      </div>
    </div>
  );
};

export default Competition;
