import axios from "axios";

let BASE_URL= 'https://www.alphavantage.co';

export const fetchFromAPI= async (url) => {
    const {data} = await axios.get(`${BASE_URL}/${url}`,{
    headers: {
    'User-Agent': 'axios'
    },
    responseType: 'json'
}).catch(error => {
    if (error.response) {
    console.log('Status:', error.response.status);
    } else {
    console.log('Error:', error.message);
    }
});

    return data;
}