"use client";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import "antd/dist/reset.css";
import useCartStore from "../app/store";
import { useRouter } from "next/navigation";

// interface IHandleSelect {
//   handleSelect: () => void;
// }

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
  const router = useRouter();
  const { rangeDates, setRangeDates } = useCartStore();
  const handleByDates = useCallback(
    (e: string[]) => {
      setRangeDates(e);
      router.push(`/stocks/${e}`);
    },
    [rangeDates]
  );

  console.log("rangeDates", rangeDates);

  return (
    <div className="flex flex-row space-x-4 py-2">
      <RangePicker
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
        size="large"
        onChange={(values: any) =>
          setRangeDates(
            values?.map((item: any) => {
              return dayjs(item).toISOString();
            })
          )
        }
      />
      <button
        onClick={() => handleByDates(rangeDates)}
        className="p-2 rounded-lg bg-pink-500"
      >
        Search
      </button>
    </div>
  );
};

export default DateRangePicker;
