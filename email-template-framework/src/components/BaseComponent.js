/**
 * BaseComponent - The foundation class for all components in the framework
 * This provides common functionality for rendering components to HTML
 */
class BaseComponent {
  constructor(props = {}) {
    this.props = props;
    this.children = [];
  }

  /**
   * Add a child component or string to this component
   * @param {BaseComponent|string} child - The child component or text content
   */
  addChild(child) {
    this.children.push(child);
    return this;
  }

  /**
   * Generate HTML attributes string from props
   * @param {Object} props - Component properties
   * @returns {string} HTML attribute string
   */
  generateAttributes(props = this.props) {
    return Object.entries(props)
      .filter(([key]) => !["children", "style"].includes(key))
      .map(([key, value]) => {
        if (typeof value === "boolean" && value) {
          return key;
        } else if (value !== null && value !== undefined) {
          return `${key}="${value}"`;
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }

  /**
   * Convert a style object to a CSS string
   * @param {Object} style - Style object
   * @returns {string} CSS style string
   */
  generateStyleString(style = this.props.style) {
    if (!style) return "";

    return Object.entries(style)
      .map(([key, value]) => {
        // Convert camelCase to kebab-case
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        return `${cssKey}: ${value};`;
      })
      .join(" ");
  }

  /**
   * Render the component to an HTML string
   * This should be overridden by subclasses
   * @returns {string} HTML representation of the component
   */
  render() {
    throw new Error("The render method must be implemented by subclasses");
  }

  /**
   * Render children components to HTML strings
   * @returns {string} Combined HTML of all children
   */
  renderChildren() {
    return this.children
      .map((child) => {
        if (typeof child === "string") {
          return child;
        } else if (child instanceof BaseComponent) {
          return child.render();
        } else if (child === null || child === undefined) {
          return "";
        } else {
          return String(child);
        }
      })
      .join("");
  }
}

module.exports = BaseComponent;
