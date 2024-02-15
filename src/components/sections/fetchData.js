"use server";
import axios from "axios";

export const fetchNews = async () => {
  try {
    const headersList = {
      Accept: "*/*",
      Authorization:
        "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
    };

    const response = await axios.get(
      "https://kagi.com/api/v0/enrich/news?q=app",
      {
        headers: headersList,
      }
    );
    const data = await response.data.data;
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchSummary = async (url) => {
  try {
    const headersList = {
      url: url,
      Accept: "*/*",
      // summary_type: "summary",
      // engine: "cecil",
      Authorization:
        "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
    };

    const response = await axios.post(`https://kagi.com/api/v0/summarize`, {
      headers: headersList,
    });
    // const data = await response.data.data;
    // console.log(response);
    return data;
  } catch (err) {
    console.log(err);
  }
};
fetchSummary("https://indtech.in/how-to-download-royalty-free-music-for-free/");
export const fetchCompetition = async (idea) => {
  const query = `
    Given an idea, give me a list of 6 of its potential competitors in perfect json response, including the following keys: (name, url and description). 
    Answer only in json without any text. Do not include citations or sources. Your first idea is ${idea}
  `;

  const data = {
    query: query,
  };
  const headers = {
    Accept: "*/*",

    Authorization:
      "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
  };

  try {
    const response = await axios.post(`https://kagi.com/api/v0/fastgpt`, data, {
      headers: headers, // Make sure to define headers before using this function
    });

    const output = await JSON.parse(response.data.data.output);
    console.log(output);
    return output;
  } catch (error) {
    console.error(error);
    return [];
  }
};
