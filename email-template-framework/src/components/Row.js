const BaseComponent = require("./BaseComponent");

/**
 * Row Component - Creates a horizontal row based on HTML tables for email compatibility
 * Used for creating rows that contain Column components
 */
class Row extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {string} [props.align='top'] - Vertical alignment ('top', 'middle', 'bottom')
   * @param {string} [props.justify='left'] - Horizontal alignment ('left', 'center', 'right')
   * @param {number|Object} [props.gutter=0] - Space between columns (number or {xs, sm, md, lg})
   * @param {Object} [props.style] - Additional CSS styles
   */
  constructor(props = {}) {
    super(props);

    // Set default props
    this.props = {
      align: "top",
      justify: "left",
      gutter: 0,
      style: {},
      ...props,
    };
  }

  /**
   * Get the appropriate valign attribute based on align prop
   * @returns {string} HTML valign attribute value
   */
  getVerticalAlign() {
    const alignMap = {
      top: "top",
      middle: "middle",
      bottom: "bottom",
      center: "middle",
    };

    return alignMap[this.props.align] || "top";
  }

  /**
   * Get the appropriate align attribute based on justify prop
   * @returns {string} HTML align attribute value
   */
  getHorizontalAlign() {
    const justifyMap = {
      left: "left",
      center: "center",
      right: "right",
    };

    return justifyMap[this.props.justify] || "left";
  }

  /**
   * Calculate gutter spacing based on the gutter prop
   * @returns {number} Gutter spacing in pixels
   */
  getGutterSpacing() {
    const { gutter } = this.props;

    if (typeof gutter === "number") {
      return gutter / 2;
    }

    // Default to 0 if gutter is not specified or invalid
    return 0;
  }

  /**
   * Render the row component as an HTML table
   * @returns {string} HTML representation of the row
   */
  render() {
    const gutterSpacing = this.getGutterSpacing();
    const valign = this.getVerticalAlign();
    const align = this.getHorizontalAlign();

    // Apply default and custom styles
    const rowStyles = {
      borderCollapse: "collapse",
      borderSpacing: "0",
      msoTableLspace: "0pt",
      msoTableRspace: "0pt",
      width: "100%",
      ...this.props.style,
    };

    const styleString = this.generateStyleString(rowStyles);

    // Update children with gutterSpacing if needed
    if (gutterSpacing > 0) {
      this.children.forEach((child) => {
        if (child instanceof BaseComponent) {
          child.props.gutterSpacing = gutterSpacing;
        }
      });
    }

    return `
      <table valign="${valign}" align="${align}" border="0" cellpadding="0" cellspacing="0" role="presentation" style="${styleString}">
        <tr>
          ${this.renderChildren()}
        </tr>
      </table>
    `
      .trim()
      .replace(/\n\s+/g, "");
  }
}

module.exports = Row;
