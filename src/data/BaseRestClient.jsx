export const baseUrl = 'http://' + window.location.hostname + ':8080';
export const baseApiUrl = baseUrl + '/api/v1';

export const getJson = (url, callback, errorHandler) => {
  errorHandler = errorHandler || (() => {
  });

  get(url, response => response.json().then(json => callback(json)), errorHandler);
}

export const getText = (url, callback, errorHandler) => {
  errorHandler = errorHandler || (() => {});

  get(url, response => response.text().then(text => callback(text)), errorHandler);
}

export const get = (url, callback, errorHandler) => {
  callback = callback || (() => {});

  fetch(baseApiUrl + url)
    .then(response => {
      if (response.ok) {
        callback(response);
      } else {
        errorHandler(response);
      }
    })
    .catch(error => console.error(error));
}

export const post = (url, data, callback, errorHandler) => {
  callback = callback || (() => {});
  fetch(baseApiUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        response.json().then(json => callback(json));
      } else {
        errorHandler(response);
      }
    })
    .catch(error => console.error(error));
};