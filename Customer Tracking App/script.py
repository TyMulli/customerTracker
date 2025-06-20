# Let me create sample data structure for the customer tracking application
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Generate sample customer data for demonstration
np.random.seed(42)
random.seed(42)

# Create sample customer acquisition data
months = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', 
          '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12']

# Sample data for customer acquisition
acquisition_data = []
for i, month in enumerate(months):
    base_acquisitions = 100 + i * 5  # Growing trend
    acquisitions = base_acquisitions + random.randint(-20, 30)
    
    acquisition_data.append({
        'month': month,
        'new_customers': max(0, acquisitions),
        'total_leads': acquisitions * random.uniform(3, 5),
        'acquisition_cost': acquisitions * random.uniform(25, 50)
    })

acquisition_df = pd.DataFrame(acquisition_data)

# Sample data for churn tracking
churn_data = []
total_customers = 0
for i, month in enumerate(months):
    total_customers += acquisition_df.loc[i, 'new_customers']
    churn_count = int(total_customers * random.uniform(0.02, 0.08))  # 2-8% churn
    
    churn_data.append({
        'month': month,
        'total_customers_start': total_customers,
        'churned_customers': churn_count,
        'total_customers_end': total_customers - churn_count
    })
    
    total_customers -= churn_count

churn_df = pd.DataFrame(churn_data)

# Calculate metrics
acquisition_df['acquisition_rate'] = (acquisition_df['new_customers'] / acquisition_df['total_leads'] * 100).round(2)
acquisition_df['cost_per_acquisition'] = (acquisition_df['acquisition_cost'] / acquisition_df['new_customers']).round(2)

churn_df['churn_rate'] = (churn_df['churned_customers'] / churn_df['total_customers_start'] * 100).round(2)

# Display sample data
print("Sample Customer Acquisition Data:")
print(acquisition_df.head())
print("\nSample Churn Data:")
print(churn_df.head())

# Save sample data
acquisition_df.to_csv('sample_acquisition_data.csv', index=False)
churn_df.to_csv('sample_churn_data.csv', index=False)

print("\nSample data saved to CSV files")