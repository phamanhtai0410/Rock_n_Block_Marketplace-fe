/* eslint-disable */

const reducerGenerator = require('./reducerGenerator');
const componentGenerator = require('./componentGenerator');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('reducer', reducerGenerator);
};
