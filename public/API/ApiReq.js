import axios from "axios";

const requestOptions = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  params: {},
  headers: {
    'X-RapidAPI-Key': '1b3542e5b3mshf9a4d9f7ba4dedcp18a02djsn8818ff7d1d90',
    'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
  }
};


const fetch = async (id) => {
  requestOptions.params = { id };
  const response = await axios.request(requestOptions)
  return response;
}

export { fetch };