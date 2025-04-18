
    const { BaseComponent, Row, Column, Text, Image, Email } = require('../src/components');

    /**
     * Custom JSX factory function
     * Creates component instances from JSX elements
     */
    function createComponent(type, props, ...children) {
      // Handle string type (for HTML elements - which we'll ignore for now)
      if (typeof type === 'string') {
        throw new Error(`HTML elements like <${type}> are not supported. Use framework components instead.`);
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
      
      throw new Error(`Unknown component type: ${typeof type}`);
    }
    
    // Represents a fragment - we won't need this but included for completeness
    function Fragment(props) {
      return props.children;
    }
  "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _components = require("../src/components");
/**
 * Responsive Example Template
 * Demonstrates the fluid responsive approach without relying on media queries
 */

/**
 * ResponsiveExample component
 * Creates a responsive email that works across different email clients
 * @param {Object} props - Template props
 * @returns {Email} - Email component
 */
const ResponsiveExample = props => {
  const {
    userName = 'Dear User',
    headerImage = 'https://via.placeholder.com/600x200',
    productImage = 'https://via.placeholder.com/300x300',
    ctaUrl = 'https://example.com',
    features = ['Works on all email clients', 'Fluid responsive layout', 'No media queries required', 'Better Outlook support']
  } = props;
  return createComponent(_components.Email, {
    title: "Responsive Email Example",
    previewText: `${userName}, check out our fluid responsive template!`,
    width: "600px",
    fluid: true,
    backgroundColor: "#f7f7f7"
  }, createComponent(_components.Row, null, createComponent(_components.Column, null, createComponent(_components.Image, {
    src: headerImage,
    alt: "Header",
    width: "600",
    height: "200",
    style: {
      display: 'block',
      maxWidth: '100%'
    }
  }))), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '30px 0'
    }
  }, createComponent(_components.Column, {
    style: {
      padding: '0 30px'
    }
  }, createComponent(_components.Text, {
    size: "24px",
    weight: "bold",
    align: "center",
    color: "#333333",
    style: {
      margin: '0 0 20px 0'
    }
  }, "Hello, ", userName, "!"), createComponent(_components.Text, {
    align: "center",
    style: {
      margin: '0 0 20px 0'
    }
  }, "This template demonstrates our new fluid responsive approach that works reliably across email clients without depending on media queries."))), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '0 0 30px'
    }
  }, createComponent(_components.Column, {
    span: 12,
    sm: 24,
    style: {
      padding: '0 20px'
    }
  }, createComponent(_components.Image, {
    src: productImage,
    alt: "Product",
    width: "300",
    height: "300",
    style: {
      maxWidth: '100%',
      marginBottom: '20px'
    }
  })), createComponent(_components.Column, {
    span: 12,
    sm: 24,
    style: {
      padding: '0 20px'
    }
  }, createComponent(_components.Text, {
    weight: "bold",
    size: "18px",
    style: {
      marginBottom: '15px'
    }
  }, "Key Features:"), features.map((feature, index) => createComponent(_components.Text, {
    key: index,
    style: {
      margin: '0 0 10px 0'
    }
  }, "\u2022 ", feature)), createComponent(_components.Row, {
    style: {
      marginTop: '20px'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    align: "center",
    color: "#ffffff",
    size: "16px",
    weight: "bold",
    linkTo: ctaUrl,
    style: {
      backgroundColor: '#007bff',
      padding: '12px 24px',
      borderRadius: '4px',
      display: 'inline-block'
    }
  }, "Learn More"))))), createComponent(_components.Row, {
    style: {
      backgroundColor: '#333',
      padding: '30px 0'
    }
  }, createComponent(_components.Column, {
    style: {
      padding: '0 30px'
    }
  }, createComponent(_components.Text, {
    align: "center",
    color: "#ffffff",
    size: "12px"
  }, "\xA9 ", new Date().getFullYear(), " Your Company. All rights reserved."), createComponent(_components.Text, {
    align: "center",
    color: "#ffffff",
    size: "12px",
    style: {
      margin: '10px 0 0 0'
    }
  }, "You received this email because you're awesome!"))));
};
var _default = exports.default = ResponsiveExample;