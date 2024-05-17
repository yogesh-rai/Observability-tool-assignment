import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Text } from 'recharts';
import { data } from '../constant';
import { parseISO, format } from 'date-fns';
import CustomTooltip from './CustomTooltip';
import CustomDateRangePicker from './CustomDateRangePicker';
import "./Styles.css";


type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
}


const LineChartComponent: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [showSpecial, setShowSpecial] = useState<boolean>(false);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  const handleReset = () => {
    setDateRange({
      startDate: null,
      endDate: null,
    });
    setShowSpecial(false);
  };

  const filteredData = data.filter(item => {
    const itemDate = parseISO(item.time);
    const inRange = (!dateRange.startDate || itemDate >= dateRange.startDate) && (!dateRange.endDate || itemDate <= dateRange.endDate);
    const specialFilter = showSpecial ? item.special : true;
    return inRange && specialFilter;
  });


  const formatDateForChart = (date: Date) => {
    // return format(date, 'MMM dd, yyyy hh:mm a');
    return format(date, 'dd/MM/yyyy, hh:mm a');
  };

  // const chartData = processedData.map(item => ({
  //   time: item.time.toISOString(),
  //   requests: item.requests,
  //   endpoint: item.endpoint
  // }));


  const timePoints = filteredData?.map((item) => parseISO(item.time).toISOString()).sort();

  const uniqueEndpoints = Array.from(new Set(filteredData.map(item => item.endpoint)));

  type CompleteData = {
    time: string;
    [key: string]: number | string;
  }

  const dataToShow: CompleteData[] = timePoints.map(time => {
    const dataAtTime: CompleteData = { time };
    uniqueEndpoints.forEach(endpoint => {
      const dataPoint = filteredData.find(item => parseISO(item.time).toISOString() === time && item.endpoint === endpoint);
      dataAtTime[endpoint] = dataPoint ? dataPoint.requests : 0;
    });
    return dataAtTime;
  });

  // console.log(timePoints);
  // console.log(dataToShow);
  

  const CustomXAxisTick = ({ x, y, payload }: any) => {
      if (payload && payload.value) {
        return (
          <Text
              fontSize={"13px"}
              width={30}
              x={x} 
              y={y} 
              textAnchor="middle" 
              verticalAnchor="start"
          >{formatDateForChart(parseISO(payload.value))}</Text>
        );
      }
      return null;
  };

  const CustomizedLabelForYAxis = () => {
      return (
          <Text
              x={0}
              y={0}
              dx={-300}
              dy={20}
              textAnchor="start"
              width={180}
              transform="rotate(-90)"
              style={{ marginRight: '2rem' }}
          >            
              Requests
          </Text>
      );
  };


  return (
    <div style={{ border: '2px solid #A7A7A7' }}>
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CustomDateRangePicker ranges={[dateRange]} onChange={handleDateRangeChange} />
          <div className="special-checkbox">
              <label>Special Only: </label>
              <input
                type="checkbox"
                checked={showSpecial}
                onChange={() => setShowSpecial(!showSpecial)}
              />
          </div> 
        </div>
        <button className="button" onClick={handleReset}>Reset</button>
      </div>
      <ResponsiveContainer height={600} width={1300}>
        <LineChart data={dataToShow} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            interval={0}
            tick={<CustomXAxisTick/>}
            height={100}
          />
          <YAxis
            tickCount={10}    
            label={<CustomizedLabelForYAxis />}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "black" }} />
          <Legend />
          {uniqueEndpoints.map(endpoint => (
                <Line
                    key={endpoint}
                    type="monotone"
                    dataKey={endpoint}
                    stroke={
                    endpoint === '/home' ? '#8884d8' :
                    endpoint === '/product' ? '#82ca9d' :
                    '#ffc658'
                    }
                    // dot={true}
                    dot={{ strokeWidth: 7 }}
                    strokeWidth={4}
                />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
