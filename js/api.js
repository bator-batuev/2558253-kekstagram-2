import { BASE_URL, Route, Method, ErrorText } from './const.js';

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, {method, body});
  return response.ok ? await response.json() : Promise.reject({message: ErrorText[method], status: response.status});
};

const getData = async () => await load(Route.GET_DATA);
const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
