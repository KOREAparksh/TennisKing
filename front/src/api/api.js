import axios from "axios";
import { getCookie, setCookie } from "./cookie";

const client = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

client.interceptors.request.use(
	function (config){
		config.headers['access'] = getCookie('access');
		config.headers['refresh'] = getCookie('refresh');
		return config;
	},
	function (err) {
		return Promise.reject(err);
	}
);

client.interceptors.response.use(
	function (res) {
		setCookie('access', res.headers['access'], ["httpOnly", "sameSite"]);
		setCookie('refresh', res.headers['refresh'], ["httpOnly", "sameSite"]);
		return res;
	},
	(err) => {
		if (
			err.response.status === 401 &&
			err.response.data.message !== "Invalid Code"
		)
			window.location.href = "/login";
		return Promise.reject(err);
	}
);

export const getPlaces = async () => {
	const { data } = await client.get("/places");
	return data;
};

export const login = async (code) => {
	const { data } = await client.post("/code", { code });
	return data;
};

export const getReserves = async () => {
	const { data } = await client.get("/reserves");
	return data;
};

export const postReserves = async (open_time, place_id, member, reserve_times, use_facility) => {
	const {data} = await client.post("reserves", {
		open_time,
		place_id,
		member,
		reserve_times,
		use_facility,
	});
	return data;
}

export const deleteReserve = async (id) => {
	await client.delete(`/reserves/${id}`);
}
