import axios from "axios";
import React from "react";
import { GrTextWrap } from "react-icons/gr";
const Summary = () => {
  const getSummary = async (idea) => {
    const baseURL = "https://kagi.com/api/v0/enrich/web?q=app%20login";

    const params = {
      q: idea,
    };
    const headers = {
      Authorization:
        "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
    };

    try {
      console.log("testing");
      const response = await axios.get(baseURL, { params, headers });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching summary:", error);
      throw error;
    }
  };
  getSummary("A app that delivers vegetables to home direct from farm");
  return (
    <div className="rounded-[50px] bg-white p-14">
      <div className="mb-4 flex items-center gap-3 text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4 ">
          <GrTextWrap />
        </div>
        <h2>Summary</h2>
      </div>
      <div></div>
    </div>
  );
};

export default Summary;
