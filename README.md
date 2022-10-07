# resolve-redirects-efficient
A (node)JS module for efficiently resolving HTTP/HTTPS redirects

## What makes this _efficient_
Unlike the competition, this module does not request the URL itself, but rather performs an *HTTP HEAD* request in order to receive the headers only.

Only in cases where the server misbehaves ([😮‍💨Amazon😮‍💨](https://stackoverflow.com/questions/73413321/unshort-amazon-eu-link-using-python)) it falls back to good old but heavy *HTTP GET*.

Also there are no dependencies.

## Installation
```bash
npm install resolve-redirects-efficient
```

## Usage
```javascript
import resolveRedirect from 'resolve-redirect-efficient'

resolveRedirect('http://bit.ly/1TCI5N0')
  .then(url => console.log(url))
// 
```

## Credits
This is heavily based on the now defunct [resolve-redirect](https://www.npmjs.com/package/resolve-redirect) by [@Cezary](https://github.com/cezary/).

## License
MIT
