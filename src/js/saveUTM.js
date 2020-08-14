const EXPIRY        = 365 * 24 * 60 * 60 * 1000;
const COOKIE_PREFIX = 'wp_';

const setCookie = (name, value) => {
  const date = new Date();
  date.setTime(date.getTime() + EXPIRY);
  const expires   = "; expires=" + date.toGMTString();
  value           = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
  document.cookie = name + "=" + value + expires + "; path=/";
};

const queryParams = (() => {
  const params = {};
  const raw    = location.search.substr(1).split("&");
  for (let i = 0; i < raw.length; i++) {
    const tmp      = raw[i].split("=");
    params[tmp[0]] = decodeURIComponent(tmp[1]);
  }
  return params;
})();

const params = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid'
];

for (let i = 0; i < params.length; i++) {
  const name  = params[i];
  const value = queryParams[name];
  if (value) {
    setCookie(COOKIE_PREFIX + name, value);
  }
}

const referrer = document.referrer;
if (referrer) setCookie(COOKIE_PREFIX + 'referrer', referrer);
