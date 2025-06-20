# Customer Acquisition & Churn Tracker - Setup Guide

## Overview
This application helps you track customer acquisition and churn rates month over month on your Windows computer. The program runs in your web browser and stores data locally on your machine.

## System Requirements
- Windows 10 or 11
- Modern web browser (Chrome, Firefox, Edge, or Safari)
- No internet connection required after initial setup

## Installation Instructions

### Option 1: Quick Start (Recommended)
1. Download the application files to your computer
2. Extract all files to a folder (e.g., `C:\CustomerTracker\`)
3. Double-click the `index.html` file to open the application
4. The application will open in your default web browser

### Option 2: Local Web Server (Advanced)
For better performance and additional features:

1. **Install Python** (if not already installed):
   - Download from [python.org](https://python.org)
   - Choose "Add Python to PATH" during installation

2. **Run Local Server**:
   - Open Command Prompt in the application folder
   - Run: `python -m http.server 8000`
   - Open browser and go to: `http://localhost:8000`

## First-Time Setup

### 1. Initial Data
- The application loads with sample data to demonstrate functionality
- You can start adding your own data immediately
- Sample data can be cleared using the "Clear All Data" button

### 2. Adding Customer Acquisition Data
Fill in the following fields:
- **Month**: Select the month and year
- **New Customers**: Number of customers acquired
- **Total Leads**: Total number of leads generated
- **Acquisition Cost**: Total cost spent on acquiring customers

### 3. Adding Churn Data
Fill in the following fields:
- **Month**: Select the month and year
- **Total Customers at Start**: Customer count at beginning of month
- **Churned Customers**: Number of customers who canceled/left

## Key Metrics Explained

### Customer Acquisition Metrics
- **Acquisition Rate**: Percentage of leads that became customers
  - Formula: (New Customers ÷ Total Leads) × 100
- **Cost per Acquisition (CPA)**: Average cost to acquire one customer
  - Formula: Total Acquisition Cost ÷ New Customers

### Churn Metrics
- **Churn Rate**: Percentage of customers who left during the month
  - Formula: (Churned Customers ÷ Total Customers at Start) × 100
- **Retention Rate**: Percentage of customers who stayed
  - Formula: 100% - Churn Rate

## Using the Dashboard

### Metric Cards
- **Total Customers Acquired**: Sum of all new customers for the year
- **Average Acquisition Rate**: Average percentage across all months
- **Average Cost per Acquisition**: Average cost across all months
- **Average Monthly Churn Rate**: Average churn percentage across all months

### Charts
- **Acquisition Trend**: Line chart showing month-over-month customer acquisition
- **Churn Analysis**: Combined chart showing customer base size and churn rates
- **Comparative Analysis**: Side-by-side comparison of acquisition vs churn

### Data Tables
- **Acquisition Table**: Detailed view of all acquisition records with calculated metrics
- **Churn Table**: Detailed view of all churn records with calculated metrics
- **Export Function**: Download data as CSV files for external analysis

## Data Management

### Saving Data
- Data is automatically saved to your browser's local storage
- No internet connection required
- Data persists between browser sessions

### Backing Up Data
1. Click "Export Data" button
2. Save the CSV files to your computer
3. Store files in a secure location for backup

### Importing Data
- Currently supports manual data entry
- For bulk import, use the CSV export format as a template
- Future versions may include CSV import functionality

## Troubleshooting

### Application Won't Load
- Ensure all files are in the same folder
- Try opening with a different browser
- Check if antivirus software is blocking the files

### Data Not Saving
- Ensure browser allows local storage
- Check if private/incognito mode is enabled (data won't persist)
- Clear browser cache and reload the application

### Charts Not Displaying
- Ensure internet connection for initial chart library loading
- Try refreshing the page
- Check browser console for error messages

## Best Practices

### Data Entry
- Enter data consistently each month
- Use the same date format (YYYY-MM)
- Verify calculations before saving
- Keep acquisition costs comprehensive (include all marketing spend)

### Analysis
- Review month-over-month trends regularly
- Compare acquisition and churn rates
- Calculate customer lifetime value using retention data
- Use export feature for advanced analysis in Excel

### Maintenance
- Export data monthly as backup
- Clear browser cache periodically
- Update browser for best performance
- Monitor disk space for local storage

## Privacy & Security
- All data is stored locally on your computer
- No data is transmitted to external servers
- Ensure regular backups to prevent data loss
- Consider password-protecting your computer for additional security

## Support
- For technical issues, check browser console for error messages
- Keep application files updated
- Refer to browser help for local storage troubleshooting
- Consider using Python web server for better performance

## Formulas Reference

### Customer Acquisition Rate
```
Acquisition Rate (%) = (New Customers ÷ Total Leads) × 100
```

### Cost per Acquisition
```
CPA ($) = Total Acquisition Cost ÷ New Customers
```

### Churn Rate
```
Churn Rate (%) = (Churned Customers ÷ Total Customers at Start) × 100
```

### Monthly Churn to Annual Churn Conversion
```
Annual Churn Rate = 1 - (1 - Monthly Churn Rate)^12
```

### Customer Lifetime Value (Basic)
```
CLV = Average Revenue per Customer × Average Customer Lifespan
```

## File Structure
```
CustomerTracker/
├── index.html          # Main application file
├── style.css           # Styling and layout
├── app.js              # Application logic
├── setup-guide.md      # This guide
└── README.md           # Quick start instructions
```

## Version History
- v1.0: Initial release with core tracking functionality
- Features: Data entry, calculations, charts, export functionality
- Platform: Windows compatible, browser-based application