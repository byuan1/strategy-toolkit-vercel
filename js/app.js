// Navigation structure
const navigation = {
    "Strategy Toolkit": {
        icon: "ri-dashboard-line",
        sections: {
            "Structured Problem Solving": {
                icon: "ri-mind-map",
                topics: [
                    { id: "20hypothesisdriven", title: "Hypothesis-driven Problem Solving" },
                    { id: "56storylining", title: "Story-lining" },
                    { id: "21mece", title: "MECE Framework" },
                    { id: "57issuetrees", title: "Issue Trees" },
                    { id: "22decisiontrees", title: "Decision Trees" },
                    { id: "58rootcauseanalysis", title: "Root Cause Analysis" },
                    { id: "23scenarioanalysis", title: "Scenario Analysis" }
                ]
            },
            "Financial Acumen": {
                icon: "ri-line-chart-line",
                topics: [
                    { id: "11financialreports", title: "Financial Statements" },
                    { id: "59commonsize", title: "Common-Size Analysis" },
                    { id: "60sharegainpnlmodeling", title: "Financial Modeling" },
                    { id: "61appliedfinancialstatements", title: "Dell's Financial Reports" },
                    { id: "12keyfinancialratios", title: "Key Financial Ratios" },
                    { id: "13costbenefit", title: "Cost-Benefit Analysis" }
                ]
            },
            "Strategic Frameworks": {
                icon: "ri-layout-grid-line",
                topics: [
                    { id: "14swot", title: "SWOT Analysis" },
                    { id: "62portersfive", title: "Porter's Five Forces" },
                    { id: "15pestel", title: "PESTEL Analysis" },
                    { id: "17bcgmatrix", title: "BCG Matrix" },
                    { id: "64valuechain", title: "Value Chain Analysis" },
                    { id: "184ps", title: "4Ps GTM Strategy" },
                    { id: "19okrs", title: "OKRs & Ansoff Matrix" }
                ]
            }
        }
    }
};

// DOM Elements
const contentContainer = document.getElementById('content-container');
const loadingSpinner = document.getElementById('loading-spinner');
const mainNav = document.getElementById('main-nav');
const mobileToggle = document.getElementById('mobile-sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const themeToggle = document.getElementById('theme-toggle');

// Theme handling
function initializeTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}

// Mobile sidebar handling
function initializeMobileSidebar() {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });

    // Hide sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024 && 
            !sidebar.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            sidebar.classList.add('hidden');
        }
    });
}

// Content loading
async function loadContent(topicId) {
    try {
        loadingSpinner.style.display = 'block';
        contentContainer.classList.remove('loaded');
        
        const response = await fetch(`/${topicId}.html`);
        if (!response.ok) throw new Error('Content not found');
        
        let html = await response.text();
        
        // Extract the main content from the topic file
        const mainContent = extractMainContent(html);
        
        contentContainer.innerHTML = mainContent;
        setTimeout(() => contentContainer.classList.add('loaded'), 100);
    } catch (error) {
        contentContainer.innerHTML = `
            <div class="text-center py-12">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Content Not Available
                </h2>
                <p class="text-gray-600 dark:text-gray-400">
                    The requested content could not be loaded. Please try again later.
                </p>
            </div>
        `;
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

// Extract main content from topic files
function extractMainContent(html) {
    // Find the main content section
    const mainContentMatch = html.match(/<main[^>]*>([\s\S]*)<\/main>/i);
    if (mainContentMatch) return mainContentMatch[1];
    
    // Fallback: try to find content between header and footer
    const contentMatch = html.match(/<\/header>([\s\S]*)<footer/i);
    if (contentMatch) return contentMatch[1];
    
    // If no matches, return the whole HTML
    return html;
}

// Build navigation menu
function buildNavigation() {
    Object.entries(navigation).forEach(([category, categoryData]) => {
        const categorySection = document.createElement('div');
        categorySection.className = 'mb-6';
        
        // Add category header
        categorySection.innerHTML = `
            <div class="flex items-center gap-2 px-3 py-2 mb-2">
                <i class="${categoryData.icon} text-primary"></i>
                <h3 class="text-sm font-semibold">${category}</h3>
            </div>
        `;
        
        // Add sections
        Object.entries(categoryData.sections).forEach(([section, sectionData]) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'mb-4';
            
            sectionElement.innerHTML = `
                <div class="flex items-center gap-2 px-3 py-2">
                    <i class="${sectionData.icon} text-gray-600 dark:text-gray-400"></i>
                    <h4 class="text-sm font-medium">${section}</h4>
                </div>
                <ul class="space-y-1 ml-6">
                    ${sectionData.topics.map(topic => `
                        <li>
                            <a href="#${topic.id}" 
                               class="topic-link block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                               data-topic="${topic.id}">
                                ${topic.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;
            
            categorySection.appendChild(sectionElement);
        });
        
        mainNav.appendChild(categorySection);
    });
}

// Initialize the application
function initialize() {
    buildNavigation();
    initializeTheme();
    initializeMobileSidebar();
    
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.topic-link')) {
            e.preventDefault();
            const topicId = e.target.closest('.topic-link').dataset.topic;
            loadContent(topicId);
            
            // Update active state
            document.querySelectorAll('.topic-link').forEach(link => {
                link.classList.remove('bg-primary/10', 'dark:bg-primary/20', 'text-primary');
            });
            e.target.closest('.topic-link').classList.add('bg-primary/10', 'dark:bg-primary/20', 'text-primary');
            
            // Close mobile sidebar
            if (window.innerWidth < 1024) {
                sidebar.classList.add('hidden');
            }
            
            // Update URL
            window.history.pushState({}, '', `#${topicId}`);
        }
    });
    
    // Handle initial load and browser navigation
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            loadContent(hash);
        }
    });
    
    // Load initial content if hash exists
    if (window.location.hash) {
        const hash = window.location.hash.slice(1);
        loadContent(hash);
    }
}

// Start the application
initialize(); 