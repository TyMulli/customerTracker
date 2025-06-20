// Customer Acquisition & Churn Tracker Application
class CustomerTracker {
    constructor() {
        this.acquisitionData = [];
        this.churnData = [];
        this.charts = {};
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderTables();
        this.createCharts();
    }

    // Data Management
    loadData() {
        const savedAcquisitionData = localStorage.getItem('acquisitionData');
        const savedChurnData = localStorage.getItem('churnData');
        
        if (savedAcquisitionData && savedChurnData) {
            this.acquisitionData = JSON.parse(savedAcquisitionData);
            this.churnData = JSON.parse(savedChurnData);
        } else {
            // Load sample data on first visit
            this.loadSampleData();
        }
    }

    loadSampleData() {
        this.acquisitionData = [
            {"month": "2024-01", "newCustomers": 120, "totalLeads": 387, "acquisitionCost": 5225},
            {"month": "2024-02", "newCustomers": 100, "totalLeads": 345, "acquisitionCost": 4341},
            {"month": "2024-03", "newCustomers": 133, "totalLeads": 596, "acquisitionCost": 5138},
            {"month": "2024-04", "newCustomers": 132, "totalLeads": 507, "acquisitionCost": 3398},
            {"month": "2024-05", "newCustomers": 113, "totalLeads": 392, "acquisitionCost": 4526},
            {"month": "2024-06", "newCustomers": 145, "totalLeads": 521, "acquisitionCost": 6102}
        ];
        
        this.churnData = [
            {"month": "2024-01", "totalCustomersStart": 120, "churnedCustomers": 7},
            {"month": "2024-02", "totalCustomersStart": 213, "churnedCustomers": 11},
            {"month": "2024-03", "totalCustomersStart": 335, "churnedCustomers": 26},
            {"month": "2024-04", "totalCustomersStart": 441, "churnedCustomers": 18},
            {"month": "2024-05", "totalCustomersStart": 536, "churnedCustomers": 28},
            {"month": "2024-06", "totalCustomersStart": 653, "churnedCustomers": 32}
        ];
        
        this.saveData();
    }

    saveData() {
        localStorage.setItem('acquisitionData', JSON.stringify(this.acquisitionData));
        localStorage.setItem('churnData', JSON.stringify(this.churnData));
    }

    // Event Listeners
    setupEventListeners() {
        // Form submissions
        document.getElementById('acquisitionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addAcquisitionRecord();
        });

