/**
 * Compiler index file
 * Exports all compiler functionality
 */

const { transformJSX } = require("./transformer");
const { render } = require("./render");

module.exports = {
  transformJSX,
  render,
};
