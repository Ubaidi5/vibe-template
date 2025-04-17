/**
 * JSX Transformer
 * Transforms JSX code into component instantiation code
 */

const babel = require("@babel/core");

/**
 * Transform JSX into component instantiation code
 * @param {string} code - JSX code to transform
 * @param {string} filename - Name of the file being transformed
 * @returns {string} - Transformed code
 */
function transformJSX(code, filename) {
  // First, transform JSX and ES module syntax
  const result = babel.transformSync(code, {
    filename,
    presets: ["@babel/preset-react"],
    plugins: [
      "@babel/plugin-transform-modules-commonjs",
      [
        "@babel/plugin-transform-react-jsx",
        {
          pragma: "createComponent", // Custom JSX factory function
          pragmaFrag: "Fragment",
        },
      ],
    ],
  });

  // Prepend the createComponent function and component imports
  const prepend = `
    const { BaseComponent, Row, Column, Text, Image, Email } = require('../src/components');

    /**
     * Custom JSX factory function
     * Creates component instances from JSX elements
     */
    function createComponent(type, props, ...children) {
      // Handle string type (for HTML elements - which we'll ignore for now)
      if (typeof type === 'string') {
        throw new Error(\`HTML elements like <\${type}> are not supported. Use framework components instead.\`);
      }
      
      // Handle function components
      if (typeof type === 'function') {
        // Check if it's a class (our components) or function component
        if (type.prototype instanceof BaseComponent || 
            type === Row || 
            type === Column || 
            type === Text || 
            type === Image || 
            type === Email) {
          // It's one of our component classes, instantiate it with new
          const component = new type(props || {});
          
          // Add children
          if (children && children.length > 0) {
            // Flatten children array and filter out nulls
            const flatChildren = children
              .flat(Infinity)
              .filter(child => child !== null && child !== undefined && child !== false);
              
            // Add each child to the component
            flatChildren.forEach(child => {
              component.addChild(child);
            });
          }
          
          return component;
        } else {
          // It's a functional component, call it with props
          const result = type({ ...props, children });
          
          // Handle case where component returns null or undefined
          if (!result) {
            return null;
          }
          
          return result;
        }
      }
      
      throw new Error(\`Unknown component type: \${typeof type}\`);
    }
    
    // Represents a fragment - we won't need this but included for completeness
    function Fragment(props) {
      return props.children;
    }
  `;

  // Combine the prepended code with the transformed code
  return prepend + result.code;
}

module.exports = {
  transformJSX,
};
