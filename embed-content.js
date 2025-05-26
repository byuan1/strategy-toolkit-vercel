const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Map of topic IDs to their corresponding HTML files
const topicMap = {
  'raci': '31raci.html',
  'rapids': '32rapids.html',
  'process-maps': '33processmaps.html',
  'process-reengineering': '34processengineering.html',
  'kotters-8-step': '35kotter.html',
  'workplan-development': '38workplan.html',
  'stakeholder-engagement': '39stakeholder.html',
  'project-management-tools': '40toolsganttsraci.html',
  'hypothesis-driven': '20hypothesisdriven.html',
  'story-lining': '56storylining.html',
  'mece-framework': '21mece.html',
  'issue-trees': '57issuetrees.html',
  'decision-trees': '22decisiontrees.html',
  'root-cause-analysis': '58rootcauseanalysis.html',
  'scenario-analysis': '23scenarioanalysis.html',
  'financial-statements': '11financialreports.html',
  'common-size-analysis': '59commonsize.html',
  'financial-modeling': '60sharegainpnlmodeling.html',
  'applied-financial-statements': '61appliedfinancialstatements.html',
  'financial-ratios': '12keyfinancialratios.html',
  'cost-benefit-analysis': '13costbenefit.html',
  'swot-analysis': '14swot.html',
  'bcg-matrix': '17bcgmatrix.html',
  '4ps-gtm': '184ps.html',
  'okrs': '19okrs.html',
  'supply-chain-management': '44fundamentalssupplychainmanag.html',
  'forecasting-planning': '45forecastingplanning.html',
  'lifecycle-management': '46lifecyclemanagement.html',
  'transitions': '47transitions.html',
  'marketing': '48marketing.html',
  'pricing': '49pricing.html',
  'inventory-management': '50inventorymanagement.html',
  'demand-shaping': '51demandshaping.html',
  'ethics': '52ethics.html',
  'executive-summaries': '41buildingcompelling.html',
  'business-storytelling': '42storytellingbusiness.html',
  'delivering-feedback': '43deliveringfeedback.html'
};

// Read the base template
const baseTemplate = fs.readFileSync('base.html', 'utf8');

// First, create the homepage (index.html)
const indexPage = cheerio.load(baseTemplate);

// Fix links in the index page
indexPage('a[href^="#"]').each((i, elem) => {
  const href = indexPage(elem).attr('href');
  const topicId = href.replace('#', '');
  if (topicMap[topicId]) {
    indexPage(elem).attr('href', topicMap[topicId]);
  }
});

// Save the modified index page
fs.writeFileSync(path.join(publicDir, 'index.html'), indexPage.html());
console.log('Created public/index.html');

// Process each topic file
Object.values(topicMap).forEach(file => {
  if (fs.existsSync(file)) {
    const $ = cheerio.load(baseTemplate); // Start with fresh base template
    const topicContent = fs.readFileSync(file, 'utf8');
    const topic$ = cheerio.load(topicContent);
    
    // Extract the main content (everything inside <main>)
    const mainContent = topic$('main').html();
    
    if (mainContent) {
      // Replace the main content in the base template
      $('main').html(mainContent);
      
      // Update the title
      const topicTitle = topic$('title').text() || file.replace('.html', '');
      $('title').text(topicTitle);

      // Add a "Back to Home" button at the top of main content
      $('main').prepend(`
        <div class="mb-6">
          <a href="index.html" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <i class="ri-arrow-left-line"></i>
            <span>Back to Home</span>
          </a>
        </div>
      `);

      // Fix links in the topic page
      $('a[href^="#"]').each((i, elem) => {
        const href = $(elem).attr('href');
        const topicId = href.replace('#', '');
        if (topicMap[topicId]) {
          $(elem).attr('href', topicMap[topicId]);
        }
      });

      // Save the file
      fs.writeFileSync(path.join(publicDir, file), $.html());
      console.log(`Created public/${file}`);
    }
  }
});

// Add CSS for transitions to all files
const transitionCSS = `
<style>
  /* Smooth transitions */
  .transition-colors {
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  
  /* Hover effects */
  .hover\\:bg-gray-200:hover {
    background-color: rgba(229, 231, 235, 1);
  }
  
  .dark .dark\\:hover\\:bg-gray-700:hover {
    background-color: rgba(55, 65, 81, 1);
  }
</style>
`;

// Add the CSS to all files in public directory
fs.readdirSync(publicDir).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace('</head>', `${transitionCSS}</head>`);
    fs.writeFileSync(filePath, content);
  }
}); 