        document.getElementById('churnForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addChurnRecord();
        });

        // Export buttons
        document.getElementById('exportAcquisitionBtn').addEventListener('click', () => {
            this.exportToCSV(this.acquisitionData, 'acquisition_data.csv', 'acquisition');
        });

        document.getElementById('exportChurnBtn').addEventListener('click', () => {
            this.exportToCSV(this.churnData, 'churn_data.csv', 'churn');
        });

        // Clear data button
        document.getElementById('clearDataBtn').addEventListener('click', () => {
            this.clearAllData();
        });
    }

    // Form Handlers
    addAcquisitionRecord() {
        const form = document.getElementById('acquisitionForm');
        const formData = new FormData(form);
        
        const record = {
            month: document.getElementById('acqMonth').value,
            newCustomers: parseInt(document.getElementById('newCustomers').value),
            totalLeads: parseInt(document.getElementById('totalLeads').value),
            acquisitionCost: parseFloat(document.getElementById('acquisitionCost').value)
        };

        // Check if record for this month already exists
        const existingIndex = this.acquisitionData.findIndex(item => item.month === record.month);
        
        if (existingIndex !== -1) {
            // Update existing record
            this.acquisitionData[existingIndex] = record;
            this.showMessage('Acquisition record updated successfully!', 'success');
        } else {
            // Add new record
            this.acquisitionData.push(record);
            this.showMessage('Acquisition record added successfully!', 'success');
        }

        // Sort by month
        this.acquisitionData.sort((a, b) => a.month.localeCompare(b.month));
        
        this.saveData();
        this.updateDisplay();
        form.reset();
    }

    addChurnRecord() {
        const form = document.getElementById('churnForm');
        
        const record = {
            month: document.getElementById('churnMonth').value,
            totalCustomersStart: parseInt(document.getElementById('totalCustomersStart').value),
            churnedCustomers: parseInt(document.getElementById('churnedCustomers').value)
        };

        // Check if record for this month already exists
        const existingIndex = this.churnData.findIndex(item => item.month === record.month);
        
        if (existingIndex !== -1) {
            // Update existing record
            this.churnData[existingIndex] = record;
            this.showMessage('Churn record updated successfully!', 'success');
        } else {
            // Add new record
            this.churnData.push(record);
            this.showMessage('Churn record added successfully!', 'success');
        }

        // Sort by month
        this.churnData.sort((a, b) => a.month.localeCompare(b.month));
        
        this.saveData();
        this.updateDisplay();
        form.reset();
    }

    // Calculations
    calculateAcquisitionRate(newCustomers, totalLeads) {
        return totalLeads > 0 ? ((newCustomers / totalLeads) * 100) : 0;
    }

    calculateCostPerAcquisition(acquisitionCost, newCustomers) {
        return newCustomers > 0 ? (acquisitionCost / newCustomers) : 0;
    }

    calculateChurnRate(churnedCustomers, totalCustomersStart) {
        return totalCustomersStart > 0 ? ((churnedCustomers / totalCustomersStart) * 100) : 0;
    }

    // Dashboard Updates
    renderDashboard() {
        const totalAcquired = this.acquisitionData.reduce((sum, record) => sum + record.newCustomers, 0);
        
        const avgAcquisitionRate = this.acquisitionData.length > 0 
            ? this.acquisitionData.reduce((sum, record) => 
                sum + this.calculateAcquisitionRate(record.newCustomers, record.totalLeads), 0) / this.acquisitionData.length
            : 0;

        const avgCostPerAcquisition = this.acquisitionData.length > 0
            ? this.acquisitionData.reduce((sum, record) => 
                sum + this.calculateCostPerAcquisition(record.acquisitionCost, record.newCustomers), 0) / this.acquisitionData.length
            : 0;

        const avgChurnRate = this.churnData.length > 0
            ? this.churnData.reduce((sum, record) => 
                sum + this.calculateChurnRate(record.churnedCustomers, record.totalCustomersStart), 0) / this.churnData.length
            : 0;

        document.getElementById('totalAcquired').textContent = totalAcquired.toLocaleString();
        document.getElementById('avgAcquisitionRate').textContent = `${avgAcquisitionRate.toFixed(1)}%`;
        document.getElementById('avgCostPerAcquisition').textContent = `$${avgCostPerAcquisition.toFixed(2)}`;
        document.getElementById('avgChurnRate').textContent = `${avgChurnRate.toFixed(1)}%`;
    }

    // Table Rendering
    renderTables() {
        this.renderAcquisitionTable();
        this.renderChurnTable();
    }

    renderAcquisitionTable() {
        const tbody = document.getElementById('acquisitionTableBody');
        tbody.innerHTML = '';

        if (this.acquisitionData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No acquisition data available. Add some records to get started!</td></tr>';
            return;
        }

        this.acquisitionData.forEach((record, index) => {
            const row = document.createElement('tr');
            const acquisitionRate = this.calculateAcquisitionRate(record.newCustomers, record.totalLeads);
            const costPerCustomer = this.calculateCostPerAcquisition(record.acquisitionCost, record.newCustomers);
            
            row.innerHTML = `
                <td>${this.formatMonth(record.month)}</td>
                <td>${record.newCustomers.toLocaleString()}</td>
                <td>${record.totalLeads.toLocaleString()}</td>
                <td>$${record.acquisitionCost.toLocaleString()}</td>
                <td>${acquisitionRate.toFixed(1)}%</td>
                <td>$${costPerCustomer.toFixed(2)}</td>
                <td><button class="btn btn--sm btn--outline" onclick="tracker.deleteAcquisitionRecord(${index})">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    renderChurnTable() {
        const tbody = document.getElementById('churnTableBody');
        tbody.innerHTML = '';

        if (this.churnData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No churn data available. Add some records to get started!</td></tr>';
            return;
        }

        this.churnData.forEach((record, index) => {
            const row = document.createElement('tr');
            const churnRate = this.calculateChurnRate(record.churnedCustomers, record.totalCustomersStart);
            
            row.innerHTML = `
                <td>${this.formatMonth(record.month)}</td>
                <td>${record.totalCustomersStart.toLocaleString()}</td>
                <td>${record.churnedCustomers.toLocaleString()}</td>
                <td>${churnRate.toFixed(1)}%</td>
                <td><button class="btn btn--sm btn--outline" onclick="tracker.deleteChurnRecord(${index})">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    // Chart Creation
    createCharts() {
        this.createAcquisitionChart();
        this.createChurnChart();
        this.createComparisonChart();
    }

    createAcquisitionChart() {
        const ctx = document.getElementById('acquisitionChart').getContext('2d');
        
        if (this.charts.acquisition) {
            this.charts.acquisition.destroy();
        }

        const labels = this.acquisitionData.map(record => this.formatMonth(record.month));
        const data = this.acquisitionData.map(record => record.newCustomers);

        this.charts.acquisition = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'New Customers',
                    data: data,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        }
                    }
                }
            }
        });
    }

    createChurnChart() {
        const ctx = document.getElementById('churnChart').getContext('2d');
        
        if (this.charts.churn) {
            this.charts.churn.destroy();
        }

        const labels = this.churnData.map(record => this.formatMonth(record.month));
        const data = this.churnData.map(record => 
            this.calculateChurnRate(record.churnedCustomers, record.totalCustomersStart)
        );

        this.charts.churn = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Churn Rate (%)',
                    data: data,
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        }
                    }
                }
            }
        });
    }

    createComparisonChart() {
        const ctx = document.getElementById('comparisonChart').getContext('2d');
        
        if (this.charts.comparison) {
            this.charts.comparison.destroy();
        }

        // Create combined dataset for months that have both acquisition and churn data
        const allMonths = [...new Set([...this.acquisitionData.map(r => r.month), ...this.churnData.map(r => r.month)])].sort();
        
        const acquisitionData = allMonths.map(month => {
            const record = this.acquisitionData.find(r => r.month === month);
            return record ? record.newCustomers : 0;
        });

        const churnData = allMonths.map(month => {
            const record = this.churnData.find(r => r.month === month);
            return record ? record.churnedCustomers : 0;
        });

        this.charts.comparison = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: allMonths.map(month => this.formatMonth(month)),
                datasets: [{
                    label: 'New Customers',
                    data: acquisitionData,
                    backgroundColor: '#1FB8CD',
                    borderWidth: 0
                }, {
                    label: 'Churned Customers',
                    data: churnData,
                    backgroundColor: '#B4413C',
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(94, 82, 64, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Utility Functions
    formatMonth(monthString) {
        const [year, month] = monthString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    updateDisplay() {
        this.renderDashboard();
        this.renderTables();
        this.createCharts();
    }

    // Delete Functions
    deleteAcquisitionRecord(index) {
        if (confirm('Are you sure you want to delete this acquisition record?')) {
            this.acquisitionData.splice(index, 1);
            this.saveData();
            this.updateDisplay();
            this.showMessage('Acquisition record deleted successfully!', 'success');
        }
    }

    deleteChurnRecord(index) {
        if (confirm('Are you sure you want to delete this churn record?')) {
            this.churnData.splice(index, 1);
            this.saveData();
            this.updateDisplay();
            this.showMessage('Churn record deleted successfully!', 'success');
        }
    }

    // Export Function
    exportToCSV(data, filename, type) {
        if (data.length === 0) {
            this.showMessage('No data to export!', 'error');
            return;
        }

        let csvContent = '';
        
        if (type === 'acquisition') {
            csvContent = 'Month,New Customers,Total Leads,Acquisition Cost,Acquisition Rate (%),Cost per Customer ($)\n';
            data.forEach(record => {
                const acquisitionRate = this.calculateAcquisitionRate(record.newCustomers, record.totalLeads);
                const costPerCustomer = this.calculateCostPerAcquisition(record.acquisitionCost, record.newCustomers);
                csvContent += `${record.month},${record.newCustomers},${record.totalLeads},${record.acquisitionCost},${acquisitionRate.toFixed(1)},${costPerCustomer.toFixed(2)}\n`;
            });
        } else {
            csvContent = 'Month,Total Customers Start,Churned Customers,Churn Rate (%)\n';
            data.forEach(record => {
                const churnRate = this.calculateChurnRate(record.churnedCustomers, record.totalCustomersStart);
                csvContent += `${record.month},${record.totalCustomersStart},${record.churnedCustomers},${churnRate.toFixed(1)}\n`;
            });
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage(`${type === 'acquisition' ? 'Acquisition' : 'Churn'} data exported successfully!`, 'success');
    }

    // Clear All Data
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            this.acquisitionData = [];
            this.churnData = [];
            localStorage.removeItem('acquisitionData');
            localStorage.removeItem('churnData');
            this.updateDisplay();
            this.showMessage('All data cleared successfully!', 'success');
        }
    }

    // Message Display
    showMessage(message, type) {
        const messageContainer = document.getElementById('messageContainer');
        const messageContent = document.getElementById('messageContent');
        
        messageContent.textContent = message;
        messageContent.className = `message message--${type}`;
        messageContainer.classList.remove('hidden');
        
        setTimeout(() => {
            messageContainer.classList.add('hidden');
        }, 4000);
    }
}

// Initialize the application
const tracker = new CustomerTracker();