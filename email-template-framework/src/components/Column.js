const BaseComponent = require("./BaseComponent");
const {
  generateFluidStyles,
  generateMsoStyles,
  calculateWidth,
  closeMsoStyles,
} = require("../utils/responsive");

/**
 * Column Component - Creates a vertical column within a Row component
 * Uses HTML table cells for email compatibility
 */
class Column extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {number} [props.span=24] - Column width (out of 24 grid)
   * @param {number} [props.sm] - Column width for small screens
   * @param {number} [props.md] - Column width for medium screens
   * @param {number} [props.lg] - Column width for large screens
   * @param {number} [props.gutterSpacing=0] - Padding to add for gutters
   * @param {Object} [props.style] - Additional CSS styles
   */
  constructor(props = {}) {
    super(props);

    // Set default props
    this.props = {
      span: 24,
      gutterSpacing: 0,
      style: {},
      ...props,
    };
  }

  /**
   * Calculate the percentage width based on span value (out of 24 grid)
   * @param {number} span - Column span (1-24)
   * @returns {string} Width as percentage (e.g., "50%")
   */
  calculateWidth(span = this.props.span) {
    // Limit span to 0-24 range
    const normalizedSpan = Math.max(0, Math.min(24, span));
    const percentage = (normalizedSpan / 24) * 100;
    return `${percentage.toFixed(2)}%`;
  }

  /**
   * Generate responsive width styles using fluid approach
   * @returns {Object} Combined styles for responsive layout
   */
  getResponsiveStyles() {
    // Calculate the default width percentage
    const defaultWidth = (this.props.span / 24) * 100;

    // Generate fluid styles for responsive behavior
    return generateFluidStyles(this.props, defaultWidth);
  }

  /**
   * Render the column component as an HTML table cell with fluid layout
   * @returns {string} HTML representation of the column
   */
  render() {
    const { gutterSpacing } = this.props;

    // Apply default, responsive, and custom styles
    const columnStyles = {
      verticalAlign: "top",
      ...this.getResponsiveStyles(),
      ...this.props.style,
    };

    // Add padding if gutterSpacing is provided
    if (gutterSpacing > 0) {
      columnStyles.padding = `0 ${gutterSpacing}px`;
    }

    const styleString = this.generateStyleString(columnStyles);

    // Generate MSO (Outlook) specific markup for better compatibility
    const msoOpen = generateMsoStyles(this.props);
    const msoClose = closeMsoStyles();

    // Generate the column content using a div for better fluid scaling
    // We're using a div inside the td for better support in various clients
    return `
      <td style="padding: 0;">
        ${msoOpen}
        <div style="${styleString}">
          ${this.renderChildren()}
        </div>
        ${msoClose}
      </td>
    `
      .trim()
      .replace(/\n\s+/g, "");
  }
}

module.exports = Column;
