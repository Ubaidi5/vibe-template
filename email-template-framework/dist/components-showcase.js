
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
 * Components Showcase Template
 * Demonstrates the use of all components in our email framework
 */

/**
 * ComponentsShowcase component
 * Demonstrates all available components in the framework
 * @param {Object} props - Template props
 * @returns {Email} - Email component
 */
const ComponentsShowcase = props => {
  return createComponent(_components.Email, {
    title: "Email Framework Components",
    previewText: "Check out all the components in our email framework!",
    width: "600px",
    backgroundColor: "#f8f9fa"
  }, createComponent(_components.Row, {
    style: {
      backgroundColor: '#343a40',
      padding: '20px 0'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    size: "24px",
    weight: "bold",
    align: "center",
    color: "#ffffff"
  }, "Email Framework Components"))), createComponent(_components.Spacer, {
    height: "30px"
  }), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '20px'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    size: "20px",
    weight: "bold",
    color: "#212529"
  }, "Text Component"), createComponent(_components.Spacer, {
    height: "15px"
  }), createComponent(_components.Text, null, "This is the default Text component. You can adjust its size, color, alignment, weight and more."), createComponent(_components.Spacer, {
    height: "10px"
  }), createComponent(_components.Text, {
    size: "18px",
    color: "#0066cc",
    align: "center",
    weight: "bold"
  }, "Customized text with center alignment and color"), createComponent(_components.Spacer, {
    height: "10px"
  }), createComponent(_components.Text, {
    linkTo: "https://example.com"
  }, "This is a text with a link"))), createComponent(_components.Spacer, {
    height: "20px"
  }), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '20px'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    size: "20px",
    weight: "bold",
    color: "#212529"
  }, "Button Component"), createComponent(_components.Spacer, {
    height: "15px"
  }), createComponent(_components.Button, {
    href: "https://example.com"
  }, "Default Button"), createComponent(_components.Spacer, {
    height: "15px"
  }), createComponent(_components.Button, {
    href: "https://example.com",
    backgroundColor: "#28a745",
    width: "250px"
  }, "Custom Green Button"), createComponent(_components.Spacer, {
    height: "15px"
  }), createComponent(_components.Button, {
    href: "https://example.com",
    backgroundColor: "#dc3545",
    align: "right",
    borderRadius: "0"
  }, "Right-Aligned Button"))), createComponent(_components.Spacer, {
    height: "20px"
  }), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '20px'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    size: "20px",
    weight: "bold",
    color: "#212529"
  }, "Divider Component"), createComponent(_components.Spacer, {
    height: "15px"
  }), createComponent(_components.Text, null, "Default divider below:"), createComponent(_components.Divider, null), createComponent(_components.Text, null, "Custom styling divider:"), createComponent(_components.Divider, {
    color: "#0066cc",
    height: "3px",
    width: "50%"
  }), createComponent(_components.Text, null, "Right-aligned divider:"), createComponent(_components.Divider, {
    color: "#28a745",
    align: "right",
    width: "200px"
  }))), createComponent(_components.Spacer, {
    height: "20px"
  }), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '20px'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    size: "20px",
    weight: "bold",
    color: "#212529"
  }, "Spacer Component"), createComponent(_components.Spacer, {
    height: "15px"
  }), createComponent(_components.Text, null, "A default 20px spacer follows:"), createComponent(_components.Spacer, null), createComponent(_components.Text, null, "This text comes after the default spacer."), createComponent(_components.Text, null, "A 40px spacer follows:"), createComponent(_components.Spacer, {
    height: "40px"
  }), createComponent(_components.Text, null, "This text comes after the 40px spacer."), createComponent(_components.Text, null, "A spacer with different mobile height (10px):"), createComponent(_components.Spacer, {
    height: "30px",
    mobileHeight: "10px"
  }), createComponent(_components.Text, null, "This text comes after the responsive spacer."))), createComponent(_components.Spacer, {
    height: "20px"
  }), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '20px'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    size: "20px",
    weight: "bold",
    color: "#212529"
  }, "Container Component"), createComponent(_components.Spacer, {
    height: "15px"
  }), createComponent(_components.Container, {
    backgroundColor: "#e9ecef",
    padding: "15px"
  }, createComponent(_components.Text, {
    align: "center"
  }, "This is a Container component with background color and padding")), createComponent(_components.Spacer, {
    height: "15px"
  }), createComponent(_components.Container, {
    style: {
      border: '1px solid #ced4da',
      borderRadius: '4px',
      padding: '15px'
    }
  }, createComponent(_components.Text, {
    align: "center"
  }, "Container with custom border styling")))), createComponent(_components.Spacer, {
    height: "20px"
  }), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '20px'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    size: "20px",
    weight: "bold",
    color: "#212529"
  }, "Responsive Columns"), createComponent(_components.Spacer, {
    height: "15px"
  }))), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '0 20px 20px'
    }
  }, createComponent(_components.Column, {
    span: 12,
    sm: 24,
    style: {
      padding: '10px'
    }
  }, createComponent(_components.Container, {
    backgroundColor: "#e9ecef",
    padding: "15px"
  }, createComponent(_components.Text, {
    align: "center"
  }, "This column is 50% on desktop and 100% on mobile"))), createComponent(_components.Column, {
    span: 12,
    sm: 24,
    style: {
      padding: '10px'
    }
  }, createComponent(_components.Container, {
    backgroundColor: "#e9ecef",
    padding: "15px"
  }, createComponent(_components.Text, {
    align: "center"
  }, "This column is 50% on desktop and 100% on mobile")))), createComponent(_components.Row, {
    style: {
      backgroundColor: 'white',
      padding: '0 20px 20px'
    }
  }, createComponent(_components.Column, {
    span: 8,
    sm: 24,
    style: {
      padding: '10px'
    }
  }, createComponent(_components.Container, {
    backgroundColor: "#e9ecef",
    padding: "15px"
  }, createComponent(_components.Text, {
    align: "center"
  }, "1/3 Column"))), createComponent(_components.Column, {
    span: 8,
    sm: 24,
    style: {
      padding: '10px'
    }
  }, createComponent(_components.Container, {
    backgroundColor: "#e9ecef",
    padding: "15px"
  }, createComponent(_components.Text, {
    align: "center"
  }, "1/3 Column"))), createComponent(_components.Column, {
    span: 8,
    sm: 24,
    style: {
      padding: '10px'
    }
  }, createComponent(_components.Container, {
    backgroundColor: "#e9ecef",
    padding: "15px"
  }, createComponent(_components.Text, {
    align: "center"
  }, "1/3 Column")))), createComponent(_components.Spacer, {
    height: "20px"
  }), createComponent(_components.Row, {
    style: {
      backgroundColor: '#343a40',
      padding: '20px'
    }
  }, createComponent(_components.Column, null, createComponent(_components.Text, {
    align: "center",
    color: "#ffffff",
    size: "12px"
  }, "Email Framework Components Showcase"), createComponent(_components.Spacer, {
    height: "10px"
  }), createComponent(_components.Text, {
    align: "center",
    color: "#ffffff",
    size: "12px"
  }, "\xA9 ", new Date().getFullYear(), " Your Company"))));
};
var _default = exports.default = ComponentsShowcase;