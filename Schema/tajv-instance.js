const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const tajvInstance = new Ajv({allErrors: true});
addFormats(tajvInstance);

module.exports = tajvInstance;