#!/usr/bin/env node

/**
 * Email Template Framework CLI
 * Command-line interface for building and previewing email templates
 */

const fs = require("fs-extra");
const path = require("path");
const { render } = require("./src/compiler/render");

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0];
const templateName = args[1];

// Paths
const TEMPLATES_DIR = path.join(__dirname, "templates");
const DIST_DIR = path.join(__dirname, "dist");
const OUTPUT_DIR = path.join(__dirname, "output");

// Ensure output directories exist
fs.ensureDirSync(DIST_DIR);
fs.ensureDirSync(OUTPUT_DIR);

/**
 * Build all templates
 */
function buildAll() {
  const build = require("./src/compiler/build");
  console.log("Building all templates...");
}

/**
 * Build a specific template
 * @param {string} name - Template name
 */
function buildTemplate(name) {
  const { transformJSX } = require("./src/compiler/transformer");

  if (!name) {
    console.error("Error: Template name is required");
    return;
  }

  const templatePath = path.join(TEMPLATES_DIR, `${name}.jsx`);
  const outputPath = path.join(DIST_DIR, `${name}.js`);

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Template not found: ${templatePath}`);
    return;
  }

  try {
    // Read the template
    const code = fs.readFileSync(templatePath, "utf8");

    // Transform JSX to component instantiation code
    const transformedCode = transformJSX(code, `${name}.jsx`);

    // Write the transformed code
    fs.writeFileSync(outputPath, transformedCode);

    console.log(`Template built successfully: ${outputPath}`);
  } catch (error) {
    console.error(`Error building template: ${error.message}`);
  }
}

/**
 * Render a template with props
 * @param {string} name - Template name
 * @param {Object} props - Props to pass to the template
 */
function renderTemplate(name, props = {}) {
  if (!name) {
    console.error("Error: Template name is required");
    return;
  }

  const compiledPath = path.join(DIST_DIR, `${name}.js`);
  const outputPath = path.join(OUTPUT_DIR, `${name}.html`);

  if (!fs.existsSync(compiledPath)) {
    console.error(`Error: Compiled template not found: ${compiledPath}`);
    console.log(
      "Build the template first with: node template-cli.js build <template-name>"
    );
    return;
  }

  try {
    // Require the compiled template
    // This approach is safer than using eval
    delete require.cache[require.resolve(compiledPath)];
    const templateModule = require(compiledPath);

    // Render the template
    const html = render(templateModule, props);

    // Write the rendered HTML
    fs.writeFileSync(outputPath, html);

    console.log(`Template rendered successfully: ${outputPath}`);
  } catch (error) {
    console.error(`Error rendering template: ${error.message}`);
  }
}

// Process commands
switch (command) {
  case "build":
    if (templateName) {
      buildTemplate(templateName);
    } else {
      buildAll();
    }
    break;

  case "render":
    const propsFile = args[2] || path.join(__dirname, "default-props.json");
    let props = {};

    // Load props from file if it exists
    if (fs.existsSync(propsFile)) {
      try {
        props = JSON.parse(fs.readFileSync(propsFile, "utf8"));
      } catch (error) {
        console.error(`Error loading props file: ${error.message}`);
      }
    }

    renderTemplate(templateName, props);
    break;

  case "preview":
    // First build the template
    buildTemplate(templateName);

    // Then render it
    const previewProps = {
      userName: "Preview User",
      userAvatar: "https://via.placeholder.com/150",
    };

    renderTemplate(templateName, previewProps);
    break;

  default:
    console.log(`
Email Template Framework CLI

Usage:
  node template-cli.js <command> [options]

Commands:
  build [template-name]    Build all templates or a specific template
  render <template-name>   Render a template with props
  preview <template-name>  Build and render a template with sample props

Examples:
  node template-cli.js build welcome          Build the welcome template
  node template-cli.js render welcome         Render the welcome template
  node template-cli.js preview welcome        Build and render the welcome template
    `);
}
