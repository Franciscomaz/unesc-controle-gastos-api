const url = require('url');

const BASE_PATH = 'api/v1/';

module.exports = {
  formatUrl: (protocol, host, path) => {
    return url.format({
      protocol: protocol,
      hostname: host,
      pathname: BASE_PATH.concat(path),
      port: process.env.SERVER_PORT
    });
  }
};
