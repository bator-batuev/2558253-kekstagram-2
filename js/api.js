const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [Method.POST]: 'Не удалось отправить данные формы',
};

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, {method, body});

  return response.ok ? response.json() : Promise.reject({message: ErrorText[method], status: response.status});
};

export const getData = () => load(Route.GET_DATA);
export const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);
