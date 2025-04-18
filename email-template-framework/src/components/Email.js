const BaseComponent = require("./BaseComponent");

/**
 * Email Component - Root container for email templates
 * Provides the outer HTML structure and email meta information
 */
class Email extends BaseComponent {
  /**
   * @param {Object} props - Component properties
   * @param {string} [props.title] - Email title (for preview text)
   * @param {string} [props.previewText] - Text displayed in email clients as preview
   * @param {string} [props.width='600px'] - Max width of the email container
   * @param {string} [props.backgroundColor='#ffffff'] - Email background color
   * @param {boolean} [props.fluid=true] - Whether to use fluid responsive layouts
   * @param {Object} [props.style] - Additional CSS styles for the email body
   */
  constructor(props = {}) {
    super(props);

    // Set default props
    this.props = {
      title: "Email Template",
      previewText: "",
      width: "600px",
      backgroundColor: "#ffffff",
      fluid: true,
      style: {},
      ...props,
    };
  }

  /**
   * Generate email-safe CSS for the document
   * @returns {string} CSS styles as a string
   */
  generateGlobalCSS() {
    return `
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        font-family: Arial, sans-serif;
        width: 100% !important;
        line-height: 1.5;
      }
      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        box-sizing: border-box;
      }
      table, td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }
      div {
        line-height: inherit;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        max-width: 100%;
      }
      .email-container {
        max-width: 100% !important;
        width: 100% !important;
      }
      .fluid-container {
        max-width: 100% !important;
        padding: 0 !important;
        width: 100% !important;
      }
      /* Overrides for mobile phones */
      @media screen and (max-width: 525px) {
        .email-container {
          width: 100% !important;
          max-width: 100% !important;
        }
        .responsive-table {
          width: 100% !important;
        }
        .fluid-container {
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
        }
        .stack-column,
        .stack-column-center {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          direction: ltr !important;
        }
        .stack-column-center {
          text-align: center !important;
        }
        .center-on-mobile {
          text-align: center !important;
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
          float: none !important;
        }
        img.center-on-mobile {
          margin-left: auto !important;
          margin-right: auto !important;
        }
      }
    `
      .trim()
      .replace(/\n\s+/g, " ");
  }

  /**
   * Render the email component with full HTML structure
   * @returns {string} Complete HTML for the email
   */
  render() {
    const { title, previewText, width, backgroundColor, fluid } = this.props;

    // Apply default and custom styles to the body
    const bodyStyles = {
      backgroundColor: backgroundColor,
      width: "100%",
      margin: "0",
      padding: "0",
      WebkitTextSizeAdjust: "100%",
      MsTextSizeAdjust: "100%",
      ...this.props.style,
    };

    const styleString = this.generateStyleString(bodyStyles);

    // Add fluid responsive class to container if enabled
    const containerClass = fluid
      ? "email-container fluid-container"
      : "email-container";

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="format-detection" content="telephone=no">
        <meta name="format-detection" content="date=no">
        <meta name="x-apple-disable-message-reformatting">
        <title>${title}</title>
        <style>
          ${this.generateGlobalCSS()}
        </style>
        <!--[if mso]>
        <style type="text/css">
          table {border-collapse:collapse;border-spacing:0;margin:0;}
          div, td {padding:0;}
          .email-container {width:${width} !important;}
        </style>
        <![endif]-->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css">
        <!--<![endif]-->
      </head>
      <body style="${styleString}">
        <!--[if mso]>
        <table role="presentation" width="100%" style="background-color:${backgroundColor};">
        <tr><td align="center">
        <![endif]-->
        
        <!-- Email preview text -->
        <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
          ${previewText || title}
          &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
        </div>
        
        <!-- Email content -->
        <div class="${containerClass}" style="max-width:${width};margin:0 auto;">
          ${this.renderChildren()}
        </div>
        
        <!--[if mso]>
        </td></tr>
        </table>
        <![endif]-->
      </body>
      </html>
    `.trim();
  }
}

module.exports = Email;
