# Customer Tracker Desktop Application (Python/Tkinter)

## Requirements
```bash
pip install matplotlib numpy
```

## Application Code

```python
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import sqlite3
import csv
from datetime import datetime
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

class CustomerTracker:
    def __init__(self, root):
        self.root = root
        self.root.title("Customer Acquisition & Churn Tracker")
        self.root.geometry("1200x800")
        
        # Initialize database
        self.init_database()
        
        # Create GUI
        self.create_widgets()
        
        # Load initial data
        self.refresh_data()
    
    def init_database(self):
        """Initialize SQLite database for data storage"""
        self.conn = sqlite3.connect('customer_tracker.db')
        cursor = self.conn.cursor()
        
        # Create acquisition table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS acquisition_data (
                id INTEGER PRIMARY KEY,
                month TEXT NOT NULL,
                new_customers INTEGER NOT NULL,
                total_leads INTEGER NOT NULL,
                acquisition_cost REAL NOT NULL,
                acquisition_rate REAL,
                cost_per_acquisition REAL
            )
        """)
        
        # Create churn table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS churn_data (
                id INTEGER PRIMARY KEY,
                month TEXT NOT NULL,
                total_customers_start INTEGER NOT NULL,
                churned_customers INTEGER NOT NULL,
                churn_rate REAL
            )
        """)
        
        self.conn.commit()
    
    def create_widgets(self):
        """Create the main GUI elements"""
        # Create notebook for tabs
        notebook = ttk.Notebook(self.root)
        notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Tab 1: Data Entry
        self.data_entry_frame = ttk.Frame(notebook)
        notebook.add(self.data_entry_frame, text="Data Entry")
        self.create_data_entry_tab()
        
        # Tab 2: Dashboard
        self.dashboard_frame = ttk.Frame(notebook)
        notebook.add(self.dashboard_frame, text="Dashboard")
        self.create_dashboard_tab()
        
        # Tab 3: Data View
        self.data_view_frame = ttk.Frame(notebook)
        notebook.add(self.data_view_frame, text="Data View")
        self.create_data_view_tab()
    
    def create_data_entry_tab(self):
        """Create data entry forms"""
        # Acquisition Data Entry
        acq_frame = ttk.LabelFrame(self.data_entry_frame, text="Customer Acquisition Data", padding="10")
        acq_frame.grid(row=0, column=0, sticky="ew", padx=5, pady=5)
        
        ttk.Label(acq_frame, text="Month (YYYY-MM):").grid(row=0, column=0, sticky="w")
        self.acq_month = ttk.Entry(acq_frame, width=15)
        self.acq_month.grid(row=0, column=1, padx=5)
        
        ttk.Label(acq_frame, text="New Customers:").grid(row=1, column=0, sticky="w")
        self.acq_customers = ttk.Entry(acq_frame, width=15)
        self.acq_customers.grid(row=1, column=1, padx=5)
        
        ttk.Label(acq_frame, text="Total Leads:").grid(row=2, column=0, sticky="w")
        self.acq_leads = ttk.Entry(acq_frame, width=15)
        self.acq_leads.grid(row=2, column=1, padx=5)
        
        ttk.Label(acq_frame, text="Acquisition Cost ($):").grid(row=3, column=0, sticky="w")
        self.acq_cost = ttk.Entry(acq_frame, width=15)
        self.acq_cost.grid(row=3, column=1, padx=5)
        
        ttk.Button(acq_frame, text="Add Acquisition Data", 
                  command=self.add_acquisition_data).grid(row=4, column=0, columnspan=2, pady=10)
        
        # Churn Data Entry
        churn_frame = ttk.LabelFrame(self.data_entry_frame, text="Customer Churn Data", padding="10")
        churn_frame.grid(row=0, column=1, sticky="ew", padx=5, pady=5)
        
        ttk.Label(churn_frame, text="Month (YYYY-MM):").grid(row=0, column=0, sticky="w")
        self.churn_month = ttk.Entry(churn_frame, width=15)
        self.churn_month.grid(row=0, column=1, padx=5)
        
        ttk.Label(churn_frame, text="Total Customers (Start):").grid(row=1, column=0, sticky="w")
        self.churn_total = ttk.Entry(churn_frame, width=15)
        self.churn_total.grid(row=1, column=1, padx=5)
        
        ttk.Label(churn_frame, text="Churned Customers:").grid(row=2, column=0, sticky="w")
        self.churn_customers = ttk.Entry(churn_frame, width=15)
        self.churn_customers.grid(row=2, column=1, padx=5)
        
        ttk.Button(churn_frame, text="Add Churn Data", 
                  command=self.add_churn_data).grid(row=3, column=0, columnspan=2, pady=10)
    
    def create_dashboard_tab(self):
        """Create dashboard with charts and metrics"""
        # Metrics frame
        metrics_frame = ttk.LabelFrame(self.dashboard_frame, text="Key Metrics", padding="10")
        metrics_frame.pack(fill="x", padx=5, pady=5)
        
        self.metrics_text = tk.Text(metrics_frame, height=4, width=80)
        self.metrics_text.pack()
        
        # Chart frame
        chart_frame = ttk.LabelFrame(self.dashboard_frame, text="Trends", padding="10")
        chart_frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        self.create_charts(chart_frame)
    
    def create_data_view_tab(self):
        """Create data viewing and export functionality"""
        # Buttons frame
        button_frame = ttk.Frame(self.data_view_frame)
        button_frame.pack(fill="x", padx=5, pady=5)
        
        ttk.Button(button_frame, text="Export to CSV", command=self.export_csv).pack(side="left", padx=5)
        ttk.Button(button_frame, text="Refresh Data", command=self.refresh_data).pack(side="left", padx=5)
        ttk.Button(button_frame, text="Clear All Data", command=self.clear_data).pack(side="left", padx=5)
        
        # Data display
        data_notebook = ttk.Notebook(self.data_view_frame)
        data_notebook.pack(fill="both", expand=True, padx=5, pady=5)
        
        # Acquisition data table
        acq_frame = ttk.Frame(data_notebook)
        data_notebook.add(acq_frame, text="Acquisition Data")
        
        self.acq_tree = ttk.Treeview(acq_frame, columns=("Month", "New Customers", "Total Leads", 
                                                        "Acquisition Cost", "Acquisition Rate", "CPA"), 
                                    show="headings")
        for col in self.acq_tree["columns"]:
            self.acq_tree.heading(col, text=col)
            self.acq_tree.column(col, width=120)
        
        acq_scrollbar = ttk.Scrollbar(acq_frame, orient="vertical", command=self.acq_tree.yview)
        self.acq_tree.configure(yscrollcommand=acq_scrollbar.set)
        
        self.acq_tree.pack(side="left", fill="both", expand=True)
        acq_scrollbar.pack(side="right", fill="y")
        
        # Churn data table
        churn_frame = ttk.Frame(data_notebook)
        data_notebook.add(churn_frame, text="Churn Data")
        
        self.churn_tree = ttk.Treeview(churn_frame, columns=("Month", "Total Customers Start", 
                                                            "Churned Customers", "Churn Rate"), 
                                      show="headings")
        for col in self.churn_tree["columns"]:
            self.churn_tree.heading(col, text=col)
            self.churn_tree.column(col, width=150)
        
        churn_scrollbar = ttk.Scrollbar(churn_frame, orient="vertical", command=self.churn_tree.yview)
        self.churn_tree.configure(yscrollcommand=churn_scrollbar.set)
        
        self.churn_tree.pack(side="left", fill="both", expand=True)
        churn_scrollbar.pack(side="right", fill="y")
    
    def create_charts(self, parent):
        """Create matplotlib charts"""
        self.fig, (self.ax1, self.ax2) = plt.subplots(1, 2, figsize=(12, 5))
        
        # Acquisition trend chart
        self.ax1.set_title("Customer Acquisition Trend")
        self.ax1.set_xlabel("Month")
        self.ax1.set_ylabel("New Customers")
        
        # Churn rate chart
        self.ax2.set_title("Churn Rate Trend")
        self.ax2.set_xlabel("Month")
        self.ax2.set_ylabel("Churn Rate (%)")
        
        self.canvas = FigureCanvasTkAgg(self.fig, parent)
        self.canvas.get_tk_widget().pack(fill="both", expand=True)
    
    def add_acquisition_data(self):
        """Add new acquisition data to database"""
        try:
            month = self.acq_month.get()
            new_customers = int(self.acq_customers.get())
            total_leads = int(self.acq_leads.get())
            acquisition_cost = float(self.acq_cost.get())
            
            # Calculate metrics
            acquisition_rate = (new_customers / total_leads) * 100 if total_leads > 0 else 0
            cost_per_acquisition = acquisition_cost / new_customers if new_customers > 0 else 0
            
            cursor = self.conn.cursor()
            cursor.execute("""
                INSERT INTO acquisition_data 
                (month, new_customers, total_leads, acquisition_cost, acquisition_rate, cost_per_acquisition)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (month, new_customers, total_leads, acquisition_cost, acquisition_rate, cost_per_acquisition))
            
            self.conn.commit()
            
            # Clear entries
            self.acq_month.delete(0, tk.END)
            self.acq_customers.delete(0, tk.END)
            self.acq_leads.delete(0, tk.END)
            self.acq_cost.delete(0, tk.END)
            
            self.refresh_data()
            messagebox.showinfo("Success", "Acquisition data added successfully!")
            
        except ValueError:
            messagebox.showerror("Error", "Please enter valid numeric values")
        except Exception as e:
            messagebox.showerror("Error", f"Database error: {str(e)}")
    
    def add_churn_data(self):
        """Add new churn data to database"""
        try:
            month = self.churn_month.get()
            total_customers_start = int(self.churn_total.get())
            churned_customers = int(self.churn_customers.get())
            
            # Calculate churn rate
            churn_rate = (churned_customers / total_customers_start) * 100 if total_customers_start > 0 else 0
            
            cursor = self.conn.cursor()
            cursor.execute("""
                INSERT INTO churn_data 
                (month, total_customers_start, churned_customers, churn_rate)
                VALUES (?, ?, ?, ?)
            """, (month, total_customers_start, churned_customers, churn_rate))
            
            self.conn.commit()
            
            # Clear entries
            self.churn_month.delete(0, tk.END)
            self.churn_total.delete(0, tk.END)
            self.churn_customers.delete(0, tk.END)
            
            self.refresh_data()
            messagebox.showinfo("Success", "Churn data added successfully!")
            
        except ValueError:
            messagebox.showerror("Error", "Please enter valid numeric values")
        except Exception as e:
            messagebox.showerror("Error", f"Database error: {str(e)}")
    
    def refresh_data(self):
        """Refresh all data displays"""
        self.update_metrics()
        self.update_charts()
        self.update_tables()
    
    def update_metrics(self):
        """Update metrics display"""
        cursor = self.conn.cursor()
        
        # Get acquisition metrics
        cursor.execute('SELECT SUM(new_customers), AVG(acquisition_rate), AVG(cost_per_acquisition) FROM acquisition_data')
        acq_result = cursor.fetchone()
        
        # Get churn metrics
        cursor.execute('SELECT AVG(churn_rate) FROM churn_data')
        churn_result = cursor.fetchone()
        
        total_acquired = acq_result[0] if acq_result[0] else 0
        avg_acq_rate = acq_result[1] if acq_result[1] else 0
        avg_cpa = acq_result[2] if acq_result[2] else 0
        avg_churn_rate = churn_result[0] if churn_result[0] else 0
        
        metrics_text = f"""Key Metrics Summary:
• Total Customers Acquired: {total_acquired:,}
• Average Acquisition Rate: {avg_acq_rate:.1f}%
• Average Cost per Acquisition: ${avg_cpa:.2f}
• Average Monthly Churn Rate: {avg_churn_rate:.1f}%"""
        
        self.metrics_text.delete(1.0, tk.END)
        self.metrics_text.insert(1.0, metrics_text)
    
    def update_charts(self):
        """Update chart displays"""
        self.ax1.clear()
        self.ax2.clear()
        
        cursor = self.conn.cursor()
        
        # Acquisition chart
        cursor.execute('SELECT month, new_customers FROM acquisition_data ORDER BY month')
        acq_data = cursor.fetchall()
        
        if acq_data:
            months, customers = zip(*acq_data)
            self.ax1.plot(range(len(months)), customers, marker='o', linewidth=2, markersize=6)
            self.ax1.set_title("Customer Acquisition Trend")
            self.ax1.set_xlabel("Month")
            self.ax1.set_ylabel("New Customers")
            self.ax1.set_xticks(range(len(months)))
            self.ax1.set_xticklabels(months, rotation=45)
            self.ax1.grid(True, alpha=0.3)
        
        # Churn chart
        cursor.execute('SELECT month, churn_rate FROM churn_data ORDER BY month')
        churn_data = cursor.fetchall()
        
        if churn_data:
            months, rates = zip(*churn_data)
            self.ax2.plot(range(len(months)), rates, marker='s', linewidth=2, markersize=6, color='red')
            self.ax2.set_title("Churn Rate Trend")
            self.ax2.set_xlabel("Month")
            self.ax2.set_ylabel("Churn Rate (%)")
            self.ax2.set_xticks(range(len(months)))
            self.ax2.set_xticklabels(months, rotation=45)
            self.ax2.grid(True, alpha=0.3)
        
        self.fig.tight_layout()
        self.canvas.draw()
    
    def update_tables(self):
        """Update data tables"""
        # Clear existing data
        for item in self.acq_tree.get_children():
            self.acq_tree.delete(item)
        
        for item in self.churn_tree.get_children():
            self.churn_tree.delete(item)
        
        cursor = self.conn.cursor()
        
        # Update acquisition table
        cursor.execute('SELECT month, new_customers, total_leads, acquisition_cost, acquisition_rate, cost_per_acquisition FROM acquisition_data ORDER BY month')
        for row in cursor.fetchall():
            formatted_row = (row[0], row[1], row[2], f"${row[3]:.2f}", f"{row[4]:.1f}%", f"${row[5]:.2f}")
            self.acq_tree.insert("", "end", values=formatted_row)
        
        # Update churn table
        cursor.execute('SELECT month, total_customers_start, churned_customers, churn_rate FROM churn_data ORDER BY month')
        for row in cursor.fetchall():
            formatted_row = (row[0], row[1], row[2], f"{row[3]:.1f}%")
            self.churn_tree.insert("", "end", values=formatted_row)
    
    def export_csv(self):
        """Export data to CSV files"""
        try:
            file_path = filedialog.askdirectory(title="Select Export Directory")
            if not file_path:
                return
            
            cursor = self.conn.cursor()
            
            # Export acquisition data
            cursor.execute('SELECT * FROM acquisition_data ORDER BY month')
            acq_data = cursor.fetchall()
            
            acq_filename = f"{file_path}/acquisition_data_{datetime.now().strftime('%Y%m%d')}.csv"
            with open(acq_filename, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(['ID', 'Month', 'New Customers', 'Total Leads', 'Acquisition Cost', 
                               'Acquisition Rate (%)', 'Cost per Acquisition ($)'])
                writer.writerows(acq_data)
            
            # Export churn data
            cursor.execute('SELECT * FROM churn_data ORDER BY month')
            churn_data = cursor.fetchall()
            
            churn_filename = f"{file_path}/churn_data_{datetime.now().strftime('%Y%m%d')}.csv"
            with open(churn_filename, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(['ID', 'Month', 'Total Customers Start', 'Churned Customers', 'Churn Rate (%)'])
                writer.writerows(churn_data)
            
            messagebox.showinfo("Success", f"Data exported successfully to:\\n{acq_filename}\\n{churn_filename}")
            
        except Exception as e:
            messagebox.showerror("Error", f"Export failed: {str(e)}")
    
    def clear_data(self):
        """Clear all data from database"""
        if messagebox.askyesno("Confirm", "Are you sure you want to clear all data? This cannot be undone."):
            cursor = self.conn.cursor()
            cursor.execute('DELETE FROM acquisition_data')
            cursor.execute('DELETE FROM churn_data')
            self.conn.commit()
            self.refresh_data()
            messagebox.showinfo("Success", "All data cleared successfully!")
    
    def __del__(self):
        """Close database connection"""
        if hasattr(self, 'conn'):
            self.conn.close()

if __name__ == "__main__":
    root = tk.Tk()
    app = CustomerTracker(root)
    root.mainloop()
```

