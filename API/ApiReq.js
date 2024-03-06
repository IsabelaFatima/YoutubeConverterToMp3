import axios from "axios";
// import process from "node:process"
// import dotnev from "dotenv"
// dotnev.config();

const requestOptions = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  params: {},
  headers: {
    'X-RapidAPI-Key': '11550b8d8bmshfde5d8da57cf2a1p155f1ajsnca28568d2f7d', 
    'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
  }
};


const fetch = async (id) => {
  requestOptions.params = { id };
  const response = await axios.request(requestOptions)
  return response;
}

export { fetch };