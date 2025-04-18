/**
 * Responsive Utilities
 * Handles responsive layouts for email templates without relying on media queries
 */

/**
 * Generates fluid-width styles for responsive elements
 * @param {Object} props - Component properties
 * @param {number} defaultWidth - Default width in percentage
 * @returns {Object} Style object with responsive properties
 */
function generateFluidStyles(props, defaultWidth = 100) {
  const { sm, md, lg } = props;
  const styles = {};

  // Default style
  styles.width = `${defaultWidth}%`;
  styles.maxWidth = "100%";

  // Store viewport-specific values in custom data attributes
  // These won't affect rendering but can be used for debugging
  if (sm) styles["data-sm"] = sm;
  if (md) styles["data-md"] = md;
  if (lg) styles["data-lg"] = lg;

  return styles;
}

/**
 * Generates width styles for nested tables in MSO (Outlook)
 * Uses conditional comments for Outlook-specific styling
 * @param {Object} props - Component properties
 * @param {number} containerWidth - Container width in pixels
 * @returns {string} MSO conditional comments with appropriate table styling
 */
function generateMsoStyles(props, containerWidth = 600) {
  const { span = 24, style = {} } = props;
  const width = style.width || calculateWidth(span, containerWidth);

  return `
    <!--[if mso]>
    <table role="presentation" width="${width}" align="left" border="0" cellpadding="0" cellspacing="0">
    <tr><td>
    <![endif]-->
  `;
}

/**
 * Calculates width value based on span or fixed width
 * @param {number} span - Column span (out of 24)
 * @param {number} containerWidth - Container width in pixels
 * @returns {number} Width in pixels
 */
function calculateWidth(span, containerWidth = 600) {
  if (typeof span === "number") {
    return Math.floor((span / 24) * containerWidth);
  }
  return containerWidth;
}

/**
 * Generates closing tags for MSO conditional styling
 * @returns {string} MSO conditional closing tags
 */
function closeMsoStyles() {
  return `
    <!--[if mso]>
    </td></tr>
    </table>
    <![endif]-->
  `;
}

module.exports = {
  generateFluidStyles,
  generateMsoStyles,
  calculateWidth,
  closeMsoStyles,
};
