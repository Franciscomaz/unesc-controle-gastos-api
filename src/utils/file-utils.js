const YAML = require('yamljs');
const path = require('path');

module.exports = {
  loadYAML: pathName => YAML.load(path.join(__dirname, pathName))
};
