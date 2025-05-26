import React from 'react'
import Header from './components/Header'

const modules = {
  'Problem Solving': [
    { name: 'Hypothesis-Driven Problem Solving', file: '20hypothesisdriven.html' },
    { name: 'Story-lining', file: '56storylining.html' },
    { name: 'MECE Framework', file: '21mece.html' },
    { name: 'Issue Trees', file: '57issuetrees.html' },
    { name: 'Decision Trees', file: '22decisiontrees.html' },
    { name: 'Root Cause Analysis', file: '58rootcauseanalysis.html' },
    { name: 'Scenario Analysis', file: '23scenarioanalysis.html' },
  ],
  'Financial Acumen': [
    { name: 'Financial Statements', file: '11financialreports.html' },
    { name: 'Common-Size Analysis', file: '59commonsize.html' },
    { name: 'Share Gain & P&L Modeling', file: '60sharegainpnlmodeling.html' },
    { name: 'Applied Financial Statements', file: '61appliedfinancialstatements.html' },
    { name: 'Key Financial Ratios', file: '12keyfinancialratios.html' },
    { name: 'Cost Benefit Analysis', file: '13costbenefit.html' },
  ],
  'Strategic Frameworks': [
    { name: '4Ps GTM Strategy', file: '184ps.html' },
    { name: 'SWOT Analysis', file: '14swot.html' },
    { name: "Porter's Five Forces", file: '62portersfive.html' },
    { name: 'Value Chain Analysis', file: '64valuechain.html' },
    { name: 'BCG Matrix', file: '17bcgmatrix.html' },
    { name: 'OKRs', file: '19okrs.html' },
  ],
  'Organizational Behavior': [
    { name: 'RACI', file: '31raci.html' },
    { name: 'RAPIDs', file: '32rapids.html' },
    { name: 'Process Maps', file: '33processmaps.html' },
    { name: 'Process Reengineering', file: '34processengineering.html' },
    { name: "Kotter's 8-Step Change", file: '35kotter.html' },
  ],
  'Product & Operations': [
    { name: 'Supply Chain Management', file: '44fundamentalssupplychainmanag.html' },
    { name: 'Forecasting & Planning', file: '45forecastingplanning.html' },
    { name: 'Lifecycle Management', file: '46lifecyclemanagement.html' },
    { name: 'Transitions', file: '47transitions.html' },
    { name: 'Marketing', file: '48marketing.html' },
    { name: 'Pricing', file: '49pricing.html' },
    { name: 'Inventory Management', file: '50inventorymanagement.html' },
    { name: 'Demand Shaping', file: '51demandshaping.html' },
    { name: 'Ethics', file: '52ethics.html' },
  ],
  'Project Management': [
    { name: 'Workplan Development', file: '38workplan.html' },
    { name: 'Stakeholder Management', file: '39stakeholder.html' },
    { name: 'Tools: Gantts & RACI', file: '40toolsganttsraci.html' },
  ],
  'Communication': [
    { name: 'Building Executive Summaries', file: '41buildingcompelling.html' },
    { name: 'Business Storytelling', file: '42storytellingbusiness.html' },
    { name: 'Delivering Feedback', file: '43deliveringfeedback.html' },
  ],
} as const

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Introduction Section */}
        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-800 mb-8 fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150' width='80' height='80'%3E%3Crect width='150' height='150' fill='%230076CE' rx='15'/%3E%3Cpath d='M39 55 H111 V95 H39 Z' fill='white'/%3E%3Cpath d='M56 65 H94 V85 H56 Z' fill='%230076CE'/%3E%3C/svg%3E" 
                alt="Dell Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-3xl font-bold text-secondary dark:text-white mb-2">Dell Strategy Toolkit</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Learning Platform</p>
              <div className="w-16 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>Welcome to Dell's comprehensive strategy reference library. This toolkit equips you with proven frameworks, methodologies, and tools to excel in business analysis and decision-making. Use these resources to analyze complex situations, develop strategic recommendations, and drive successful implementations within Dell.</p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center text-primary">
                  <i className="ri-tools-line mr-2"></i>
                  Business Excellence
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">A curated collection of frameworks and tools used by leading organizations, tailored to Dell's business context.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center text-primary">
                  <i className="ri-book-open-line mr-2"></i>
                  Practical Application
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Each framework includes practical examples, templates, and implementation guidance for immediate application to business challenges.</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center text-primary">
                  <i className="ri-presentation-line mr-2"></i>
                  Ready-to-Use Resources
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Professionally designed frameworks and visualizations ready to be incorporated into presentations and strategic planning.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Learning Modules */}
        <h2 className="text-2xl font-bold mb-6">Learning Modules</h2>
        
        {/* Structured Problem-Solving Module */}
        <section id="structured-problem-solving" className="mb-10">
          <div className="module-card module-problem-solving bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <i className="ri-mind-map text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Structured Problem-Solving</h3>
                <p className="text-gray-600 dark:text-gray-400">Methodical approaches to analyzing and solving business challenges</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">Systematic methodologies for breaking down complex business problems into manageable components, ensuring comprehensive analysis and defensible recommendations.</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">MECE</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">Issue Trees</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">Root Cause</span>
            </div>
          </div>
          
          <div className="pl-4 ml-4 border-l-2 border-indigo-200 dark:border-indigo-900 space-y-2">
            <a href="#hypothesis-driven" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Hypothesis-driven problem-solving</a>
            <a href="#story-lining" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Story-lining</a>
            <a href="#mece-framework" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">MECE Framework</a>
            <a href="#issue-trees" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Issue Trees</a>
            <a href="#decision-trees" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Decision Trees</a>
            <a href="#root-cause-analysis" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Root Cause Analysis</a>
            <a href="#scenario-analysis" className="block text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Scenario Analysis</a>
          </div>
        </section>
        
        {/* Financial Acumen Module */}
        <section id="financial-acumen" className="mb-10">
          <div className="module-card module-financial bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <i className="ri-line-chart-line text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">Financial Acumen</h3>
                <p className="text-gray-600 dark:text-gray-400">Understanding and analyzing financial metrics and performance</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">Master the fundamentals of financial analysis, from understanding key metrics to developing comprehensive financial models for business decision-making.</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">Financial Modeling</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">Valuation</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">Metrics</span>
            </div>
          </div>
          
          <div className="pl-4 ml-4 border-l-2 border-amber-200 dark:border-amber-900 space-y-2">
            <a href="#financial-statements" className="block text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400">Financial Statements Analysis</a>
            <a href="#valuation-methods" className="block text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400">Valuation Methods</a>
            <a href="#financial-modeling" className="block text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400">Financial Modeling</a>
            <a href="#metrics-kpis" className="block text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400">Key Metrics & KPIs</a>
            <a href="#investment-analysis" className="block text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400">Investment Analysis</a>
          </div>
        </section>
      </main>
    </>
  )
} 