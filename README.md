# Customer Acquisition & Churn Tracker for Windows

A comprehensive solution to track customer acquisition and churn rates month over month on Windows computers.

## Two Application Options

### 🌐 Web Application (Recommended)
- **Browser-based**: Runs in any modern web browser
- **No installation**: Simply open the HTML file
- **Modern interface**: Professional dashboard with interactive charts
- **Local storage**: Data saved in browser's local storage
- **Export functionality**: CSV download capabilities

**Quick Start:**
1. Download application files
2. Double-click `index.html`
3. Start tracking your metrics

### 🖥️ Desktop Application (Advanced)
- **Native desktop app**: Traditional Windows application feel
- **SQLite database**: Persistent local data storage
- **Advanced charts**: Professional matplotlib visualizations
- **Full data management**: Import, export, and backup capabilities

**Quick Start:**
1. Install Python 3.7+
2. Run: `pip install matplotlib numpy`
3. Run: `python customer_tracker_desktop.py`

## Key Features

### 📊 Metrics Tracking
- **Customer Acquisition Rate**: % of leads converted to customers
- **Cost per Acquisition**: Average cost to acquire one customer
- **Churn Rate**: % of customers lost each month
- **Month-over-Month Trends**: Visual trend analysis

### 📈 Dashboard
- Real-time key performance indicators
- Interactive charts and visualizations
- Month-over-month comparison
- Professional data tables

### 💾 Data Management
- Local data storage (no cloud dependency)
- CSV export for external analysis
- Data backup and restore capabilities
- Form validation and error handling

## Formula Reference

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

### Annual Churn Rate Conversion
```
Annual Churn Rate = 1 - (1 - Monthly Churn Rate)^12
```

## System Requirements

- **Operating System**: Windows 10 or 11
- **Web Browser**: Chrome, Firefox, Edge, or Safari (for web app)
- **Python**: 3.7+ (for desktop app)
- **Storage**: Minimal disk space required
- **Internet**: Only needed for initial chart library loading

## Data Privacy

- **100% Local**: All data stored on your computer
- **No Cloud**: No data transmitted to external servers
- **Secure**: Password-protect your computer for additional security
- **Portable**: Easy to backup and transfer data

## Best Practices

### Data Entry
- Enter data consistently each month
- Use YYYY-MM date format (e.g., 2024-01)
- Include all acquisition costs (marketing, sales, overhead)
- Track both voluntary and involuntary churn

### Analysis
- Review trends monthly
- Compare acquisition vs churn rates
- Calculate customer lifetime value
- Monitor cost efficiency over time

### Maintenance
- Export data monthly for backup
- Clear browser cache periodically (web app)
- Keep application files updated
- Monitor local storage space

## Getting Started

### Sample Data Included
Both applications include sample data to demonstrate functionality:
- 6 months of acquisition data
- 6 months of churn data
- Pre-calculated metrics and charts

### Step-by-Step Process
1. **Setup**: Choose and install your preferred application
2. **Data Entry**: Add your customer acquisition and churn data
3. **Analysis**: Review dashboard metrics and trends
4. **Export**: Download data for external analysis
5. **Backup**: Regular data export for safekeeping

## Support & Troubleshooting

### Common Issues
- **Charts not loading**: Ensure internet connection for initial setup
- **Data not saving**: Check browser settings for local storage
- **Application won't start**: Verify all files are in same folder

### Performance Tips
- Use local web server for better web app performance
- Export data regularly to prevent loss
- Monitor browser storage usage
- Keep Python packages updated (desktop app)

## File Structure

```
CustomerTracker/
├── index.html              # Web application main file
├── style.css               # Web application styling
├── app.js                  # Web application logic
├── customer_tracker_desktop.py  # Desktop application
├── setup-guide.md          # Detailed setup instructions
├── desktop-app-code.md     # Desktop app source code
└── README.md               # This file
```

## Version Information

- **Version**: 1.0
- **Release Date**: June 2025
- **Compatibility**: Windows 10/11
- **Language**: English
- **License**: Free for personal and commercial use

## Why Track These Metrics?

### Customer Acquisition
- **Optimize Marketing**: Understand which channels work best
- **Budget Planning**: Allocate resources effectively
- **Growth Tracking**: Monitor business expansion
- **ROI Analysis**: Measure marketing return on investment

### Churn Tracking
- **Retention Strategy**: Identify when customers leave
- **Revenue Impact**: Understand revenue loss patterns
- **Product Improvement**: Find areas for enhancement
- **Customer Success**: Proactive retention efforts

Start tracking your customer metrics today and gain insights into your business growth!