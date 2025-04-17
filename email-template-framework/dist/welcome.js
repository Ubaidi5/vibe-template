
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
/**
 * Welcome Email Template
 * Example of using JSX syntax with our email template framework
 */

// Import components is handled automatically by the transformer
// The transformer adds: const { BaseComponent, Row, Column, Text, Image, Email } = require('../src/components');

/**
 * WelcomeTemplate component
 * Creates a welcome email with user information
 * @param {Object} props - Template props
 * @param {string} props.userName - User's name
 * @param {string} props.userAvatar - User's avatar URL
 * @returns {Email} - Email component
 */
const WelcomeTemplate = props => {
  const {
    userName = 'User',
    userAvatar
  } = props;

  // Example of conditional rendering
  const showAvatar = !!userAvatar;
  return createComponent(Email, {
    title: "Welcome to Our Service",
    previewText: `Hi ${userName}, welcome to our service!`
  }, createComponent(Row, null, createComponent(Column, null, createComponent(Text, {
    size: "24px",
    weight: "bold",
    align: "center",
    color: "#333333"
  }, "Welcome, ", userName, "!"))), showAvatar && createComponent(Row, {
    style: {
      marginTop: '20px'
    }
  }, createComponent(Column, null, createComponent(Image, {
    src: userAvatar,
    alt: `${userName}'s avatar`,
    width: "150",
    height: "150",
    style: {
      margin: '0 auto'
    }
  }))), createComponent(Row, {
    style: {
      marginTop: '20px'
    }
  }, createComponent(Column, {
    span: 12,
    sm: 24
  }, createComponent(Text, null, "Thank you for signing up to our service. We're excited to have you on board!")), createComponent(Column, {
    span: 12,
    sm: 24
  }, createComponent(Text, null, "Get started by clicking the button below to complete your profile."))));
};

// Export the template
var _default = exports.default = WelcomeTemplate;