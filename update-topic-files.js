const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Map of topic IDs to their corresponding HTML files (without .html extension)
const topicMap = {
  '20hypothesisdriven': '20hypothesisdriven',
  '56storylining': '56storylining',
  '21mece': '21mece',
  '57issuetrees': '57issuetrees',
  '22decisiontrees': '22decisiontrees',
  '58rootcauseanalysis': '58rootcauseanalysis',
  '23scenarioanalysis': '23scenarioanalysis',
  '62portersfive': '62portersfive',
  '64valuechain': '64valuechain',
  '88ansoff': '88ansoff',
  '11financialreports': '11financialreports',
  '59commonsize': '59commonsize',
  '60sharegainpnlmodeling': '60sharegainpnlmodeling',
  '61appliedfinancialstatements': '61appliedfinancialstatements',
  '12keyfinancialratios': '12keyfinancialratios',
  '13costbenefit': '13costbenefit',
  '14swot': '14swot',
  '15pestel': '15pestel',
  '16businessmodelcanvas': '16businessmodelcanvas',
  '17bcgmatrix': '17bcgmatrix',
  '19okrs': '19okrs',
  '184ps': '184ps',
  '31raci': '31raci',
  '32rapids': '32rapids',
  '33processmaps': '33processmaps',
  '34processengineering': '34processengineering',
  '35kotter': '35kotter',
  '44fundamentalssupplychainmanag': '44fundamentalssupplychainmanag',
  '45forecastingplanning': '45forecastingplanning',
  '46lifecyclemanagement': '46lifecyclemanagement',
  '47transitions': '47transitions',
  '48marketing': '48marketing',
  '49pricing': '49pricing',
  '50inventorymanagement': '50inventorymanagement',
  '51demandshaping': '51demandshaping',
  '52ethics': '52ethics',
  '38workplan': '38workplan',
  '39stakeholder': '39stakeholder',
  '40toolsganttsraci': '40toolsganttsraci',
  '41buildingcompelling': '41buildingcompelling',
  '42storytellingbusiness': '42storytellingbusiness',
  '43deliveringfeedback': '43deliveringfeedback',
  // Additional mappings for data-topic attributes
  'topic-process-maps': '33processmaps',
  'topic-process-reengineering': '34processengineering',
  'topic-change-management': '35kotter',
  'topic-raci': '31raci',
  'topic-rapids': '32rapids',
  // Additional mappings for hash-based links
  'process-maps': '33processmaps',
  'process-reengineering': '34processengineering',
  'kotters-8-step': '35kotter',
  'supply-chain-management': '44fundamentalssupplychainmanag',
  'forecasting-planning': '45forecastingplanning',
  'lifecycle-management': '46lifecyclemanagement',
  'inventory-management': '50inventorymanagement',
  'demand-shaping': '51demandshaping',
  'workplan-development': '38workplan',
  'stakeholder-engagement': '39stakeholder',
  'project-management-tools': '40toolsganttsraci',
  'hypothesis-driven': '20hypothesisdriven',
  'story-lining': '56storylining',
  'mece-framework': '21mece',
  'issue-trees': '57issuetrees',
  'decision-trees': '22decisiontrees',
  'root-cause-analysis': '58rootcauseanalysis',
  'scenario-analysis': '23scenarioanalysis',
  'financial-statements': '11financialreports',
  'common-size-analysis': '59commonsize',
  'financial-modeling': '60sharegainpnlmodeling',
  'applied-financial-statements': '61appliedfinancialstatements',
  'financial-ratios': '12keyfinancialratios',
  'cost-benefit-analysis': '13costbenefit',
  // Additional variations
  'executive-summaries': '41buildingcompelling',
  'business-storytelling': '42storytellingbusiness',
  'managing-up': '43deliveringfeedback',
  'feedback': '43deliveringfeedback',
  'transition-management': '47transitions',
  'marketing-fundamentals': '48marketing',
  'pricing-strategy': '49pricing',
  'raci-matrix': '31raci',
  'rapids-framework': '32rapids',
  // Ethics mappings
  'business-ethics': '52ethics',
  'ethical-framework': '52ethics',
  // Building Executive Summaries mappings
  'building-executive-summaries': '41buildingcompelling',
  'compelling-communications': '41buildingcompelling',
  'executive-summary': '41buildingcompelling',
  // Storytelling mappings
  'storytelling': '42storytellingbusiness',
  'storytelling-in-business': '42storytellingbusiness',
  'story-telling': '42storytellingbusiness',
  // Feedback & Managing Up mappings
  'delivering-feedback': '43deliveringfeedback',
  'feedback-management': '43deliveringfeedback',
  // Transitions mappings
  'managing-transitions': '47transitions',
  'business-transitions': '47transitions',
  // Marketing mappings
  'marketing-strategy': '48marketing',
  'marketing-basics': '48marketing',
  // Pricing mappings
  'pricing-fundamentals': '49pricing',
  'price-strategy': '49pricing',
  // RACI mappings
  'raci': '31raci',
  'responsibility-matrix': '31raci',
  'raci-framework': '31raci',
  // RAPIDs mappings
  'rapids': '32rapids',
  'rapids-matrix': '32rapids',
  'rapids-decision-making': '32rapids',
  // Exact hash mappings from base.html
  'ethics': '52ethics',
  'raci': '31raci',
  'rapids': '32rapids',
  'transitions': '47transitions',
  'marketing': '48marketing',
  'pricing': '49pricing',
  'business-storytelling': '42storytellingbusiness',
  'building-executive-summaries': '41buildingcompelling',
  'delivering-feedback-managing-up': '43deliveringfeedback'
};

