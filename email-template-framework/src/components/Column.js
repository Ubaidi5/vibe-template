const BaseComponent = require("./BaseComponent");

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
   * Generate responsive width styles for media queries
   * This will be used later by our compiler to add media queries
   * @returns {Object} Media query styles
   */
  getResponsiveStyles() {
    const responsive = {};

    const { sm, md, lg } = this.props;

    if (sm !== undefined) {
      responsive.sm = { width: this.calculateWidth(sm) };
    }

    if (md !== undefined) {
      responsive.md = { width: this.calculateWidth(md) };
    }

    if (lg !== undefined) {
      responsive.lg = { width: this.calculateWidth(lg) };
    }

    return responsive;
  }

  /**
   * Render the column component as an HTML table cell
   * @returns {string} HTML representation of the column
   */
  render() {
    const { gutterSpacing } = this.props;

    // Apply default and custom styles
    const columnStyles = {
      verticalAlign: "top",
      width: this.calculateWidth(),
      ...this.props.style,
    };

    // Add padding if gutterSpacing is provided
    if (gutterSpacing > 0) {
      columnStyles.padding = `0 ${gutterSpacing}px`;
    }

    const styleString = this.generateStyleString(columnStyles);

    // Add data attributes for responsive sizes
    const responsiveData = [];
    if (this.props.sm) responsiveData.push(`data-sm="${this.props.sm}"`);
    if (this.props.md) responsiveData.push(`data-md="${this.props.md}"`);
    if (this.props.lg) responsiveData.push(`data-lg="${this.props.lg}"`);

    const responsiveAttrs = responsiveData.join(" ");

    return `
      <td style="${styleString}" ${responsiveAttrs}>
        ${this.renderChildren()}
      </td>
    `
      .trim()
      .replace(/\n\s+/g, "");
  }
}

module.exports = Column;
