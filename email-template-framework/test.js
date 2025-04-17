/**
 * Simple test script to verify the components are working
 */

const fs = require("fs");
const path = require("path");
const createWelcomeEmail = require("./examples/simple");

// Generate the email HTML with some test data
const emailHtml = createWelcomeEmail({
  userName: "John Doe",
  userAvatar: "https://via.placeholder.com/150",
});

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Write the generated HTML to a file
fs.writeFileSync(path.join(outputDir, "welcome-email.html"), emailHtml);

console.log("Email HTML generated successfully at output/welcome-email.html");
console.log("You can open this file in a browser to see the result.");
