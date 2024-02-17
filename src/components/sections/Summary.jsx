"use client";
import React, { useCallback, useEffect, useState } from "react";
import { GrTextWrap } from "react-icons/gr";
import { fetchSummary, fetchSummaryText } from "./fetchData";

const Summary = ({ tldr, links }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReadMore, setShowReadMore] = useState(true);

  const fetchData = useCallback(async () => {
    if (tldr) {
      try {
        setLoading(true);
        setSummary(null);
        const result = await fetchSummary(links);
        if (result === undefined) {
          const res2 = await fetchSummaryText(tldr);
          setSummary(res2);
        } else {
          setSummary(result);
        }
        setShowReadMore(result.split(" ").length > 30);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Error loading summary");
        setShowReadMore(false);
        setLoading(false);
      }
    }
  }, [tldr, links]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReadMore = () => {
    // Toggle the showReadMore state to expand or collapse the area
    setShowReadMore(!showReadMore);
  };

  return (
    <div
      className={`rounded-[50px] bg-white p-14 ${
        !showReadMore ? "h-auto" : "h-auto overflow-hidden"
      }`}
    >
      <div className="mb-4 flex items-center gap-3 text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4 ">
          <GrTextWrap />
        </div>
        <h2>Summary</h2>
      </div>
      {!loading && !summary && <>Enter website url to fetch summary</>}
      {loading && <p>Loading...</p>}
      {!loading && summary ? (
        <div>{showReadMore ? `${summary.slice(0, 300)}...` : summary}</div>
      ) : (
        <p>{summary}</p>
      )}
      {summary && showReadMore && (
        <button onClick={handleReadMore} className="mt-2 text-blue-500">
          Read More
        </button>
      )}
      {!showReadMore && (
        <button onClick={handleReadMore} className="mt-2 text-blue-500">
          Read Less
        </button>
      )}
    </div>
  );
};

export default Summary;
