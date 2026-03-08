const test = require('ava');
const resolveRedirect = require('..');

test('url without protocol', t => {
  t.throws(() => resolveRedirect('www.google.com'));
});

test('url with basic redirect', t => {
  return resolveRedirect('http://google.com/').then(url =>
    t.is(url, 'http://www.google.com/'));

});

test('url without redirect', t => {
  return resolveRedirect('http://www.google.com/').then(url =>
    t.is(url, 'http://www.google.com/'));

});

test('secure url with redirect', t => {
  return resolveRedirect('http://amzn.to/2eEPcFk').then(url =>
    t.is(url, 'https://www.amazon.com/gp/product/B00MH78O0M/ref=as_li_ss_tl?ie=UTF8&fpl=fresh&pd_rd_i=B00MH78O0M&pd_rd_r=Q6AGR9A4A9THVY19VQ00&pd_rd_w=BQhKK&pd_rd_wg=GythE&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=&pf_rd_r=W4JDGRRE10YC5P1762MT&pf_rd_t=36701&pf_rd_p=e8de777f-727a-4395-809e-49e84c65e636&pf_rd_i=desktop&linkCode=sl1&tag=kaching05-20&linkId=fb58756aff4e5b2fc514af0b120bbc52'));

});

test('secure url without redirect', t => {
  return resolveRedirect('https://www.google.com/').then(url =>
    t.is(url, 'https://www.google.com/'));
});

test('broken url - HTTP 404', async t => {
  const err = await t.throwsAsync(() => resolveRedirect('http://feedproxy.google.com/~r/Coroflot/AllJobs/~3/69s2F4RGu-k/Designer'));
  t.is(err.message, 'http://feedproxy.google.com/~r/Coroflot/AllJobs/~3/69s2F4RGu-k/Designer returned HTTP 404');
  t.is(err.statusCode, 404);
  t.is(err.currentUrl, 'http://feedproxy.google.com/~r/Coroflot/AllJobs/~3/69s2F4RGu-k/Designer');
});

test('broken url - malformed URL', async t => {
  await t.throwsAsync(() =>
          resolveRedirect('http://kjhsdckjhfkjhsdc.com'),
      {instanceOf: Error, message: 'getaddrinfo ENOTFOUND kjhsdckjhfkjhsdc.com'});
});
