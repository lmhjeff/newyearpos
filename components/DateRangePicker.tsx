"use client";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IStatusOption } from "../app/store";

const { RangePicker } = DatePicker;

interface ICheckboxOption {
  label: string;
  value: string;
  chcek: boolean;
}

const options = [
  { label: "All", value: "All", check: false },
  { label: "Completed", value: "Completed", check: false },
  { label: "PreOrder", value: "PreOrder", check: false },
  { label: "WaitingForDelivery", value: "WaitingForDelivery", check: false },
];

const DateRangePicker = () => {
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const [checkbox, setCheckbox] = useState(options);
  const [query, setQuery] = useState("");
  // const { statusOption, setStatusOption } = useCartStore();

  const handleByDates = useCallback(
    (e: string[], query) => {
      router.push(`/stocks/${e}, ${query}`);
    },
    [dates]
  );

  useEffect(() => {
    setDates([]);
  }, []);

  const handleChangeCheckBox = (value: any) => {
    const updatedStatus = checkbox?.map((item, index) =>
      item.value === value ? { ...item, check: !item.check } : { ...item }
    );

    setCheckbox(updatedStatus);
    const query = updatedStatus.find((item) => item.check)?.value!;

    setQuery(query);
  };

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
          onClick={() => handleByDates(dates, query)}
          className="p-3 rounded-lg bg-pink-500"
        >
          Search
        </button>
      </div>
      <div className="flex flex-row items-center space-x-4 my-4">
        {checkbox?.map((item: IStatusOption, index) => (
          <div key={item?.label}>
            <input
              type="checkbox"
              id={item?.value}
              value={item?.value}
              checked={item?.check}
              onChange={() => handleChangeCheckBox(item.value)}
            />
            <label className="ml-2">{item?.label}</label>
          </div>
        ))}
      </div>

      <div>
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
