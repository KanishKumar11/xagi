"use server";
import axios from "axios";
import metaFetcher from "meta-fetcher";

export const fetchNews = async (name) => {
  try {
    const headersList = {
      Accept: "*/*",
      Authorization:
        "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
    };

    const response = await axios.get(
      `https://kagi.com/api/v0/enrich/news?q=${name}`,
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
      Accept: "*/*",

      Authorization:
        "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
    };

    const response = await axios.get(
      `https://kagi.com/api/v0/summarize?url=${url}`,
      {
        headers: headersList,
      }
    );
    const data = await response.data.data.output;
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchSummaryText = async (text) => {
  try {
    const headersList = {
      Accept: "*/*",

      Authorization:
        "Bot AQCAV0UEGgU.YyWNxqdLixmHDZgUW6IfV4JlvFGf-cYKybEf1jphm0Q",
    };

    const response = await axios.get(
      `https://kagi.com/api/v0/summarize?text=${text}`,
      {
        headers: headersList,
      }
    );
    const data = await response.data.data.output;
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

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
      headers: headers,
    });

    const output = await JSON.parse(response.data.data.output);
    console.log(output);
    return output;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const fetchMetaData = async (url) => {
  const response = await metaFetcher(url);
  return response;
};
