const BaseComponent = require("./BaseComponent");

/**
 * Divider Component - Creates a horizontal divider line for email templates
 */
class Divider extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {string} [props.color='#e0e0e0'] - Divider color
   * @param {string|number} [props.width='100%'] - Divider width
   * @param {string|number} [props.height='1px'] - Divider height/thickness
   * @param {string} [props.align='center'] - Divider alignment ('left', 'center', 'right')
   * @param {string|number} [props.margin='10px 0'] - Margin around the divider
   * @param {Object} [props.style] - Additional CSS styles
   */
  constructor(props = {}) {
    super(props);

    // Set default props
    this.props = {
      color: "#e0e0e0",
      width: "100%",
      height: "1px",
      align: "center",
      margin: "10px 0",
      style: {},
      ...props,
    };
  }

  /**
   * Get alignment styles based on the align prop
   * @returns {Object} Alignment style properties
   */
  getAlignmentStyles() {
    const { align } = this.props;

    switch (align) {
      case "center":
        return { margin: "0 auto" };
      case "right":
        return { marginLeft: "auto", marginRight: "0" };
      case "left":
      default:
        return { marginLeft: "0", marginRight: "auto" };
    }
  }

  /**
   * Render the divider component
   * @returns {string} HTML representation of the divider
   */
  render() {
    const { color, width, height, margin } = this.props;

    const alignmentStyles = this.getAlignmentStyles();

    // Apply all styles
    const dividerStyles = {
      border: "0",
      borderTop: `${height} solid ${color}`,
      width: typeof width === "number" ? `${width}px` : width,
      margin,
      ...alignmentStyles,
      ...this.props.style,
    };

    const styleString = this.generateStyleString(dividerStyles);

    // For Outlook and email clients that strip <hr> elements
    return `
      <!--[if mso]>
      <table role="presentation" width="${dividerStyles.width}" cellpadding="0" cellspacing="0" style="margin:${margin};">
        <tr>
          <td style="height:${height}; line-height:${height}; font-size:0; border-top:${height} solid ${color};">&nbsp;</td>
        </tr>
      </table>
      <![endif]-->
      <!--[if !mso]><!-->
      <hr style="${styleString}" />
      <!--<![endif]-->
    `
      .trim()
      .replace(/\n\s+/g, "");
  }
}

module.exports = Divider;
