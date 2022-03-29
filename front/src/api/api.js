import axios from "axios";
import { setCookie, getCookie } from "./cookies";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api`,
  withCredentials: true,
})

client.interceptors.response.use(
  res => res,
  err => {
  if (err.response.status === 401)
    window.location.href = '/login';
  return Promise.reject(err);
});

export const getPlaces = async () => {
  try{
    const response = await client.get('/places');
    return response.data;
  }catch (e){
    console.log("places error");
    console.log(e.status)
    console.log(e)
  }
};

export const login = async (code) => {
  try{
    const {data} = await client.post('/code', {code});
    return data;
  }catch (e) {
    console.log(e.status);
  }
}
