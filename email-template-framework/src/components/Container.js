const BaseComponent = require("./BaseComponent");

/**
 * Container Component - Creates a simple wrapper element
 * Use instead of a div element for grouping content
 */
class Container extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {string} [props.backgroundColor] - Background color
   * @param {string} [props.padding='0'] - Padding value
   * @param {string} [props.margin='0'] - Margin value
   * @param {Object} [props.style] - Additional CSS styles
   */
  constructor(props = {}) {
    super(props);

    // Set default props
    this.props = {
      padding: "0",
      margin: "0",
      style: {},
      ...props,
    };
  }

  /**
   * Render the container component
   * @returns {string} HTML representation of the container
   */
  render() {
    const { backgroundColor, padding, margin } = this.props;

    // Apply styles
    const containerStyles = {
      padding,
      margin,
      ...this.props.style,
    };

    // Add backgroundColor if specified
    if (backgroundColor) {
      containerStyles.backgroundColor = backgroundColor;
    }

    const styleString = this.generateStyleString(containerStyles);

    return `
      <div style="${styleString}">
        ${this.renderChildren()}
      </div>
    `
      .trim()
      .replace(/\n\s+/g, "");
  }
}

module.exports = Container;
