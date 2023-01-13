"use client";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import "antd/dist/reset.css";

// interface IHandleSelect {
//   handleSelect: () => void;
// }

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
  const [dates, setDates] = useState([]);

  console.log(dates);

  return (
    <>
      <RangePicker
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
        size="large"
        onChange={(values: any) =>
          setDates(
            values?.map((item: any) => {
              return dayjs(item).toISOString();
            })
          )
        }
      />
    </>
  );
};

export default DateRangePicker;
