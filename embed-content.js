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
  'topic-hypothesis': '56storylining.html',
  'topic-storylining': '57issuetrees.html',
  'topic-mece': '58rootcauseanalysis.html',
  'topic-issue-trees': '57issuetrees.html',
  'topic-decision-trees': '29investment.html',
  'topic-root-cause': '58rootcauseanalysis.html',
  'topic-scenario-analysis': '24financialstatementanalysis.html',
  'topic-porters-five': '62portersfive.html',
  'topic-value-chain': '64valuechain.html',
  'topic-ansoff': '88ansoff.html'
};

// List of topic files to process
const topicFiles = Object.values(topicMap);

// Copy each topic file to public directory
topicFiles.forEach(file => {
  if (fs.existsSync(file)) {
    // Copy the file directly
    fs.copyFileSync(file, path.join(publicDir, file));
    console.log(`Copied ${file} to public directory`);
  }
});

// Copy topic-navigation.js to public directory
if (fs.existsSync('topic-navigation.js')) {
  fs.copyFileSync('topic-navigation.js', path.join(publicDir, 'topic-navigation.js'));
  console.log('Copied topic-navigation.js to public directory');
}

// Read and process base.html
const baseContent = fs.readFileSync('base.html', 'utf8');
const $ = cheerio.load(baseContent);

// Update topic links to point to HTML files
$('a[data-topic]').each((i, el) => {
  const topicId = $(el).attr('data-topic');
  const topicFile = topicMap[topicId];
  if (topicFile) {
    $(el).attr('href', '/' + topicFile);
  }
});

// Update next/prev topic buttons
$('.next-topic').each((i, el) => {
  const nextTopicId = $(el).attr('data-next');
  const nextTopicFile = topicMap[nextTopicId];
  if (nextTopicFile) {
    $(el).attr('href', '/' + nextTopicFile);
  }
});

$('.prev-topic').each((i, el) => {
  const prevTopicId = $(el).attr('data-prev');
  const prevTopicFile = topicMap[prevTopicId];
  if (prevTopicFile) {
    $(el).attr('href', '/' + prevTopicFile);
  }
});

// Save the modified base.html as index.html
fs.writeFileSync(path.join(publicDir, 'index.html'), $.html());
console.log('Created index.html with updated links'); 