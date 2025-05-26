import os
import re

def transform_topic_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the main content (everything between <body> and </body>)
    body_match = re.search(r'<body[^>]*>([\s\S]*)</body>', content, re.IGNORECASE)
    if not body_match:
        print(f"Warning: No body tag found in {file_path}")
        return
    
    main_content = body_match.group(1)
    
    # Wrap the content in a main tag if it doesn't already have one
    if '<main' not in main_content:
        main_content = f'''<main class="py-8">
            <div class="max-w-4xl mx-auto px-4">
                {main_content}
            </div>
        </main>'''
    
    # Create the new file content
    new_content = f'''<!DOCTYPE html>
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
    {main_content}
</body>
</html>'''
    
    # Write the transformed content back to the file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

def main():
    # Get all HTML files in the current directory
    files = [f for f in os.listdir('.') 
             if f.endswith('.html') and f not in ['index.html', 'base.html']]
    
    # Transform each file
    for file in files:
        print(f"Transforming {file}...")
        transform_topic_file(file)
    
    print('All files have been transformed!')

if __name__ == '__main__':
    main() 