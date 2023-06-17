import axios from "axios";

let BASE_URL= 'https://www.alphavantage.co';
let apiCallCount = 0;
let lastCallTime = null;

export const fetchFromAPI= async (url) => {
    if(apiCallCount<5){
        try{
            apiCallCount++;
            const {data} = await axios.get(`${BASE_URL}/${url}`,{
            headers: {
            'User-Agent': 'axios'
            },
            responseType: 'json'
        });
        lastCallTime=Date.now();

        if (data.Note) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - lastCallTime;

        if (elapsedTime < 60000) {
            const delay = 60000 - elapsedTime;

            await new Promise((resolve) => setTimeout(resolve, delay));
            apiCallCount = 1;
            return fetchFromAPI(url);
        } else {
            apiCallCount = 1;
            return fetchFromAPI(url);
        }
        }
    
        return data;
        }catch(error) {
            if (error.response) {
            console.log('Status:', error.response.status);
            } else {
            console.log('Error:', error.message);
            }
        }finally{
            apiCallCount--;
        }
        }else if(apiCallCount === 5){
            const currentTime= Date.now();
            const elapsedTime=currentTime-lastCallTime;

            if(elapsedTime < 60000){
                const delay= 60000-elapsedTime;

                await new Promise((resolve) => setTimeout(resolve,delay));
                apiCallCount=1;
                return fetchFromAPI(url);
            }else{
                apiCallCount=1;
                return fetchFromAPI(url);
            }
        }
};
