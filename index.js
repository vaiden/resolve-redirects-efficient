const getResponse = require('./get-response');

module.exports = resolveRedirect;

function resolveRedirect(url, maxRedirect, callback) {
  maxRedirect = maxRedirect || 3;
  callback = callback || noop;
  if (typeof maxRedirect === 'function') {
    callback = maxRedirect;
    maxRedirect = 3;
  }

  let count = 0,
    currentUrl = url;

  return getResponse(currentUrl)
    .then(function handleResponse(response) {
      let done;
      if (response.statusCode === 404 && response.req.method === 'HEAD'){ // Some Amazon servers return 404 fot HEAD,so we try GET: https://stackoverflow.com/questions/73413321/unshort-amazon-eu-link-using-python
          return getResponse(currentUrl, null, 'GET').then( handleResponse )
      }
      else if (response.statusCode === 301 || response.statusCode === 302) {
        currentUrl = response.headers.location;
        count = count + 1;
      } else if (response.statusCode < 200 || response.statusCode === 404 || response.statusCode>=500) {
        throw new Error(`${currentUrl} returned HTTP ${response.statusCode}`)
      }else {
        done = true;
      }

      if (done || count >= maxRedirect) {
        callback(null, currentUrl);
        return currentUrl;
      } else {
        return getResponse(currentUrl).then(handleResponse);
      }
    }).catch(function(err) {
      callback(err, currentUrl);
      throw err;
    });
}

function noop() {}
