"use client";
import React, { useEffect } from "react";
import { FaIdeal } from "react-icons/fa6";
import { fetchCompetition } from "./fetchData";
import Link from "next/link";

const Competition = ({ desc }) => {
  const [competitions, setCompetitions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      if (desc) {
        try {
          setLoading(true);
          console.log("competition");
          const data = await fetchCompetition(desc);
          setCompetitions(data);
          setLoading(false);
          console.log(data);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    dataFetch();
  }, [desc]);

  return (
    <div className="rounded-[50px] bg-white p-14">
      <div className="mb-4 flex items-center gap-3  text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4 ">
          <FaIdeal />
        </div>
        <h2>Competition</h2>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && competitions.length === 0 && (
        <p>
          No competition data available. Enter the website URL to fetch
          competition information.
        </p>
      )}
      {!loading && competitions.length > 0 && (
        <div className="flex flex-col gap-5">
          {competitions.map((item, index) => (
            <div key={index}>
              <Link href={item.url}>
                <h3 className="text-lg font-bold">{item.name}</h3>
              </Link>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Competition;
