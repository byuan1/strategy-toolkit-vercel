const fs = require('fs');
const path = require('path');

// Function to transform a topic file
function transformTopicFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the main content (everything between <body> and </body>)
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (!bodyMatch) return;
    
    let mainContent = bodyMatch[1];
    
    // Wrap the content in a main tag if it doesn't already have one
    if (!mainContent.includes('<main')) {
        mainContent = `<main class="py-8">
            <div class="max-w-4xl mx-auto px-4">
                ${mainContent}
            </div>
        </main>`;
    }
    
    // Create the new file content
    const newContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dell Strategy Toolkit | Learning Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <style>
        /* Add any topic-specific styles here */
    </style>
</head>
<body class="bg-gray-50 dark:bg-darkBg text-lightText dark:text-darkText">
    ${mainContent}
</body>
</html>`;
    
    // Write the transformed content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');
}

// Get all HTML files in the current directory
const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.html') && file !== 'index.html' && file !== 'base.html');

// Transform each file
files.forEach(file => {
    console.log(`Transforming ${file}...`);
    transformTopicFile(file);
});

console.log('All files have been transformed!'); 