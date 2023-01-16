"use client";

import { Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import useCartStore, { IStatusOption } from "../app/store";

// interface IHandleSelect {
//   handleSelect: () => void;
// }

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
  // const [checkbox, setCheckbox] = useState(options);
  const { statusOption, setStatusOption } = useCartStore();

  const handleByDates = useCallback(
    (e: string[]) => {
      router.push(`/stocks/${e}`);
    },
    [dates]
  );

  useEffect(() => {
    setDates([]);
  }, []);

  const handleChangeCheckBox = (value: any) => {
    const updatedStatus = statusOption?.map((item, index) =>
      item.value === value ? { ...item, check: !item.check } : { ...item }
    );

    console.log("updatedStatus", updatedStatus);

    // setStatusOption(updatedStatus);
    // setStatusOption((prev) => {
    //   return prev.map((item: any) => {
    //     // console.log(typeof item.value);
    //     if (item.value === value) {
    //       return { ...item, check: !item.check };
    //     } else {
    //       return { ...item };
    //     }
    //   });
    // });
  };
  console.log("checked = ", statusOption);

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
      <div className="flex flex-row items-center space-x-4 my-4">
        {statusOption?.map((item: IStatusOption, index) => (
          <div
            key={item.label}
            onClick={() => handleChangeCheckBox(item.check)}
          >
            <input type="checkbox" id={item.value} value={item.value} />
            <label className="ml-2">{item.label}</label>
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
