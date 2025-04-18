/**
 * Development Server
 * Provides hot reloading and preview capabilities for email templates
 */

const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const browserSync = require("browser-sync");
const chokidar = require("chokidar");
const { render } = require("../compiler/render");
const { transformJSX } = require("../compiler/transformer");
const { checkCompatibility, EMAIL_CLIENTS } = require("./email-clients");

// Configuration
const PORT = process.env.PORT || 3000;
const TEMPLATES_DIR = path.join(__dirname, "../../templates");
const DIST_DIR = path.join(__dirname, "../../dist");
const OUTPUT_DIR = path.join(__dirname, "../../output");
const PREVIEW_DIR = path.join(__dirname, "../../preview");

// Ensure directories exist
fs.ensureDirSync(TEMPLATES_DIR);
fs.ensureDirSync(DIST_DIR);
fs.ensureDirSync(OUTPUT_DIR);
fs.ensureDirSync(PREVIEW_DIR);

// Create Express app
const app = express();

// Serve static files from output directory
app.use("/output", express.static(OUTPUT_DIR));
app.use("/preview", express.static(PREVIEW_DIR));

// Copy preview HTML, CSS, and assets
const PREVIEW_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template Preview</title>
  <link rel="stylesheet" href="/preview/styles.css">
</head>
<body>
  <div class="preview-container">
    <div class="preview-header">
      <h1>Email Template Preview</h1>
      <div class="preview-controls">
        <select id="template-select">
          <!-- Templates will be populated here -->
        </select>
        <select id="device-select">
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>
        <button id="compatibility-btn">Check Compatibility</button>
      </div>
    </div>
    <div class="preview-content">
      <div id="preview-frame-container">
        <iframe id="preview-frame" src="/output/preview.html" frameborder="0"></iframe>
      </div>
    </div>
    <div class="compatibility-panel" id="compatibility-panel">
      <div class="compatibility-header">
        <h2>Email Client Compatibility</h2>
        <button id="close-compatibility-btn">×</button>
      </div>
      <div class="compatibility-content" id="compatibility-content">
        <!-- Compatibility issues will be displayed here -->
      </div>
    </div>
  </div>
  <script src="/preview/scripts.js"></script>
</body>
</html>
`;

const PREVIEW_STYLES = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  color: #333;
  background-color: #f5f5f5;
}

.preview-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
}

.preview-header {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-header h1 {
  font-size: 1.5rem;
  font-weight: 400;
}

.preview-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.preview-controls select, .preview-controls button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: white;
}

.preview-controls button {
  cursor: pointer;
  background-color: #0066cc;
}

.preview-controls button:hover {
  background-color: #0055aa;
}

.preview-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

#preview-frame-container {
  width: 100%;
  height: 100%;
  transition: width 0.3s, height 0.3s;
  overflow: auto;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#preview-frame-container.mobile {
  width: 375px;
  height: 667px;
}

#preview-frame-container.tablet {
  width: 768px;
  height: 1024px;
}

#preview-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.compatibility-panel {
  position: fixed;
  top: 0;
  right: -500px;
  width: 500px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
}

.compatibility-panel.open {
  right: 0;
}

.compatibility-header {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.compatibility-header h2 {
  font-size: 1.2rem;
  font-weight: 400;
}

#close-compatibility-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.compatibility-content {
  padding: 1rem;
}

.issue-card {
  background-color: #f9f9f9;
  border-left: 4px solid #ccc;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 0 4px 4px 0;
}

.issue-card.high {
  border-left-color: #e74c3c;
}

.issue-card.medium {
  border-left-color: #f39c12;
}

.issue-card.low {
  border-left-color: #3498db;
}

.issue-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.issue-client {
  display: inline-block;
  background-color: #ddd;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}

.issue-recommendation {
  margin-top: 0.5rem;
  font-style: italic;
}

.client-card {
  background-color: #f9f9f9;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

.client-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.client-description {
  margin-bottom: 0.5rem;
  color: #666;
}

.feature-list {
  margin-top: 0.5rem;
  margin-left: 1.5rem;
}

.feature-support {
  margin-top: 0.5rem;
}

.feature-title {
  font-weight: bold;
  margin-bottom: 0.2rem;
}
`;