// List of all HTML files to process
const allFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

// Process each HTML file
allFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(content);

    // Remove the old script
    $('script').each((i, el) => {
      const script = $(el);
      if (script.html()?.includes('showTopic')) {
        script.remove();
      }
    });

    // Add the new script reference
    $('body').append('\n    <script src="/topic-navigation.js"></script>\n');

    // Update all links to use direct file paths without .html extension
    $('a').each((i, el) => {
      const link = $(el);
      const href = link.attr('href');
      const dataTopic = link.attr('data-topic');
      
      // Skip if no href and no data-topic, or if it's an external link
      if ((!href && !dataTopic) || (href && href.startsWith('http'))) return;
      
      // If it has a data-topic attribute, use that for mapping
      if (dataTopic && topicMap[dataTopic]) {
        link.attr('href', '/' + topicMap[dataTopic]);
        link.removeAttr('data-topic');
      }
      // If it's a hash link, try to find the corresponding file
      else if (href && href.startsWith('#')) {
        const hash = href.substring(1);
        if (topicMap[hash]) {
          link.attr('href', '/' + topicMap[hash]);
        }
      }
      // If it's a file link with .html extension, remove it
      else if (href && href.endsWith('.html')) {
        const baseName = href.replace('.html', '');
        link.attr('href', baseName.startsWith('/') ? baseName : '/' + baseName);
      }
    });

    // Update topic links in sidebar
    $('.topic-link').each((i, el) => {
      const link = $(el);
      const topicId = link.attr('data-topic');
      if (topicId && topicMap[topicId]) {
        link.attr('href', '/' + topicMap[topicId]);
        link.removeAttr('data-topic');
      }
    });

    // Update next/prev buttons
    $('.next-topic, .prev-topic').each((i, el) => {
      const button = $(el);
      const topicId = button.attr('data-next') || button.attr('data-prev');
      if (topicId && topicMap[topicId]) {
        button.attr('href', '/' + topicMap[topicId]);
        button.removeAttr('data-next');
        button.removeAttr('data-prev');
        // Convert button to anchor if it's not already
        if (button.prop('tagName') === 'BUTTON') {
          const classes = button.attr('class');
          const text = button.html();
          const newLink = $('<a></a>');
          newLink.attr('class', classes);
          newLink.attr('href', '/' + topicMap[topicId]);
          newLink.html(text);
          button.replaceWith(newLink);
        }
      }
    });

    // Save the updated file to the public directory
    fs.writeFileSync(path.join(publicDir, file), $.html());
    console.log(`Updated ${file}`);
  }
});

// Update topic-navigation.js
const navigationJs = `document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    document.getElementById('theme-toggle')?.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
    });
    
    // Mobile sidebar toggle
    document.getElementById('mobile-sidebar-toggle')?.addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('fixed');
            sidebar.classList.toggle('inset-0');
            sidebar.classList.toggle('z-50');
            sidebar.classList.toggle('lg:block');
            sidebar.classList.toggle('lg:static');
            sidebar.classList.toggle('lg:inset-auto');
            sidebar.classList.toggle('lg:z-auto');
        }
    });

    // Back to modules button
    document.getElementById('back-to-modules')?.addEventListener('click', function() {
        window.location.href = '/';
    });

    // Update active state in sidebar based on current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.topic-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-primary/10', 'dark:bg-primary/20');
        } else {
            link.classList.remove('bg-primary/10', 'dark:bg-primary/20');
        }
    });
});`;

fs.writeFileSync(path.join(publicDir, 'topic-navigation.js'), navigationJs);
console.log('Updated topic-navigation.js');

// Copy base.html to public/index.html
if (fs.existsSync('base.html')) {
  const content = fs.readFileSync('base.html', 'utf8');
  const $ = cheerio.load(content);

  // Update all links to use direct file paths without .html extension
  $('a').each((i, el) => {
    const link = $(el);
    const href = link.attr('href');
    const dataTopic = link.attr('data-topic');
    
    // Skip if no href and no data-topic, or if it's an external link
    if ((!href && !dataTopic) || (href && href.startsWith('http'))) return;
    
    // If it has a data-topic attribute, use that for mapping
    if (dataTopic && topicMap[dataTopic]) {
      link.attr('href', '/' + topicMap[dataTopic]);
      link.removeAttr('data-topic');
    }
    // If it's a hash link, try to find the corresponding file
    else if (href && href.startsWith('#')) {
      const hash = href.substring(1);
      if (topicMap[hash]) {
        link.attr('href', '/' + topicMap[hash]);
      }
    }
    // If it's a file link with .html extension, remove it
    else if (href && href.endsWith('.html')) {
      const baseName = href.replace('.html', '');
      link.attr('href', baseName.startsWith('/') ? baseName : '/' + baseName);
    }
  });

  fs.writeFileSync(path.join(publicDir, 'index.html'), $.html());
  console.log('Updated base.html -> index.html');
}

console.log('All files updated'); 