/**
 * Email Client Compatibility Utils
 * Tools for testing email templates across different email clients
 */

// Common email clients and their compatibility issues
const EMAIL_CLIENTS = {
  gmail: {
    name: "Gmail",
    description: "Popular email service by Google",
    supports: [
      "Media queries (partial)",
      "Embedded CSS",
      "Web fonts (partial)",
      "Responsive design",
    ],
    doesNotSupport: [
      "External CSS",
      "JavaScript",
      "Forms",
      "Background images (partial)",
      "Some CSS properties (position, float)",
    ],
    popularityRank: 1,
  },
  outlook: {
    name: "Outlook",
    description: "Microsoft's email client",
    supports: ["HTML attributes", "Tables", "Simple CSS"],
    doesNotSupport: [
      "CSS float",
      "Background images (in some versions)",
      "Media queries",
      "CSS grid",
      "CSS flexbox",
      "CSS animations",
    ],
    notes:
      "Outlook desktop renders emails using Microsoft Word engine, causing many CSS limitations",
    popularityRank: 2,
  },
  "apple-mail": {
    name: "Apple Mail",
    description: "Apple's default email client",
    supports: [
      "Media queries",
      "Embedded CSS",
      "Most modern CSS",
      "Web fonts",
      "Background images",
      "Flexbox",
    ],
    doesNotSupport: ["JavaScript", "Forms"],
    popularityRank: 3,
  },
  yahoo: {
    name: "Yahoo Mail",
    description: "Yahoo's email service",
    supports: ["Basic CSS", "Tables", "Media queries (partial)"],
    doesNotSupport: [
      "Background images in some elements",
      "Some CSS properties",
      "External CSS",
      "JavaScript",
    ],
    popularityRank: 4,
  },
};

/**
 * Check a template for potential compatibility issues
 * @param {string} html - Email template HTML
 * @returns {Object} - Compatibility report
 */
function checkCompatibility(html) {
  const issues = [];

  // Check for email client compatibility issues

  // Outlook issues
  if (html.includes("display: flex") || html.includes("display:flex")) {
    issues.push({
      client: "outlook",
      severity: "high",
      issue: "Flexbox is not supported in Outlook",
      recommendation: "Use tables for layout instead of flexbox",
    });
  }

  if (html.includes("@media")) {
    issues.push({
      client: "outlook",
      severity: "medium",
      issue: "Media queries are not fully supported in Outlook",
      recommendation: "Use responsive tables and fixed layouts for Outlook",
    });
  }

  // Gmail issues
  if (html.includes("position:") || html.includes("position :")) {
    issues.push({
      client: "gmail",
      severity: "medium",
      issue: "Position property may not be fully supported in Gmail",
      recommendation: "Use table-based layouts instead of positioned elements",
    });
  }

  // Check for external stylesheets (problematic in most clients)
  if (html.includes("<link") && html.includes("stylesheet")) {
    issues.push({
      client: "all",
      severity: "high",
      issue: "External stylesheets are not supported in most email clients",
      recommendation: "Use inline styles or embedded CSS in <style> tags",
    });
  }

  // Check for JavaScript (not supported by any email client)
  if (html.includes("<script") || html.includes("javascript:")) {
    issues.push({
      client: "all",
      severity: "high",
      issue: "JavaScript is not supported in email clients",
      recommendation: "Remove all JavaScript from your email template",
    });
  }

  // Check for forms (not supported by most email clients)
  if (
    html.includes("<form") ||
    html.includes("<input") ||
    html.includes("<select")
  ) {
    issues.push({
      client: "all",
      severity: "high",
      issue: "Form elements are not supported in most email clients",
      recommendation: "Replace forms with links to web pages with forms",
    });
  }

  return {
    issues,
    clientInfo: EMAIL_CLIENTS,
  };
}

module.exports = {
  EMAIL_CLIENTS,
  checkCompatibility,
};
