import axios from "axios";

export const getIPDetails = async () => {
  try {
    // First, get the user's IP
    const ipResponse = await axios.get("https://api.ipquery.io/");
    const userIP = ipResponse.data;

    // Now fetch detailed info for the retrieved IP
    const detailsResponse = await axios.get(`https://api.ipquery.io/${userIP}`);
    return detailsResponse.data;
  } catch (error) {
    console.error("Error fetching IP details:", error);
    return null;
  }
};
