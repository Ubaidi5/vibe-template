/**
 * Render utility
 * Renders compiled templates to HTML
 */

/**
 * Render a template with props
 * @param {Function} templateModule - The compiled template module
 * @param {Object} props - Props to pass to the template
 * @returns {string} - The rendered HTML
 */
function render(templateModule, props = {}) {
  try {
    // Check if the module is null or undefined
    if (!templateModule) {
      throw new Error("Template module is null or undefined");
    }

    // Check if the module has a default export
    const template = templateModule.default || templateModule;

    // Ensure the template is a function
    if (typeof template !== "function") {
      throw new Error(
        `Template must export a function, but got ${typeof template}`
      );
    }

    // Call the template function with props
    const result = template(props);

    // If the result is a component, render it to HTML
    if (result && typeof result.render === "function") {
      return result.render();
    }

    // If the result is already HTML (string), return it
    if (typeof result === "string") {
      return result;
    }

    throw new Error(
      `Template function must return a component or HTML string, but got ${typeof result}`
    );
  } catch (error) {
    console.error("Error rendering template:", error);
    return `<div style="color: red; padding: 20px; border: 1px solid red;">
      <h2>Error Rendering Template</h2>
      <pre>${error.stack || error.message}</pre>
    </div>`;
  }
}

module.exports = {
  render,
};
