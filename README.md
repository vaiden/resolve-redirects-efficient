# resolve-redirects-efficient
A (node)JS module for efficiently resolving HTTP/HTTPS redirects.

[![NPM version](https://img.shields.io/npm/v/resolve-redirects-efficient.svg?style=flat)](https://npmjs.org/package/resolve-redirects-efficient) [![NPM downloads](https://img.shields.io/npm/dm/resolve-redirects-efficient.svg?style=flat)](https://npmjs.org/package/resolve-redirects-efficient) [![GitHub issues](https://img.shields.io/github/issues/vaiden/resolve-redirects-efficient.svg)](https://github.com/vaiden/resolve-redirects-efficient/issues) [![Tests](https://img.shields.io/github/actions/workflow/status/vaiden/resolve-redirects-efficient/node.js.yml?label=tests&branch-main)](https://github.com/vaiden/resolve-redirects-efficient/actions/workflows/node.js.yml?query=branch%3Amain) [![PRs](https://img.shields.io/github/issues-pr/vaiden/resolve-redirects-efficient)](https://github.com/vaiden/resolve-redirects-efficient/pulls?q=is%3Apr+is%3Aopen) 

## What makes this _efficient_
Unlike the competition, this module does not perform a full HTTP request, but rather performs an *HTTP HEAD* request in order to receive the headers only.

Only in cases where the server misbehaves ([😮‍💨Amazon😮‍💨](https://stackoverflow.com/q/73413321/606351)) it falls back to good old, but heavy, *HTTP GET*.

Also, there are no dependencies.

## Installation
```bash
npm install resolve-redirects-efficient
```

## Usage
```javascript
import resolveRedirect from 'resolve-redirect-efficient'

resolveRedirect('http://bit.ly/1TCI5N0')
  .then(url => console.log(url))
```

## Credits
This is heavily based on the now defunct [resolve-redirect](https://www.npmjs.com/package/resolve-redirect) by [@Cezary](https://github.com/cezary/).

## Say hello!
Come say hello @ [devsbedevin.com](https://www.devsbedevin.com/)

## License
MIT
