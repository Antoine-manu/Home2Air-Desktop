import param from '../../config';

const HOST = param;

const fetchWithTimeout = (resource, options = {}, timeout = 5000) => {
  if (window && window.require) {
    const { net } = window.require('electron');
    const request = net.request({
      url: resource,
      ...options
    });

    let didTimeOut = false;
    const timer = setTimeout(() => {
      didTimeOut = true;
      request.abort();
      reject(new Error('Request timed out'));
    }, timeout);

    return new Promise((resolve, reject) => {
      let data = [];

      request.on('response', (response) => {
        clearTimeout(timer);

        if (!didTimeOut) {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            response.on('data', (chunk) => {
              data.push(chunk);
            });

            response.on('end', () => {
              resolve(
                new Response(Buffer.concat(data).toString(), {
                  status: response.statusCode,
                  statusText: response.statusMessage,
                  headers: response.headers
                })
              );
            });
          } else {
            reject(new Error(`Request failed with status code ${response.statusCode}`));
          }
        }

        response.on('error', (error) => {
          reject(new Error(`Error with the response: ${error.message}`));
        });
      });

      request.on('error', (error) => {
        clearTimeout(timer);

        if (!didTimeOut) {
          reject(new Error(`Error with the request: ${error.message}`));
        }
      });

      if (options.body) {
        request.write(options.body);
      }

      request.end();
    });
  } else {
    console.log(resource, options);
    return Promise.race([
      fetch(resource, options),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, timeout);
      })
    ]);
  }
};

export async function fetchRoute(route, method, params, token = '') {

  const url = new URL(route, HOST);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const body = params ? JSON.stringify(params) : null;
  if (method === 'GET' || !body) {
    delete headers['Content-Type'];
    delete headers['Accept'];
    // body = null;
  }

  if (route === 'auth/login') {
    delete headers['Authorization'];
  }

  const fetchOptions = {
    method: method.toUpperCase(),
    headers,
    body
  };

  try {
    console.log('fetchOptions', fetchOptions);
    const response = await fetchWithTimeout(url.toString(), fetchOptions);
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(
        `HTTP error: ${response.status} ${response.statusText}, Message: ${errorMessage}`
      );
      if (response.status == 401) {
        throw new Error('Les identifiants saisis sont invalides');
      }
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    console.log('json', json);
    return json;
  } catch (error) {
    console.error('Error while fetching:', error.message);
  }
}
