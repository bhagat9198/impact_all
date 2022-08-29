let BASE_URL;

if(process.env.NODE_ENV === 'production') {
  BASE_URL = `https://impactall.herokuapp.com`
} else {
  BASE_URL = `http://localhost:5000`;
}

let config;
export default config = {BASE_URL}