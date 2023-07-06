import param from '../../config';

const HOST = param;
// const Store = require('electron-store');
// import Store from 'electron-store';
// const store = new Store();
// const crypto = require('crypto');
// const ENCRYPTION_KEY = generateEncryptionKey();

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
    const response = await fetchWithTimeout(url.toString(), fetchOptions);
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(
        `HTTP error: ${response.status} ${response.statusText}, Message: ${errorMessage}`
      );
      if (response.status == 401) {
        throw new Error('Les identifiants saisies sont invalides');
      }
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    // const json = await response.json();

    return await response.json();
  } catch (error) {
    console.error('Error while fetching:', error.message);
    throw error;
  }
}

function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

export async function fetchFromStorage(key) {
  const encryptedData = store.get(key);
  if (!encryptedData) return null;
  return decrypt(encryptedData);
}
