/**
 * Email Template Framework
 * A React-like framework for creating email templates
 */

// Export components
const components = require("./src/components");

// Export compiler utilities
const compiler = require("./src/compiler");

module.exports = {
  ...components,
  compiler,
};
