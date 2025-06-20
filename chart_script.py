import plotly.graph_objects as go
import plotly.io as pio
import pandas as pd
from datetime import datetime

# Data from JSON
data = [
    {"month": "2024-01", "new_customers": 120},
    {"month": "2024-02", "new_customers": 100},
    {"month": "2024-03", "new_customers": 133},
    {"month": "2024-04", "new_customers": 132},
    {"month": "2024-05", "new_customers": 113},
    {"month": "2024-06", "new_customers": 145}
]

# Convert to DataFrame
df = pd.DataFrame(data)

# Convert month to datetime and extract month names
df['month_date'] = pd.to_datetime(df['month'])
df['month_name'] = df['month_date'].dt.strftime('%b')

# Create line chart
fig = go.Figure()

fig.add_trace(go.Scatter(
    x=df['month_name'],
    y=df['new_customers'],
    mode='lines+markers',
    line=dict(color='#1FB8CD', width=3),
    marker=dict(size=8, color='#1FB8CD'),
    hovertemplate='<b>%{x}</b><br>New Customers: %{y}<extra></extra>',
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title='Customer Acquisition Trends',
    xaxis_title='Month',
    yaxis_title='New Customers'
)

# Update axes
fig.update_xaxes(showgrid=True)
fig.update_yaxes(showgrid=True)

# Save the chart
fig.write_image("customer_acquisition_chart.png")