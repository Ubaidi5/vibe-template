/**
 * Build script
 * Processes JSX template files and compiles them to JavaScript
 */

const fs = require("fs-extra");
const path = require("path");
const chokidar = require("chokidar");
const { transformJSX } = require("./transformer");

// Paths
const TEMPLATES_DIR = path.join(__dirname, "../../templates");
const OUTPUT_DIR = path.join(__dirname, "../../dist");

/**
 * Ensure directories exist
 */
function ensureDirectories() {
  fs.ensureDirSync(TEMPLATES_DIR);
  fs.ensureDirSync(OUTPUT_DIR);
}

/**
 * Build a single template file
 * @param {string} filePath - Path to the template file
 */
function buildTemplate(filePath) {
  try {
    const relativePath = path.relative(TEMPLATES_DIR, filePath);
    const outputPath = path.join(
      OUTPUT_DIR,
      relativePath.replace(/\.jsx$/, ".js")
    );

    // Skip non-JSX files
    if (!filePath.endsWith(".jsx")) {
      return;
    }

    console.log(`Building template: ${relativePath}`);

    // Read the file
    const code = fs.readFileSync(filePath, "utf8");

    // Transform JSX to component instantiation code
    const transformedCode = transformJSX(code, relativePath);

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Write the transformed code
    fs.writeFileSync(outputPath, transformedCode);

    console.log(`Built template: ${outputPath}`);
  } catch (error) {
    console.error(`Error building template ${filePath}:`, error);
  }
}

/**
 * Build all templates in the templates directory
 */
function buildAllTemplates() {
  ensureDirectories();

  const templateFiles = getAllTemplateFiles(TEMPLATES_DIR);

  templateFiles.forEach(buildTemplate);

  console.log("All templates built successfully!");
}

/**
 * Get all template files in a directory (recursive)
 * @param {string} directory - Directory to search
 * @returns {string[]} - Array of template file paths
 */
function getAllTemplateFiles(directory) {
  let files = [];

  const items = fs.readdirSync(directory);

  items.forEach((item) => {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // Recursively get files from subdirectories
      files = files.concat(getAllTemplateFiles(itemPath));
    } else if (stats.isFile() && itemPath.endsWith(".jsx")) {
      // Add JSX files
      files.push(itemPath);
    }
  });

  return files;
}

/**
 * Watch for changes and rebuild templates
 */
function watchTemplates() {
  console.log("Watching for changes...");

  const watcher = chokidar.watch(TEMPLATES_DIR, {
    persistent: true,
    ignoreInitial: false,
  });

  watcher
    .on("add", buildTemplate)
    .on("change", buildTemplate)
    .on("unlink", (filePath) => {
      const relativePath = path.relative(TEMPLATES_DIR, filePath);
      const outputPath = path.join(
        OUTPUT_DIR,
        relativePath.replace(/\.jsx$/, ".js")
      );

      // Remove corresponding output file
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
        console.log(`Removed: ${outputPath}`);
      }
    });
}

// Main function
function main() {
  ensureDirectories();

  const isWatchMode = process.argv.includes("--watch");

  if (isWatchMode) {
    watchTemplates();
  } else {
    buildAllTemplates();
  }
}

// Run the script
main();
