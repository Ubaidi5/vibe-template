const BaseComponent = require("./BaseComponent");

/**
 * Spacer Component - Creates vertical spacing in email templates
 */
class Spacer extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {string|number} [props.height='20px'] - Spacer height
   * @param {string} [props.mobileHeight] - Height on mobile devices (optional)
   * @param {Object} [props.style] - Additional CSS styles
   */
  constructor(props = {}) {
    super(props);

    // Set default props
    this.props = {
      height: "20px",
      style: {},
      ...props,
    };
  }

  /**
   * Render the spacer component
   * @returns {string} HTML representation of the spacer
   */
  render() {
    const { height, mobileHeight } = this.props;

    // Convert numeric heights to pixels
    const formattedHeight = typeof height === "number" ? `${height}px` : height;
    const mobileFormattedHeight = mobileHeight
      ? typeof mobileHeight === "number"
        ? `${mobileHeight}px`
        : mobileHeight
      : formattedHeight;

    // Apply styles
    const spacerStyles = {
      display: "block",
      width: "100%",
      height: formattedHeight,
      fontSize: "1px",
      lineHeight: formattedHeight,
      clear: "both",
      ...this.props.style,
    };

    const styleString = this.generateStyleString(spacerStyles);

    // Different approach for Outlook to ensure consistent spacing
    return `
      <!--[if mso]>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td height="${formattedHeight}" style="font-size: 1px; line-height: ${formattedHeight};">
            &nbsp;
          </td>
        </tr>
      </table>
      <![endif]-->
      <!--[if !mso]><!-->
      <div style="${styleString}" class="${
      mobileHeight ? "mobile-spacer" : ""
    }" 
           ${
             mobileHeight ? `data-mobile-height="${mobileFormattedHeight}"` : ""
           }>
        &nbsp;
      </div>
      <!--<![endif]-->
    `
      .trim()
      .replace(/\n\s+/g, "");
  }
}

module.exports = Spacer;
