const url = require('url');

module.exports = {
  formatUrl: (protocol, host, path) => {
    return url.format({
      protocol: protocol,
      hostname: host,
      pathname: 'api/v1/'.concat(path),
      port: process.env.SERVER_PORT
    });
  }
};
