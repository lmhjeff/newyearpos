"use client";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import "antd/dist/reset.css";
import useCartStore from "../app/store";
import { useRouter } from "next/navigation";

// interface IHandleSelect {
//   handleSelect: () => void;
// }

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const handleByDates = useCallback(
    (e: string[]) => {
      router.push(`/stocks/${e}`);
    },
    [dates]
  );

  useEffect(() => {
    setDates([]);
  }, []);

  console.log("dates", dates);

  return (
    <div className="flex flex-col w-full">
      <div className="flex-row space-x-4 py-2">
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
        <button
          onClick={() => handleByDates(dates)}
          className="p-3 rounded-lg bg-pink-500"
        >
          Search
        </button>
      </div>

      <div className="my-2">
        選擇日期：
        {dates.length > 0
          ? dayjs(dates[0]).format("YYYY-MM-DD HH:mm:ss")
          : null}{" "}
        -{" "}
        {dates.length > 0
          ? dayjs(dates[1]).format("YYYY-MM-DD HH:mm:ss")
          : null}
      </div>
    </div>
  );
};

export default DateRangePicker;
