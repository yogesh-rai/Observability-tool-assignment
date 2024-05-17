import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import "./Styles.css";

type DateRange =  {
  startDate: Date | null;
  endDate: Date | null;
}

type DateRangePickerProps = {
  ranges: DateRange[];
  onChange: (range: DateRange) => void;
}

const CustomDateRangePicker: React.FC<DateRangePickerProps> = ({ ranges, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        readOnly
        value={
          ranges[0].startDate && ranges[0].endDate
            ? `${format(ranges[0].startDate, 'MMM dd, yyyy hh:mm a')} - ${format(ranges[0].endDate, 'MMM dd, yyyy hh:mm a')}`
            : 'Select Date/Time Range'
        }
        onClick={() => setIsOpen(!isOpen)}
        className="daterange-input"
      />
      {isOpen && (
        <div style={{ position: 'absolute', zIndex: 1, background: 'white', border: '1px solid #ccc', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div>
              <label>Start Date and Time:</label>
              <DatePicker
                selected={ranges[0].startDate}
                onChange={(date: Date) => onChange({ ...ranges[0], startDate: date })}
                showTimeSelect
                dateFormat="Pp"
                selectsStart
                startDate={ranges[0].startDate}
                endDate={ranges[0].endDate}
              />
            </div>
            <div>
              <label>End Date and Time:</label>
              <DatePicker
                selected={ranges[0].endDate}
                onChange={(date: Date) => onChange({ ...ranges[0], endDate: date })}
                showTimeSelect
                dateFormat="Pp"
                selectsEnd
                startDate={ranges[0].startDate}
                endDate={ranges[0].endDate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDateRangePicker;