## Installation Instructions

1. **Install Python**: Download from [python.org](https://python.org) (Python 3.7+)
2. **Install Required Packages**:
   ```bash
   pip install matplotlib numpy
   ```
3. **Save the Code**: Copy the above code into a file named `customer_tracker_desktop.py`
4. **Run the Application**:
   ```bash
   python customer_tracker_desktop.py
   ```

## Features

### Data Entry
- **Customer Acquisition Form**: Month, new customers, total leads, acquisition cost
- **Churn Tracking Form**: Month, total customers at start, churned customers
- **Automatic Calculations**: Acquisition rate, cost per acquisition, churn rate

### Dashboard
- **Key Metrics Display**: Summary statistics and averages
- **Interactive Charts**: Real-time line charts for trends
- **Professional Interface**: Tabbed layout with organized sections

### Data Management
- **SQLite Database**: Local data storage with persistence
- **Data Tables**: Detailed view of all records
- **CSV Export**: Export data for external analysis
- **Data Validation**: Error handling and input validation

### Advanced Features
- **Month-over-Month Analysis**: Trend visualization
- **Automatic Calculations**: Real-time metric computation
- **Data Backup**: CSV export functionality
- **Professional Charts**: Matplotlib integration for publication-quality charts

## Usage Tips

1. **Data Format**: Use YYYY-MM format for months (e.g., 2024-01)
2. **Regular Updates**: Enter data monthly for accurate trends
3. **Backup Data**: Export CSV files regularly
4. **Validation**: Application validates inputs and shows error messages
5. **Database**: SQLite database file created automatically in application folder