const PREVIEW_SCRIPTS = `
document.addEventListener('DOMContentLoaded', () => {
  const templateSelect = document.getElementById('template-select');
  const deviceSelect = document.getElementById('device-select');
  const previewFrame = document.getElementById('preview-frame');
  const previewContainer = document.getElementById('preview-frame-container');
  const compatibilityBtn = document.getElementById('compatibility-btn');
  const compatibilityPanel = document.getElementById('compatibility-panel');
  const closeCompatibilityBtn = document.getElementById('close-compatibility-btn');
  const compatibilityContent = document.getElementById('compatibility-content');
  
  let currentTemplate = '';
  
  // Fetch available templates
  fetch('/api/templates')
    .then(response => response.json())
    .then(templates => {
      // Populate template select dropdown
      templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template;
        option.textContent = template;
        templateSelect.appendChild(option);
      });
      
      // Set initial template if available
      if (templates.length > 0) {
        currentTemplate = templates[0];
        changeTemplate(templates[0]);
      }
    });
  
  // Handle template selection change
  templateSelect.addEventListener('change', (e) => {
    currentTemplate = e.target.value;
    changeTemplate(currentTemplate);
  });
  
  // Handle device size change
  deviceSelect.addEventListener('change', (e) => {
    changeDeviceSize(e.target.value);
  });
  
  // Handle compatibility button click
  compatibilityBtn.addEventListener('click', () => {
    checkTemplateCompatibility();
    compatibilityPanel.classList.add('open');
  });
  
  // Handle close compatibility panel
  closeCompatibilityBtn.addEventListener('click', () => {
    compatibilityPanel.classList.remove('open');
  });
  
  // Change the displayed template
  function changeTemplate(templateName) {
    fetch(\`/api/render/\${templateName}\`)
      .then(response => {
        if (response.ok) {
          // Reload iframe to show the new template
          previewFrame.src = \`/output/\${templateName}.html?t=\${Date.now()}\`;
        }
      });
  }
  
  // Change the preview size based on device
  function changeDeviceSize(device) {
    previewContainer.className = device;
  }
  
  // Check template compatibility
  function checkTemplateCompatibility() {
    if (!currentTemplate) {
      compatibilityContent.innerHTML = '<p>Select a template first</p>';
      return;
    }
    
    fetch(\`/api/compatibility/\${currentTemplate}\`)
      .then(response => response.json())
      .then(data => {
        renderCompatibilityReport(data);
      })
      .catch(error => {
        compatibilityContent.innerHTML = \`<p>Error checking compatibility: \${error.message}</p>\`;
      });
  }
  
  // Render compatibility report
  function renderCompatibilityReport(data) {
    const { issues, clientInfo } = data;
    
    let html = '';
    
    if (issues.length > 0) {
      html += '<h3>Potential Issues</h3>';
      
      issues.forEach(issue => {
        html += \`
          <div class="issue-card \${issue.severity}">
            <div class="issue-title">\${issue.issue}</div>
            <span class="issue-client">\${issue.client === 'all' ? 'All Clients' : clientInfo[issue.client]?.name || issue.client}</span>
            <span class="issue-severity">\${issue.severity} severity</span>
            <div class="issue-recommendation">\${issue.recommendation}</div>
          </div>
        \`;
      });
    } else {
      html += '<p>No potential compatibility issues found!</p>';
    }
    
    html += '<h3>Client Support Information</h3>';
    
    Object.values(clientInfo).sort((a, b) => a.popularityRank - b.popularityRank).forEach(client => {
      html += \`
        <div class="client-card">
          <div class="client-name">\${client.name}</div>
          <div class="client-description">\${client.description}</div>
          
          <div class="feature-support">
            <div class="feature-title">Supports</div>
            <ul class="feature-list">
              \${client.supports.map(feature => \`<li>\${feature}</li>\`).join('')}
            </ul>
          </div>
          
          <div class="feature-support">
            <div class="feature-title">Does Not Support</div>
            <ul class="feature-list">
              \${client.doesNotSupport.map(feature => \`<li>\${feature}</li>\`).join('')}
            </ul>
          </div>
          
          \${client.notes ? \`<div class="client-notes"><em>\${client.notes}</em></div>\` : ''}
        </div>
      \`;
    });
    
    compatibilityContent.innerHTML = html;
  }
  
  // Set initial device size
  changeDeviceSize('desktop');
});
`;

// Write preview files
fs.writeFileSync(path.join(PREVIEW_DIR, "index.html"), PREVIEW_TEMPLATE);
fs.writeFileSync(path.join(PREVIEW_DIR, "styles.css"), PREVIEW_STYLES);
fs.writeFileSync(path.join(PREVIEW_DIR, "scripts.js"), PREVIEW_SCRIPTS);

