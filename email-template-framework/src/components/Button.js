const BaseComponent = require("./BaseComponent");

/**
 * Button Component - Creates email-safe buttons with consistent styling
 */
class Button extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {string} props.href - URL for the button link
   * @param {string} [props.color='#ffffff'] - Button text color
   * @param {string} [props.backgroundColor='#007bff'] - Button background color
   * @param {string} [props.size='16px'] - Font size
   * @param {string} [props.align='center'] - Alignment ('left', 'center', 'right')
   * @param {string} [props.width='auto'] - Button width ('auto', 'full', or specific value)
   * @param {string} [props.borderRadius='4px'] - Border radius value
   * @param {string} [props.padding='12px 24px'] - Padding around button text
   * @param {Object} [props.style] - Additional CSS styles
   */
  constructor(props = {}) {
    super(props);

    if (!props.href) {
      console.warn(
        "Button should have an href property for the link destination"
      );
    }

    // Set default props
    this.props = {
      href: props.href || "#",
      color: "#ffffff",
      backgroundColor: "#007bff",
      size: "16px",
      align: "center",
      width: "auto",
      borderRadius: "4px",
      padding: "12px 24px",
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
    const styles = {};

    switch (align) {
      case "center":
        styles.margin = "0 auto";
        styles.textAlign = "center";
        break;
      case "right":
        styles.margin = "0 0 0 auto";
        styles.textAlign = "right";
        break;
      case "left":
      default:
        styles.margin = "0 auto 0 0";
        styles.textAlign = "left";
        break;
    }

    return styles;
  }

  /**
   * Get width styles based on the width prop
   * @returns {string} CSS width value
   */
  getWidthStyles() {
    const { width } = this.props;

    if (width === "full" || width === "100%") {
      return "100%";
    }

    return width;
  }

  /**
   * Render the button component
   * @returns {string} HTML representation of the button
   */
  render() {
    const { href, color, backgroundColor, size, borderRadius, padding } =
      this.props;

    const alignmentStyles = this.getAlignmentStyles();
    const width = this.getWidthStyles();

    // Table styles for the button container
    const tableStyles = {
      ...alignmentStyles,
    };

    // Button cell styles
    const buttonCellStyles = {
      backgroundColor,
      borderRadius,
      padding: "0",
    };

    // Anchor styles
    const linkStyles = {
      display: "inline-block",
      color,
      fontSize: size,
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      textDecoration: "none",
      textAlign: "center",
      width,
      padding,
      ...this.props.style,
    };

    // Generate style strings
    const tableStyleString = this.generateStyleString(tableStyles);
    const buttonCellStyleString = this.generateStyleString(buttonCellStyles);
    const linkStyleString = this.generateStyleString(linkStyles);

    // Content of the button
    const content = this.renderChildren() || "Click Here";

    return `
      <!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" style="${tableStyleString}" align="${this.props.align}">
        <tr>
          <td style="${buttonCellStyleString}" bgcolor="${backgroundColor}">
            <a href="${href}" target="_blank" style="${linkStyleString}">
              ${content}
            </a>
          </td>
        </tr>
      </table>
      <![endif]-->
      <!--[if !mso]><!-->
      <div style="${tableStyleString}">
        <a href="${href}" target="_blank" style="${linkStyleString}; ${buttonCellStyleString}">
          ${content}
        </a>
      </div>
      <!--<![endif]-->
    `
      .trim()
      .replace(/\n\s+/g, "");
  }
}

module.exports = Button;
