import { header } from 'framer-motion/client';
import { error } from 'jquery';

const API_BASE_URL = 'http://localhost:8080'; // 서버 URL

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((Response) =>
      Response.json().then((json) => {
        if (!Response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      console.log(error.status);
      if (error.status === 403) {
        window.location.href = '/Login'; // redirect
      }
      return Promise.reject(error);
    });
}

export function signin(userDTO) {
  return call('/auth/signin', 'POST', userDTO).then((response) => {
    console.log('response : ', response);
    alert('로그인 토큰: ' + response.token);
  });
}
