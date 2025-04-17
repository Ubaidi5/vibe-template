/**
 * JSX Compiler Test
 * Tests the JSX compiler by building a template and rendering it
 */

const fs = require("fs");
const path = require("path");
const { transformJSX } = require("./src/compiler/transformer");
const { render } = require("./src/compiler/render");

// Paths
const TEMPLATE_PATH = path.join(__dirname, "templates/welcome.jsx");
const OUTPUT_DIR = path.join(__dirname, "output");
const COMPILED_PATH = path.join(OUTPUT_DIR, "welcome-compiled.js");
const HTML_PATH = path.join(OUTPUT_DIR, "welcome-jsx.html");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

try {
  // Read the JSX template
  const jsxCode = fs.readFileSync(TEMPLATE_PATH, "utf8");
  console.log("Read JSX template:", TEMPLATE_PATH);

  // Transform JSX to component instantiation code
  const compiledCode = transformJSX(jsxCode, "welcome.jsx");
  console.log("Transformed JSX to JS");

  // Write the compiled code to a file
  fs.writeFileSync(COMPILED_PATH, compiledCode);
  console.log("Wrote compiled code to:", COMPILED_PATH);

  // Evaluate the compiled code to get the template function
  const templateModule = eval(`(function() {
    const module = { exports: {} };
    const exports = module.exports;
    
    ${compiledCode}
    
    return module.exports;
  })()`);

  // Render the template with props
  const props = {
    userName: "John Doe",
    userAvatar: "https://via.placeholder.com/150",
  };

  console.log("Rendering template with props:", JSON.stringify(props));
  const html = render(templateModule, props);

  // Write the rendered HTML to a file
  fs.writeFileSync(HTML_PATH, html);
  console.log("Wrote rendered HTML to:", HTML_PATH);
  console.log("Test completed successfully!");
} catch (error) {
  console.error("Test failed with error:", error);
}
