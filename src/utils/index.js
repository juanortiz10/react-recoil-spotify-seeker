import apiCall from "../api";

const commonParams = {
  redirect_uri: process.env.REACT_APP_SPOTIFY_CALLBACK_HOST,
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
};

export const spotifyAuthCall = async (requiredParams) => {
  try {
    const params = {
      ...requiredParams,
      grant_type: "authorization_code",
      ...commonParams,
    };
  
    const searchParams = Object.keys(params).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])).join("&");
  
    const spotifyCall = await apiCall({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      body: searchParams,
      headers: { "Content-type": "application/x-www-form-urlencoded" },
    });
    
    return await spotifyCall.json();
  } catch (error) {
    console.log(error);
  }
};