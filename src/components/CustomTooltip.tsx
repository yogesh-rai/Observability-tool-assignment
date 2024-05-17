import React from 'react';
import { TooltipProps } from 'recharts';
import { format } from 'date-fns';
import "./Styles.css";

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const formattedDate = format(new Date(label), 'MMM dd, yyyy hh:mm a');

    console.log(payload);
    console.log(label);
    
    return (
      <div className="custom-tooltip">
        <p className="label">{formattedDate}</p>
        <ul className="list">
          {payload.map((data, index) => (
            <li key={index} className="item">
              {data.name}: {data.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
