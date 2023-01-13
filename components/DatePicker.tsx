"use client";

import { DateRangePicker } from "react-date-range-ts";
import "react-date-range-ts/dist/styles.css";
import "react-date-range-ts/dist/theme/default.css";

// interface IHandleSelect {
//   handleSelect: () => void;
// }

const DatePicker = () => {
  const handleSelect = (ranges: any) => {
    console.log(ranges);
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  return (
    <>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />;
    </>
  );
};

export default DatePicker;
