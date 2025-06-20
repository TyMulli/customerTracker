import plotly.graph_objects as go
import pandas as pd
from plotly.subplots import make_subplots

# Create the data
data = [
    {"month": "2024-01", "total_customers_start": 120, "churned_customers": 7, "churn_rate": 5.83},
    {"month": "2024-02", "total_customers_start": 213, "churned_customers": 11, "churn_rate": 5.16},
    {"month": "2024-03", "total_customers_start": 335, "churned_customers": 26, "churn_rate": 7.76},
    {"month": "2024-04", "total_customers_start": 441, "churned_customers": 18, "churn_rate": 4.08},
    {"month": "2024-05", "total_customers_start": 536, "churned_customers": 28, "churn_rate": 5.22},
    {"month": "2024-06", "total_customers_start": 653, "churned_customers": 32, "churn_rate": 4.90}
]

df = pd.DataFrame(data)

# Create month labels (shortened to fit 15 char limit)
months = [month.split('-')[1] + '/' + month.split('-')[0][2:] for month in df['month']]

# Create the combination chart with secondary y-axis
fig = make_subplots(specs=[[{"secondary_y": True}]])

# Add bar chart for total customers on primary y-axis
fig.add_trace(
    go.Bar(
        x=months,
        y=df['total_customers_start'],
        name='Customers',
        marker_color='#FFC185',
        opacity=0.7,
        hovertemplate='<b>%{x}</b><br>Customers: %{y}<extra></extra>',
        cliponaxis=False
    ),
    secondary_y=False,
)

# Add line chart for churn rate on secondary y-axis
fig.add_trace(
    go.Scatter(
        x=months,
        y=df['churn_rate'],
        mode='lines+markers',
        name='Churn Rate',
        line=dict(color='#1FB8CD', width=3),
        marker=dict(size=8, color='#1FB8CD'),
        hovertemplate='<b>%{x}</b><br>Churn Rate: %{y:.1f}%<extra></extra>',
        cliponaxis=False
    ),
    secondary_y=True,
)

# Update layout
fig.update_layout(
    title='Monthly Churn & Customers',
    xaxis_title='Month',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Set y-axes titles
fig.update_yaxes(title_text='Customers', secondary_y=False)
fig.update_yaxes(title_text='Churn Rate (%)', secondary_y=True)

fig.update_xaxes(tickangle=0)

# Save the chart
fig.write_image('monthly_churn_customers_chart.png')