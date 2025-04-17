const BaseComponent = require("./BaseComponent");

/**
 * Text Component - Creates formatted text content for email templates
 */
class Text extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {string} [props.size='14px'] - Font size
   * @param {string} [props.color='#000000'] - Text color
   * @param {string} [props.align='left'] - Text alignment ('left', 'center', 'right')
   * @param {string|number} [props.weight='normal'] - Font weight ('normal', 'bold', or numeric)
   * @param {string} [props.family='Arial, sans-serif'] - Font family
   * @param {Object} [props.style] - Additional CSS styles
   */
  constructor(props = {}) {
    super(props);

    // Set default props
    this.props = {
      size: "14px",
      color: "#000000",
      align: "left",
      weight: "normal",
      family: "Arial, sans-serif",
      style: {},
      ...props,
    };
  }

  /**
   * Render the text component as an HTML paragraph
   * @returns {string} HTML representation of the text
   */
  render() {
    const { size, color, align, weight, family } = this.props;

    // Apply default and custom styles
    const textStyles = {
      fontFamily: family,
      fontSize: size,
      color: color,
      fontWeight: weight,
      textAlign: align,
      margin: "0",
      padding: "0",
      lineHeight: "1.5",
      ...this.props.style,
    };

    const styleString = this.generateStyleString(textStyles);

    return `
      <p style="${styleString}">
        ${this.renderChildren()}
      </p>
    `
      .trim()
      .replace(/\n\s+/g, "");
  }
}

module.exports = Text;
