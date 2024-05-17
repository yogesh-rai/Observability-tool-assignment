
## Overview

This project visualizes a dataset using a line chart, providing insights into the number of requests for different endpoints over time.


## LineChartComponent

The `LineChartComponent` is the core component responsible for rendering the line chart visualization using the `recharts` library. It displays the number of requests for different endpoints over time and integrates several features to enhance user interaction and data analysis.

## Functioning

1. **Data Processing**:
   - The component processes the raw dataset to extract unique timestamps and endpoints.
   - Missing data points are filled with zero values to ensure a continuous line chart without gaps.

2. **Line Chart Component**:
   - Renders the line chart with data for different endpoints.
   - Integrates filters and tooltips for enhanced user interaction.

3. **Date/Time Range Filter**:
   - Allows users to manually select a date range to filter the data displayed in the chart.

4. **Special Endpoint Filter**:
   - A checkbox filter to display only the special endpoints in the chart.

5. **Custom Tooltip**:
   - Provides detailed information about data points on hover.

6. **Reset Button**
   - Also added a reset button which will reset all the filters to it's default state.


## Design Choices

### Date/Time Range Filter

**Design Choice:**
I opted for a custom date/time range picker that allows users to manually select the start and end dates. This provides flexibility for users to filter the data within any desired timeframe.

**Implementation:**
- I created a custom component, `CustomDateRangePicker`, which let users manually select the date/time range.
- I used 'reat-datepicker' library for creating this component.
- The selected date range updates the state, which in turn filters the displayed data.
- The `recharts` library's `LineChart` component is updated dynamically based on the filtered data.

### Special Endpoint Filter

**Design Choice:**
Added a simple checkbox to allow users to filter the data based on a special flag (`special: true`). This makes it easy to highlight and analyze specific data points marked as special.

**Implementation:**
- A checkbox input is provided for users to toggle the filter.
- The state is updated based on the checkbox value, filtering the data accordingly.
- The `LineChart` component updates to reflect the filtered data.

### Custom Tooltip

**Design Choice:**
The tooltip was customized to enhance readability and provide detailed information about the data points.

**Implementation:**
- Created a custom `CustomTooltip` component to format and display the tooltip content.
- Used CSS for styling the tooltip.
- The tooltip displays the date/time, endpoint, and number of requests, providing a comprehensive view of the data point.
