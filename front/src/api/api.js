import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api`,
  withCredentials: true,
})

client.interceptors.response.use(res => res, err => {
  if (err.response.status === 400)
    window.location.href = '/login';
  return Promise.reject(err);
});

export const getPlaces = async () => {
  const {data} = await client.get('/places');
  return data;
};

export const login = async (code) => {
  const {data} = await client.post('/code', {code});
  return data;
}