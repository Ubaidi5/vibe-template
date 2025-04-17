const BaseComponent = require("./BaseComponent");

/**
 * Image Component - Creates email-safe images
 */
class Image extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {string} props.src - Image source URL
   * @param {string} props.alt - Alternative text
   * @param {string|number} [props.width='auto'] - Image width
   * @param {string|number} [props.height='auto'] - Image height
   * @param {string} [props.linkTo] - URL to link the image to
   * @param {Object} [props.style] - Additional CSS styles
   */
  constructor(props = {}) {
    super(props);

    if (!props.src) {
      throw new Error("Image component requires src prop");
    }

    if (!props.alt) {
      console.warn("Image component should have alt text for accessibility");
    }

    // Set default props
    this.props = {
      width: "auto",
      height: "auto",
      alt: "",
      style: {},
      ...props,
    };
  }

  /**
   * Render the image component
   * @returns {string} HTML representation of the image
   */
  render() {
    const { src, alt, width, height, linkTo } = this.props;

    // Apply default and custom styles
    const imageStyles = {
      border: "0",
      display: "block",
      outline: "none",
      textDecoration: "none",
      msInterpolationMode: "bicubic",
      maxWidth: "100%",
      height: "auto",
      ...this.props.style,
    };

    // Add width and height as attributes and styles for better email client compatibility
    const widthAttr = width !== "auto" ? `width="${width}"` : "";
    const heightAttr = height !== "auto" ? `height="${height}"` : "";

    if (width !== "auto") {
      imageStyles.width = typeof width === "number" ? `${width}px` : width;
    }

    if (height !== "auto") {
      imageStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    const styleString = this.generateStyleString(imageStyles);

    // Create the image tag
    const imgTag = `<img src="${src}" alt="${alt}" ${widthAttr} ${heightAttr} style="${styleString}" border="0" />`;

    // Wrap in link if linkTo is provided
    if (linkTo) {
      return `
        <a href="${linkTo}" target="_blank" style="text-decoration: none;">
          ${imgTag}
        </a>
      `
        .trim()
        .replace(/\n\s+/g, "");
    }

    return imgTag;
  }
}

module.exports = Image;
