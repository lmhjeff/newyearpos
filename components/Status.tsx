"use client";

import { useRouter } from "next/navigation";
import useCartStore from "../app/store";

type StatusProps = {
  status: Status[];
};

const Status = ({ status }: StatusProps) => {
  const router = useRouter();

  const handleFilter = (e: string) => {
    router.push(`/orders/${e}`);
  };

  return (
    <div className="flex flex-row items-center justify-start w-full space-x-4">
      {status.map((sta, i) => (
        <div
          key={i}
          onClick={() => handleFilter(sta.statusField)}
          className="px-4 py-2 text-center font-semibold border-2 rounded-lg cursor-pointer"
        >
          {sta.statusField}
        </div>
      ))}
    </div>
  );
};

export default Status;