// API routes
app.get("/api/templates", (req, res) => {
  try {
    const templates = fs
      .readdirSync(TEMPLATES_DIR)
      .filter((file) => file.endsWith(".jsx"))
      .map((file) => file.replace(".jsx", ""));

    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/render/:template", (req, res) => {
  const { template } = req.params;

  try {
    // Build the template
    buildTemplate(template);

    // Render the template with default props
    const props = getDefaultProps();
    renderTemplate(template, props);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/compatibility/:template", (req, res) => {
  const { template } = req.params;

  try {
    const outputPath = path.join(OUTPUT_DIR, `${template}.html`);

    if (!fs.existsSync(outputPath)) {
      throw new Error(`Template HTML not found: ${outputPath}`);
    }

    const html = fs.readFileSync(outputPath, "utf8");
    const compatibilityReport = checkCompatibility(html);

    res.json(compatibilityReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get default props for templates
 * @returns {Object} - Default props
 */
function getDefaultProps() {
  const propsPath = path.join(__dirname, "../../default-props.json");

  if (fs.existsSync(propsPath)) {
    try {
      return JSON.parse(fs.readFileSync(propsPath, "utf8"));
    } catch (error) {
      console.error("Error loading default props:", error);
    }
  }

  return {
    userName: "Preview User",
    userAvatar: "https://via.placeholder.com/150",
  };
}

/**
 * Build a template
 * @param {string} name - Template name
 */
function buildTemplate(name) {
  const templatePath = path.join(TEMPLATES_DIR, `${name}.jsx`);
  const outputPath = path.join(DIST_DIR, `${name}.js`);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  // Read the template
  const code = fs.readFileSync(templatePath, "utf8");

  // Transform JSX to component instantiation code
  const transformedCode = transformJSX(code, `${name}.jsx`);

  // Write the transformed code
  fs.writeFileSync(outputPath, transformedCode);

  console.log(`Built template: ${name}`);
}

/**
 * Render a template
 * @param {string} name - Template name
 * @param {Object} props - Props to pass to template
 */
function renderTemplate(name, props = {}) {
  const compiledPath = path.join(DIST_DIR, `${name}.js`);
  const outputPath = path.join(OUTPUT_DIR, `${name}.html`);

  if (!fs.existsSync(compiledPath)) {
    throw new Error(`Compiled template not found: ${compiledPath}`);
  }

  // Clear require cache to reload the template
  delete require.cache[require.resolve(compiledPath)];

  // Require the compiled template
  const templateModule = require(compiledPath);

  // Render the template
  const html = render(templateModule, props);

  // Write the rendered HTML
  fs.writeFileSync(outputPath, html);

  console.log(`Rendered template: ${name}`);
}

// Start server
const server = app.listen(PORT, () => {
  console.log(
    `Development server running on http://localhost:${PORT}/preview/`
  );

  // Initialize BrowserSync for hot reloading
  const bs = browserSync.create();

  bs.init({
    proxy: `localhost:${PORT}`,
    port: PORT + 1,
    open: false,
    notify: false,
    ui: false,
  });

  // Watch for template changes and rebuild
  const watcher = chokidar.watch(
    [TEMPLATES_DIR, path.join(__dirname, "../../default-props.json")],
    {
      persistent: true,
      ignoreInitial: true,
    }
  );

  watcher.on("change", (filePath) => {
    console.log(`File changed: ${filePath}`);

    if (filePath.endsWith(".jsx")) {
      const relativePath = path.relative(TEMPLATES_DIR, filePath);
      const templateName = relativePath.replace(".jsx", "");

      try {
        buildTemplate(templateName);
        renderTemplate(templateName, getDefaultProps());
        bs.reload();
      } catch (error) {
        console.error(`Error processing template: ${error.message}`);
      }
    } else if (filePath.endsWith("default-props.json")) {
      // When props change, re-render all templates
      const templates = fs
        .readdirSync(TEMPLATES_DIR)
        .filter((file) => file.endsWith(".jsx"))
        .map((file) => file.replace(".jsx", ""));

      const props = getDefaultProps();

      templates.forEach((template) => {
        try {
          renderTemplate(template, props);
        } catch (error) {
          console.error(
            `Error rendering template ${template}: ${error.message}`
          );
        }
      });

      bs.reload();
    }
  });
});
